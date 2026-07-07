import Stripe from "stripe";

// Server-only Stripe client. Never import this from a "use client" component.
let cached: Stripe | null = null;

export function getStripe(): Stripe {
  if (cached) return cached;
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) throw new Error("STRIPE_SECRET_KEY is not set.");
  cached = new Stripe(key);
  return cached;
}

export const REPORT_PRICE_CENTS = 4900;
export const REPORT_PRICE_CURRENCY = "usd";
