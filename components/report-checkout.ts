import type { ReportCheckoutPayload } from "@/app/api/checkout/report/route";

export interface CheckoutResult {
  ok: boolean;
  url?: string | null;
  error?: string;
}

/** POST to /api/checkout/report to start a $49 Stripe Checkout session. Never throws. */
export async function submitReportCheckout(payload: ReportCheckoutPayload): Promise<CheckoutResult> {
  try {
    const res = await fetch("/api/checkout/report", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) return { ok: false, error: data.error || "Something went wrong — please try again." };
    return { ok: true, url: data.url };
  } catch {
    return { ok: false, error: "Network error — please check your connection and try again." };
  }
}
