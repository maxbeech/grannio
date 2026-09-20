# Grannio — ADU Feasibility & Cost Calculator

Free accessory dwelling unit (ADU) feasibility checker and cost calculator. Pick your
state, ADU type and size to instantly see what your city's rules allow (size, setbacks,
parking, owner-occupancy) and what a backyard ADU will cost — built from regional
construction-cost indices and published statewide ADU statutes.

**Live:** https://www.grannio.com · **Canonical host:** `www.grannio.com`

## SEO strategy

The growth engine is programmatic SEO over an un-saturated long-tail:

- `/[state]` — ADU rules + cost for **all 50 states + DC** (e.g. `/california`)
- `/[state]/[city]` — city-level ADU pages, 240+ cities (e.g. `/california/los-angeles`)
- `/cost/[type]` — cost-by-type pages (detached, garage conversion, JADU, prefab, attached)
- `/blog/[slug]` — guides targeting researched low-competition keywords
  (`how much does an adu cost`, `garage to adu conversion cost`, `california adu rules`, …)
- `/methodology` — transparency/trust page on how every estimate is derived

All pages are statically generated with canonical URLs, JSON-LD (`Article`/`FAQPage` +
`BreadcrumbList`), a dynamic Open Graph image (`next/og`), `sitemap.xml` and `robots.txt`.
Page-template meta titles/descriptions live in `lib/seo.ts` (single source of truth) and
are length-guarded by tests for every route.

The sitemap deliberately includes only pages with enough independent, verified material for
search. State pages with a published statewide standard are eligible; city pages require a
record in `lib/city-guides.ts` with an official municipal source. Other calculator routes stay
available for visitors but use `noindex` until their local rules have been researched. This avoids
asking Google to index thin, scaled location variations.

## Calculator features

- Cost estimate by state × ADU type × size, with a **hard / soft / site cost breakdown**
- **Metro-level cost adjustment** on city pages (`cityCostMultiplier` in `lib/cost.ts`) so
  e.g. San Francisco reads higher than the California average — distinct, accurate city pages
- **Feasibility flags** (size, setbacks, parking, owner-occupancy, approval time, impact
  fees, and a **lot-coverage** check from the lot-size input) with statute citations
- **Rental income, ROI & financing** (`lib/income.ts`): monthly rent range, gross yield,
  simple payback, and an amortized **monthly loan payment** on the build cost
- **Shareable results** — the home calculator reads inputs from the URL query and reflects
  changes back (`?state=&type=&size=&lot=`), so an estimate is bookmarkable/shareable

## Monetisation

Built as a **lead marketplace**, not a consumer subscription — an ADU is a one-time,
high-ticket homeowner purchase, so recurring "Pro" access for homeowners has nothing to
renew against. Three lead types feed one backend:

1. **Builder lead-gen** (primary) — `components/BuilderLeadForm.tsx` on every city page
   (`/[state]/[city]`) and cost-type page (`/cost/[type]`), the highest-intent surfaces.
   `adu builder` / `adu contractors near me` carry $21–28 top-of-page CPC on Google Ads —
   captured here organically instead, for resale per-lead or rev-share to vetted builders.
2. **Financing lead-gen + affiliate** (secondary) — `components/FinancingSection.tsx` on
   the homepage and every state page: three verified, currently-live financing programmes
   (RenoFi, Fannie Mae HomeStyle Renovation, CalHFA ADU Grant) as informational links
   (config in `lib/financing-partners.ts` — swap in tracked affiliate URLs once a
   programme is signed, no other code changes needed), plus a financing lead form.
3. **Detailed feasibility report** — $49, positioned as a lead magnet: `ReportForm` on the
   homepage. Captures a report request lead through the same backend.
4. **Paid builder directory / white-label embed** — for builders/realtors (roadmap, not
   yet built): recurring revenue that sits on the B2B side instead of the homeowner side.

### Lead capture backend

All three forms POST JSON to `app/api/lead/route.ts` (a Vercel Function, Node.js runtime —
not cached, every request runs live). The route never fakes success:

- **Resend** sends a real notification email if `RESEND_API_KEY` is set (`RESEND_FROM_EMAIL`
  and `LEAD_NOTIFY_EMAIL` are optional overrides — see `.env.example`).
- **Supabase** additionally persists the lead as a row if `SUPABASE_URL` +
  `SUPABASE_SERVICE_ROLE_KEY` are set (schema: `leads` table — `kind`, `name`, `email`,
  `phone`, `zip`, `state_slug`, `city`, `adu_type`, `sqft`, `lot_sqft`,
  `financing_amount`, `timeline`, `notes`, `source_path`, `created_at`). **Not yet
  provisioned** — a new Supabase project/credentials are pending; once added as env vars,
  persistence turns on with no code changes.
- If **neither** is configured, the route returns an explicit `503` with a real error
  message — never a dummy "submitted!" state. Every form shows that error plus a working
  `mailto:` fallback so a lead is never silently dropped.
- A hidden honeypot field (`company`) silently no-ops bot submissions.

Pure validation/formatting logic (`validateLeadPayload`, `buildLeadNotificationText`,
`leadEmailSubject`) lives in `lib/lead.ts`, fully unit-tested alongside the original
`buildLeadMailto` fallback helpers.

## Vercel / free-tier strategy

Every route is prerendered at build and uses **ISR with a 1-week `revalidate`** (`604800`s,
set on each route segment). Pages are served from Vercel's **edge cache** (`x-vercel-cache:
PRERENDER`) as prerendered HTML with immutable static assets (`max-age=31536000, immutable`)
— minimal Fast Origin Transfer, near-zero origin compute. The long revalidation window means
each page regenerates at most once/week (negligible invocations) while staying fresh if the
underlying data changes and the app is redeployed. There are **no runtime external/API
calls** (the calculator is pure client-side math), so there are no API failure modes to
handle.

## Stack

Next.js 16 (App Router) · React 19 · Tailwind CSS 4 · deployed on Vercel. The calculator
is pure client-side math (`lib/cost.ts`, `lib/feasibility.ts`, `lib/states.ts`) — no DB
required for the free tier.

## Develop

```bash
npm install
cp .env.example .env.local   # fill in RESEND_API_KEY (+ SUPABASE_* once provisioned)
npm run dev      # http://localhost:3000
npm test         # cost + feasibility + data-integrity + lead-payload unit tests
npm run build    # static export of all programmatic pages
```

### Manual follow-ups still required

- **Supabase**: a new project/credentials are pending (the previous org hit its 2-project
  free-tier limit) — once given, set `SUPABASE_URL` + `SUPABASE_SERVICE_ROLE_KEY` in Vercel
  and lead persistence turns on automatically.
- **Resend**: no API key configured yet — sign up, verify a sending domain (or use the
  `onboarding@resend.dev` default for testing), and set `RESEND_API_KEY` in Vercel for lead
  notification emails to actually send.
- **GitHub/Vercel renames**: both already done via CLI (`gh repo rename`, `vercel project
  rename`) — nothing further needed there.

## Data & disclaimers

Cost figures are planning estimates from 2024–2025 ADU cost ranges scaled by a regional
cost index. Rule data reflects statewide ADU statutes (cited per state). Always confirm
with your city planning department and a licensed contractor before relying on any output.
