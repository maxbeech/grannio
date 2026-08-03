import { NextResponse } from "next/server";
import { site } from "@/lib/site";
import { validateLeadPayload, buildLeadNotificationText, leadEmailSubject, type LeadPayload } from "@/lib/lead";
import { getSupabaseAdmin } from "@/lib/supabase-admin";
import { sendEmail, emailEnabled } from "@/lib/openhelm-mail";

// Vercel Function (Node.js runtime, Fluid Compute) — not cached; every request runs live.
// Real-data policy: this route never fabricates a success. It only returns { ok: true }
// once a lead has actually been persisted (Supabase) or actually emailed (OpenHelm Mail). If
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

  const canEmail = emailEnabled();
  const supabase = await getSupabaseAdmin();

  if (!canEmail && !supabase) {
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

  // The notification goes out on this product's own OpenHelm Mail inbox, with
  // the lead's address as Reply-To so replying answers the person who enquired
  // rather than the product's mailbox.
  let emailed = false;
  if (canEmail) {
    const result = await sendEmail({
      to: process.env.LEAD_NOTIFY_EMAIL || site.email,
      replyTo: payload.email,
      subject: leadEmailSubject(payload.kind),
      text: buildLeadNotificationText(payload),
    });
    // "Held for approval" is not delivery: leave `emailed` false so the caller
    // still depends on the Supabase write for its success claim.
    emailed = result.sent && result.status !== "pending_approval";
    if (!result.sent) console.error("[api/lead] mail send failed:", result.error ?? result.reason);
  }

  if (!stored && !emailed) {
    return NextResponse.json(
      { ok: false, error: "We couldn't submit that just now — please email us directly." },
      { status: 502 }
    );
  }

  return NextResponse.json({ ok: true });
}
