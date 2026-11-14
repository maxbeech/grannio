/** Keep payment links private until the corresponding pending order is durable. */
export async function prepareReportCheckout<Session extends { id: string; url: string | null }>(deps: {
  checkStorage: () => PromiseLike<{ error: unknown }>;
  createSession: () => Promise<Session>;
  saveOrder: (session: Session) => Promise<unknown>;
  expireSession: (session: Session) => Promise<unknown>;
  reportFailure: (error: unknown, step: "storage_check" | "pending_order_insert" | "session_expire") => void;
}): Promise<{ ok: true; url: string } | { ok: false }> {
  const report = (error: unknown, step: "storage_check" | "pending_order_insert" | "session_expire") => {
    try {
      deps.reportFailure(error, step);
    } catch {
      console.error(`[report-checkout] could not report ${step} failure`);
    }
  };
  try {
    const { error } = await deps.checkStorage();
    if (error) {
      report(error, "storage_check");
      return { ok: false };
    }
  } catch (error) {
    report(error, "storage_check");
    return { ok: false };
  }

  const session = await deps.createSession();
  let failure: unknown = null;
  try {
    failure = await deps.saveOrder(session);
    if (!failure && !session.url) failure = new Error("Stripe did not return a checkout URL");
  } catch (error) {
    failure = error;
  }
  if (!failure && session.url) return { ok: true, url: session.url };

  report(failure, "pending_order_insert");
  try {
    await deps.expireSession(session);
  } catch (error) {
    report(error, "session_expire");
  }
  return { ok: false };
}
