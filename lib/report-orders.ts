import type { SupabaseClient } from "@supabase/supabase-js";
import { isTransientNetworkError, sleep, type SupabaseLikeError } from "@/lib/transient";

export const PENDING_ORDER_RETRY_DELAY_MS = 750;

export type PendingOrder = {
  stripe_session_id: string;
  status: "pending";
  amount_cents: number;
  currency: string;
  email: string;
  name: string | null;
  zip: string | null;
  adu_type: string | null;
  timeline: string | null;
  source_path: string | null;
};

/**
 * Writes the pending order row for a Stripe session. A dropped connection to Supabase
 * (GRANNIO_WEB-7, `TypeError: fetch failed`) gets one retry. Before re-inserting, the row is
 * looked up by session id, because the first request may have landed and only its reply been
 * lost, and a second insert would leave two rows for one session.
 *
 * Returns the final error, or null when the row exists. Never throws.
 */
export async function insertPendingOrder(
  supabase: SupabaseClient,
  order: PendingOrder,
  retryDelayMs = PENDING_ORDER_RETRY_DELAY_MS,
): Promise<SupabaseLikeError> {
  const first = (await supabase.from("report_orders").insert(order)).error;
  if (!isTransientNetworkError(first)) return first;

  await sleep(retryDelayMs);
  const lookup = await supabase.from("report_orders").select("id").eq("stripe_session_id", order.stripe_session_id).limit(1);
  if (!lookup.error && lookup.data && lookup.data.length > 0) return null;
  return (await supabase.from("report_orders").insert(order)).error;
}
