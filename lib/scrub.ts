import type { Breadcrumb, ErrorEvent, Log } from "@sentry/nextjs";

type TransactionEvent = Parameters<NonNullable<NonNullable<Parameters<typeof import("@sentry/nextjs").init>[0]>["beforeSendTransaction"]>>[0];

/**
 * The one scrubber for everything Grannio sends to Sentry: error events, logs,
 * breadcrumbs and transactions/spans.
 *
 * Rules (see _plans/SENTRY_STANDARD.md):
 * - Fail closed. If scrubbing throws, the event/log/breadcrumb is dropped (null),
 *   never sent raw.
 * - Linear-time. Every regex below uses bounded repetition and no nested or
 *   overlapping quantifiers, and any string over MAX_SCRUB_CHARS is truncated
 *   before matching, so hostile log text cannot cause ReDoS.
 * - Feedback events are the one exception: they keep the name/email the person
 *   chose to give us.
 */

const REDACTED = "[redacted]";
export const MAX_SCRUB_CHARS = 10_000;
const MAX_DEPTH = 6;

// Values under these keys never leave the process (matched as lower-case substrings).
const SECRET_KEYS = [
  "key", "token", "secret", "password", "passwd", "authorization", "cookie",
  "session", "signature", "credential", "dsn", "bearer",
];
// Visitor and lead data: ADU enquiries carry contact details and free text.
const PII_KEYS = [
  "email", "phone", "address", "name", "notes", "zip", "postcode", "city",
  "comment", "body", "payload", "ip_address",
];
// Keys whose string value is a URL: drop the query string and fragment.
const URL_KEYS = ["url", "to", "from", "href", "http.url", "url.full", "url.path", "referrer"];
// Span/breadcrumb data keys that only ever hold a query string.
const QUERY_KEYS = ["url.query", "http.query", "query", "query_string", "http.fragment"];

const PATTERNS: Array<[RegExp, string | ((m: string) => string)]> = [
  // JWTs (three base64url segments starting with the `eyJ` header).
  [/eyJ[A-Za-z0-9_-]{5,2000}\.[A-Za-z0-9_-]{5,2000}\.[A-Za-z0-9_-]{0,4000}/g, REDACTED],
  // Authorization: Bearer <token>
  [/\bBearer\s{1,5}[A-Za-z0-9._~+/=-]{8,2000}/gi, `Bearer ${REDACTED}`],
  // Prefixed API keys: Stripe, webhook, Helm7, Sentry, GitHub, Resend, Google.
  [/\b(?:sk|pk|rk|whsec|hlm_sk|hlm_pk|sntrys|sntryu|ghp|gho|re|AIza)[_-][A-Za-z0-9_-]{8,200}/g, REDACTED],
  // key=value / "key":"value" for secret-ish field names, including inside serialised JSON.
  [
    /\b[A-Za-z_-]{0,30}(?:password|passwd|secret|token|authorization|api[_-]?key)["']?\s{0,3}[:=]\s{0,3}["']?[^\s"',;&]{1,500}/gi,
    REDACTED,
  ],
  // Emails.
  [/[A-Za-z0-9._%+-]{1,64}@[A-Za-z0-9.-]{1,255}\.[A-Za-z]{2,24}/g, REDACTED],
  // Phone numbers: 9 to 15 digits with separators (checked below so dates and short ids survive).
  [
    /(?<![\w.])\+?\d[\d\s().-]{7,18}\d(?!\w)/g,
    (m) => ((m.match(/\d/g) ?? []).length >= 9 ? REDACTED : m),
  ],
];

/** Redact secrets and personal data inside a free-text string. Bounded and linear-time. */
export function scrubString(input: string): string {
  let s = input.length > MAX_SCRUB_CHARS ? `${input.slice(0, MAX_SCRUB_CHARS)}…[truncated]` : input;
  for (const [re, replacement] of PATTERNS) {
    s = s.replace(re, replacement as string);
  }
  return s;
}

/** Drop the query string and fragment from a URL-ish string. */
export function stripQuery(url: string): string {
  const cut = url.length > MAX_SCRUB_CHARS ? url.slice(0, MAX_SCRUB_CHARS) : url;
  const q = cut.indexOf("?");
  const h = cut.indexOf("#");
  const end = Math.min(q === -1 ? cut.length : q, h === -1 ? cut.length : h);
  return cut.slice(0, end);
}

function isSensitiveKey(key: string): boolean {
  const k = key.toLowerCase();
  if (k.startsWith("sentry.")) return false; // Sentry's own attributes are not user data.
  return SECRET_KEYS.some((s) => k.includes(s)) || PII_KEYS.some((s) => k.includes(s));
}

