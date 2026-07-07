import { NextResponse } from "next/server";
import { site } from "@/lib/site";
import { validateLeadPayload, buildLeadNotificationText, leadEmailSubject, type LeadPayload } from "@/lib/lead";
import { getSupabaseAdmin } from "@/lib/supabase-admin";

// Vercel Function (Node.js runtime, Fluid Compute) — not cached; every request runs live.
// Real-data policy: this route never fabricates a success. It only returns { ok: true }
// once a lead has actually been persisted (Supabase) or actually emailed (Resend). If
// neither backend is configured it fails loudly with a real error, so the UI can show an
// honest fallback instead of a fake "submitted" state.

export async function POST(request: Request) {
  let body: Partial<LeadPayload>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request body." }, { status: 400 });
  }

  // Honeypot: a hidden field real visitors never fill in. Report fake success to the bot,
  // do no real work, so scrapers can't tell their submission was dropped.
  if (body.company) {
    return NextResponse.json({ ok: true });
  }

  const validation = validateLeadPayload(body);
  if (!validation.ok) {
    return NextResponse.json({ ok: false, error: validation.error }, { status: 400 });
  }
  const payload = body as LeadPayload;

  const resendKey = process.env.RESEND_API_KEY;
  const supabase = await getSupabaseAdmin();

  if (!resendKey && !supabase) {
    return NextResponse.json(
      { ok: false, error: "Lead capture isn't connected yet — please email us directly." },
      { status: 503 }
    );
  }

  let stored = false;
  if (supabase) {
    try {
      const { error } = await supabase.from("leads").insert({
        kind: payload.kind,
        name: payload.name || null,
        email: payload.email,
        phone: payload.phone || null,
        zip: payload.zip || null,
        state_slug: payload.stateSlug || null,
        city: payload.city || null,
        adu_type: payload.aduType || null,
        sqft: payload.sqft ?? null,
        lot_sqft: payload.lotSqft ?? null,
        financing_amount: payload.financingAmount ?? null,
        timeline: payload.timeline || null,
        notes: payload.notes || null,
        source_path: payload.sourcePath || null,
      });
      if (error) throw error;
      stored = true;
    } catch (err) {
      console.error("[api/lead] Supabase insert failed:", err);
    }
  }

  let emailed = false;
  if (resendKey) {
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
      emailed = true;
    } catch (err) {
      console.error("[api/lead] Resend send failed:", err);
    }
  }

  if (!stored && !emailed) {
    return NextResponse.json(
      { ok: false, error: "We couldn't submit that just now — please email us directly." },
      { status: 502 }
    );
  }

  return NextResponse.json({ ok: true });
}
