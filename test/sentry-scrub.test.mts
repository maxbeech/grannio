// Sentry scrubber: secrets/PII redaction, fail-closed, breadcrumbs, transactions, ReDoS safety.
// Run: tsx test/sentry-scrub.test.mts
import { scrubString, scrubEvent, scrubLog, scrubBreadcrumb, scrubTransaction } from "../lib/scrub.ts";

type R = any; // eslint-disable-line @typescript-eslint/no-explicit-any
let pass = 0, fail = 0;
function check(name: string, cond: boolean, extra = "") {
  if (cond) { pass++; console.log(`  ok   ${name}`); }
  else { fail++; console.error(`  FAIL ${name} ${extra}`); }
}

const jwt = "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxMjM0NTY3ODkwIn0.dBjftJeZ4CVPmB92K27uhbUJU1p1r";
const secrets = [
  "jane.doe+adu@example.co.uk", "+1 (415) 555-0132", `Bearer ${jwt}`, jwt,
  "sk_live_51HabcdefghIJKLmnop", "pk_test_abcdefgh12345678", "whsec_abcdefgh12345678",
  "hlm_sk_abcdefgh12345678", "sntrys_eyJpYXQiOjE2ODk", "password=hunter2hunter2",
  '{"password":"hunter2hunter2","token":"abc123abc123"}', "authorization: abc123abc123",
];
for (const s of secrets) {
  const out = scrubString(`context ${s} end`);
  const leaked = s.split(/[\s:=]/).filter((p) => p.length > 8 && /[A-Za-z0-9]{8}/.test(p)).some((p) => out.includes(p.replace(/["{},]/g, "")));
  check(`redacts ${s.slice(0, 18)}`, !leaked && out.includes("[redacted]") || out.includes("Bearer [redacted]"), out);
}
check("keeps ordinary text and dates", scrubString("Quote for 2026-10-06 in Austin") === "Quote for 2026-10-06 in Austin");

// Events: fail closed, PII keys, user, request.
const ev = scrubEvent({
  message: "failed for jane@example.com",
  request: { url: "https://www.grannio.com/a?email=jane@example.com#x", data: { email: "x" }, cookies: { a: "b" } },
  extra: { email: "jane@example.com", step: "insert", nested: { phone: "+14155550132", count: 3 } },
  user: { id: "u1", email: "jane@example.com", ip_address: "1.2.3.4" },
} as never) as R;
check("event message scrubbed", !JSON.stringify(ev).includes("jane@example.com"));
check("event url has no query", ev.request.url === "https://www.grannio.com/a");
check("event keeps ids and counts", ev.extra.step === "insert" && ev.extra.nested.count === 3);
check("event user reduced to id", JSON.stringify(ev.user) === '{"id":"u1"}');
const poisoned = { get message(): string { throw new Error("boom"); } };
check("beforeSend fails closed", scrubEvent(poisoned as never) === null);
check("beforeSendLog fails closed", scrubLog(poisoned as never) === null);
check("beforeBreadcrumb fails closed", scrubBreadcrumb(poisoned as never) === null);
const fb = scrubEvent({ contexts: { feedback: { contact_email: "jane@example.com", name: "Jane", message: "hi" } } } as never) as R;
check("feedback keeps name and email", fb.contexts.feedback.contact_email === "jane@example.com" && fb.contexts.feedback.name === "Jane");

// Logs
const log = scrubLog({ level: "info", message: "mail to jane@example.com Bearer abcdefgh12345678", attributes: { email: "jane@example.com", "sentry.release": "1", count: 2 } } as never) as R;
check("log message scrubbed", !log.message.includes("jane@") && !log.message.includes("abcdefgh12345678"));
check("log attributes redacted, ids kept", log.attributes.email === "[redacted]" && log.attributes.count === 2 && log.attributes["sentry.release"] === "1");

// Breadcrumbs
const bc = scrubBreadcrumb({ message: "GET /api/lead?email=jane@example.com 200", data: { url: "/a?token=1", to: "/b?x=1", from: "/c?y=2", status_code: 200 } } as never) as R;
check("breadcrumb message has no query or email", !bc.message.includes("?") && !bc.message.includes("jane"));
check("breadcrumb url/to/from stripped", bc.data.url === "/a" && bc.data.to === "/b" && bc.data.from === "/c" && bc.data.status_code === 200);

// Transactions / spans
const tx = scrubTransaction({
  request: { url: "https://www.grannio.com/x?a=1" },
  spans: [{ description: "GET https://api.example.com/y?z=1", data: { "http.url": "https://api.example.com/y?z=1", "url.query": "z=1", "url.full": "https://a/b?c=d" } }],
} as never) as R;
check("transaction url stripped", tx.request.url === "https://www.grannio.com/x");
check("span urls stripped", tx.spans[0].data["http.url"] === "https://api.example.com/y" && !("url.query" in tx.spans[0].data) && tx.spans[0].data["url.full"] === "https://a/b" && !tx.spans[0].description.includes("?"));

// ReDoS: hostile long strings finish quickly and are truncated.
for (const [name, evil] of [
  ["a-chain", "a".repeat(200_000)], ["at-chain", "a@".repeat(100_000)], ["digit-chain", "1 ".repeat(100_000)],
  ["dot-chain", "a.".repeat(100_000) + "@"], ["eyJ-chain", "eyJ" + "a.".repeat(50_000)], ["key-chain", "token=".repeat(50_000)],
] as const) {
  const t = Date.now();
  const out = scrubString(evil);
  const ms = Date.now() - t;
  check(`adversarial ${name} fast (${ms}ms) and truncated`, ms < 500 && out.length < 12_000);
}

console.log(`\n${pass} passed, ${fail} failed`);
if (fail) process.exit(1);
