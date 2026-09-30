// Analytics contract: user ref vector, event names, purchase confirmation, failure codes.
// Run: tsx test/analytics.test.mts
import { userRefFor, isValidEventName } from "../lib/openhelm-analytics-mp.ts";
import { checkPurchase, REPORT_ITEM_ID } from "../lib/analytics-purchase.ts";
import { analyticsFailureReason } from "../lib/analytics-events.ts";
import { submitLead } from "../components/lead-submit.ts";
import { submitReportCheckout } from "../components/report-checkout.ts";
import { REPORT_PRICE_CENTS, REPORT_PRICE_CURRENCY } from "../lib/report-price.ts";
import { readFileSync } from "node:fs";

let pass = 0, fail = 0;
function check(name: string, cond: boolean, extra = "") {
  if (cond) { pass++; console.log(`  ok   ${name}`); }
  else { fail++; console.error(`  FAIL ${name} ${extra}`); }
}

// --- user ref (pinned contract vector) ---
check("userRefFor matches the contract vector",
  (await userRefFor("00000000-0000-0000-0000-000000000000")) === "12b9377cbe7e5c94");
check("userRefFor is 16 hex chars", /^[0-9a-f]{16}$/.test(await userRefFor("someone")));

// --- every event name in the typed map is a legal GA4 name ---
const src = readFileSync(new URL("../lib/analytics-events.ts", import.meta.url), "utf8");
const mapBody = src.slice(src.indexOf("interface AnalyticsEventMap"), src.indexOf("export type AnalyticsEventName"));
const names = [...mapBody.matchAll(/^  ([a-z_]+): /gm)].map((m) => m[1]);
check("event map lists the journey events", ["calculator_used", "begin_checkout", "purchase", "lead_submitted"].every((n) => names.includes(n)), names.join(","));
for (const n of names) check(`event name ${n} is legal (<=40, snake_case)`, isValidEventName(n) && n === n.toLowerCase());

// --- purchase confirmation ---
const paid = { id: "cs_test_1", mode: "payment", payment_status: "paid", amount_total: REPORT_PRICE_CENTS, currency: REPORT_PRICE_CURRENCY };
const ok = checkPurchase("cs_test_1", paid);
check("paid $49 session confirms", ok.ok);
if (ok.ok) {
  check("purchase carries the session as transaction_id", ok.params.transaction_id === "cs_test_1");
  check("purchase value is dollars, currency upper-case", ok.params.value === 49 && ok.params.currency === "USD");
  check("purchase has one report item", ok.params.items.length === 1 && ok.params.items[0].item_id === REPORT_ITEM_ID && ok.params.items[0].price === 49);
  check("purchase params hold no email or name", !/@|name|email/i.test(Object.keys(ok.params).join(",")));
}
check("no session id is refused", JSON.stringify(checkPurchase(undefined, null)) === '{"ok":false,"reason":"no_session_id"}');
check("failed lookup is refused", JSON.stringify(checkPurchase("cs_x", null)) === '{"ok":false,"reason":"lookup_failed"}');
check("unpaid session is refused", JSON.stringify(checkPurchase("cs_x", { ...paid, payment_status: "unpaid" })) === '{"ok":false,"reason":"not_paid"}');
check("paid session for another amount is refused", JSON.stringify(checkPurchase("cs_x", { ...paid, amount_total: 100 })) === '{"ok":false,"reason":"unrecognised_session"}');
check("paid subscription session is refused", JSON.stringify(checkPurchase("cs_x", { ...paid, mode: "subscription" })) === '{"ok":false,"reason":"unrecognised_session"}');
check("paid session in another currency is refused", JSON.stringify(checkPurchase("cs_x", { ...paid, currency: "gbp" })) === '{"ok":false,"reason":"unrecognised_session"}');

// --- failure codes ---
check("http status becomes http_<status>", analyticsFailureReason(502) === "http_502");
check("no status is network_error", analyticsFailureReason(null) === "network_error");

const realFetch = globalThis.fetch;
function stubFetch(impl: () => Promise<unknown>) { globalThis.fetch = impl as unknown as typeof fetch; }
const json = (status: number, body: unknown) => async () => ({ ok: status < 400, status, json: async () => body });

stubFetch(json(502, { error: "We couldn't submit that just now." }));
const leadFail = await submitLead({ kind: "builder", email: "a@b.co" });
check("submitLead 502 => code http_502", !leadFail.ok && leadFail.code === "http_502");
stubFetch(json(200, { ok: true }));
check("submitLead ok has no code", (await submitLead({ kind: "builder", email: "a@b.co" })).code === undefined);
stubFetch(async () => { throw new Error("offline"); });
check("submitLead network error => network_error", (await submitLead({ kind: "financing", email: "a@b.co" })).code === "network_error");
stubFetch(json(503, { error: "not connected" }));
const co = await submitReportCheckout({ email: "a@b.co" });
check("checkout 503 => code http_503", !co.ok && co.code === "http_503");
stubFetch(json(200, { ok: true, url: "https://checkout.stripe.com/x" }));
const coOk = await submitReportCheckout({ email: "a@b.co" });
check("checkout ok returns url and no code", coOk.ok && coOk.url === "https://checkout.stripe.com/x" && coOk.code === undefined);
globalThis.fetch = realFetch;

console.log(`\n${pass} passed, ${fail} failed`);
if (fail > 0) process.exit(1);
