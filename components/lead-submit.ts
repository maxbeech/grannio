import type { LeadPayload } from "@/lib/lead";
import { analyticsFailureReason } from "@/lib/analytics-events";

export interface SubmitResult {
  ok: boolean;
  error?: string;
  /** Short failure code for analytics (`http_502`, `network_error`). */
  code?: string;
}

/** POST a lead to /api/lead. Never throws — network failures surface as {ok:false}. */
export async function submitLead(payload: Omit<LeadPayload, "kind"> & { kind: LeadPayload["kind"] }): Promise<SubmitResult> {
  try {
    const res = await fetch("/api/lead", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) return { ok: false, error: data.error || "Something went wrong — please try again.", code: analyticsFailureReason(res.status) };
    return { ok: true };
  } catch {
    return { ok: false, error: "Network error — please check your connection and try again.", code: analyticsFailureReason(null) };
  }
}
