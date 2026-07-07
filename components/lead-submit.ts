import type { LeadPayload } from "@/lib/lead";

export interface SubmitResult {
  ok: boolean;
  error?: string;
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
    if (!res.ok) return { ok: false, error: data.error || "Something went wrong — please try again." };
    return { ok: true };
  } catch {
    return { ok: false, error: "Network error — please check your connection and try again." };
  }
}
