import { NextResponse } from "next/server";
import { site } from "@/lib/site";
import { isValidEmail } from "@/lib/lead";
import { getStripe, REPORT_PRICE_CENTS, REPORT_PRICE_CURRENCY } from "@/lib/stripe";
import { getSupabaseAdmin } from "@/lib/supabase-admin";

// Vercel Function (Node.js runtime) — creates a real Stripe Checkout Session for the $49
// detailed feasibility report. Never fakes success: the client only redirects once Stripe
// actually returns a session URL. The webhook (app/api/webhooks/stripe/route.ts) is the
// source of truth for payment confirmation — this route just starts the transaction.

export interface ReportCheckoutPayload {
  name?: string;
  email: string;
  zip?: string;
  aduType?: string;
  timeline?: string;
  sourcePath?: string;
  // Honeypot: a field real visitors never fill in. Non-empty => treat as a bot.
  company?: string;
}

// Only allow same-origin relative paths (e.g. "/california/los-angeles?state=..."), so a
// crafted sourcePath can't be used to redirect the Stripe cancel flow off-site.
function safeRelativePath(path: string | undefined): string {
  if (!path || !path.startsWith("/") || path.startsWith("//") || path.includes("://")) return "/";
  return path;
}

export async function POST(request: Request) {
  let body: Partial<ReportCheckoutPayload>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request body." }, { status: 400 });
  }

  if (body.company) {
    return NextResponse.json({ ok: true, url: null });
  }

  if (!body.email || !isValidEmail(body.email)) {
    return NextResponse.json({ ok: false, error: "Please enter a valid email address." }, { status: 400 });
  }

  const supabase = await getSupabaseAdmin();
  if (!supabase) {
    return NextResponse.json(
      { ok: false, error: "Report checkout isn't connected yet — please email us directly." },
      { status: 503 }
    );
  }

  const origin = request.headers.get("origin") || process.env.NEXT_PUBLIC_SITE_URL || site.url;
  const cancelUrl = new URL(safeRelativePath(body.sourcePath), origin);
  cancelUrl.searchParams.set("report", "cancelled");

  try {
    const stripe = getStripe();
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      customer_email: body.email,
      line_items: [
        {
          price_data: {
            currency: REPORT_PRICE_CURRENCY,
            unit_amount: REPORT_PRICE_CENTS,
            product_data: {
              name: "Grannio Detailed ADU Feasibility Report",
              description: "Personalized ADU feasibility & cost report, emailed within 2 business days.",
            },
          },
          quantity: 1,
        },
      ],
      success_url: `${origin}/report/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: cancelUrl.toString(),
      metadata: {
        name: body.name || "",
        zip: body.zip || "",
        aduType: body.aduType || "",
        timeline: body.timeline || "",
        sourcePath: body.sourcePath || "",
      },
    });

    const { error } = await supabase.from("report_orders").insert({
      stripe_session_id: session.id,
      status: "pending",
      amount_cents: REPORT_PRICE_CENTS,
      currency: REPORT_PRICE_CURRENCY,
      email: body.email,
      name: body.name || null,
      zip: body.zip || null,
      adu_type: body.aduType || null,
      timeline: body.timeline || null,
      source_path: body.sourcePath || null,
    });
    // Don't block checkout on this — the webhook can still confirm the payment from
    // Stripe's own record even if this pending row failed to write.
    if (error) console.error("[api/checkout/report] Supabase insert failed:", error);

    return NextResponse.json({ ok: true, url: session.url });
  } catch (err) {
    console.error("[api/checkout/report] Stripe session creation failed:", err);
    return NextResponse.json(
      { ok: false, error: "We couldn't start checkout just now — please email us directly." },
      { status: 502 }
    );
  }
}
