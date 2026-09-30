import { REPORT_PRICE_CENTS, REPORT_PRICE_CURRENCY } from "./report-price";
import type { AnalyticsEventMap } from "./analytics-events";

// Decides, from what Stripe itself says about a Checkout Session, whether a `purchase`
// event may be sent. The redirect alone is not proof: the success page already looks the
// session up server-side, and this only accepts one that is paid, one-off, and for the
// $49 report this product sells.

export const REPORT_ITEM_ID = "adu-feasibility-report";
const REPORT_ITEM_NAME = "Grannio Detailed ADU Feasibility Report";

export interface SessionFacts {
  id: string;
  mode?: string | null;
  payment_status?: string | null;
  amount_total?: number | null;
  currency?: string | null;
}

export type PurchaseCheck =
  | { ok: true; params: AnalyticsEventMap["purchase"] }
  | { ok: false; reason: "no_session_id" | "lookup_failed" | "not_paid" | "unrecognised_session" };

export function checkPurchase(
  sessionId: string | undefined,
  session: SessionFacts | null,
): PurchaseCheck {
  if (!sessionId) return { ok: false, reason: "no_session_id" };
  if (!session) return { ok: false, reason: "lookup_failed" };
  if (session.payment_status !== "paid") return { ok: false, reason: "not_paid" };
  const ours =
    session.mode === "payment" &&
    session.amount_total === REPORT_PRICE_CENTS &&
    session.currency === REPORT_PRICE_CURRENCY;
  if (!ours) return { ok: false, reason: "unrecognised_session" };
  const value = session.amount_total! / 100;
  return {
    ok: true,
    params: {
      transaction_id: session.id,
      currency: REPORT_PRICE_CURRENCY.toUpperCase(),
      value,
      items: [{ item_id: REPORT_ITEM_ID, item_name: REPORT_ITEM_NAME, price: value, quantity: 1 }],
    },
  };
}
