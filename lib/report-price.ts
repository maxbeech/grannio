// The $49 report's price. Kept apart from lib/stripe.ts (server-only, imports the Stripe
// SDK) so client components and analytics can read it without bundling Stripe.
export const REPORT_PRICE_CENTS = 4900;
export const REPORT_PRICE_CURRENCY = "usd";
