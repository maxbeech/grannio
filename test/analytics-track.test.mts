// trackEvent puts the event on the dataLayer only when a measurement id is set. The id is
// read when the module loads, so the "unset" case runs this file again in a child process.
// Run: tsx test/analytics-track.test.mts
import { execFileSync } from "node:child_process";

let pass = 0, fail = 0;
function check(name: string, cond: boolean, extra = "") {
  if (cond) { pass++; console.log(`  ok   ${name}`); }
  else { fail++; console.error(`  FAIL ${name} ${extra}`); }
}

const win: { dataLayer?: unknown[] } = {};
(globalThis as unknown as { window: unknown }).window = win;

if (process.argv[2] === "off") {
  delete process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
  const { trackEvent } = await import("../lib/analytics-events.ts");
  const recorded = trackEvent("checkout_cancelled", {});
  process.exit(recorded === false && win.dataLayer === undefined ? 0 : 1);
}

const child = (() => {
  try {
    execFileSync(process.execPath, ["--import", "tsx", process.argv[1], "off"], {
      env: { ...process.env, NEXT_PUBLIC_GA_MEASUREMENT_ID: "" },
      stdio: "pipe",
    });
    return true;
  } catch {
    return false;
  }
})();
check("unset id records nothing and pushes no dataLayer", child);

process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID = "G-TEST12345";
const { trackEvent } = await import("../lib/analytics-events.ts");
check("set id records the event", trackEvent("lead_submitted", { lead_kind: "builder" }) === true);
check("payload is [event, name, params]", JSON.stringify(win.dataLayer) === '[["event","lead_submitted",{"lead_kind":"builder"}]]', JSON.stringify(win.dataLayer));

console.log(`\n${pass} passed, ${fail} failed`);
if (fail > 0) process.exit(1);
