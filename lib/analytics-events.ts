import { track } from "./openhelm-analytics";

// Every custom event this product sends, and the params each one may carry. Keeping the
// map in one place means an event name or param cannot drift between the component that
// fires it and OpenHelm's journey definitions. Params are short codes and numbers only:
// never an email, name, ZIP or free text. Grannio has no accounts, so there is no
// `oh_user_ref` to attach; visitors stay anonymous.

export type LeadKind = "builder" | "financing";

export interface AnalyticsEventMap {
  /** First change to a calculator input on a page (not the URL restore). */
  calculator_used: { state: string; adu_type: string };
  /** First focus in the $49 report form. */
  report_form_started: Record<string, never>;
  /** Stripe returned a Checkout URL and the browser is about to go there. */
  begin_checkout: { currency: string; value: number };
  /** Checkout never started. `reason` is a short code, see `analyticsFailureReason`. */
  checkout_failed: { reason: string };
  /** Back from Stripe via the cancel URL. */
  checkout_cancelled: Record<string, never>;
  /** Stripe confirmed the session is paid (see lib/analytics-purchase.ts). */
  purchase: {
    transaction_id: string;
    currency: string;
    value: number;
    items: { item_id: string; item_name: string; price: number; quantity: number }[];
  };
  /** The success page could not confirm a payment. */
  purchase_confirmation_failed: { reason: string };
  /** First focus in a builder or financing lead form. */
  lead_form_started: { lead_kind: LeadKind };
  /** /api/lead accepted the submission. */
  lead_submitted: { lead_kind: LeadKind };
  lead_failed: { lead_kind: LeadKind; reason: string };
}

export type AnalyticsEventName = keyof AnalyticsEventMap;

/** Send a typed event. Returns whether it was recorded (false when GA is not configured). */
export function trackEvent<K extends AnalyticsEventName>(name: K, params: AnalyticsEventMap[K]): boolean {
  return track(name, params);
}

/** Short, low-cardinality code for a failure. Never the message text. */
export function analyticsFailureReason(status: number | null | undefined): string {
  if (status == null) return "network_error";
  return `http_${status}`;
}
