import { NextResponse } from "next/server";
import type Stripe from "stripe";
import type { SupabaseClient } from "@supabase/supabase-js";
import { site } from "@/lib/site";
import { buildLeadNotificationText, leadEmailSubject, type LeadPayload } from "@/lib/lead";
import { getStripe, REPORT_PRICE_CENTS, REPORT_PRICE_CURRENCY } from "@/lib/stripe";
import { getSupabaseAdmin } from "@/lib/supabase-admin";

// Vercel Function (Node.js runtime — Stripe signature verification needs Node crypto, not
// edge). Source of truth for report payments: the checkout route only *starts* a Stripe
// Checkout Session, this webhook is what actually confirms money changed hands before a
// lead is recorded or any "your report is on its way" email goes out.
export const runtime = "nodejs";

export async function POST(request: Request) {
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!webhookSecret) {
    console.error("[api/webhooks/stripe] STRIPE_WEBHOOK_SECRET is not set.");
    return NextResponse.json({ error: "Webhook not configured." }, { status: 503 });
  }

  const signature = request.headers.get("stripe-signature");
  const rawBody = await request.text();
  const stripe = getStripe();

  let event: Stripe.Event;
  try {
    if (!signature) throw new Error("Missing stripe-signature header.");
    event = stripe.webhooks.constructEvent(rawBody, signature, webhookSecret);
  } catch (err) {
    console.error("[api/webhooks/stripe] Signature verification failed:", err);
    return NextResponse.json({ error: "Invalid signature." }, { status: 400 });
  }

  const supabase = await getSupabaseAdmin();

  if (event.type === "checkout.session.completed" || event.type === "checkout.session.async_payment_succeeded") {
    const session = event.data.object as Stripe.Checkout.Session;
    if (session.payment_status === "paid") {
      await handlePaidSession(session, supabase);
    }
  } else if (event.type === "checkout.session.expired") {
    const session = event.data.object as Stripe.Checkout.Session;
    if (supabase) {
      await supabase
        .from("report_orders")
        .update({ status: "expired" })
        .eq("stripe_session_id", session.id)
        .eq("status", "pending");
    }
  }

  return NextResponse.json({ received: true });
}

async function handlePaidSession(session: Stripe.Checkout.Session, supabase: SupabaseClient | null) {
  const email = session.customer_details?.email || session.customer_email;
  if (!email) {
    console.error("[api/webhooks/stripe] Paid session has no email:", session.id);
    return;
  }
  const metadata = session.metadata || {};
  const name = metadata.name || session.customer_details?.name || undefined;
  const paymentIntentId =
    typeof session.payment_intent === "string" ? session.payment_intent : session.payment_intent?.id;

  if (supabase) {
    const { data: existing } = await supabase
      .from("report_orders")
      .select("id, status")
      .eq("stripe_session_id", session.id)
      .maybeSingle();

    // Stripe retries webhook delivery — if we already marked this session paid, the lead
    // and emails already went out, so stop here instead of sending them again.
    if (existing?.status === "paid") return;

    if (existing) {
      await supabase
        .from("report_orders")
        .update({ status: "paid", paid_at: new Date().toISOString(), stripe_payment_intent_id: paymentIntentId || null })
        .eq("id", existing.id);
    } else {
      // The pending insert in /api/checkout/report must have failed — recover the order
      // from Stripe's own session data so a real payment is never silently unrecorded.
      await supabase.from("report_orders").insert({
        stripe_session_id: session.id,
        stripe_payment_intent_id: paymentIntentId || null,
        status: "paid",
        amount_cents: session.amount_total ?? REPORT_PRICE_CENTS,
        currency: session.currency ?? REPORT_PRICE_CURRENCY,
        email,
        name: name || null,
        zip: metadata.zip || null,
        adu_type: metadata.aduType || null,
        timeline: metadata.timeline || null,
        source_path: metadata.sourcePath || null,
        paid_at: new Date().toISOString(),
      });
    }

    const { data: lead } = await supabase
      .from("leads")
      .insert({
        kind: "report",
        name: name || null,
        email,
        zip: metadata.zip || null,
        adu_type: metadata.aduType || null,
        timeline: metadata.timeline || null,
        source_path: metadata.sourcePath || null,
        notes: "Paid $49 detailed report via Stripe Checkout.",
      })
      .select("id")
      .maybeSingle();

    if (lead?.id) {
      await supabase.from("report_orders").update({ lead_id: lead.id }).eq("stripe_session_id", session.id);
    }
  } else {
    console.error("[api/webhooks/stripe] Supabase not configured — paid report order not persisted:", session.id);
  }

  const leadPayload: LeadPayload = {
    kind: "report",
    name,
    email,
    zip: metadata.zip || undefined,
    aduType: metadata.aduType || undefined,
    timeline: metadata.timeline || undefined,
    sourcePath: metadata.sourcePath || undefined,
    notes: "Paid $49 detailed report via Stripe Checkout.",
  };
  await sendNotificationEmail(leadPayload);
  await sendCustomerConfirmation(email, name);
}

async function sendNotificationEmail(payload: LeadPayload) {
  const resendKey = process.env.RESEND_API_KEY;
  if (!resendKey) return;
  try {
    const { Resend } = await import("resend");
    const resend = new Resend(resendKey);
    const from = process.env.RESEND_FROM_EMAIL || `${site.name} Leads <onboarding@resend.dev>`;
    const { error } = await resend.emails.send({
      from,
      to: process.env.LEAD_NOTIFY_EMAIL || site.email,
      replyTo: payload.email,
      subject: leadEmailSubject(payload.kind),
      text: buildLeadNotificationText(payload),
    });
    if (error) throw error;
  } catch (err) {
    console.error("[api/webhooks/stripe] Notification email failed:", err);
  }
}

async function sendCustomerConfirmation(email: string, name?: string) {
  const resendKey = process.env.RESEND_API_KEY;
  if (!resendKey) return;
  try {
    const { Resend } = await import("resend");
    const resend = new Resend(resendKey);
    const from = process.env.RESEND_FROM_EMAIL || `${site.name} <onboarding@resend.dev>`;
    const { error } = await resend.emails.send({
      from,
      to: email,
      replyTo: site.email,
      subject: "Your Grannio ADU feasibility report is on its way",
      text: [
        `Hi ${name?.trim() || "there"},`,
        "",
        "Thanks for your payment — we've received your $49 detailed ADU feasibility report request.",
        "We'll email your personalized report within 2 business days.",
        "",
        `Questions in the meantime? Just reply to this email or reach us at ${site.email}.`,
      ].join("\n"),
    });
    if (error) throw error;
  } catch (err) {
    console.error("[api/webhooks/stripe] Customer confirmation email failed:", err);
  }
}