/** Recursively redact values by key and by content, preserving structure. */
export function scrubValue(value: unknown, depth = 0): unknown {
  if (value == null) return value;
  if (typeof value === "string") return scrubString(value);
  if (typeof value !== "object") return value;
  if (depth > MAX_DEPTH) return REDACTED;
  if (Array.isArray(value)) return value.slice(0, 100).map((v) => scrubValue(v, depth + 1));
  const out: Record<string, unknown> = {};
  for (const [k, v] of Object.entries(value as Record<string, unknown>)) {
    const lk = k.toLowerCase();
    if (QUERY_KEYS.includes(lk)) continue;
    if (isSensitiveKey(k)) out[k] = REDACTED;
    else if (typeof v === "string" && URL_KEYS.includes(lk)) out[k] = scrubString(stripQuery(v));
    else out[k] = scrubValue(v, depth + 1);
  }
  return out;
}

function scrubUrlFields(obj: Record<string, unknown> | undefined): void {
  if (!obj) return;
  for (const k of Object.keys(obj)) {
    const lk = k.toLowerCase();
    if (QUERY_KEYS.includes(lk)) delete obj[k];
    else if (URL_KEYS.includes(lk) && typeof obj[k] === "string") obj[k] = stripQuery(obj[k] as string);
  }
}

function isFeedback(event: { contexts?: Record<string, unknown> }): boolean {
  return Boolean(event.contexts && "feedback" in event.contexts);
}

function scrubRequest(event: ErrorEvent | TransactionEvent): void {
  const req = event.request;
  if (!req) return;
  if (req.url) req.url = stripQuery(req.url);
  delete req.cookies;
  delete req.query_string;
  delete req.data;
  if (req.headers) req.headers = scrubValue(req.headers) as Record<string, string>;
}

/** Sentry `beforeSend`. Returns null (drops the event) if scrubbing fails. */
export function scrubEvent(event: ErrorEvent): ErrorEvent | null {
  try {
    if (isFeedback(event as { contexts?: Record<string, unknown> })) {
      if (event.request?.url) event.request.url = stripQuery(event.request.url);
      return event; // Name and email are what the person chose to give us.
    }
    scrubRequest(event);
    if (event.message) event.message = scrubString(event.message);
    for (const ex of event.exception?.values ?? []) {
      if (typeof ex.value === "string") ex.value = scrubString(ex.value);
    }
    if (event.extra) event.extra = scrubValue(event.extra) as Record<string, unknown>;
    if (event.contexts) event.contexts = scrubValue(event.contexts) as typeof event.contexts;
    if (event.tags) event.tags = scrubValue(event.tags) as typeof event.tags;
    if (event.user) event.user = event.user.id ? { id: event.user.id } : undefined;
    if (event.breadcrumbs) {
      event.breadcrumbs = event.breadcrumbs
        .map((b) => scrubBreadcrumb(b))
        .filter((b): b is Breadcrumb => b !== null);
    }
    return event;
  } catch {
    return null;
  }
}

/** Sentry `beforeSendLog`. Returns null (drops the log) if scrubbing fails. */
export function scrubLog(log: Log): Log | null {
  try {
    const message = typeof log.message === "string" ? scrubString(log.message) : log.message;
    const attributes = log.attributes ? (scrubValue(log.attributes) as Log["attributes"]) : log.attributes;
    return { ...log, message, attributes };
  } catch {
    return null;
  }
}

/** Sentry `beforeBreadcrumb`. Returns null (drops the breadcrumb) if scrubbing fails. */
export function scrubBreadcrumb(b: Breadcrumb): Breadcrumb | null {
  try {
    const next: Breadcrumb = { ...b };
    if (typeof next.message === "string") next.message = scrubString(stripQueryInText(next.message));
    if (next.data) {
      const data = scrubValue(next.data) as Record<string, unknown>;
      scrubUrlFields(data);
      next.data = data;
    }
    return next;
  } catch {
    return null;
  }
}

/** Remove `?query` from any URL-looking token in a message (e.g. "GET /a?b=1 200"). */
function stripQueryInText(text: string): string {
  const t = text.length > MAX_SCRUB_CHARS ? text.slice(0, MAX_SCRUB_CHARS) : text;
  return t.replace(/\?[^\s#]{0,500}/g, "");
}

/** Sentry `beforeSendTransaction`. Returns null (drops it) if scrubbing fails. */
export function scrubTransaction(event: TransactionEvent): TransactionEvent | null {
  try {
    scrubRequest(event);
    if (event.transaction) event.transaction = stripQuery(event.transaction);
    if (event.user) event.user = event.user.id ? { id: event.user.id } : undefined;
    for (const span of event.spans ?? []) {
      if (span.description) span.description = scrubString(stripQueryInText(span.description));
      if (span.data) {
        const data = span.data as Record<string, unknown>;
        scrubUrlFields(data);
        for (const [k, v] of Object.entries(data)) {
          if (typeof v === "string") data[k] = scrubString(v);
        }
      }
    }
    const traceData = event.contexts?.trace?.data as Record<string, unknown> | undefined;
    scrubUrlFields(traceData);
    return event;
  } catch {
    return null;
  }
}
