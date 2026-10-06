# Changelog

## 2026-10-06

- Refreshed the editorial collection’s rolling publication dates for the current seven-day window.

## 2026-09-30

- Refreshed the September collection’s publication dates into the active seven-day editorial window.

- Instrumented user journeys for OpenHelm. Refreshed `lib/openhelm-analytics*` from the shared service and added
  the events OpenHelm reads: `calculator_used`, `report_form_started`, `begin_checkout`, `checkout_failed`,
  `checkout_cancelled`, `purchase`, `purchase_confirmation_failed`, `lead_form_started`, `lead_submitted` and
  `lead_failed`. All go through the typed map in `lib/analytics-events.ts`; nothing is sent unless
  `NEXT_PUBLIC_GA_MEASUREMENT_ID` is set. Failure events carry a short code (`http_502`, `network_error`), never text.
- `purchase` is sent by the `/report/success` page only after the server confirms the Stripe Checkout Session is
  paid, one-off and for the $49 report. It fires once per session id per browser. Grannio has no accounts, so
  there is no `oh_user_ref` or `oh_plan`; visitors stay anonymous.
- Moved the report price constants to `lib/report-price.ts` (re-exported from `lib/stripe.ts`) so client code can
  read them without bundling Stripe.

## 2026-09-30: Hosting moved from Vercel to Helm7

- Runs on Helm7 (a Next.js image built from `master`, on the Falkenstein node) instead of
  Vercel. Same domains, same Supabase project; production variables were copied across
  unchanged. The bare domain 308-redirects to `www.grannio.com` at Helm7's ingress, so the
  Stripe webhook must stay registered on the `www` host.
- `npm start` honours `PORT` (`next start -p ${PORT:-3000}`), which Helm7 assigns.
- Removed the `deploy` script (Vercel CLI) and the `VERCEL_ENV` Sentry environment lookups
  (now `NODE_ENV`).
- `test/no-vercel.test.mts` keeps Vercel packages, scripts, headers and env checks out
  (part of `npm test`).

## 2026-09-25

- Added a publication-gated 15-post ADU editorial collection across cost, plans, permits,
  financing, California policy and prefab-versus-site-built decisions.
- Added official source listings, accessible on-page contents, category/date archive metadata and
  per-post Twitter card metadata to the typed blog path.
- Added content-contract coverage for keyword metadata, source quality, FAQs, word counts,
  publication dates and internal next-step links.

## 2026-09-21

- Made `https://www.grannio.com` the single source of truth for metadata, JSON-LD, robots and sitemap URLs.
- Stabilised sitemap modification dates and restricted sitemap inclusion to pages with verified, independent source material.
- Added source-backed Atlanta and Augusta ADU guidance; unsourced programmatic state and city routes now use `noindex` until researched.
- Fixed the standalone TypeScript test-check configuration and table-content narrowing.
