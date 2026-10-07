# Changelog

## 2026-10-07: Sentry scrubber security pass

- **Long secrets.** JWTs, bearer tokens, vendor keys (`sk_`, `whsec_`, `hlm_sk_`, `sntrys_`) and `key=value` secrets of any length are now redacted whole. The old bounded patterns left the tail of anything longer than their limit.
- **Truncation.** The 10k cut backs up to the previous delimiter, so half a secret can never survive at the boundary.
- **Encodings, URLs and key names.** URL queries and fragments (OAuth and magic-link tokens), percent-encoded emails, `Bearer%20...`, `token%3D...`, escaped JSON, `Authorization: Basic ...`, connection-string credentials and keys such as `passwd`, `pwd`, `jwt` and `Set-Cookie` are covered at any depth.
- **Fail closed, no bypass.** Events, transactions, breadcrumbs and logs are dropped if scrubbing throws. A second deep pass scrubs stack-frame vars, spans, contexts and tags, feedback events included (only the reporter's own `contexts.feedback` and user are kept).
- **Tests.** `test/scrub-hardening.test.mts` covers long JWTs, varied key lengths, secrets straddling the truncation boundary, hostile 20k strings, key variants and fail-closed behaviour.

## 2026-10-06

- Refreshed the editorial collection’s rolling publication dates for the current seven-day window.

## 2026-10-06: Sentry standard

- Errors, logs and user feedback now go to the `grannio_web` Sentry project. One shared options helper
  (`lib/sentry-options.ts`) drives the browser, server and edge inits; the old `sentry.*.config.ts` files are gone.
- Console output is forwarded as Sentry logs. A single scrubber (`lib/scrub.ts`) redacts emails, phone numbers,
  tokens, API keys and secret fields in events, logs, breadcrumbs and transactions. It is linear-time, truncates
  long strings, and drops the item rather than sending it raw if scrubbing fails. Query strings are stripped from URLs.
- Failures that used to be a `console.error` (lead capture, Stripe checkout and webhook, report success page) now
  raise a Sentry issue through `captureServerError`, with ids and codes only. Added `error.tsx` and `global-error.tsx`.
- A "Feedback" link in the header and a "Send feedback" link in the footer open Sentry's feedback form. Browser
  traffic goes through a randomised tunnel route so ad blockers do not drop it.

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
