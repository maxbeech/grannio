// toError keeps the message of plain-object failures (Supabase errors) instead of "[object Object]".
// Run: tsx test/observability.test.mts
import { toError } from "../lib/observability.ts";

let fail = 0;
function check(name: string, cond: boolean) {
  console.log(`  ${cond ? "ok  " : "FAIL"} ${name}`);
  if (!cond) fail++;
}

const real = new Error("boom");
check("Error passes through", toError(real) === real);
check("string becomes its message", toError("nope").message === "nope");
check("object message and code are kept", toError({ message: "fetch failed", code: "ECONNRESET" }).message === "fetch failed (ECONNRESET)");
check("object message without a code is kept", toError({ message: "row not found", code: "" }).message === "row not found");
check("an opaque object is never '[object Object]'", !toError({}).message.includes("[object Object]"));
if (fail) process.exit(1);
