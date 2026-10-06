// Feedback control wiring: rendered in header and footer, backed by Sentry's feedback form (no autoInject), tunnel header kept.
// Run: tsx test/feedback-button.test.mts
import { readFileSync } from "node:fs";
let pass = 0, fail = 0;
function check(name: string, cond: boolean, extra = "") {
  if (cond) { pass++; console.log(`  ok   ${name}`); }
  else { fail++; console.error(`  FAIL ${name} ${extra}`); }
}
const layout = readFileSync("app/layout.tsx", "utf8");
const button = readFileSync("components/FeedbackButton.tsx", "utf8");
const client = readFileSync("instrumentation-client.ts", "utf8");
const server = readFileSync("instrumentation.ts", "utf8");
const cfg = readFileSync("next.config.ts", "utf8");
const opts = readFileSync("lib/sentry-options.ts", "utf8");
check("header and footer both render the control", (layout.match(/<FeedbackButton/g) ?? []).length === 2);
check("button opens Sentry.getFeedback().createForm()", /getFeedback\(\)/.test(button) && /createForm\(\)/.test(button) && /form\.open\(\)/.test(button));
check("autoInject is off", /autoInject:\s*false/.test(client));
check("tunnel content-type fix present", /application\/x-sentry-envelope/.test(client));
check("server init uses shared options and onRequestError", /sharedSentryOptions/.test(server) && /onRequestError/.test(server));
check("tunnelRoute and project set", /tunnelRoute:\s*true/.test(cfg) && /grannio_web/.test(cfg) && /maxed-labs/.test(cfg));
check("logs, console forwarding and all scrub hooks wired", ["enableLogs: true", "consoleLoggingIntegration", "beforeSend:", "beforeSendLog", "beforeBreadcrumb", "beforeSendTransaction"].every((s) => opts.includes(s)));
console.log(`\n${pass} passed, ${fail} failed`);
if (fail) process.exit(1);
