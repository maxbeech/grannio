// The pending-order write retries a dropped connection to Supabase once (GRANNIO_WEB-7)
// without double-inserting when the first request actually landed.
// Run: tsx test/report-orders.test.mts
import type { SupabaseClient } from "@supabase/supabase-js";
import { insertPendingOrder, type PendingOrder } from "../lib/report-orders.ts";
import { isTransientNetworkError } from "../lib/transient.ts";

let fail = 0;
function check(name: string, cond: boolean) {
  console.log(`  ${cond ? "ok  " : "FAIL"} ${name}`);
  if (!cond) fail++;
}

const order: PendingOrder = {
  stripe_session_id: "cs_test_1", status: "pending", amount_cents: 4900, currency: "usd",
  email: "a@b.co", name: null, zip: null, adu_type: null, timeline: null, source_path: null,
};
const dropped = { message: "TypeError: fetch failed", code: "" };

/** A fake client: inserts resolve from `inserts` in order; the lookup returns `existing`. */
function fake(inserts: ({ message?: string; code?: string } | null)[], existing: unknown[] = []) {
  let insertCalls = 0, lookups = 0;
  const client = {
    from: () => ({
      insert: async () => ({ error: inserts[insertCalls++] ?? null }),
      select: () => ({ eq: () => ({ limit: async () => { lookups++; return { data: existing, error: null }; } }) }),
    }),
  } as unknown as SupabaseClient;
  return { client, calls: () => ({ insertCalls, lookups }) };
}

check("empty-code fetch failure is transient", isTransientNetworkError(dropped));
check("a PostgREST refusal with a code is not", !isTransientNetworkError({ message: "fetch failed", code: "23505" }));
check("a null error is not", !isTransientNetworkError(null));

{
  const f = fake([null]);
  check("success: one insert, no retry", (await insertPendingOrder(f.client, order, 0)) === null && f.calls().insertCalls === 1);
}
{
  const f = fake([dropped, null]);
  const err = await insertPendingOrder(f.client, order, 0);
  check("dropped connection then success: retried once", err === null && f.calls().insertCalls === 2);
}
{
  const f = fake([dropped], [{ id: "x" }]);
  const err = await insertPendingOrder(f.client, order, 0);
  check("first insert landed despite the dropped reply: not inserted twice", err === null && f.calls().insertCalls === 1 && f.calls().lookups === 1);
}
{
  const f = fake([dropped, dropped]);
  const err = await insertPendingOrder(f.client, order, 0);
  check("still down: the error is returned for reporting", err?.message === dropped.message && f.calls().insertCalls === 2);
}
{
  const f = fake([{ message: "violates check constraint", code: "23514" }]);
  const err = await insertPendingOrder(f.client, order, 0);
  check("a real database refusal is returned at once, not retried", err?.code === "23514" && f.calls().insertCalls === 1 && f.calls().lookups === 0);
}
if (fail) process.exit(1);
