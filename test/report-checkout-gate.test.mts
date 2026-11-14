import assert from "node:assert/strict";
import { prepareReportCheckout } from "../lib/report-checkout-gate.ts";

const make = () => {
  const calls: string[] = [];
  const deps = {
    checkStorage: async () => { calls.push("check"); return { error: null as unknown }; },
    createSession: async () => { calls.push("create"); return { id: "cs_test_local", url: "https://checkout.example.test/session" as string | null }; },
    saveOrder: async () => { calls.push("save"); return null as unknown; },
    expireSession: async () => { calls.push("expire"); },
    reportFailure: (_error: unknown, step: string) => { calls.push(`report:${step}`); },
  };
  return { calls, deps };
};

{
  const { calls, deps } = make();
  assert.deepEqual(await prepareReportCheckout(deps), { ok: true, url: "https://checkout.example.test/session" });
  assert.deepEqual(calls, ["check", "create", "save"]);
}
{
  const { calls, deps } = make();
  deps.checkStorage = async () => { calls.push("check"); return { error: new Error("DNS failure") }; };
  assert.deepEqual(await prepareReportCheckout(deps), { ok: false });
  assert.deepEqual(calls, ["check", "report:storage_check"]);
}
{
  const { calls, deps } = make();
  deps.checkStorage = async () => { calls.push("check"); throw new Error("storage unavailable"); };
  assert.deepEqual(await prepareReportCheckout(deps), { ok: false });
  assert.deepEqual(calls, ["check", "report:storage_check"]);
}
{
  const { calls, deps } = make();
  deps.saveOrder = async () => { calls.push("save"); return new Error("connection lost after write"); };
  assert.deepEqual(await prepareReportCheckout(deps), { ok: false });
  assert.deepEqual(calls, ["check", "create", "save", "report:pending_order_insert", "expire"]);
}
{
  const { calls, deps } = make();
  deps.saveOrder = async () => { calls.push("save"); throw new Error("insert threw"); };
  deps.expireSession = async () => { calls.push("expire"); throw new Error("Stripe unavailable"); };
  assert.deepEqual(await prepareReportCheckout(deps), { ok: false });
  assert.deepEqual(calls, ["check", "create", "save", "report:pending_order_insert", "expire", "report:session_expire"]);
}
{
  const { calls, deps } = make();
  deps.createSession = async () => { calls.push("create"); return { id: "cs_test_local", url: null }; };
  assert.deepEqual(await prepareReportCheckout(deps), { ok: false });
  assert.deepEqual(calls, ["check", "create", "save", "report:pending_order_insert", "expire"]);
}
{
  const { calls, deps } = make();
  deps.saveOrder = async () => { calls.push("save"); return new Error("write failed"); };
  deps.reportFailure = () => { calls.push("report"); throw new Error("logging failed"); };
  assert.deepEqual(await prepareReportCheckout(deps), { ok: false });
  assert.deepEqual(calls, ["check", "create", "save", "report", "expire"]);
}
console.log("report checkout storage gate: passed");
