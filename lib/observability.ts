import * as Sentry from "@sentry/nextjs";

/**
 * The one way server code reports a problem.
 *
 * Context must be ids, codes, counts and enum values only: never names, emails,
 * free text, request or response bodies. (The scrubber is a backstop, not a
 * licence to pass user content.) With no DSN configured this degrades to a
 * console line rather than throwing inside an error handler.
 */
function hasDsn(): boolean {
  return Boolean(process.env.SENTRY_DSN || process.env.NEXT_PUBLIC_SENTRY_DSN);
}

type Context = Record<string, string | number | boolean | null | undefined>;

/**
 * Turn whatever was thrown or returned into an Error with a readable message.
 * Supabase and Stripe-style failures are plain objects with a `message`;
 * `String(obj)` would report them all as "[object Object]".
 */
export function toError(err: unknown): Error {
  if (err instanceof Error) return err;
  if (typeof err === "string" && err) return new Error(err);
  if (err && typeof err === "object") {
    const { message, code } = err as { message?: unknown; code?: unknown };
    if (typeof message === "string" && message) return new Error(typeof code === "string" && code ? `${message} (${code})` : message);
  }
  return new Error("Non-Error value reported");
}

export function captureServerError(err: unknown, context: Context = {}): void {
  const scope = typeof context.scope === "string" ? context.scope : "server";
  try {
    if (hasDsn()) {
      Sentry.withScope((s) => {
        s.setTag("scope", scope);
        for (const [k, v] of Object.entries(context)) if (k !== "scope") s.setExtra(k, v);
        s.captureException(toError(err));
      });
      return;
    }
  } catch {
    // Never let reporting an error become an error.
  }
  console.error(`[${scope}] Sentry not configured; error not reported:`, err instanceof Error ? err.message : "non-Error thrown");
}

/** Report a handled failure that is not an exception (a Supabase error code, a rejected upstream call). */
export function captureServerMessage(message: string, context: Context = {}): void {
  const scope = typeof context.scope === "string" ? context.scope : "server";
  try {
    if (hasDsn()) {
      Sentry.withScope((s) => {
        s.setTag("scope", scope);
        s.setLevel("warning");
        for (const [k, v] of Object.entries(context)) if (k !== "scope") s.setExtra(k, v);
        s.captureMessage(message);
      });
      return;
    }
  } catch {
    /* see above */
  }
  console.warn(`[${scope}] Sentry not configured; message not reported:`, message);
}
