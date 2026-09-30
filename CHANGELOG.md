# Changelog

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

## 2026-09-21

- Made `https://www.grannio.com` the single source of truth for metadata, JSON-LD, robots and sitemap URLs.
- Stabilised sitemap modification dates and restricted sitemap inclusion to pages with verified, independent source material.
- Added source-backed Atlanta and Augusta ADU guidance; unsourced programmatic state and city routes now use `noindex` until researched.
- Fixed the standalone TypeScript test-check configuration and table-content narrowing.
