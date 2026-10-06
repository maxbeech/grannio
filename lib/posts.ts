// Blog posts powering the SEO content layer. Each post targets a researched,
// low-competition long-tail keyword in the ADU cluster. New posts are appended
// here (Stage 4 weekly content). Content is structured (no raw HTML) and rendered
// safely by the blog template.

export type Block =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "cta"; text: string; href: string }
  | { type: "table"; caption?: string; headers: string[]; rows: string[][] };

export type Source = {
  name: string;
  href: string;
  note: string;
};

export type Post = {
  slug: string;
  image: string;
  imageAlt: string;
  title: string;
  description: string;
  keyword: string;
  /** Editorial metadata used by the guide template and content QA. */
  category?: "Academy" | "News" | "Reviews";
  supportingKeywords?: string[];
  sources?: Source[];
  date: string; // YYYY-MM-DD
  readingMinutes: number;
  blocks: Block[];
  // Optional FAQ pairs — rendered as FAQPage JSON-LD in addition to the on-page copy.
  faq?: { q: string; a: string }[];
};

export const POSTS: Post[] = [
  {
    slug: "how-much-does-an-adu-cost",
    image: "/blog/how-much-does-an-adu-cost.jpg",
    imageAlt: "Small backyard cottage exterior representing an ADU",
    title: "How Much Does an ADU Cost in 2026? Real Numbers by Type and State",
    description:
      "What an ADU actually costs in 2026 — by construction type (detached, garage conversion, JADU, prefab) and by region, plus the hidden soft costs people forget.",
    keyword: "how much does an adu cost",
    date: "2026-06-14",
    readingMinutes: 7,
    blocks: [
      { type: "p", text: "An ADU is one of the largest discretionary purchases a homeowner ever makes, and the price range is famously wide — anywhere from $60,000 for a simple garage conversion to over $400,000 for a large detached unit in a high-cost market. The number you'll actually pay comes down to three things: the construction type, the size, and where you live." },
      { type: "h2", text: "The single biggest factor: construction type" },
      { type: "p", text: "Per square foot, the type of ADU you build matters more than almost anything else, because it determines how much new structure you're paying for." },
      { type: "ul", items: [
        "Junior ADU (JADU): $100–$180/sq ft. Carved out of your existing home (up to 500 sq ft), so you reuse the foundation, walls and roof.",
        "Garage conversion: $120–$220/sq ft. The shell already exists; you add insulation, plumbing, a kitchen and a bathroom.",
        "Prefab / modular: $180–$300/sq ft including delivery and site work. Factory-built and fast.",
        "Attached addition: $200–$330/sq ft. Shares a wall with the main house.",
        "Detached new build: $220–$360/sq ft. Everything is new — the most flexible and the most expensive.",
      ]},
      { type: "h2", text: "Then multiply by your region" },
      { type: "p", text: "Construction labor and materials cost far more in California, Hawaii, Massachusetts and New York than in Texas, Georgia or Tennessee. A detached ADU that runs $250/sq ft nationally can be $310+/sq ft in coastal California and under $230/sq ft in the South. Our calculator applies a regional cost index for every state so your estimate reflects local pricing." },
      { type: "h2", text: "Don't forget soft costs" },
      { type: "p", text: "Roughly 15–20% of a turnkey ADU budget is 'soft costs': architectural design, structural engineering, permit and plan-check fees, utility connections and impact fees. In California, ADUs under 750 sq ft are exempt from impact fees, which can save several thousand dollars — one reason many homeowners build just under that threshold." },
      { type: "cta", text: "Get your exact ADU cost estimate", href: "/" },
      { type: "p", text: "The fastest way to a realistic number is to run your own state, size and type through the free calculator. It returns a low–high range built from 2024–2025 ADU cost data and your state's regional index." },
    ],
  },
  {
    slug: "garage-to-adu-conversion-cost",
    image: "/blog/garage-to-adu-conversion-cost.jpg",
    imageAlt: "Garage exterior being converted into a living space",
    title: "Garage to ADU Conversion Cost: What You'll Actually Pay",
    description:
      "Converting a garage is the cheapest way to add an ADU. Here's what a garage-to-ADU conversion really costs in 2026, what drives the price up, and when it beats a detached build.",
    keyword: "garage to adu conversion cost",
    date: "2026-06-14",
    readingMinutes: 6,
    blocks: [
      { type: "p", text: "Converting an attached or detached garage into a living unit is the lowest-cost path to an ADU, typically $120–$220 per square foot versus $220–$360 for a detached new build. For a 400 sq ft conversion that's roughly $48,000–$88,000 before regional adjustments — and often less than half the cost of building from scratch." },
      { type: "h2", text: "Why conversions are cheaper" },
      { type: "p", text: "You're reusing the three most expensive parts of any structure: the foundation, the framed walls and the roof. The budget goes into making the space habitable rather than building a shell." },
      { type: "ul", items: [
        "Insulation and drywall for walls and ceiling",
        "A kitchenette or full kitchen and a bathroom (the costliest rooms)",
        "Electrical upgrades and a dedicated panel or subpanel",
        "Plumbing runs to the main line",
        "Egress windows, a proper entry door and HVAC (often a mini-split)",
        "Replacing the garage door with a framed, insulated wall",
      ]},
      { type: "h2", text: "What pushes the price up" },
      { type: "p", text: "Three things turn a cheap conversion into an expensive one: a slab that needs to be raised or re-poured for plumbing and moisture, electrical service that has to be upsized, and bringing an old structure up to current energy code. If your garage already has a sound slab and nearby utilities, you're on the low end of the range." },
      { type: "h2", text: "A bonus in California" },
      { type: "p", text: "Under California's statewide ADU law, a garage conversion requires no additional setback, and cities cannot require you to replace the parking you're removing. That removes two of the biggest obstacles homeowners hit elsewhere." },
      { type: "cta", text: "Estimate your garage conversion cost", href: "/cost/garage-conversion" },
    ],
  },
  {
    slug: "california-adu-rules-2026",
    image: "/blog/california-adu-rules-2026.jpg",
    imageAlt: "Modern house exterior in California",
    title: "California ADU Rules in 2026: Size, Setbacks & Parking",
    description:
      "A plain-English guide to California's statewide ADU law in 2026 — the 800 sq ft guarantee, 4 ft setbacks, the transit parking exemption and the 60-day approval rule.",
    keyword: "california adu rules",
    date: "2026-06-14",
    readingMinutes: 8,
    blocks: [
      { type: "p", text: "California has the most homeowner-friendly ADU law in the country, codified at Government Code §66314 and following. It preempts local bans, so even if your city's old zoning code says no, the state rules generally win. Here's what actually applies in 2026." },
      { type: "h2", text: "Size: the 800 sq ft guarantee" },
      { type: "p", text: "Your city must allow a detached ADU of at least 800 sq ft regardless of lot coverage, floor-area-ratio or other local limits. Most cities allow up to 1,200 sq ft. A junior ADU (JADU) is capped at 500 sq ft and must be inside the existing home." },
      { type: "h2", text: "Setbacks: 4 feet" },
      { type: "p", text: "The maximum side and rear setback a city can require is 4 feet. Converting an existing structure (like a garage) requires no additional setback at all, even if it sits on the property line." },
      { type: "h2", text: "Parking: often none" },
      { type: "p", text: "No replacement or additional parking can be required if the ADU is within half a mile walking distance of public transit, in a historic district, or part of the existing or proposed primary residence. In practice, a large share of California lots qualify for zero added parking." },
      { type: "h2", text: "Owner-occupancy: no longer required" },
      { type: "p", text: "Thanks to AB 976, the owner-occupancy requirement is permanently barred for ADUs. You can rent out both the main house and the ADU without living on the property — a major change for investors." },
      { type: "h2", text: "Approval: 60 days, ministerial" },
      { type: "p", text: "A complete ADU application must be approved or denied within 60 days, ministerially — meaning no public hearing and no discretionary design review. ADUs under 750 sq ft are also exempt from impact fees." },
      { type: "cta", text: "Check your California city's ADU rules", href: "/california" },
    ],
  },
  {
    slug: "adu-vs-jadu",
    image: "/blog/adu-vs-jadu.jpg",
    imageAlt: "Cozy tiny house interior",
    title: "ADU vs JADU: Which Backyard Unit Should You Build?",
    description:
      "ADU vs JADU explained — the size limits, cost difference, owner-occupancy rules and rental potential of a junior ADU versus a full accessory dwelling unit.",
    keyword: "adu vs jadu",
    date: "2026-06-14",
    readingMinutes: 5,
    blocks: [
      { type: "p", text: "A JADU (junior accessory dwelling unit) and an ADU sound similar but are legally different products. Choosing the right one can save you tens of thousands of dollars — or unlock far more rent." },
      { type: "h2", text: "What a JADU is" },
      { type: "p", text: "A JADU is up to 500 sq ft, must be created within the walls of an existing single-family home (often a converted bedroom), and can share a bathroom with the main house. It needs only an efficiency kitchen. Because you're not adding new structure, it's the cheapest unit you can build — frequently $40,000–$90,000." },
      { type: "h2", text: "What a full ADU is" },
      { type: "p", text: "A full ADU can be detached, attached or a garage conversion, up to 1,200 sq ft in many jurisdictions, with its own full kitchen and bathroom. It costs more but rents for more and adds more resale value." },
      { type: "h2", text: "The owner-occupancy catch" },
      { type: "p", text: "In most states you can rent out a full ADU without living on-site. A JADU almost always still requires the owner to occupy either the main home or the JADU — so if your goal is a pure rental or you don't live there, a full ADU is usually the better fit." },
      { type: "ul", items: [
        "Tightest budget, you live on-site: build a JADU.",
        "Want maximum rent or a pure rental: build a full ADU.",
        "Have an underused garage: a garage conversion splits the difference.",
      ]},
      { type: "cta", text: "Compare costs for each ADU type", href: "/" },
    ],
  },
  {
    slug: "how-to-finance-an-adu",
    image: "/blog/how-to-finance-an-adu.jpg",
    imageAlt: "Calculator and paperwork for financial planning",
    title: "How to Finance an ADU: 6 Ways to Pay for a Backyard Home",
    description:
      "Six ways to finance an ADU in 2026 — HELOC, cash-out refinance, renovation loans, construction loans, ADU-specific loans and contractor financing — with the pros and cons of each.",
    keyword: "how to finance an adu",
    date: "2026-06-14",
    readingMinutes: 7,
    blocks: [
      { type: "p", text: "An ADU typically costs more than most homeowners have in cash, so financing is part of nearly every project. The right option depends on how much equity you have and whether you want one loan or two." },
      { type: "h2", text: "1. Home equity line of credit (HELOC)" },
      { type: "p", text: "The most common choice. You borrow against your home's equity as you need it, paying interest only on what you draw. Flexible and relatively cheap, but the rate is usually variable." },
      { type: "h2", text: "2. Cash-out refinance" },
      { type: "p", text: "Replace your mortgage with a larger one and take the difference as cash. Makes sense if current rates are at or below your existing rate; less attractive if refinancing would raise your rate." },
      { type: "h2", text: "3. Renovation loan (FHA 203k / Fannie Mae HomeStyle)" },
      { type: "p", text: "These let you borrow against the home's projected value after the ADU is built, which helps if you don't yet have enough equity." },
      { type: "h2", text: "4. Construction loan" },
      { type: "p", text: "A short-term loan that funds the build in stages, then converts to or is replaced by a permanent mortgage. More paperwork, but designed for ground-up projects." },
      { type: "h2", text: "5. ADU-specific loans" },
      { type: "p", text: "A growing number of lenders and credit unions offer products that underwrite the future rental income of the ADU, letting you borrow more than your current equity alone would allow." },
      { type: "h2", text: "6. Builder or prefab financing" },
      { type: "p", text: "Many prefab ADU companies partner with lenders to bundle the unit and the loan. Convenient, but compare the rate against a HELOC before committing." },
      { type: "cta", text: "First, find out what your ADU will cost", href: "/" },
    ],
  },
  {
    slug: "prefab-adu-cost",
    image: "/blog/prefab-adu-cost.jpg",
    imageAlt: "Modular prefab home under construction",
    title: "Prefab ADU Cost: Is a Modular Backyard Home Actually Cheaper?",
    description:
      "What a prefab or modular ADU costs in 2026, how it compares to a site-built unit, and the site-work and delivery costs people forget to budget for.",
    keyword: "prefab adu cost",
    date: "2026-06-14",
    readingMinutes: 6,
    blocks: [
      { type: "p", text: "Prefab and modular ADUs promise a faster, more predictable build, and they often deliver — but 'the unit price' you see advertised is rarely the all-in cost. Expect $180–$300 per square foot turnkey once site work is included." },
      { type: "h2", text: "The price you see vs the price you pay" },
      { type: "p", text: "A prefab company might quote $120,000 for a 500 sq ft unit. That's the box. On top of it you'll pay for the foundation, delivery and craning the module into place, utility trenching and hookups, permits, and any grading. Those line items commonly add 30–50% to the advertised price." },
      { type: "h2", text: "Where prefab wins" },
      { type: "ul", items: [
        "Speed: factory and site work happen in parallel, so timelines are often half that of site-built.",
        "Price certainty: most of the cost is fixed before installation.",
        "Quality control: factory conditions reduce weather delays and rework.",
      ]},
      { type: "h2", text: "Where site-built wins" },
      { type: "p", text: "If your lot is hard to access (a crane can't reach the backyard), or you want a fully custom layout, site-built can end up cheaper and simpler. Tight urban lots are the classic case where prefab's delivery advantage disappears." },
      { type: "cta", text: "Estimate your prefab ADU cost by state", href: "/cost/prefab" },
    ],
  },
  {
    slug: "adu-permit-process",
    image: "/blog/adu-permit-process.jpg",
    imageAlt: "Architectural blueprints and plans on a desk",
    title: "The ADU Permit Process: A Step-by-Step Guide for 2026",
    description:
      "How the ADU permit process actually works in 2026 — from feasibility and design through plan check, approval and inspections — and how long each stage takes.",
    keyword: "adu permit process",
    date: "2026-06-14",
    readingMinutes: 7,
    blocks: [
      { type: "p", text: "The permit is where most ADU projects stall — not because the unit is unbuildable, but because owners don't know the sequence. Here's the path nearly every ADU follows, and where the time goes." },
      { type: "h2", text: "1. Feasibility (1–2 weeks)" },
      { type: "p", text: "Confirm your lot allows an ADU and what size and setbacks apply. In states with a statewide law this is usually a yes; elsewhere you check the local zoning code. This is the stage Grannio is built for." },
      { type: "h2", text: "2. Design and construction documents (4–10 weeks)" },
      { type: "p", text: "An architect or designer produces the drawings the city needs: site plan, floor plan, elevations, structural and Title 24/energy calcs. Prefab units shortcut much of this with pre-approved plans." },
      { type: "h2", text: "3. Plan check submission and review (4–12 weeks)" },
      { type: "p", text: "You submit to the building department. They review for code compliance and usually return comments ('corrections') you address before resubmitting. In California, ADU applications must be approved ministerially within 60 days of a complete submission — no public hearing." },
      { type: "h2", text: "4. Permit issuance and fees" },
      { type: "p", text: "Once approved, you pay permit and (if applicable) impact fees and pull the permit. California waives impact fees for ADUs under 750 sq ft." },
      { type: "h2", text: "5. Construction and inspections" },
      { type: "p", text: "The city inspects at key milestones — foundation, framing, rough electrical/plumbing, insulation and final. Passing the final inspection gives you a certificate of occupancy." },
      { type: "cta", text: "Start with a feasibility check", href: "/" },
    ],
  },
  {
    slug: "adu-rental-income-and-roi",
    image: "/blog/adu-rental-income-and-roi.jpg",
    imageAlt: "House for rent with key handoff",
    title: "ADU Rental Income & ROI: Do Backyard Units Actually Pay Off?",
    description:
      "How much rental income an ADU generates, how to estimate payback period and ROI, and the factors that make a backyard unit a strong or weak investment.",
    keyword: "adu rental income",
    date: "2026-06-14",
    readingMinutes: 6,
    blocks: [
      { type: "p", text: "For many homeowners the ADU math is simple: does the rent cover the loan? Often it does — but the answer depends on your build cost, local rents and how you finance it." },
      { type: "h2", text: "Estimating rental income" },
      { type: "p", text: "A detached ADU typically rents for 60–80% of a comparable standalone home in the same area because it's smaller and shares a lot. Check local listings for studios and one-bedrooms, then discount slightly. A unit renting at $1,800/month produces $21,600 a year before expenses." },
      { type: "h2", text: "The payback math" },
      { type: "p", text: "Divide your all-in build cost by annual net rent for a rough payback period. A $180,000 ADU netting $18,000/year pays back in about 10 years — and then becomes pure cash flow, on top of the resale value it added to your property." },
      { type: "h2", text: "What makes ROI strong" },
      { type: "ul", items: [
        "A cheaper build path (garage conversion or prefab) lowers the denominator.",
        "High local rents (coastal metros) raise the numerator.",
        "No owner-occupancy requirement, so you can rent both units.",
        "Financing at a rate below your expected rental yield.",
        "Short-term or mid-term rental in a tourist or travel-nurse market.",
      ]},
      { type: "h2", text: "What weakens it" },
      { type: "p", text: "Expensive custom detached builds in low-rent areas, high financing rates, and strict owner-occupancy or short-term-rental bans. Run your specific numbers before committing." },
      { type: "cta", text: "Estimate your ADU build cost first", href: "/" },
    ],
  },
  {
    slug: "how-long-to-build-an-adu",
    image: "/blog/how-long-to-build-an-adu.jpg",
    imageAlt: "House under construction with framing",
    title: "How Long Does It Take to Build an ADU?",
    description:
      "A realistic ADU timeline for 2026 — from feasibility and design through permitting and construction — and how prefab and garage conversions can cut months off the schedule.",
    keyword: "how long does it take to build an adu",
    date: "2026-06-14",
    readingMinutes: 5,
    blocks: [
      { type: "p", text: "Most ADUs take 8 to 14 months from first sketch to move-in. The build itself is rarely the bottleneck — design and permitting usually take as long as construction." },
      { type: "h2", text: "Typical timeline by stage" },
      { type: "ul", items: [
        "Feasibility: 1–2 weeks",
        "Design and construction documents: 1–3 months",
        "Permitting and plan check: 1–3 months (faster where state law mandates a 60-day ministerial review)",
        "Construction: 4–8 months for site-built; 2–4 months for prefab/modular",
      ]},
      { type: "h2", text: "The fastest paths" },
      { type: "p", text: "A garage conversion skips foundation and shell work, often finishing construction in 2–4 months. A prefab unit overlaps factory build with on-site foundation work, compressing the back half of the schedule. The slowest path is a fully custom detached build in a city with a slow permit office." },
      { type: "h2", text: "How to avoid delays" },
      { type: "p", text: "Submit a complete application the first time, use pre-approved or prefab plans where possible, and confirm feasibility before you pay for design. The most common delay is plan-check corrections caused by missing documents." },
      { type: "cta", text: "Check feasibility before you start", href: "/" },
    ],
  },
  {
    slug: "washington-adu-law-hb-1337",
    image: "/blog/washington-adu-law-hb-1337.jpg",
    imageAlt: "Craftsman-style house in a Seattle neighborhood",
    title: "Washington ADU Law (HB 1337): What Homeowners Need to Know",
    description:
      "Washington's HB 1337 (2023) requires cities to allow two ADUs per lot. Here's what the law guarantees on size, parking and owner-occupancy — and what it means for your build.",
    keyword: "washington adu law",
    date: "2026-06-14",
    readingMinutes: 6,
    blocks: [
      { type: "p", text: "Washington's HB 1337, passed in 2023 and codified at RCW 36.70A.681, is one of the most aggressive ADU laws in the country. If you live in an urban growth area, it dramatically expands what you can build." },
      { type: "h2", text: "Two ADUs per lot" },
      { type: "p", text: "Cities and counties planning under the Growth Management Act must allow at least two ADUs on most single-family lots — for example one detached unit plus one interior or attached unit." },
      { type: "h2", text: "Size: at least 1,000 sq ft" },
      { type: "p", text: "The law requires cities to allow ADUs of at least 1,000 sq ft, larger than many older local codes permitted." },
      { type: "h2", text: "No owner-occupancy, limited parking" },
      { type: "p", text: "Cities cannot require the owner to live on-site, and cannot require off-street parking for an ADU within half a mile of a major transit stop. Both rules remove obstacles that historically killed Washington ADU projects." },
      { type: "h2", text: "What it means for you" },
      { type: "p", text: "In Seattle, Tacoma, Spokane, Vancouver and other Washington cities, an ADU is now a by-right project on most single-family lots. Confirm your specific lot and any design standards with your city, then estimate your cost." },
      { type: "cta", text: "See Washington ADU costs", href: "/washington" },
    ],
  },
];

export function getPost(slug: string): Post | undefined {
  return POSTS.find((p) => p.slug === slug);
}

/** Up to `n` other posts to surface as "related reading" (internal linking). */
export function relatedPosts(slug: string, n = 3): Post[] {
  const idx = POSTS.findIndex((p) => p.slug === slug);
  if (idx === -1) return POSTS.slice(0, n);
  const rest: Post[] = [];
  for (let i = 1; i <= POSTS.length && rest.length < n; i++) {
    rest.push(POSTS[(idx + i) % POSTS.length]);
  }
  return rest;
}

// ──────────────────────────────────────────────────────────────────────────────
// Stage-4 weekly content — published 2026-06-14
// ──────────────────────────────────────────────────────────────────────────────

const WEEK2_POSTS: Post[] = [
  {
    slug: "washington-state-adu-rules",
    image: "/blog/washington-state-adu-rules.jpg",
    imageAlt: "Homes on a Pacific Northwest waterfront",
    title: "Washington State ADU Rules: What Homeowners Can Build in 2026",
    description: "Washington's 2023 ADU law (HB 1337) requires cities statewide to allow ADUs on single-family lots. Here's what the law mandates and what you can actually build.",
    keyword: "washington state adu rules",
    date: "2026-06-14",
    readingMinutes: 5,
    blocks: [
      { type: "p", text: "Washington state passed some of the most permissive ADU legislation in the country in 2023 (HB 1337). The law requires all cities in Washington to allow at least one ADU on any lot that permits a detached single-family home — and in most cases, two." },
      { type: "h2", text: "What the statewide law requires" },
      { type: "ul", items: [
        "Cities must allow at least one ADU (attached or detached) on every single-family lot.",
        "Maximum size: at least 1,000 sq ft for detached ADUs; cities may allow more.",
        "Setbacks: no local setback requirement can exceed 5 feet from the rear or side property line.",
        "Height: detached ADUs may be up to 24 feet or the height of the primary dwelling, whichever is greater.",
        "Cities may NOT require owner-occupancy of either the primary home or the ADU.",
        "Cities may NOT require additional off-street parking for an ADU.",
      ] },
      { type: "h2", text: "What cities can still restrict" },
      { type: "p", text: "Local governments retain authority over design standards, lot coverage limits, and utility connections. They can require ADUs to match the exterior character of the primary dwelling, and they can limit ADU size to no larger than the main house." },
      { type: "h2", text: "Key cities: Seattle, Spokane, Tacoma" },
      { type: "p", text: "Seattle already allowed ADUs before the state law and permits both a detached ADU and a DADU on a single lot. Spokane and Tacoma have updated their codes to comply with the state mandate. Check your specific city's zoning portal for local maximums beyond the state floor." },
      { type: "cta", text: "Check your Washington lot's ADU feasibility", href: "/washington" },
      { type: "p", text: "This article is informational only. Local ordinances and lot-specific conditions affect feasibility — always confirm with your city planning department." },
    ],
  },
  {
    slug: "oregon-adu-laws",
    image: "/blog/oregon-adu-laws.jpg",
    imageAlt: "Houses on a hillside in Oregon",
    title: "Oregon ADU Laws: Statewide Rules That Override Local Restrictions",
    description: "Oregon's SB 1051 (2017) and HB 2001 (2019) make it one of the most ADU-friendly states. Here's what you can build, how large it can be, and what cities can no longer restrict.",
    keyword: "oregon adu laws",
    date: "2026-06-14",
    readingMinutes: 5,
    blocks: [
      { type: "p", text: "Oregon's approach to ADUs is among the most progressive in the country. A series of state laws — beginning with SB 1051 (2017) and expanded by HB 2001 (2019) and SB 458 (2021) — opened up ADU development statewide by overriding restrictive local zoning rules." },
      { type: "h2", text: "What SB 1051 (2017) started" },
      { type: "p", text: "SB 1051 was Oregon's foundational ADU law: it required cities with populations over 2,500 to allow at least one accessory dwelling unit on each lot zoned for single-family homes (codified at ORS 197.312). HB 2001 (2019) then went further, requiring larger cities to allow duplexes and other middle housing in single-family zones." },
      { type: "h2", text: "What SB 458 (2021) added" },
      { type: "ul", items: [
        "Made it easier to split lots in urban areas to legally separate ADUs from the main house.",
        "Required that ADUs meeting state minimum standards be approved ministerially — no discretionary review.",
        "Reduced the ability of local governments to impose design requirements that increase cost without serving a legitimate planning goal.",
      ] },
      { type: "h2", text: "Size and setback standards" },
      { type: "p", text: "In Oregon cities subject to the state mandate, a detached ADU may be up to 900 sq ft on lots smaller than 2,500 sq ft, and up to 1,200 sq ft on larger lots. Setback requirements cannot exceed 4 feet from the rear or interior side yard. Maximum height of 25 feet is typical but varies by locality." },
      { type: "cta", text: "Check your Oregon ADU feasibility and cost estimate", href: "/oregon" },
      { type: "p", text: "Rules vary by city size and whether the city has adopted its own compliant code. Always verify with your local planning department." },
    ],
  },
  {
    slug: "texas-adu-regulations",
    image: "/blog/texas-adu-regulations.jpg",
    imageAlt: "Suburban house neighborhood in Texas",
    title: "ADU Regulations in Texas: A City-by-City Breakdown",
    description: "Texas has no statewide ADU legislation, so the rules depend entirely on your city. Here is the ADU landscape in Austin, Houston, Dallas, San Antonio and other Texas markets.",
    keyword: "texas adu regulations",
    date: "2026-06-14",
    readingMinutes: 5,
    blocks: [
      { type: "p", text: "Unlike California, Washington and Oregon, Texas has not passed statewide ADU preemption legislation. That means ADU feasibility in Texas is entirely a local question — your city's zoning code determines whether you can build one, how big it can be, and what it needs to look like." },
      { type: "h2", text: "Austin: the most ADU-friendly Texas market" },
      { type: "p", text: "Austin allows ADUs on most single-family lots under its HOME ordinance changes of 2023. A detached ADU ('secondary apartment') can be up to 1,100 sq ft, and owner-occupancy is no longer required. Austin also allows vertical mixed-use near transit." },
      { type: "h2", text: "Houston: no zoning, but deed restrictions apply" },
      { type: "p", text: "Houston is famously the only major US city without traditional zoning. In theory, you can build an ADU almost anywhere. In practice, deed restrictions in most established neighborhoods often restrict additional structures. Check the deed and any HOA rules before planning." },
      { type: "h2", text: "Dallas, San Antonio, Fort Worth" },
      { type: "ul", items: [
        "Dallas allows ADUs only in specific zoning categories; many single-family zones prohibit them outright.",
        "San Antonio permits ADUs in some residential zones but requires owner-occupancy of the main house.",
        "Fort Worth has been expanding ADU permissions, particularly for garage conversions, under recent code revisions.",
      ] },
      { type: "cta", text: "Check ADU feasibility for your Texas address", href: "/texas" },
      { type: "p", text: "Texas ADU rules are evolving rapidly. Confirm with your specific city's development services department before planning or investing." },
    ],
  },
  {
    slug: "adu-setback-requirements",
    image: "/blog/adu-setback-requirements.jpg",
    imageAlt: "Backyard fence marking a property line",
    title: "ADU Setback Requirements: How Close to the Property Line?",
    description: "ADU setbacks determine how close to the property line your unit can sit. California mandates a maximum 4-foot setback for most ADUs. Here is how other states and cities compare.",
    keyword: "adu setback requirements",
    date: "2026-06-14",
    readingMinutes: 4,
    blocks: [
      { type: "p", text: "Setbacks are the minimum distance your ADU must be from the property line. They directly affect whether a given lot has room for an ADU at all — especially on smaller infill lots." },
      { type: "h2", text: "California: 4-foot maximum setback" },
      { type: "p", text: "California Government Code 65852.2 caps rear and side setbacks at 4 feet for ADUs that meet state law standards. No city can require more than a 4-foot setback from the rear or side, though a larger street-facing setback may still apply. This is one of the most important ADU preemptions in the country." },
      { type: "h2", text: "Other states and typical setback rules" },
      { type: "ul", items: [
        "Washington: no more than 5 feet from rear or side (HB 1337).",
        "Oregon: no more than 4 feet for lots subject to the state mandate.",
        "Texas, Florida, other states: no statewide preemption — setbacks are whatever the local code says, often 5–10 feet.",
      ] },
      { type: "h2", text: "How setbacks affect lot coverage" },
      { type: "p", text: "Even if your jurisdiction allows a 4-foot setback, lot coverage limits (the maximum percentage of a lot that can be covered by structures) may independently constrain the ADU footprint. Check both the setback rule and the lot-coverage limit for your parcel." },
      { type: "cta", text: "Run your lot through the ADU feasibility calculator", href: "/" },
      { type: "p", text: "Setback rules vary by parcel, zoning district and whether your lot is in a fire hazard severity zone. Always verify with your local planning department." },
    ],
  },
  {
    slug: "adu-size-limits-by-state",
    image: "/blog/adu-size-limits-by-state.jpg",
    imageAlt: "Tape measure on an architectural blueprint",
    title: "ADU Size Limits by State: Maximum Square Footage Rules Explained",
    description: "State ADU laws set a floor for maximum allowed ADU size. California allows up to 1,200 sq ft; Oregon up to 900 sq ft on smaller lots. Here are the rules by state.",
    keyword: "adu size limits by state",
    date: "2026-06-14",
    readingMinutes: 5,
    blocks: [
      { type: "p", text: "How large an ADU can be depends on a two-layer rule system: the state sets a minimum floor (states must allow at least this large), and the local government can allow up to that floor or more — but cannot go below it. Here is where the major ADU states stand." },
      { type: "h2", text: "California: up to 1,200 sq ft" },
      { type: "p", text: "California Government Code 65852.2 requires local governments to allow detached ADUs of at least 800 sq ft regardless of lot size or floor area ratio limits. Most jurisdictions allow up to 1,200 sq ft for detached ADUs and 500 sq ft for JADUs. Some jurisdictions allow larger ADUs by local ordinance." },
      { type: "h2", text: "Washington: up to 1,000 sq ft minimum floor" },
      { type: "p", text: "HB 1337 (2023) requires Washington cities to allow ADUs of at least 1,000 sq ft or 50% of the primary dwelling's size, whichever is smaller. Cities may allow larger ADUs by local ordinance." },
      { type: "h2", text: "Oregon: 900 sq ft on smaller lots, 1,200 on larger" },
      { type: "ul", items: [
        "Lots under 2,500 sq ft: ADU may be up to 900 sq ft.",
        "Lots 2,500–5,000 sq ft: ADU may be up to 1,200 sq ft.",
        "Lots over 5,000 sq ft: ADU may be up to 1,200 sq ft or 50% of primary dwelling, whichever is less.",
      ] },
      { type: "h2", text: "States without statewide preemption" },
      { type: "p", text: "In states like Texas, Georgia and most of the Southeast, ADU size limits are entirely set by local zoning codes — no statewide floor exists. Size limits often range from 400 to 1,000 sq ft with wide variation by city and zoning district." },
      { type: "cta", text: "Get the size rules for your state and city instantly", href: "/" },
      { type: "p", text: "ADU laws are evolving rapidly. Always confirm current maximum sizes with your local planning department." },
    ],
  },
  {
    slug: "container-home-adu",
    image: "/blog/container-home-adu.jpg",
    imageAlt: "Shipping container converted into a home",
    title: "Container Home ADU: Is a Shipping Container ADU Cheaper or Legal?",
    description: "Shipping container ADUs look striking — but are they actually cheaper to build, and are they legal in your jurisdiction? An honest look at the trade-offs.",
    keyword: "container home adu",
    date: "2026-06-14",
    readingMinutes: 5,
    blocks: [
      { type: "p", text: "The idea of converting a 40-foot shipping container into a backyard ADU is appealing: industrial aesthetic, potentially lower cost, faster construction. The reality involves a few important trade-offs." },
      { type: "h2", text: "Are container ADUs actually cheaper?" },
      { type: "p", text: "A standard 40-foot high-cube shipping container (320 sq ft on one level) costs $3,000–$6,000 to acquire. However, the cost of converting it into habitable space — insulation, interior framing, plumbing, electrical, HVAC, doors, windows, and permits — brings the total to roughly $150–$250 per square foot. That is in line with a conventional detached ADU. The container itself is a small fraction of the overall budget." },
      { type: "h2", text: "The bigger challenge: permits and code compliance" },
      { type: "ul", items: [
        "Most jurisdictions require ADUs to be built to the International Residential Code (IRC). Container structures are not inherently IRC-compliant.",
        "Insulating a metal container requires either spray foam (air-sealing) or an interior framing system — both adding cost.",
        "Structural modifications for additional openings can compromise the container's integral strength.",
        "Some counties specifically exclude container structures from their ADU approval pathways.",
      ] },
      { type: "h2", text: "Where container ADUs work best" },
      { type: "p", text: "Container ADUs are most viable in rural areas with permissive building codes, or in jurisdictions that have adopted a specific container-building pathway. Urban areas with standard residential zoning tend to have more hurdles. Always check with your local building department before buying a container." },
      { type: "cta", text: "Check ADU feasibility for your address before committing", href: "/" },
      { type: "p", text: "Container ADU legality and cost vary significantly by jurisdiction and site conditions. Consult a licensed contractor and your local building department." },
    ],
  },
  {
    slug: "adu-building-codes",
    image: "/blog/adu-building-codes.jpg",
    imageAlt: "Construction worker reviewing blueprints on site",
    title: "ADU Building Codes: Key Requirements for Safety and Permitting",
    description: "ADUs must meet the same building codes as primary homes — electrical, plumbing, structural, fire and energy. Here are the key requirements to plan around.",
    keyword: "adu building codes",
    date: "2026-06-14",
    readingMinutes: 5,
    blocks: [
      { type: "p", text: "An ADU is a permanent dwelling, and it must meet the same building codes as any other residence. Understanding the key code requirements upfront helps you design a feasible project and budget realistically for compliance costs." },
      { type: "h2", text: "Structural and foundation requirements" },
      { type: "p", text: "A new detached ADU needs a proper foundation — typically a concrete slab-on-grade or a raised perimeter foundation. For garage conversions, the existing slab usually meets structural requirements, but a soils report may be required in seismic zones (California, Pacific Northwest) to confirm the existing slab is adequate." },
      { type: "h2", text: "Electrical, plumbing and HVAC" },
      { type: "ul", items: [
        "Electrical: separate meter panel; at minimum, a sub-panel from the main house panel. Service size depends on ADU size and appliances.",
        "Plumbing: separate water shut-off and individual drain connection to the city sewer (or septic). Most jurisdictions do not require a separate sewer lateral, but this varies.",
        "HVAC: a dedicated heating and cooling system — a shared system with the primary dwelling is typically not allowed for an independent ADU.",
      ] },
      { type: "h2", text: "Fire safety and egress" },
      { type: "p", text: "ADUs require smoke and carbon monoxide detectors in every bedroom and in the hallway adjacent to sleeping areas. Every bedroom must have an egress window meeting minimum opening dimensions. Sprinkler systems are typically not required in ADUs in most states — California specifically exempted ADUs from the sprinkler mandate in 2020." },
      { type: "h2", text: "Energy code compliance" },
      { type: "p", text: "California's Title 24 energy code applies to ADUs and requires specific insulation R-values, window U-factors, and in new construction, solar-ready wiring (and often solar panels). Other states follow IECC energy codes. Energy compliance documentation must be submitted with permit plans." },
      { type: "cta", text: "Check your ADU feasibility and get a cost estimate that includes code compliance", href: "/" },
      { type: "p", text: "Building codes vary by state and local jurisdiction. Always confirm current requirements with your local building department and a licensed contractor." },
    ],
  },
  {
    slug: "florida-adu-rules",
    image: "/blog/florida-adu-rules.jpg",
    imageAlt: "House with palm trees in Florida",
    title: "ADU Rules in Florida: What Homeowners Need to Know in 2026",
    description: "Florida has no statewide ADU mandate — rules are set by your city or county. Here's how Florida ADU zoning works and what to check before you build.",
    keyword: "florida adu rules",
    date: "2026-06-14",
    readingMinutes: 5,
    blocks: [
      { type: "p", text: "Unlike California or Washington, Florida has no statewide law requiring cities to allow accessory dwelling units. ADUs in Florida are governed entirely by local zoning, so whether you can build one — and how big — depends on your specific city or county." },
      { type: "h2", text: "Where Florida ADUs are allowed" },
      { type: "p", text: "Several Florida jurisdictions have adopted their own ADU ordinances, often to expand housing supply. Cities including Miami, Orlando, Tampa and St. Petersburg permit ADUs in some single-family zones, typically with size caps, setback rules and sometimes owner-occupancy requirements. Many other Florida cities still restrict or prohibit them." },
      { type: "h2", text: "What to confirm with your local planning department" },
      { type: "ul", items: [
        "Whether ADUs (detached, attached or garage conversion) are permitted in your zoning district at all.",
        "Maximum ADU size — local caps commonly run 600–1,000 sq ft.",
        "Setback, height and lot-size minimums, plus any owner-occupancy or short-term-rental restrictions.",
        "Parking requirements, which vary widely between Florida cities.",
      ] },
      { type: "h2", text: "Why it's worth checking first" },
      { type: "p", text: "Because Florida leaves ADU rules to local government, two neighboring cities can have completely different rules. Always confirm the current ordinance with your city or county before investing in design — then use the calculator below to estimate cost." },
      { type: "cta", text: "Check your Florida ADU feasibility instantly", href: "/florida" },
      { type: "p", text: "Florida ADU rules vary by jurisdiction and change over time. Confirm current requirements with your city or county planning department." },
    ],
  },
  {
    slug: "adu-parking-requirements",
    image: "/blog/adu-parking-requirements.jpg",
    imageAlt: "Cars parked in a residential driveway",
    title: "ADU Parking Requirements: Are You Required to Add a Parking Space?",
    description: "California dropped ADU parking requirements near transit, and many states followed. Here's how ADU parking rules work and how they affect your project's feasibility.",
    keyword: "adu parking requirements",
    date: "2026-06-14",
    readingMinutes: 4,
    blocks: [
      { type: "p", text: "One of the most common barriers to ADU feasibility used to be the requirement to add an off-street parking space for each new unit. State ADU laws have systematically dismantled these requirements in many markets — here is where things stand." },
      { type: "h2", text: "California: no parking required in most cases" },
      { type: "p", text: "California's ADU law eliminates parking requirements for ADUs in any of these situations: within half a mile of public transit, within an architecturally or historically significant district, part of a garage conversion, within one block of a car-share vehicle, or in a city that has no minimum parking for residential uses. In practice, most urban California ADUs have no parking requirement." },
      { type: "h2", text: "Washington: no local parking requirements allowed" },
      { type: "p", text: "HB 1337 (2023) prohibits Washington cities from requiring any additional off-street parking for an ADU, full stop. This is the most complete parking exemption of any state ADU law." },
      { type: "h2", text: "Other states: parking rules vary" },
      { type: "ul", items: [
        "Oregon: cities may not require more than one additional parking space per ADU, and none if within half a mile of transit.",
        "Texas, Florida and most other states: no statewide parking preemption — local rules apply, often requiring one space per ADU or per bedroom.",
      ] },
      { type: "h2", text: "Why parking requirements matter for feasibility" },
      { type: "p", text: "A parking requirement on a tight lot can make an ADU impossible — there simply may not be room to add a paved space and still fit the ADU structure within setbacks and lot coverage limits. Knowing your jurisdiction's parking rule is one of the first feasibility checks to make." },
      { type: "cta", text: "Check whether your lot needs ADU parking", href: "/" },
      { type: "p", text: "Parking rules change frequently. Always confirm with your local planning department." },
    ],
  },
  {
    slug: "adu-impact-fees",
    image: "/blog/adu-impact-fees.jpg",
    imageAlt: "Calculator and receipts for tracking fees",
    title: "ADU Impact Fees: What They Are and How to Reduce Them",
    description: "Impact fees are one-time charges on new construction. California exempts most ADUs under 750 sq ft. Here's how impact fees work for ADUs and how to reduce them.",
    keyword: "adu impact fees",
    date: "2026-06-14",
    readingMinutes: 5,
    blocks: [
      { type: "p", text: "Impact fees are one-time charges imposed at the time of building permit issuance to fund schools, parks, roads and water/sewer infrastructure that new development demands. They can add $5,000–$50,000+ to an ADU project depending on the jurisdiction." },
      { type: "h2", text: "California's impact fee exemption" },
      { type: "p", text: "California law (Government Code 65852.2(f)(3)) requires that cities and counties NOT impose impact fees on ADUs that are less than 750 square feet. ADUs over 750 sq ft may have impact fees, but they must be proportional to the ADU's size relative to the primary dwelling — not treated as a full new unit. This saves thousands of dollars on smaller ADUs." },
      { type: "h2", text: "Utility connection fees are separate" },
      { type: "p", text: "The impact fee exemption in California does NOT apply to utility connection fees — water, sewer and electrical connection fees may still apply. These can range from $2,000 to $20,000+ depending on whether a new service connection must be run from the street. If you are converting a garage with an existing utility connection, these fees are often minimal." },
      { type: "h2", text: "Other states: no universal exemption" },
      { type: "ul", items: [
        "Washington: no statewide impact fee exemption for ADUs; some cities have adopted local exemptions.",
        "Oregon: impact fees apply at local rates; some cities have reduced fees for ADUs to encourage construction.",
        "Florida, Texas and other states: impact fees for ADUs are set entirely by local government.",
      ] },
      { type: "cta", text: "Estimate your ADU cost including typical fees", href: "/" },
      { type: "p", text: "Impact fee amounts and exemptions change frequently. Confirm current fee schedules with your local building or planning department." },
    ],
  },
  {
    slug: "adu-for-aging-parents",
    image: "/blog/adu-for-aging-parents.jpg",
    imageAlt: "Multigenerational family spending time together at home",
    title: "Building an ADU for Aging Parents: The Complete Planning Guide",
    description: "An ADU lets aging parents live nearby while maintaining independence. This guide covers planning for accessibility, permitting, cost and financing a family ADU project.",
    keyword: "adu for aging parents",
    date: "2026-06-14",
    readingMinutes: 6,
    blocks: [
      { type: "p", text: "One of the most personal and financially meaningful reasons to build an ADU is to provide nearby, independent housing for aging parents. A well-planned in-law suite or detached backyard cottage can dramatically improve quality of life for the whole family." },
      { type: "h2", text: "Accessibility design features to build in from the start" },
      { type: "ul", items: [
        "Single-story layout — no stairs to climb.",
        "No-threshold shower with fold-down bench and grab bars.",
        "Wider doorways (36 inches) to accommodate a walker or wheelchair.",
        "Lever-style door handles and single-lever faucets.",
        "Lower countertop height in at least one work zone.",
        "Blocking in bathroom walls during construction for future grab bar installation.",
      ] },
      { type: "h2", text: "Permitting considerations for family ADUs" },
      { type: "p", text: "Most jurisdictions do not have a separate 'family ADU' permit category — an ADU for parents goes through the same standard permitting process as a rental unit. California's 'Junior ADU' (JADU) pathway, which allows a unit within the existing footprint of the house, may be faster and cheaper than a detached build if your home has a first-floor bedroom suite." },
      { type: "h2", text: "Financing options for family ADUs" },
      { type: "p", text: "Because the ADU will be occupied by a family member rather than a paying tenant, traditional investment property financing does not apply. Most homeowners use a home equity line of credit (HELOC) or a cash-out refinance to fund a family ADU build. Several states (California, Oregon, Washington) have ADU-specific loan programs through state housing agencies." },
      { type: "h2", text: "The financial case even without rental income" },
      { type: "p", text: "A family ADU avoids assisted living costs that can run $4,000–$8,000/month. Even at a $200,000 construction cost, the ADU pays for itself in 2–4 years compared to assisted living — and you retain the asset." },
      { type: "cta", text: "Estimate the cost to build an ADU for your parents", href: "/" },
      { type: "p", text: "ADU regulations and financing options vary by state and city. Always consult local planning and a financial advisor before committing to a project." },
    ],
  },
  {
    slug: "adu-zoning-laws",
    image: "/blog/adu-zoning-laws.jpg",
    imageAlt: "Aerial view of a suburban neighborhood",
    title: "ADU Zoning Laws: How Zoning Affects What You Can Build on Your Lot",
    description: "ADU zoning rules control where, how large and how dense ADUs can be on a given parcel. Understanding your zoning designation is the first step in any ADU project.",
    keyword: "adu zoning laws",
    date: "2026-06-14",
    readingMinutes: 5,
    blocks: [
      { type: "p", text: "Zoning is the foundational rule set for any ADU project. Before you hire a designer, spend $50,000 on a prefab unit, or even begin planning, you need to know what your zoning designation allows." },
      { type: "h2", text: "Single-family vs multi-family zoning" },
      { type: "p", text: "ADUs are primarily a single-family zone issue. Most state ADU laws apply specifically to lots zoned for single-family residential use (R-1, SR, or similar designations). Multi-family zoned lots typically allow ADUs more freely, but may have different rules under the zoning code." },
      { type: "h2", text: "How to find your zoning designation" },
      { type: "ul", items: [
        "Look up your county assessor's parcel data — zoning is usually listed.",
        "Use your city's online GIS zoning map — most major cities have one.",
        "Call or email your city's planning department if you cannot find it online.",
      ] },
      { type: "h2", text: "Overlay districts can add restrictions" },
      { type: "p", text: "Historic preservation overlay districts, flood zone overlays, hillside development overlays, and fire hazard severity zones can impose additional restrictions on top of the base zoning. A lot in a historic district may require design review for any ADU, and a lot in a high fire hazard severity zone (HFHSZ) in California must use fire-resistant materials and has additional setback requirements." },
      { type: "h2", text: "When state law overrides local zoning" },
      { type: "p", text: "In states like California, Washington and Oregon, statewide ADU laws override local zoning restrictions that are more restrictive than the state floor. If your city's zoning requires a 10-foot setback but state law caps setbacks at 4 feet, state law wins. In states without a statewide ADU law (such as Texas and Florida), local zoning fully governs. Understanding the interaction between state law and local zoning is key to knowing what you can actually build." },
      { type: "cta", text: "Check your ADU feasibility under state and local rules", href: "/" },
      { type: "p", text: "Zoning and state ADU laws change frequently. Always verify with your local planning department before finalizing any design or purchasing any materials." },
    ],
  },
];

// Merge the week-2 posts into the main export
POSTS.push(...WEEK2_POSTS);

// ──────────────────────────────────────────────────────────────────────────────
// Authority pillar: the canonical "what is an ADU" definition page
// ──────────────────────────────────────────────────────────────────────────────

POSTS.push({
  slug: "what-is-an-adu",
  image: "/blog/what-is-an-adu.jpg",
  imageAlt: "Small detached backyard cottage with a covered porch, an example of an ADU",
  title: "What Is an ADU? Accessory Dwelling Units Explained",
  description:
    "What is an ADU? A plain-English guide to accessory dwelling units: the types, the size limits, how they differ from a JADU, and what one actually costs.",
  keyword: "what is an adu",
  date: "2026-09-10",
  readingMinutes: 8,
  blocks: [
    { type: "p", text: "An ADU (accessory dwelling unit) is a second, complete home built on the same lot as an existing house. It has its own kitchen, its own bathroom and its own entrance, so someone can live in it fully independently from the main house. You'll also hear it called a granny flat, a casita, a backyard cottage or a mother-in-law suite: different names for the same thing." },
    { type: "h2", text: "The short definition" },
    { type: "p", text: "Strip away the regional slang and an ADU comes down to three requirements. It sits on a residential lot that already has a primary home. It's smaller than that primary home. And it's self-contained, meaning a person could move in and never need to set foot in the main house to cook, sleep or shower." },
    { type: "p", text: "That third point is what separates an ADU from a shed, a home office or a simple room addition. A backyard studio with no kitchen isn't an ADU under most state laws; it's an accessory structure. Add a stove, a sink and a bathroom, and it crosses the line into a real second dwelling." },
    { type: "h2", text: "What an ADU is not" },
    { type: "p", text: "People often lump ADUs in with tiny homes, RVs and park models, but the categories don't overlap much. A tiny home on wheels is personal property, not real estate, and most cities won't count it toward your ADU allowance. An RV parked in the driveway isn't a dwelling unit under any building code, however long someone sleeps in it. A pool house or workshop without plumbing for a kitchen is an accessory structure, not an ADU, until you add that plumbing and a permit to match. The line is always the same: permanent foundation, full kitchen, full bathroom, and a building permit that says so." },
    { type: "h2", text: "Casita, granny flat, in-law suite: same thing, different accent" },
    { type: "p", text: "Where you live changes what people call it, not what it is. In California and much of the Southwest, casita is common. In the Northeast and Midwest, you'll hear granny flat, mother-in-law suite or in-law apartment. Builders and planning departments almost always default to the formal term, ADU, because that's what shows up in the zoning code and the permit application." },
    { type: "h2", text: "The four ways an ADU gets built" },
    { type: "p", text: "Every ADU falls into one of four construction types, and the type you choose changes both the cost and the rules that apply to you." },
    { type: "table", caption: "The four ADU types compared", headers: ["Type", "Typical size cap", "What it is", "Owner-occupancy required?"], rows: [
      ["Detached ADU", "800–1,200 sq ft", "A freestanding structure built new in the yard", "No, in most states"],
      ["Attached ADU", "800–1,200 sq ft", "An addition built onto the existing house", "No, in most states"],
      ["Garage conversion", "Existing garage footprint", "The garage shell converted into living space", "No, in most states"],
      ["Junior ADU (JADU)", "500 sq ft", "Carved out of the existing home's interior", "Usually yes"],
    ] },
    { type: "p", text: "A detached ADU is the most flexible and usually the most expensive, because you're building an entire new structure from the foundation up. A garage conversion reuses a shell that already exists, which is why it's typically the cheapest full-size option. An attached ADU splits the difference, sharing at least one wall with the main house." },
    { type: "h2", text: "ADU vs JADU: the one rule that trips people up" },
    { type: "p", text: "A junior ADU, or JADU, looks like a smaller sibling of the ADU but plays by different rules. It's capped at 500 sq ft, has to be built inside the existing footprint of the home rather than as new construction, and can share a bathroom with the main house. The catch is owner-occupancy: most states that allow JADUs require the property owner to live in either the main home or the JADU itself. A standard ADU usually carries no such requirement, which is why it's the better choice if your plan is a pure rental." },
    { type: "cta", text: "Compare ADU vs JADU size, cost and rental rules in detail", href: "/blog/adu-vs-jadu" },
    { type: "h2", text: "What an ADU actually costs" },
    { type: "p", text: "Cost swings enormously by type and region, but as a rule of thumb a garage conversion runs roughly $120–$220 per square foot, while a ground-up detached ADU runs $220–$360 per square foot before land or permit costs. A 600 sq ft detached unit can land anywhere from $130,000 to well over $250,000 depending on your state's construction-labor market." },
    { type: "cta", text: "Read the full ADU cost breakdown by construction type", href: "/blog/how-much-does-an-adu-cost" },
    { type: "h2", text: "Can you actually build one on your property?" },
    { type: "p", text: "In more than 30 states, ADUs are now covered by some form of statewide enabling law, which means your city generally can't ban them outright on a single-family lot. California, Washington and Oregon go furthest, capping setbacks, waiving parking requirements near transit and forcing fast permit turnarounds. In states without a statewide law, the answer depends entirely on your local zoning code, and it's worth checking before you spend money on plans." },
    { type: "cta", text: "Check your state's specific ADU rules and size limits", href: "/states" },
    { type: "h2", text: "The process, in five stages" },
    { type: "p", text: "Every ADU project moves through roughly the same sequence, whatever state you're in. First comes feasibility: confirming your lot, zoning and setbacks actually allow a unit before you spend a dollar on design. Then design, where a designer or architect draws plans that meet both the building code and your local ADU ordinance. Third is permitting, where the city plan-checks those drawings and issues a building permit, a process California law now caps at 60 days for a compliant ADU. Fourth is construction itself, which typically runs four to eight months for a detached unit and considerably less for a garage conversion. Last is final inspection and occupancy, after which the unit is legally habitable and can be rented, sold with the property or occupied by family." },
    { type: "h2", text: "Why ADUs are having a moment right now" },
    { type: "p", text: "This isn't a niche trend anymore. A permit-data analysis published by Shovels.ai in October 2025 found more than 2.8 million ADU permits issued nationwide since tracking began, with California and Florida together accounting for roughly half of all activity since 2018. California alone has gone from ADUs making up about 5% of new homes completed in 2018 to over 20% by 2023, according to state housing data, driven almost entirely by the law changes described above." },
    { type: "p", text: "Two forces are pushing that growth. Homeowners are using ADUs to house aging parents or adult children without giving up privacy, a trend housing researchers tie to the rise in multigenerational households. And with rents climbing faster than incomes in most metro areas, a backyard unit that can bring in $1,500 to $2,500 a month has become one of the few home improvements that pays for itself." },
    { type: "p", text: "“You're building a home despite the fact that it's small,” says Andrei Pogany, principal of Pogany Architecture, describing why ADU projects carry the same design and code complexity as a full house even at a fraction of the size. Electrical, plumbing, egress and insulation all still apply. There's no shortcut just because the footprint is smaller." },
    { type: "h2", text: "Frequently asked questions" },
    { type: "h2", text: "Is a granny flat the same as an ADU?" },
    { type: "p", text: "Yes. Granny flat, casita, in-law suite and ADU all describe the same self-contained second home on a residential lot. ADU is simply the term used in building codes and zoning law." },
    { type: "h2", text: "How big can an ADU be?" },
    { type: "p", text: "Most states cap a full ADU between 800 and 1,200 sq ft, though a handful allow more. A junior ADU is capped much lower, usually at 500 sq ft, because it has to fit inside the existing home." },
    { type: "h2", text: "Do I need a permit to build an ADU?" },
    { type: "p", text: "Yes, in every state. An ADU requires the same building, electrical and plumbing permits as any habitable structure. Building one without permits creates resale and insurance problems down the line, even if it initially goes unnoticed." },
    { type: "h2", text: "Can I rent out my ADU?" },
    { type: "p", text: "In most states, yes, without living on the property yourself. The main exception is a junior ADU, where owner-occupancy of either unit is typically required." },
    { type: "h2", text: "Does building an ADU increase my property taxes?" },
    { type: "p", text: "Usually, yes, because the new structure gets assessed separately in most states, adding to your property's taxable value. The exact increase depends on your local assessor and the size and finish level of the unit." },
    { type: "cta", text: "Get your free ADU cost and feasibility estimate", href: "/" },
    { type: "p", text: "Rules, size caps and permit processes vary by city and state and change often. Confirm the current requirements with your local planning department before finalizing any ADU design." },
  ],
  faq: [
    { q: "Is a granny flat the same as an ADU?", a: "Yes. Granny flat, casita, in-law suite and ADU all describe the same self-contained second home on a residential lot. ADU is simply the term used in building codes and zoning law." },
    { q: "How big can an ADU be?", a: "Most states cap a full ADU between 800 and 1,200 sq ft, though a handful allow more. A junior ADU is capped much lower, usually at 500 sq ft, because it has to fit inside the existing home." },
    { q: "Do I need a permit to build an ADU?", a: "Yes, in every state. An ADU requires the same building, electrical and plumbing permits as any habitable structure. Building one without permits creates resale and insurance problems down the line." },
    { q: "Can I rent out my ADU?", a: "In most states, yes, without living on the property yourself. The main exception is a junior ADU, where owner-occupancy of either unit is typically required." },
    { q: "Does building an ADU increase my property taxes?", a: "Usually, yes, because the new structure gets assessed separately in most states, adding to your property's taxable value. The exact increase depends on your local assessor and the size and finish level of the unit." },
  ],
});

// ──────────────────────────────────────────────────────────────────────────────
// Editorial collection. These guides deliberately cover the gaps in the
// content matrix rather than rewording the existing state-rule articles. Each
// piece has a compact decision table, a worked planning example and a source list
// that is rendered on the public page.
// ──────────────────────────────────────────────────────────────────────────────

type EditorialSeed = Omit<Post, "blocks" | "faq"> & {
  opening: string;
  answer: string;
  table: Omit<Extract<Block, { type: "table" }>, "type">;
  sections: { heading: string; text: string; points?: string[] }[];
  example: string;
  nextSteps: string;
  cta: Extract<Block, { type: "cta" }>;
  faq: { q: string; a: string }[];
};

/**
 * Adds the practical detail a search result cannot supply on its own.  The
 * guidance varies by decision type, rather than using a single boilerplate
 * section across the collection.  It deliberately avoids price promises and
 * jurisdiction-specific claims that cannot be proved for an individual lot.
 */
function editorialDepth(seed: EditorialSeed): Block[] {
  const lowerKeyword = seed.keyword.toLowerCase();
  const isFinance = /loan|rate|roi|fannie/.test(lowerKeyword);
  const isRules = /requirement|permit|setback|law/.test(lowerKeyword);
  const isDesign = /plan|floor|design|mother/.test(lowerKeyword);
  const isComparison = /prefab/.test(lowerKeyword);

  if (isFinance) return [
    { type: "h2", text: "Stress-test the funding plan before applying" },
    { type: "p", text: "A funding route is useful only when its timing matches the construction contract. Ask when deposits, permit invoices, foundation work and later draws fall due, then lay those dates beside the lender’s approval and draw process. A headline rate says very little if funds cannot be released when a contractor is waiting. Keep the construction budget, contingency and household emergency savings as separate lines. Blending them makes an apparently affordable project look safer than it is." },
    { type: "p", text: "The Consumer Financial Protection Bureau describes a HELOC as an open-end line of credit secured by home equity. That flexibility can suit staged work, but it does not make the payment fixed or the credit line permanent. Construction loans, renovation loans and cash-out refinances each have different closing costs, repayment patterns and appraisal assumptions. A lender and a qualified adviser should assess the actual borrower, property and product; this guide can only help you prepare better questions." },
    { type: "h2", text: "Build a lender-ready evidence pack" },
    { type: "ul", items: ["A permit-ready or clearly labelled preliminary scope, with allowances called out rather than hidden in a lump sum.", "The latest mortgage statement, estimated household income and a conservative monthly payment comparison.", "Written clarification of how the lender treats an ADU, its appraisal and any proposed rental income.", "A contingency that remains available after deposits and early site work, not a wish that everything goes to plan."] },
    { type: "p", text: "For an income case, use three scenarios: vacant for longer than expected, a realistic operating-cost allowance and a project that costs more than the first quote. If the plan still works, the decision has some resilience. If it works only at the most optimistic rent, value and interest-rate assumptions, pause. A financial model is most useful when it exposes a fragile plan before the household has committed its home as security." },
    { type: "h2", text: "The question to settle with every provider" },
    { type: "p", text: "Ask who owns the gap between construction completion and final lending conditions. For example, a lender may need an appraisal, certificate of occupancy or lease documentation that arrives later than a contractor’s final payment request. Put those milestones in one calendar. It is an unglamorous bit of project administration, but it stops the finance plan and the building plan from becoming two incompatible stories." },
  ];

  if (isRules) return [
    { type: "h2", text: "Turn the rule into a parcel question" },
    { type: "p", text: "A rule only becomes useful when it is tested against the actual lot. Start with a simple site file: the address, a recent survey if one exists, photos of boundaries and access, known easements, utility locations, the primary dwelling footprint and the intended ADU footprint. That file is more valuable than a folder of search results because it lets a planning professional answer a specific question. It also shows which facts are confirmed and which still need a survey, utility mark-out or plan check." },
    { type: "p", text: "Keep the source hierarchy clear. State material can set the framework; the local planning and building department applies it to an application; adopted codes and the project drawings deal with construction detail. Do not treat a blog, a sales brochure or a neighbour’s approval as a substitute for any of those. A useful written response from the jurisdiction should name the address or project type, the rule being applied and any condition that changes the answer." },
    { type: "h2", text: "Create a permit decision log" },
    { type: "ul", items: ["Record the official link, the date checked and the staff member or department that gave any project-specific answer.", "Separate zoning and land-use questions from building, fire, utility and public-works requirements.", "Label every item as confirmed, assumed, awaiting consultant input or awaiting the authority having jurisdiction.", "Update the log when the plan changes; a moved wall, new driveway or different utility route can revive an earlier issue."] },
    { type: "p", text: "This approach is calmer than trying to win an argument with a single sentence from a handbook. It gives the design team a shared list of constraints and allows the owner to see whether a ‘quick’ change creates a genuine risk. It also makes the eventual application easier to review because the documents tell one consistent story about access, services, setbacks and intended use." },
    { type: "h2", text: "Avoid the false certainty of a generic checklist" },
    { type: "p", text: "Checklists are excellent prompts, not approvals. A list can remind you to ask about parking, height, sewer capacity or fire access, but it cannot see the recorded easement behind a particular home or a city’s latest form. Use this guide to organise the work, then rely on the relevant local authority and licensed professionals for the final project decision." },
  ];

  if (isDesign) return [
    { type: "h2", text: "Test the plan with an ordinary day, not a perfect render" },
    { type: "p", text: "Take the plan through breakfast, laundry, a rainy arrival, a guest staying over, a late-night bathroom visit and a hot afternoon. Where does a coat go? Can two people pass in the kitchen? Is there a place for a vacuum, linen and a drying rack? Small homes succeed when these unremarkable moments have somewhere to happen. A drawing can look spacious because furniture is absent; a scaled furniture plan is a far better test of whether a room will feel generous once lived in." },
    { type: "p", text: "Coordinate the invisible parts early. The cleanest floor plan can be undermined by a noisy heat-pump unit outside the bedroom, a water heater that steals the only cupboard or an extractor duct that clashes with a beam. Ask the designer to show service space, maintenance access, window operation and likely furniture on the same revision. That conversation costs little before permit drawings and considerably more after framing." },
    { type: "h2", text: "Make the next ten years part of the brief" },
    { type: "ul", items: ["Choose a direct, well-lit entry and a clear route from parking or the main house.", "Keep storage near the activity it supports instead of treating it as leftover space.", "Use daylight and opening windows for comfort, while checking privacy, shading and neighbour views.", "Where practical, allow a room or bathroom detail to adapt as a resident’s mobility or household needs change."] },
    { type: "p", text: "The Department of Energy’s home-performance guidance treats the enclosure, ventilation, heating, cooling and hot water as one system. That is a useful design discipline for an ADU. Good insulation, air sealing and ventilation are not separate ‘green extras’; they affect noise, drafts, moisture and the size of the equipment the resident hears every day. Spend the time to coordinate them with the layout rather than bolting them on at the end." },
    { type: "h2", text: "Use a short design brief to protect the budget" },
    { type: "p", text: "Before choosing finishes, write down the resident, the three daily routines the home must support, the three site constraints and the three non-negotiable performance goals. Give that brief to every designer and builder. It makes comparison possible and reduces expensive scope drift caused by changing the project’s purpose halfway through design." },
  ];

  if (isComparison) return [
    { type: "h2", text: "Run a site-fit test before comparing the brochures" },
    { type: "p", text: "Ask both construction routes to respond to the same one-page site brief: access width and turns, overhead wires, slopes, trees, existing services, intended foundation location and local approval status. A factory model may be an excellent product and still be wrong for a lot that cannot receive it without unusual lifting or removals. Equally, a clear route and a standard model can make factory production a sensible way to reduce on-site disruption. The lot, not the marketing, decides first." },
    { type: "p", text: "Then map the hand-offs. A prefab proposal can involve manufacturer, transporter, installer, foundation contractor, utility contractor and local trades. A site-built project can have a general contractor and several specialist trades. Neither arrangement is inherently risky, but every boundary needs an owner. The contract should say who checks dimensions, who signs off the foundation before delivery, who protects the unit after placement and who resolves a mismatch between drawings and installed work." },
    { type: "h2", text: "Compare a complete-project price sheet" },
    { type: "ul", items: ["Design, engineering, surveys, permits and local authority fees.", "Foundation, grading, drainage, utility extensions and restoration of disturbed areas.", "Factory price or site construction, plus transport, cranes, installation and inspections where relevant.", "Appliances, exterior works, contingencies, warranties and the cost of schedule delay."] },
    { type: "p", text: "Fannie Mae recognises site-built and factory-built ADU construction methods in its property guidance, while imposing product-specific conditions for lending. That is a useful reminder that a construction label does not settle the finance, appraisal or permitting questions. Give any lender the actual proposed method and legal property arrangement rather than assuming all ‘prefab’ homes are treated alike." },
    { type: "h2", text: "Choose the option with fewer unresolved assumptions" },
    { type: "p", text: "The best option is often the one whose weak points you can name and price. If delivery access is still uncertain, pay for that assessment before reserving a factory slot. If the site-built proposal has a provisional sewer allowance, investigate the route before treating the quote as fixed. A transparent risk is manageable; an unspoken one is what turns a tidy comparison into a costly surprise." },
  ];

  if (seed.category === "News") return [
    { type: "h2", text: "Read the update as a working document" },
    { type: "p", text: "A change to state guidance matters only when the project team is working from the same current version. Save the handbook or official page in the project folder, note its publication date and identify any addendum or effective date. Then check whether the local agency has updated its application form, fee schedule or public checklist. That small bit of version control prevents a surprising amount of confusion when an article, a designer and a counter clerk are all referring to different editions." },
    { type: "p", text: "The safest interpretation is practical rather than dramatic. Identify the specific issue you need to resolve—such as an attached conversion, a JADU, an objective standard or a fee question—then read the official source around that issue. If it affects a live project, ask the planning department how it will apply to the submitted plan. Written confirmation does not replace legal advice, but it creates a useful factual record for the owner and consultants." },
    { type: "h2", text: "A simple update checklist" },
    { type: "ul", items: ["Confirm the official source, its publication date and any stated effective date.", "Compare the new material with the current local application checklist rather than an older blog post.", "Mark any live design, funding or construction decision that relies on the changed point.", "Ask a precise parcel- and project-specific question where the published material does not settle the issue."] },
    { type: "p", text: "The California HCD handbook says it is updated to help local governments, homeowners, architects and the public understand and apply state requirements. That is a helpful role, but it is not a permit approval for a particular backyard. Keep a healthy distinction between learning the statewide rule and proving that a particular plan can be built on a particular site." },
    { type: "h2", text: "What this update should change today" },
    { type: "p", text: "It should change your source material, your questions and perhaps the assumptions on a live feasibility study. It should not be used to promise an approval date, a universal cost saving or a result before the project is reviewed. Owners who keep the source trail and test it against their city’s process are far better placed than those who rely on a headline alone." },
  ];

  return [
    { type: "h2", text: "Set the budget boundary before looking at rates" },
    { type: "p", text: "A useful ADU budget is a sequence of decisions, not one optimistic total. Begin with the intended size and construction route, then separate building work from site work, professional fees, permits, utilities, finishes and contingency. This makes the trade-offs visible. A lower-cost plan may have a longer utility trench; a larger unit may use the site more efficiently; a conversion may need expensive remediation. The total is credible only when those choices have names and owners." },
    { type: "p", text: "Ask every bidder to price the same plan revision and finish schedule. If that is not possible, annotate the differences rather than pretending the proposals are comparable. The most useful quote tells you what has been assumed about soil, access, service capacity, inspection fees and existing structures. An omission is not proof that the work is free; it is a question waiting to become a change order." },
    { type: "h2", text: "Use a four-part cost check" },
    { type: "ul", items: ["Scope: does the price include the same drawings, room count, appliances and exterior work as the other quote?", "Site: has someone verified access, drainage, ground conditions and the route for water, sewer and power?", "Timing: are permit, utility and long-lead-item assumptions attached to a realistic programme?", "Contingency: is there a separately visible reserve for discoveries, instead of an unexplained percentage hidden in the price?"] },
    { type: "p", text: "A cost-per-square-foot figure can still be helpful once this work is done. Use it to spot a large difference, then investigate why it exists. Smaller homes often carry a greater share of fixed kitchen, bathroom, permit and mobilisation costs, so a higher rate is not automatically a poor deal. A simple form with fewer corners and shorter service runs can be better value than a superficially cheaper rate attached to a complicated build." },
    { type: "h2", text: "Keep the first decision reversible" },
    { type: "p", text: "Pay first for information that rules options in or out: a feasibility review, survey, utility assessment or properly scoped preliminary design. Do not let a glossy estimate force a route before the site is understood. The point of early budgeting is not to predict the final dollar exactly; it is to choose the next investigation that reduces the largest uncertainty." },
  ];
}

function evidenceCheck(seed: EditorialSeed): Block[] {
  return [
    { type: "h2", text: `Evidence check for ${seed.keyword}` },
    { type: "p", text: "This guide is designed to make the next decision clearer, not to replace a site visit, permit review, appraisal or lending decision. Use the official sources below to check the current framework, then test the conclusion against the actual address, drawings and contract scope. That distinction matters: an ADU can be a sound idea in principle while a particular lot still has a drainage, access, utility, title or approval issue that changes the outcome." },
    { type: "p", text: "When a provider gives a firm answer, ask what document, inspection or calculation supports it and whether the answer changes if the plan, site condition or funding product changes. Keep that answer with the relevant plan revision. It is a modest habit, but it turns scattered conversations into a decision trail that the owner, designer, builder and lender can all follow. If an important assumption cannot yet be evidenced, price it as a risk or defer the commitment that depends on it." },
    { type: "ul", items: ["Use current official guidance for the rule or lending framework, rather than treating a search snippet as the source.", "Use local authorities and qualified professionals for parcel-specific, code, construction and financial decisions.", "Use written scope, allowances and milestones to compare providers fairly and keep changes visible."] },
  ];
}

function editorialGuide(seed: EditorialSeed): Post {
  const opening = seed.opening.toLowerCase().includes(seed.keyword.toLowerCase())
    ? seed.opening
    : `When researching ${seed.keyword}, start with the project conditions before trusting a headline figure or generic promise. ${seed.opening}`;
  const imageAlt = seed.imageAlt.toLowerCase().includes(seed.keyword.toLowerCase())
    ? seed.imageAlt
    : `${seed.keyword}: ${seed.imageAlt}`;

  return {
    ...seed,
    imageAlt,
    blocks: [
      { type: "p", text: opening },
      { type: "h2", text: "The short answer" },
      { type: "p", text: seed.answer },
      { type: "table", ...seed.table },
      ...seed.sections.flatMap((section) => [
        { type: "h2" as const, text: section.heading },
        { type: "p" as const, text: section.text },
        ...(section.points ? [{ type: "ul" as const, items: section.points }] : []),
      ]),
      ...editorialDepth(seed),
      ...evidenceCheck(seed),
      { type: "h2", text: "A worked planning example" },
      { type: "p", text: seed.example },
      { type: "h2", text: "What to do next" },
      { type: "p", text: seed.nextSteps },
      seed.cta,
    ],
    faq: seed.faq,
  };
}

const CALIFORNIA_HCD: Source = {
  name: "California HCD, ADU Handbook (March 2026)",
  href: "https://www.hcd.ca.gov/sites/default/files/docs/policy-and-research/adu-handbook-update.pdf",
  note: "Current state-law guidance, including the 2026 addendum.",
};
const FANNIE_ADU: Source = {
  name: "Fannie Mae, Accessory Dwelling Units",
  href: "https://singlefamily.fanniemae.com/originating-underwriting/mortgage-products/accessory-dwelling-units",
  note: "Eligibility, appraisal and rental-income guidance for lender use.",
};
const CFPB_HELOC: Source = {
  name: "Consumer Financial Protection Bureau, home equity loans and HELOCs",
  href: "https://www.consumerfinance.gov/ask-cfpb/what-is-the-difference-between-a-home-equity-loan-and-a-home-equity-line-of-credit-heloc-en-247/",
  note: "Plain-English explanation of how home-equity borrowing works.",
};
const DOE_HOME: Source = {
  name: "U.S. Department of Energy, Efficient New Homes",
  href: "https://www.energy.gov/cmei/buildings/doe-efficient-new-homes-single-family-version-2",
  note: "National high-performance-home requirements and programme documents.",
};

const EDITORIAL_PUBLICATION_DATES: Readonly<Record<string, string>> = {
  "500-square-foot-adu-cost": "2026-10-05",
  "800-square-foot-adu-cost": "2026-10-05",
  "adu-cost-per-square-foot": "2026-10-04",
  "detached-adu-cost": "2026-10-04",
  "accessory-dwelling-unit-plans": "2026-10-03",
  "adu-floor-plans": "2026-10-03",
  "adu-requirements-checklist": "2026-10-02",
  "adu-building-permit-guide": "2026-10-01",
  "adu-construction-loans": "2026-10-01",
  "adu-roi-calculator-guide": "2026-09-30",
  "fannie-mae-adu-requirements": "2026-09-30",
  "adu-design-ideas": "2026-09-30",
  "mother-in-law-suite-cost": "2026-09-30",
  "california-adu-law-2026-update": "2026-10-05",
  "prefab-vs-site-built-adu-review": "2026-10-04",
};

export const SEPTEMBER_POSTS: Post[] = [
  editorialGuide({
    slug: "500-square-foot-adu-cost",
    image: "/blog/how-much-does-an-adu-cost.jpg",
    imageAlt: "A compact 500 square foot backyard ADU with a small porch",
    title: "500 Sq Ft ADU Cost: A Realistic 2026 Budget",
    description: "Plan a 500 sq ft ADU budget with practical cost ranges, the line items people miss and a smarter way to compare builder quotes.",
    keyword: "500 sq ft adu cost",
    category: "Academy",
    supportingKeywords: ["500 square foot adu cost", "small adu cost", "500 sq ft backyard cottage", "adu cost per square foot", "detached adu budget", "garage conversion cost"],
    date: "2026-09-23",
    readingMinutes: 8,
    sources: [CALIFORNIA_HCD, DOE_HOME],
    opening: "A 500 sq ft ADU is small enough to fit behind many existing homes and large enough for a proper one-bedroom layout. That makes it a tempting place to start, but the headline price can mislead. Kitchens, bathrooms, permits and utility work do not shrink in proportion to the floor plan. This guide turns a vague ‘small ADU’ quote into a budget you can challenge, line by line, before you sign anything.",
    answer: "For planning, a 500 sq ft garage conversion normally sits below a ground-up detached build because the shell already exists. A new detached unit is usually priced on a higher per-square-foot basis, while a compact layout can also have a higher kitchen-and-bathroom cost per foot than a larger unit. Treat any quote that excludes drawings, permits, site work or utility connections as an early estimate, not a project budget.",
    table: { caption: "A planning comparison for a 500 sq ft ADU. Local labour, site conditions and finish level decide the final figure.", headers: ["Build route", "Where the money goes", "Budget risk to test first"], rows: [["Garage conversion", "Habitable upgrades, plumbing, insulation, openings", "Slab, drainage and electrical capacity"], ["Attached addition", "New structure plus tie-in to the main home", "Roof and wall connection details"], ["Detached site-built", "Foundation, structure, utilities and finishes", "Access, trenching and site preparation"], ["Prefab or modular", "Factory unit plus foundation and installation", "Delivery route, crane access and utility scope"]] },
    sections: [
      { heading: "Why 500 sq ft is not ‘half the price’", text: "A compact ADU still needs the same expensive rooms as a larger one: a kitchen, a bathroom, heating and cooling, electrical service and a legal path from the street or main house. That fixed work is why two builders can both be honest yet quote very different rates per square foot. Compare the total scope before you compare the rate. A £? style of thinking does not help here: this is a US construction budget, and the important split is fixed versus size-driven cost.", points: ["Ask whether plan check, engineering and energy documentation are included.", "Separate site work from building work so a difficult lot is visible.", "Confirm whether appliances, landscaping and utility-company charges are allowances or fixed items."] },
      { heading: "Choose the layout before choosing the finish", text: "At 500 sq ft, circulation wastes money fast. A square or near-square footprint, one wet wall serving kitchen and bathroom, and storage designed into the plan usually protect the budget better than shaving a little from cabinet quality. This is also the moment to decide whether the unit needs step-free access. Moving a doorway or plumbing stack on paper is cheap; moving it after rough-in is not.", points: ["Put the bathroom close to the kitchen plumbing wall.", "Reserve a real place for laundry, the water heater and the HVAC air handler.", "Check the bedroom egress and daylight rules before committing to a furniture plan."] },
      { heading: "Read a builder quote like a project manager", text: "Request the same written scope from every bidder. The useful comparison is not ‘Builder A is cheaper’; it is ‘Builder A priced a new 125-amp service and Builder B assumed the existing panel works.’ Mark allowances, exclusions and change-order rates in a simple sheet. A vague allowance is not automatically bad, but it needs a ceiling and a named owner of the decision.", points: ["Require an allowance schedule for fixtures, tiles and appliances.", "Ask who pays for unforeseen soil, sewer or electrical discoveries.", "Confirm inspection fees, temporary power and waste removal in writing."] },
      { heading: "Keep the permit route connected to the budget", text: "The California Department of Housing and Community Development describes ADUs as independent living spaces and publishes a current handbook because statewide and local rules interact. Wherever you live, zoning, setbacks, fire access and utilities can reshape a ‘standard’ plan. A preliminary feasibility check is therefore a budget control, not an administrative chore. Do it before paying for full construction drawings or a non-refundable factory slot." },
    ],
    example: "Imagine a homeowner with a detached, weather-tight garage whose water and sewer runs are close to the proposed unit. Their first quote looks inexpensive because it assumes the existing slab, roof framing and electrical panel all pass inspection. A careful second quote costs more upfront but includes a panel assessment, sewer camera allowance and a contingency. The sensible choice is not automatically the lower price: it is the proposal that identifies which assumptions must be proved before work begins. If the existing conditions are sound, the owner can release contingency; if not, there is no nasty surprise halfway through drywall.",
    nextSteps: "Measure the usable footprint, take clear photos of the electrical panel and utility routes, then obtain a feasibility answer for your city. Use one layout and one written scope to collect comparable estimates. Only then decide whether a conversion, addition or detached build gives the better result.",
    cta: { type: "cta", text: "Estimate a 500 sq ft ADU in your state", href: "/" },
    faq: [{ q: "Is 500 sq ft big enough for a one-bedroom ADU?", a: "Often, yes. A compact one-bedroom plan can work at 500 sq ft, provided local minimum-room, egress and accessibility rules are met." }, { q: "What is the cheapest way to build a 500 sq ft ADU?", a: "Reusing a structurally sound permitted garage shell is commonly cheaper than new detached construction, but only after the slab, utilities and code upgrades have been assessed." }, { q: "Should I use a cost per square foot figure?", a: "Use it as an early comparison only. A complete scope, including permits, utilities and site work, is more useful for making a decision." }],
  }),
  editorialGuide({
    slug: "800-square-foot-adu-cost",
    image: "/blog/adu-for-aging-parents.jpg",
    imageAlt: "An accessible 800 square foot detached ADU beside a family home",
    title: "800 Sq Ft ADU Cost: Budgeting for a One-Bed Home",
    description: "Understand what changes at 800 sq ft: layout choices, build routes, utility costs and the questions that make an ADU quote comparable.",
    keyword: "800 sq ft adu cost",
    category: "Academy",
    supportingKeywords: ["800 square foot adu cost", "one bedroom adu cost", "detached adu cost", "adu budget", "adu floor plan", "accessory dwelling unit pricing"],
    date: "2026-09-23",
    readingMinutes: 8,
    sources: [CALIFORNIA_HCD, DOE_HOME],
    opening: "An 800 sq ft ADU has room for a generous one-bedroom plan, a small two-bedroom arrangement in some markets or an accessibility-first home for family. It also crosses a practical threshold: the building is large enough that design choices, utility capacity and outdoor access can add or remove tens of thousands from the budget. Here is how to make the larger footprint work for you instead of simply making every decision more expensive.",
    answer: "An 800 sq ft unit usually costs more overall than a 500 sq ft unit, but fixed work is spread across more usable space. A clean, compact shape and a simple roof often produce a better value than an ambitious plan with corners, long utility runs and expensive glazing. Your lot matters as much as the plan: a rear-yard crane lift, a steep drive or a long sewer trench can dominate the difference between two apparently similar builds.",
    table: { caption: "The choice at 800 sq ft is mainly about use, not just size.", headers: ["Priority", "Plan decision", "Cost consequence"], rows: [["Ageing in place", "Single storey, wider openings, step-free shower", "Spend early on clearances and future-proofing"], ["Rental flexibility", "True bedroom, laundry and separate outdoor entry", "Protect privacy and durable finishes"], ["Lowest build complexity", "Simple rectangle, stacked plumbing, modest roof", "Fewer structural and waterproofing details"], ["Family use", "Storage and adaptable sleeping space", "Avoid building a second living room by accident"]] },
    sections: [
      { heading: "Start with the job the unit must do", text: "A project built for a parent who may use a walker needs different circulation from a unit aimed at a single renter. Put that use case in the brief. It controls bedroom width, bathroom layout, entry threshold and storage, which in turn controls the wall and plumbing plan. A common mistake is asking a designer for ‘maximum bedrooms’ before deciding whether privacy, accessibility or rent is the real outcome." },
      { heading: "Use the extra area where it earns its keep", text: "At 800 sq ft, a second bedroom can improve flexibility, but not if it forces a cramped kitchen or an awkward bathroom. Homeowners tend to feel the benefit of daylight, storage, laundry and a sensible entrance every day. Put the kitchen and bathroom close together, then use the remaining space for a living room that can actually take a sofa and dining table without becoming a corridor.", points: ["Draw furniture to scale before approving room dimensions.", "Keep external corners and roof transitions to a minimum.", "Check whether local design rules affect height, lot coverage or exterior materials."] },
      { heading: "Compare the four construction routes fairly", text: "Site-built construction offers the most layout freedom. Factory-built approaches can compress on-site time, but a factory price may not include foundation, delivery, crane work, permits or connections. An attached addition can share infrastructure but can introduce complex connections to the existing home. A conversion can be efficient when the shell is genuinely suitable. Ask every provider to identify the work that occurs before and after their contract; those edges are where budgets get lost." },
      { heading: "Plan operating cost as part of the brief", text: "The Department of Energy treats a home as a set of systems that work together: enclosure, heating and cooling, ventilation and hot water. For an ADU, that means deciding early whether to use a compact heat pump, where its outdoor unit sits and how ventilation is provided. Efficiency is not a decorative upgrade. A tight, well-detailed envelope can make a small system quieter, cheaper to run and more comfortable for the person living there." },
    ],
    example: "A couple want an 800 sq ft backyard home for an adult daughter now and a parent later. Their initial brief asks for two small bedrooms, two bathrooms and a large kitchen island. During schematic design they remove the second bathroom, widen one bedroom doorway, add a proper linen cupboard and keep the main plumbing wall short. The revised plan is easier to furnish, less complicated to build and better suited to both uses. The lesson is simple: adaptability comes from sensible proportions, not from adding every possible room.",
    nextSteps: "Write a one-page use brief, test it against a scaled plan and ask local planning staff or a qualified designer about your lot constraints. Pair that with an all-in cost estimate for the same plan, not a headline rate from three different assumptions.",
    cta: { type: "cta", text: "Check 800 sq ft ADU feasibility and cost", href: "/" },
    faq: [{ q: "Can an 800 sq ft ADU have two bedrooms?", a: "It can in many jurisdictions, but local size, bedroom, egress and parking rules still apply. A scaled plan will show whether the rooms are genuinely usable." }, { q: "Does an 800 sq ft ADU cost less per square foot?", a: "It may, because some design, permit and utility costs are fixed, but site work and finish choices can outweigh that effect." }, { q: "Is an 800 sq ft ADU exempt from impact fees in California?", a: "Do not assume so. California law has specific treatment for smaller ADUs and proportionality rules; confirm the current local fee schedule and HCD guidance." }],
  }),
  editorialGuide({
    slug: "adu-cost-per-square-foot",
    image: "/blog/how-much-does-an-adu-cost.jpg",
    imageAlt: "Builder reviewing ADU cost per square foot calculations and plans",
    title: "ADU Cost Per Square Foot: How to Use the Number",
    description: "Cost per square foot can help you compare ADU quotes, but only when the scope matches. Learn what it includes, misses and how to use it well.",
    keyword: "adu cost per square foot",
    category: "Academy",
    supportingKeywords: ["adu construction cost per square foot", "average adu cost", "detached adu price per square foot", "garage conversion cost per square foot", "adu builder quote", "all-in adu budget"],
    date: "2026-09-22",
    readingMinutes: 7,
    sources: [CALIFORNIA_HCD, DOE_HOME],
    opening: "‘Cost per square foot’ is a useful shortcut and a dangerous promise. It can tell you whether a quote is broadly in the right postcode, but it cannot tell you whether that quote includes a foundation, a sewer connection, permit fees, appliances or a difficult back garden. The way to use the number is as a diagnostic tool: divide the same complete scope by the same measured area, then investigate the differences.",
    answer: "The smaller the ADU, the less reliable a single rate becomes. Kitchens, bathrooms, design, permits and mobilising a construction team are not priced by floor area alone. You get a more honest view by splitting the project into building work, site work, soft costs and contingency. A price per square foot belongs at the end of that worksheet, not at the beginning.",
    table: { caption: "Use this checklist before comparing any cost-per-square-foot figure.", headers: ["Scope item", "Included?", "Why it changes the rate"], rows: [["Plans, engineering and permits", "Often excluded", "Real costs that do not grow with floor area"], ["Foundation and site work", "Varies by lot", "Soil, access and trenching are highly local"], ["Utility connections", "Sometimes an allowance", "Electrical, water and sewer capacity can be decisive"], ["Fixtures and appliances", "May be an allowance", "Finish level alters the total materially"]] },
    sections: [
      { heading: "Make sure everyone is measuring the same area", text: "Ask whether the builder has used conditioned floor area, the footprint, gross internal area or another definition. A covered porch, garage or thick exterior walls can make two honest measurements look inconsistent. For a compact unit, that matters. Put the agreed area and plan revision in the quote header so the rate cannot drift when a room is moved or an exterior wall grows." },
      { heading: "Separate fixed costs from size-driven costs", text: "Design, permitting and establishing a construction site are broadly fixed. Flooring, framing and drywall scale with size. A project with a high fixed-cost share can look expensive per square foot even when it is a sensible total cost. This is why an owner should never reject a compact conversion simply because its calculated rate is higher than a larger new build. The question is what the finished unit costs and whether it fulfils the brief.", points: ["Create a line for soft costs before requesting bids.", "Keep a separate contingency for unknown site conditions.", "Compare like-for-like finish schedules, not marketing photographs."] },
      { heading: "Spot the quote that is too neat", text: "A round number with no exclusions can feel reassuring. In practice, a good proposal describes what has been assumed: existing electrical capacity, utility route, soil condition, access for equipment and agency fees. That detail is evidence of planning, not a reason to distrust a quote. If a builder cannot name the assumptions, the risk has not disappeared; it has merely been moved into later change orders." },
      { heading: "Use the rate to ask better questions", text: "If one bid is much higher, look for scope differences first. Is it including a foundation type, energy modelling, drainage, temporary fencing, landscaping or a longer warranty? If one is much lower, check whether it is an unfinished shell price, an early feasibility estimate or a quote based on a different ADU type. A short comparison meeting can save months of misunderstanding." },
    ],
    example: "Two owners receive quotes for a 650 sq ft detached ADU. The first is presented as a low price per square foot, but it excludes architectural drawings, permits, landscaping, utility trenching and appliances. The second shows a higher rate but includes a complete plan set, a foundation allowance, a mini-split, fixtures and final inspection support. Once the first owner adds the missing scope, the apparent bargain disappears. The lesson is not that a higher rate is always right; it is that a rate without scope is not a decision-grade number.",
    nextSteps: "Download or make a quote comparison sheet with one column per bidder and one row per scope item. Mark every unknown as an allowance or exclusion. When the scopes line up, calculate cost per square foot as a final sense-check.",
    cta: { type: "cta", text: "Build an ADU cost estimate for your state", href: "/" },
    faq: [{ q: "What does ADU cost per square foot include?", a: "It depends on the quote. It may cover only construction, or it may include design, permits, site work and finishes. Ask for an itemised scope." }, { q: "Why is a small ADU more expensive per square foot?", a: "Small homes still require costly kitchens, bathrooms, permits and utility work, so fixed costs are spread across fewer square feet." }, { q: "Can I compare prefab and site-built costs per square foot?", a: "Only if both figures include the same scope, including foundation, delivery, installation, permits and utility connections." }],
  }),
  editorialGuide({
    slug: "detached-adu-cost",
    image: "/blog/adu-building-codes.jpg",
    imageAlt: "New detached backyard ADU under construction beside a primary home",
    title: "Detached ADU Cost: The Budget Behind a New Build",
    description: "A detached ADU offers privacy and flexibility, but the site work matters. Build a realistic budget and avoid the most common quote gaps.",
    keyword: "detached adu cost",
    category: "Academy",
    supportingKeywords: ["detached accessory dwelling unit cost", "backyard cottage cost", "new build adu cost", "detached adu budget", "adu site work", "adu utility connection cost"],
    date: "2026-09-22",
    readingMinutes: 8,
    sources: [CALIFORNIA_HCD, DOE_HOME],
    opening: "A detached ADU gives the main home and the new resident their own front door, their own walls and usually more privacy. That is its strength. It is also why it needs a foundation, a complete structure and its own path for utilities. The most useful way to budget one is to think in project stages, from feasibility and drawings through site preparation, construction, inspections and landscaping.",
    answer: "A detached ADU tends to be the most flexible and the most capital-intensive route because nearly every part is new. The building itself is only one part of the job. Access, excavation, drainage, utility trenching, permits and the condition of the site can create more variation than the choice between two tile ranges. A decision-ready budget sets those pieces out separately.",
    table: { caption: "A detached ADU budget has several distinct layers.", headers: ["Layer", "Typical decisions", "Question for the team"], rows: [["Pre-construction", "Survey, feasibility, plans, engineering", "Which approvals and reports are required?"], ["Site work", "Access, grading, foundation, drainage", "What has been verified versus assumed?"], ["Building", "Frame, roof, windows, systems and finishes", "What performance standard is specified?"], ["Close-out", "Inspections, paths, planting and repairs", "Who owns each final sign-off?"]] },
    sections: [
      { heading: "Test the back garden before falling in love with a plan", text: "Walk the route from the street to the proposed unit with a builder or designer. Can an excavator enter? Is there a narrow side passage, a mature tree, a retaining wall or a steep slope? Where will soil, material deliveries and waste go? Those ordinary details can be more valuable than a glossy rendering because they determine how construction can actually happen without damaging the main home or neighbouring property." },
      { heading: "Map utilities on paper", text: "A detached building must connect to power, water, sewer or septic, and often communications. Identify the service panel, clean-outs, water meter and any easements before design is fixed. Do not assume the nearest visible pipe is the route you can use. Utility providers and local authorities may have separate requirements, and a long or difficult trench can change the construction method and the total price.", points: ["Ask for utility routes on the site plan.", "Confirm whether capacity upgrades are required.", "Keep drainage and roof runoff in the early civil-design conversation."] },
      { heading: "Choose a simple form with a deliberate envelope", text: "Every roof valley, bump-out and dramatic corner adds waterproofing and framing complexity. A simple detached rectangle with carefully placed windows often gives more usable space for the same budget. The Department of Energy’s efficient-home guidance is a helpful reminder that insulation, air sealing, heating, cooling and ventilation work as one system. Spend on a robust envelope before paying for decorative complexity that will not improve comfort." },
      { heading: "Protect the build from late changes", text: "Changes after permits and procurement are expensive because drawings, trades and orders are already connected. Decide the kitchen layout, windows, bathroom configuration, electrical outlets and exterior materials before asking a contractor for a fixed price. Leave a genuine contingency for unknown ground or service conditions, but do not use contingency as a substitute for finishing the design." },
    ],
    example: "A homeowner plans a detached one-bedroom ADU at the far end of a long, narrow lot. The first concept puts the bathroom on the opposite side of the unit from the existing sewer connection and leaves only a tight path for a mini excavator. The revised concept rotates the plan, shares a short utility wall with the kitchen and preserves a clear delivery path. No square footage changes, but the site work becomes easier to price and less disruptive. This is the sort of design decision that is worth more than hunting for a tiny saving in light fittings.",
    nextSteps: "Get a preliminary lot check, locate existing services and photograph the access route. Then ask for a site plan and cost breakdown that separates site work, utilities, building work and final landscaping.",
    cta: { type: "cta", text: "Estimate a detached ADU on your lot", href: "/cost/detached" },
    faq: [{ q: "Why does a detached ADU cost more than a conversion?", a: "A detached unit generally needs a new foundation, exterior shell, roof and utility connections, while a conversion can reuse some of those elements." }, { q: "Do detached ADUs need separate utilities?", a: "Requirements vary. A unit needs safe electrical, water and sewer or septic service; whether that means separate meters or connections depends on local rules and providers." }, { q: "Can a prefab detached ADU avoid site work?", a: "No. Factory construction can reduce on-site building time, but foundations, delivery, installation, utilities and permits still need to be planned." }],
  }),
  editorialGuide({
    slug: "accessory-dwelling-unit-plans",
    image: "/blog/adu-permit-process.jpg",
    imageAlt: "Accessory dwelling unit plans, site plan and floor plan on an architect desk",
    title: "Accessory Dwelling Unit Plans: From Brief to Permit",
    description: "Choose an ADU plan that fits your lot, life and local rules. Learn the drawings you need and the decisions to lock before permit submission.",
    keyword: "accessory dwelling unit plans",
    category: "Reviews",
    supportingKeywords: ["adu plans", "adu construction plans", "adu blueprints", "backyard cottage plans", "adu site plan", "permit ready adu plans"],
    date: "2026-09-21",
    readingMinutes: 8,
    sources: [CALIFORNIA_HCD, DOE_HOME],
    opening: "An ADU plan is not just a floor plan with a cute name. It is a chain of decisions about the lot, building code, plumbing, energy, structure and the person who will live there. A plan that looks efficient on a listing page can become expensive when it meets a narrow driveway, a setback line or a real kitchen appliance. Start with the brief and the site; the drawing comes after both.",
    answer: "The best ADU plan is permit-ready for your property, not merely attractive online. It needs a sensible site position, legal access, rooms that can be furnished, a workable utility route and details that satisfy the local reviewing authority. Stock plans can provide a useful starting point, but they should be checked and adapted by appropriately qualified local professionals before construction.",
    table: { caption: "The drawing set grows as decisions become firmer.", headers: ["Drawing", "What it answers", "When it matters"], rows: [["Site plan", "Location, setbacks, access and utilities", "Feasibility and permitting"], ["Floor plan", "Rooms, furniture, doors and plumbing", "Every design decision"], ["Elevations and sections", "Height, materials and construction", "Planning and building review"], ["Structural and energy documents", "Safety and performance details", "Permit submission"]] },
    sections: [
      { heading: "Write a plain-language brief first", text: "Describe who will live in the ADU, how long they may stay, their mobility needs, whether they work from home and how private the entrance should feel. Add a budget range and non-negotiables. A one-bedroom rental may need durable storage and a good kitchen; a parent’s home may need a step-free shower and clear routes; a guest space may prioritise flexibility. Without this brief, a designer is left to make lifestyle decisions that should belong to the owner." },
      { heading: "Let the lot set the first constraints", text: "A site plan should show property boundaries, the main house, setbacks, easements, trees, slopes, driveways and utility points. Local ADU rules decide what is allowed, but physical constraints determine what is sensible. Place the unit to protect light and privacy for both homes, not just to fill the largest open patch of grass. The California HCD handbook is a useful model of why statewide rules and local implementation need to be read together." },
      { heading: "Draw rooms around real objects", text: "Put a bed, sofa, dining table, fridge, laundry machine and bathroom clearances on the plan to scale. This exposes small problems early: a bedroom door hitting a wardrobe, no place for towels, a living room that only works with a two-seat sofa or a kitchen with no landing space beside the hob. It also keeps the plan honest when a ‘two-bedroom’ label might produce rooms that feel more like box rooms.", points: ["Keep wet rooms close to reduce plumbing runs.", "Plan storage before adding decorative niches.", "Check door swings, circulation and egress windows on the same drawing."] },
      { heading: "Know when a stock plan becomes a false economy", text: "A pre-drawn plan can speed up early conversations, but it cannot know your soil, climate zone, planning rules or existing services. Adaptation is normal. If the seller cannot explain what local review, engineering or energy documentation remains, treat the price as a design starting point rather than a permit price. A modest local adaptation can be cheaper than trying to force an unsuitable plan through review." },
    ],
    example: "An owner downloads a compact plan with a vaulted ceiling, corner windows and a bathroom at the rear. Their lot has a side setback limit, a mature tree and a sewer connection near the front. The local designer flips the layout, makes the roof form simpler and moves the bathroom beside the kitchen. The exterior changes little, but the utility route becomes shorter and the project no longer needs to work around the tree’s protected root area. That is a good plan doing its job: responding to the lot, not fighting it.",
    nextSteps: "Create a one-page brief, request a preliminary site check and only then compare plan options. Keep one tracked decision list so the floor plan, site plan and builder scope stay aligned.",
    cta: { type: "cta", text: "Check the rules your ADU plan must meet", href: "/states" },
    faq: [{ q: "Can I buy ADU plans online and build them anywhere?", a: "Not safely without review. Local zoning, structural, energy and permitting requirements can require changes to a stock plan." }, { q: "What makes an ADU plan permit-ready?", a: "It normally includes a compliant site plan, architectural drawings and any structural, energy or service documents required by the local authority." }, { q: "Should I design the interior before the exterior?", a: "Design them together. Room layouts affect windows, plumbing, roof shape, access and the site position." }],
  }),
  editorialGuide({
    slug: "adu-floor-plans",
    image: "/blog/adu-vs-jadu.jpg",
    imageAlt: "Well planned ADU floor plan beside a compact, bright interior",
    title: "ADU Floor Plans: Choose a Layout That Lives Well",
    description: "Compare studio, one-bedroom and two-bedroom ADU floor-plan priorities. Make a compact home feel useful, private and ready for real life.",
    keyword: "adu floor plans",
    category: "Academy",
    supportingKeywords: ["adu layout", "small adu floor plan", "one bedroom adu plans", "two bedroom adu plan", "studio adu layout", "backyard cottage layout"],
    date: "2026-09-21",
    readingMinutes: 7,
    sources: [CALIFORNIA_HCD, DOE_HOME],
    opening: "A good ADU floor plan feels larger than its measured area because it gives every daily task somewhere sensible to happen. A poor one can feel cramped at twice the size. The trick is not clever labels on rooms; it is clear circulation, furniture that fits, storage that is useful and privacy between the primary house and the new home. These are the layout choices worth getting right before you discuss finishes.",
    answer: "Choose the room count that matches the resident and the lot. A studio can be excellent for one person when it has clear zones and storage. A one-bedroom often gives better privacy and rental flexibility. A two-bedroom needs enough area to avoid sacrificing the kitchen, bathroom or living space. Start with how people will use the home on an ordinary Tuesday, then test the plan with real furniture.",
    table: { caption: "Different ADU layouts solve different problems.", headers: ["Layout", "Works well for", "Watch out for"], rows: [["Studio", "Guest use, one resident, very compact lots", "Bed, desk and lounge competing for one room"], ["One-bedroom", "Longer-term rental, couples, ageing parents", "Wasting too much area on corridors"], ["Two-bedroom", "Small family, carer or flexible household", "Tiny bedrooms and an under-sized living room"], ["Loft or mezzanine", "High ceilings and occasional sleeping", "Stairs, heat and accessibility"]] },
    sections: [
      { heading: "Design the arrival sequence", text: "The approach to the ADU affects how independent it feels. A visible, well-lit path, a covered threshold and a place for bins or deliveries make a small home feel settled rather than borrowed. In a rear garden, think about the sight lines from the main house and neighbours. The goal is not to hide the ADU; it is to give both households a little breathing room." },
      { heading: "Give the kitchen and bathroom a sensible relationship", text: "These rooms are expensive and service-heavy, so a shared plumbing wall is usually efficient. They must still be pleasant. Leave enough worktop beside the sink and cooking surface, allow a fridge door to open, and give the bathroom space for towels and a laundry solution. In small plans, a kitchen that looks neat in a rendering can fail because there is no place to prepare a meal or put down a hot pan.", points: ["Place noisy plumbing away from the bed where possible.", "Include a ventilation route in the plan, not as an afterthought.", "Protect daylight in the living space before adding a second tiny room."] },
      { heading: "Plan storage as furniture, not leftover space", text: "A shallow hall cupboard, full-height wardrobe, linen storage and a place for suitcases make a compact home work for months rather than a weekend. Built-in storage can be worthwhile where it avoids buying several free-standing pieces, but do not fill every wall with joinery before you know where a sofa, television, desk or dining table will sit." },
      { heading: "Future-proof without overbuilding", text: "If the ADU may later suit an older parent, choose a single-storey layout where practical, use level entries and provide wall blocking for future grab rails. These are modest decisions when made during construction and disruptive ones when retrofitted. The same principle applies to home working: a quiet nook with power and daylight can be more useful than a small extra bedroom." },
    ],
    example: "A homeowner wants a two-bedroom ADU for visiting family but expects it to be rented most of the year. The first drawing squeezes two bedrooms around a narrow living room and puts the washer in a kitchen cabinet. The revised plan becomes a generous one-bedroom with a flexible study that can host a guest bed, a proper laundry cupboard and a dining table. The second plan is more adaptable because it serves its everyday resident first, then handles occasional visitors without wasting the whole home.",
    nextSteps: "Print the plan at a useful scale, place furniture templates on it and walk the routes with someone who will actually use the home. Then check the preferred layout against local size, egress and accessibility requirements.",
    cta: { type: "cta", text: "Estimate the cost of your preferred ADU layout", href: "/" },
    faq: [{ q: "What is the most popular ADU floor plan?", a: "One-bedroom layouts are common because they balance privacy, rental flexibility and compact construction, but the right plan depends on the resident and lot." }, { q: "Can a studio ADU feel spacious?", a: "Yes. Clear zones, good daylight, storage and furniture that fits can make a studio work very well for one person." }, { q: "How do I make an ADU accessible?", a: "Plan a level entrance, generous circulation, a step-free shower and practical door widths from the outset, then confirm applicable requirements locally." }],
  }),
  editorialGuide({
    slug: "adu-requirements-checklist",
    image: "/blog/adu-building-codes.jpg",
    imageAlt: "Homeowner reviewing an ADU requirements checklist with plans",
    title: "ADU Requirements Checklist: What to Check First",
    description: "Use this ADU requirements checklist before you buy plans or choose a builder: zoning, setbacks, utilities, permits, code and project scope.",
    keyword: "adu requirements",
    category: "Academy",
    supportingKeywords: ["accessory dwelling unit requirements", "adu building requirements", "adu zoning requirements", "adu permit checklist", "adu utility requirements", "can i build an adu"],
    date: "2026-09-20",
    readingMinutes: 8,
    sources: [CALIFORNIA_HCD, FANNIE_ADU],
    opening: "An ADU is a small home, not a garden room with a kitchenette. That distinction brings a checklist: the lot has to allow it, the plan has to meet rules, the structure needs safe services and the completed unit must pass inspection. Starting with a written requirements checklist makes the process less mysterious and stops you spending on a design that cannot be approved or connected.",
    answer: "The first ADU requirement is local eligibility. Confirm zoning, lot-specific restrictions, setbacks, height, parking, access and utility capacity. Next, confirm the building requirements: safe structure, fire separation where relevant, egress, electrical, plumbing, heating, ventilation and energy performance. State law can set a floor in some places, but the local authority still reviews the specific site and building.",
    table: { caption: "Use this as a first-pass ADU requirements checklist, not as a substitute for local advice.", headers: ["Area", "What to establish", "Evidence to keep"], rows: [["Land use", "Zoning, ADU allowance and overlays", "Written planning response or official map"], ["Site", "Setbacks, access, easements and drainage", "Survey and site photographs"], ["Services", "Electrical, water, sewer or septic capacity", "Provider information and route sketch"], ["Building", "Code, structural and energy documents", "Permit set and inspection record"]] },
    sections: [
      { heading: "Check the parcel, not just the postcode", text: "Two homes in the same city can face different constraints because of zoning, an easement, a flood area, a historic overlay, a protected tree or a narrow access route. Find the parcel number, read the official zoning map and ask the planning department about applicable overlays. A neighbour’s ADU can be a useful conversation starter, but it is not proof that your lot will be treated the same way." },
      { heading: "Confirm an independent living setup", text: "Fannie Mae’s published ADU definition is a practical reminder of what makes a unit a separate dwelling: independent living, sleeping, cooking and bathing facilities, plus independent access and an expectation of privacy. Local building and planning definitions can differ, but the principle is helpful when you are deciding whether a garage conversion, basement arrangement or garden building is actually intended to become a legal ADU.", points: ["Identify the kitchen, bathroom, sleeping area and entrance on the plan.", "Check egress and fire-safety requirements for bedrooms.", "Do not assume removing a stove changes a legally established unit’s status."] },
      { heading: "Treat utilities as early design information", text: "Ask where the electrical panel is, where wastewater leaves the property, whether a septic system has capacity and how roof water will be handled. Waiting until construction drawings are complete can force an awkward redesign. If the home needs an electrical upgrade or the sewer route crosses difficult ground, that should be visible in the feasibility budget from day one." },
      { heading: "Keep a paper trail that survives the build", text: "Save official links, email responses, plan revisions, permits, inspections and any approval conditions in one folder. That habit protects you during construction and later when you refinance, sell or insure the property. A permitted ADU is a real asset; its paperwork should be as tidy as the physical work." },
    ],
    example: "A homeowner assumes a detached garden office can simply be fitted with a bathroom and kitchen. Their initial checklist shows a rear easement, an undersized electrical panel and a local height limit. Rather than treating those as deal-breakers, they move the building footprint, budget for an electrical upgrade and choose a simpler roof. The requirements list converts uncertainty into decisions that can be priced. Without it, each discovery would have landed as a late change.",
    nextSteps: "Collect your parcel information, locate service points and request official zoning guidance. Use the answers to prepare a clear brief for a designer, contractor or modular provider.",
    cta: { type: "cta", text: "Start an ADU feasibility check", href: "/" },
    faq: [{ q: "Do all ADUs need a permit?", a: "A legal habitable ADU generally needs building permits and inspections. Exact permit requirements depend on location and the scope of work." }, { q: "Can my city ban ADUs?", a: "Some states limit local restrictions, while others leave the decision largely to local zoning. Check the official rules for your parcel." }, { q: "What services does an ADU need?", a: "It needs safe electrical, water, wastewater or septic, heating, ventilation and other systems required by the applicable code." }],
  }),
  editorialGuide({
    slug: "adu-setback-requirements",
    image: "/blog/adu-setback-requirements.jpg",
    imageAlt: "Site plan showing ADU setback requirements from property boundaries",
    title: "ADU Setback Requirements: Read Your Lot Correctly",
    description: "Setbacks decide where an ADU can sit. Learn how to read property lines, avoid common measuring mistakes and ask the right local questions.",
    keyword: "adu setbacks",
    category: "Academy",
    supportingKeywords: ["adu setback requirements", "accessory dwelling unit setbacks", "adu side setback", "adu rear setback", "adu site plan", "detached adu placement"],
    date: "2026-09-20",
    readingMinutes: 7,
    sources: [CALIFORNIA_HCD],
    opening: "Setbacks are the blank strips of land a building must keep clear from a property line, road or sometimes another structure. They sound simple until a fence is not on the legal boundary, an alley counts differently from a rear yard or an existing garage sits in a non-conforming position. Getting the setbacks right early helps you choose a feasible ADU footprint rather than paying to redraw it after a planner or surveyor points out the problem.",
    answer: "Never measure an ADU setback from a fence unless you know the fence is on the legal boundary. Start with a survey or reliable parcel information, then ask the local authority which setbacks apply to the proposed ADU type, height and location. State rules may restrict how far a city can go in some jurisdictions, but lot-specific conditions, easements and fire access can still affect where you build.",
    table: { caption: "The word ‘setback’ can refer to several different limits.", headers: ["Boundary or feature", "What it controls", "Common mistake"], rows: [["Side property line", "Space beside the lot", "Measuring from a neighbour’s fence"], ["Rear property line", "Space at the back of the lot", "Assuming an alley is always the rear line"], ["Front setback", "Distance from the street", "Forgetting a corner lot has two street frontages"], ["Easement or access route", "Land that may need to remain clear", "Treating it as ordinary garden area"]] },
    sections: [
      { heading: "Find the legal property lines", text: "Start with a boundary survey if there is any doubt. Digital maps are useful for orientation but may not establish the precise line needed for construction. Locate recorded easements, utility corridors and rights of way at the same time. A unit that clears the apparent boundary but blocks an easement is not a good solution, even if it fits neatly on a sketch." },
      { heading: "Ask rules that match the building you propose", text: "Detached, attached and conversion ADUs can be treated differently. Height, fire-resistance, access and relationship to the main house can also change the applicable standard. Describe the proposal accurately when you ask: size, number of storeys, distance from boundaries, existing structures and whether it is new construction or a conversion. Vague questions produce vague answers.", points: ["Provide a rough site sketch with dimensions.", "Ask about both planning and building-code clearance issues.", "Check whether eaves, steps or roof overhangs are measured differently."] },
      { heading: "Do not forget fire access and privacy", text: "A building can technically meet a setback and still create problems with fire access, window placement or overlooking. Think about how emergency services, maintenance crews and residents will move around the unit. On compact lots, locating windows away from close boundaries and keeping a clear side route can improve privacy and simplify code discussions." },
      { heading: "Keep the site plan honest during design", text: "Every design revision should retain a scaled site plan. A larger roof overhang, a shifted wall or a proposed deck may change clearances even if the floor plan looks almost identical. The final plan should show dimensions to relevant boundaries and any existing building that triggers a required separation." },
    ],
    example: "An owner marks out a proposed ADU using the existing fence as a guide. The survey later shows the fence sits inside the property line and an easement runs along the rear. Instead of losing months, the designer uses the survey to rotate the smaller footprint, move windows to the private side and preserve a maintenance path. The building is a little different, but the solution is buildable. Marking out early was worthwhile; treating the first tape measure as legal truth would not have been.",
    nextSteps: "Find or commission a current survey, gather the local ADU rules and draw the building footprint to scale. Take that information to planning before developing detailed construction documents.",
    cta: { type: "cta", text: "Check ADU rules in your state", href: "/states" },
    faq: [{ q: "How close can an ADU be to a property line?", a: "The answer depends on your location, ADU type, height and sometimes fire or access conditions. Confirm it against an official site plan." }, { q: "Are fences accurate property boundaries?", a: "Not always. Fences can be offset, moved or built for practical reasons rather than on the legal line." }, { q: "Do garage conversions have the same setbacks as new ADUs?", a: "They may not. Existing structures and conversions can have different rules from new detached construction, so ask locally." }],
  }),
  editorialGuide({
    slug: "adu-building-permit-guide",
    image: "/blog/adu-permit-process.jpg",
    imageAlt: "ADU building permit application with approved construction drawings",
    title: "ADU Building Permit: A Practical Submission Guide",
    description: "Prepare an ADU building-permit application with the documents, decisions and review questions that help a project move from plans to inspections.",
    keyword: "adu building permit",
    category: "Academy",
    supportingKeywords: ["adu permit", "adu permit application", "accessory dwelling unit permit", "adu plan check", "adu inspections", "adu construction documents"],
    date: "2026-09-19",
    readingMinutes: 8,
    sources: [CALIFORNIA_HCD, DOE_HOME],
    opening: "The permit stage is where an ADU stops being an idea and becomes a regulated building project. A clean application does not guarantee instant approval, but it gives the reviewer the information needed to check the site, structure, energy, plumbing, electrical and life-safety details without guessing. The best time to prepare for plan check is while the design is still flexible.",
    answer: "An ADU building-permit package normally combines a site plan, architectural drawings and specialist documents required by the local authority. The exact list varies, but it often includes structural, electrical, plumbing, mechanical and energy information. Submit complete, coordinated drawings and respond to corrections in one controlled revision cycle rather than patching individual sheets at random.",
    table: { caption: "A typical permit path has several hand-offs.", headers: ["Stage", "Owner’s job", "Useful output"], rows: [["Feasibility", "Confirm land-use and site constraints", "Written rules summary and base survey"], ["Design", "Approve scope and key choices", "Coordinated plan set"], ["Submission", "Pay fees and provide documents", "Application receipt and plan-check log"], ["Construction", "Schedule inspections and keep records", "Final approval or certificate as applicable"]] },
    sections: [
      { heading: "Build the submission from one coordinated set", text: "The architect’s floor plan, engineer’s details and energy paperwork should describe the same building. Common delays happen when a window moves on one sheet but not another, a mechanical unit has no location or the site plan omits a utility route. Give one person responsibility for the document register so everyone works on the correct revision." },
      { heading: "Expect questions, not failure", text: "Plan-check comments are part of the normal process. Read them carefully, group related issues and ask a concise clarification question when the request is unclear. Resist the urge to answer only the easiest comments. A coordinated response that explains where each correction appears makes the next review faster and reduces the chance of new inconsistencies.", points: ["Log each comment, owner and response location.", "Do not change unrelated design items during correction unless necessary.", "Keep copies of every submitted revision and approval email."] },
      { heading: "Design for inspections while the work is visible", text: "Inspectors need to see work at specific stages, often before walls or floors are closed. Your contractor should plan the sequence for foundation, framing, rough services, insulation and final checks according to local requirements. Photograph concealed work and keep product documents, especially for equipment with code or energy-performance requirements. This protects the project if a question arises after the next trade has started." },
      { heading: "Use official guidance, not old forum threads", text: "Rules change. California HCD’s current handbook, for example, is updated to reflect state law and points homeowners towards the actual statutory framework. Your city or county may publish checklists, standard plans or submittal instructions. Use those current documents as the primary source and treat old articles as background only." },
    ],
    example: "A couple submit an ADU package with a clear floor plan but no final location for the outdoor heat-pump unit or drainage details. The reviewer returns both as corrections. On resubmission, the team moves the equipment onto the site plan, coordinates the electrical load and adds roof-water notes. The correction is not glamorous, but it prevents a later fight between the installer, electrician and inspector. A permit drawing earns its value by resolving those hand-offs before the work is hidden.",
    nextSteps: "Find your local ADU submittal checklist, appoint a person to control revisions and review the package against the actual site before filing. Keep the final approved drawings at the job site.",
    cta: { type: "cta", text: "Check ADU feasibility before permit design", href: "/" },
    faq: [{ q: "How long does an ADU permit take?", a: "Timing depends on the jurisdiction, application completeness and revision cycles. Ask the local authority about current review targets and required documents." }, { q: "Can I start construction while the permit is under review?", a: "Generally, no. Starting regulated construction without approval can create enforcement, insurance and resale problems." }, { q: "Who prepares ADU permit drawings?", a: "Depending on local requirements, architects, designers, engineers and specialised consultants may contribute to a coordinated permit set." }],
  }),
  editorialGuide({
    slug: "adu-construction-loans",
    image: "/blog/how-to-finance-an-adu.jpg",
    imageAlt: "Homeowner discussing an ADU construction loan draw schedule with a lender",
    title: "ADU Construction Loans: How Draw Funding Works",
    description: "Understand ADU construction loans, draw schedules, lender checks and the questions to settle before your builder starts work.",
    keyword: "adu construction loans",
    category: "Academy",
    supportingKeywords: ["construction loan for adu", "adu financing", "adu loan", "construction loan draw schedule", "home improvement loan", "adu lender"],
    date: "2026-09-19",
    readingMinutes: 8,
    sources: [CFPB_HELOC, FANNIE_ADU],
    opening: "A construction loan is designed for a project that is built in stages, not bought complete. That can suit a detached ADU, but it introduces a rhythm many homeowners have not met before: the lender approves a budget, money is released in draws as work is verified and the project must stay aligned with the approved scope. Understanding that rhythm before you hire a builder protects cash flow and reduces awkward surprises.",
    answer: "Construction financing can fund work in phases, but every lender has its own eligibility, draw process, appraisal approach, fees and conversion options. Compare the total borrowing cost and administrative burden with alternatives such as a home-equity loan or HELOC. The Consumer Financial Protection Bureau notes that HELOCs are revolving lines secured against home equity and often have adjustable rates, which may suit phased spending but carries payment and rate risk.",
    table: { caption: "Financing routes solve different cash-flow problems.", headers: ["Route", "How funds arrive", "Main question to ask"], rows: [["Construction loan", "Draws against verified progress", "What inspection and draw fees apply?"], ["HELOC", "Reusable line up to a limit", "How could variable payments change?"], ["Home-equity loan", "Lump sum", "Does the fixed amount match the project timing?"], ["Cash or staged savings", "Owner controls release", "Is the contingency sufficient for surprises?"]] },
    sections: [
      { heading: "Build the lender package from the real project", text: "A lender will usually want a defined scope, budget, contractor information and valuation evidence. Give them the same documents you use to control the build: approved or near-final plans, a detailed construction contract, payment schedule, contingency and proof of permits when required. If your builder’s quote says ‘allowance’ in several places, explain what those allowances cover before the loan is priced." },
      { heading: "Understand the draw schedule before signing", text: "Draws can be tied to milestones such as permit, foundation, framing, rough services and completion. Ask who requests the draw, how long inspection and release take, whether the contractor is paid directly and what happens if a milestone is delayed. A contractor who expects weekly payment while a lender funds monthly creates a cash-flow gap someone must carry.", points: ["Match contract milestones to lender milestones where possible.", "Ask whether retainage is held until final completion.", "Keep a contingency outside the base construction amount if the lender permits it."] },
      { heading: "Do not use future rent as a casual assumption", text: "Some mortgage products recognise qualifying income from an existing ADU subject to detailed documentation. Fannie Mae’s published guidance describes requirements around the property, appraisal and rental-income limits. That does not mean a new ADU’s hoped-for rent will automatically make any loan affordable. Treat projected rent as one input to a conservative household budget, and obtain lender-specific advice for your application." },
      { heading: "Compare the whole loan, not the teaser rate", text: "Interest rate matters, but so do origination fees, appraisal, inspection or draw fees, closing costs, rate variability, prepayment terms and the permanent loan after construction. Make a one-page comparison that shows the estimated payment at more than one rate if the product can adjust. Borrowing against a home carries real risk; a HUD-approved housing counsellor can help if affordability is uncertain." },
    ],
    example: "An owner receives a builder proposal with five payment milestones but applies for a loan that releases funds only after three inspections. Before signing, they ask the builder to align payments with the lender’s verified stages and set aside a separate contingency for utility surprises. It feels like paperwork, but it prevents the common mid-build problem where finished work cannot be paid for because the next draw has not yet been approved. The loan and the contract should describe the same project rhythm.",
    nextSteps: "Collect a complete scope, compare at least two financing routes and ask each lender for a written explanation of draw timing, fees and conversion or repayment terms. Make the affordability decision using a cautious payment estimate.",
    cta: { type: "cta", text: "Estimate your ADU project cost first", href: "/" },
    faq: [{ q: "Can I get a construction loan for an ADU?", a: "Some lenders offer construction financing for eligible ADU projects, but availability, underwriting and draw requirements vary." }, { q: "What is a construction-loan draw?", a: "A draw is a release of loan funds as work reaches an agreed, often inspected, stage." }, { q: "Is a HELOC better than a construction loan for an ADU?", a: "It depends on equity, rate risk, project timing and lender terms. Compare total cost and cash-flow mechanics, not just the headline rate." }],
  }),
  editorialGuide({
    slug: "adu-loan-rates",
    image: "/blog/how-to-finance-an-adu.jpg",
    imageAlt: "ADU loan rate comparison notes and a home construction budget",
    title: "ADU Loan Rates: Compare Offers Without Guesswork",
    description: "ADU loan rates are only one part of the cost. Learn how to compare APR, fixed and variable borrowing, fees, draw timing and payment risk.",
    keyword: "adu loan rates",
    category: "Academy",
    supportingKeywords: ["adu loan interest rates", "adu financing rates", "heloc rates", "construction loan rates", "home equity loan for adu", "adu payment calculator"],
    date: "2026-09-18",
    readingMinutes: 7,
    sources: [CFPB_HELOC, FANNIE_ADU],
    opening: "Looking for an ADU loan rate is sensible, but a single percentage can hide the choices that make borrowing affordable or painful. Is the rate fixed or adjustable? Does it apply to the amount you draw or the full approved limit? Are fees added to the balance? What will the payment be after an introductory period? A good comparison makes those questions visible before a sales call turns them into a signature.",
    answer: "There is no universal ADU loan rate. Your offer depends on the loan product, loan-to-value ratio, credit profile, property, term and market conditions. The Consumer Financial Protection Bureau distinguishes a lump-sum home-equity loan from a HELOC, which is a revolving line and usually has an adjustable rate. Construction products have their own draw and conversion mechanics. Compare the actual offer documents, including APR and fees, rather than a generic online figure.",
    table: { caption: "A useful ADU finance comparison looks beyond the interest rate.", headers: ["Item", "Why it matters", "What to record"], rows: [["Rate type", "Variable payments can rise", "Index, margin, cap and reset timing"], ["APR and fees", "Upfront charges alter cost", "Origination, appraisal and closing fees"], ["Draw mechanics", "Funds may not arrive all at once", "Inspection, release time and draw fee"], ["Term and payment", "A low rate can mask a high later payment", "Monthly payment at realistic scenarios"]] },
    sections: [
      { heading: "Separate a rate from an APR", text: "The interest rate describes the borrowing rate; APR is designed to reflect certain finance charges over time. Both can be useful, but neither replaces reading the disclosure. Ask the lender to identify every charge that is paid at closing, financed into the loan or charged on each draw. Use the same loan amount and term when comparing offers so the figures have a fair basis." },
      { heading: "Model the uncomfortable scenario", text: "If a product is variable, calculate a payment at the current rate and at a higher rate within the stated cap. If the product is interest-only during construction, calculate the fully amortising payment that follows. This is not pessimism; it is household planning. An ADU that only works when every assumption is perfect is carrying too much financial pressure.", points: ["Use the lender’s stated adjustment rules, not a made-up number.", "Include property tax, insurance and maintenance in the household budget.", "Do not rely on expected rental income until lender treatment is confirmed."] },
      { heading: "Watch the timing of cash, not only the final payment", text: "A project can be affordable in total but still fail in the middle if permits, deposits or builder invoices arrive before finance is available. Ask when the first funds can be drawn, whether invoices must be paid before reimbursement and how quickly inspections are scheduled. Finance that fits the construction timetable can be more valuable than a slightly lower rate with a slow release process." },
      { heading: "Keep marketing claims at arm’s length", text: "A lender or broker may quote a ‘starting at’ rate that is not available for your project. Ask for an itemised, dated loan estimate or equivalent disclosure, and compare it with an independent source of advice if anything feels unclear. Borrowing against the home puts the home at risk if repayments cannot be met, so clarity is worth more than a rushed decision." },
    ],
    example: "A homeowner sees one offer with a lower advertised rate and another with a slightly higher fixed rate. The first has a variable line, fees for each draw and an introductory period that ends before the project is likely to be fully rented. The second costs more initially but gives a predictable payment. Neither is automatically better. Once the owner models both payments, all fees and the actual draw calendar, the choice becomes a personal risk decision rather than a headline-rate contest.",
    nextSteps: "Ask lenders for written disclosures, put rate type, APR, fees, draw rules and payments in one comparison table, then revisit the project budget before accepting any offer.",
    cta: { type: "cta", text: "Calculate an ADU project budget", href: "/" },
    faq: [{ q: "What is a good ADU loan rate?", a: "The right rate depends on the product and your circumstances. Compare the full offer, including APR, fees, payment changes and lender requirements." }, { q: "Are HELOC rates fixed?", a: "HELOCs usually have adjustable interest rates, though product features vary. Check the lender’s current disclosure." }, { q: "Should I choose the lowest APR?", a: "APR is important, but also compare whether the product funds the project when needed and whether the payment risk suits your household." }],
  }),
  editorialGuide({
    slug: "adu-roi-calculator-guide",
    image: "/blog/adu-rental-income-and-roi.jpg",
    imageAlt: "ADU ROI calculator showing rental income, operating costs and payback",
    title: "ADU ROI Calculator: Model Returns Before You Build",
    description: "Use an ADU ROI calculator with realistic rent, vacancy, operating costs and finance. Learn the simple maths and the assumptions worth testing.",
    keyword: "adu roi calculator",
    category: "Academy",
    supportingKeywords: ["adu return on investment", "adu rental income calculator", "adu payback period", "adu cash flow", "backyard cottage roi", "adu investment analysis"],
    date: "2026-09-18",
    readingMinutes: 8,
    sources: [FANNIE_ADU, CFPB_HELOC],
    opening: "An ADU ROI calculator can turn a hopeful rental figure into a useful decision model, but only if it includes the costs people prefer to ignore. Rent is not profit. Vacancy, repairs, utilities, insurance, management, taxes and loan payments all change the outcome. The goal is not to predict the future perfectly. It is to see which assumptions matter most and whether the project still works when reality is less generous than the brochure.",
    answer: "Start with all-in project cost, conservative market rent, a vacancy allowance, operating costs and financing. Then calculate annual net income, simple payback and cash flow after debt service. Keep property value uplift separate from rental cash flow: it may be meaningful, but it is harder to realise without selling or refinancing. A good model shows a range, not one seductive number.",
    table: { caption: "A practical ROI model separates operating performance from financing.", headers: ["Input", "Conservative treatment", "Why it matters"], rows: [["Rent", "Use verified comparable listings or appraisal evidence", "Advertised rents may not be achieved"], ["Vacancy", "Set aside a period without rent", "No unit is occupied every day forever"], ["Operating costs", "Include repairs, insurance and utilities as applicable", "Gross rent is not net income"], ["Debt service", "Use actual payment scenarios", "Cash flow can change as rates reset"]] },
    sections: [
      { heading: "Build the cost side from the final scope", text: "Use the same all-in budget you would take to a lender: design, permits, site work, construction, utility charges, furnishings if relevant and contingency. Do not hide a large amount in ‘miscellaneous’. If the project cost is uncertain, model a base case and a higher case. A return that disappears after a modest cost increase deserves more design work before construction begins." },
      { heading: "Use rent evidence, not wishful thinking", text: "Look for comparable legal rentals with similar location, privacy, parking, furnishing and utility arrangements. Fannie Mae’s ADU materials describe the role of market-rent documentation and appraisal in lending contexts. That is a useful discipline even if you are not applying for that product: compare the actual unit you plan to offer, not a larger apartment or a whole house in a different neighbourhood.", points: ["Record the date, location and features of each comparable.", "Separate long-term rent from seasonal or short-term-rental assumptions.", "Check local rules before using short-term-rental revenue in any model."] },
      { heading: "Know the three return numbers", text: "Gross yield divides annual rent by project cost. Net yield subtracts operating costs. Simple payback divides project cost by annual net income. Cash flow after debt service then shows how the chosen finance affects monthly reality. Each number answers a different question. A unit can have a healthy long-term yield but negative early cash flow if the financing is expensive, and that may still be acceptable or unacceptable depending on your household plan." },
      { heading: "Stress-test the model", text: "Run at least three cases: conservative, expected and difficult. In the difficult case, reduce rent, add vacancy and increase cost or payment. The point is to find the break-even assumptions. If a project works only at the highest possible rent and lowest possible cost, it is not robust. If it remains manageable after a bad month or two, you can proceed with clearer eyes." },
    ],
    example: "A homeowner budgets $220,000 all-in and expects $2,000 monthly rent. Instead of recording $24,000 as annual profit, they model a vacancy allowance, insurance, maintenance, a share of utilities and the actual loan payment. The first version has modest but positive cash flow; the difficult case has a small monthly shortfall. That does not automatically kill the project. It tells the owner to look for a lower-cost design, a different finance route or a use case with family value beyond rent. The calculator has done its real job: it has exposed the decision.",
    nextSteps: "Use a conservative rent range, enter every known cost, model more than one financing scenario and decide what level of monthly risk you can genuinely carry.",
    cta: { type: "cta", text: "Estimate your ADU cost before modelling ROI", href: "/" },
    faq: [{ q: "How do I calculate ADU ROI?", a: "Estimate annual net income after vacancy and operating costs, then compare it with the complete project cost. Also model cash flow after loan payments." }, { q: "Does property value increase count as ROI?", a: "It can be part of the overall investment case, but it is separate from rental cash flow and may only be realised on sale or refinancing." }, { q: "Should I include short-term rental income?", a: "Only if it is permitted locally and you model its higher vacancy, management and regulatory risk conservatively." }],
  }),
  editorialGuide({
    slug: "fannie-mae-adu-requirements",
    image: "/blog/adu-rental-income-and-roi.jpg",
    imageAlt: "Mortgage appraisal paperwork for Fannie Mae ADU requirements",
    title: "Fannie Mae ADU Requirements: What Borrowers Should Know",
    description: "A plain-English guide to Fannie Mae ADU requirements, appraisals and rental-income rules. Use it to prepare questions for a lender, not as loan advice.",
    keyword: "fannie mae adu requirements",
    category: "Academy",
    supportingKeywords: ["fannie mae adu rental income", "adu mortgage requirements", "adu appraisal requirements", "home ready adu income", "accessory dwelling unit financing", "adu refinance"],
    date: "2026-09-18",
    readingMinutes: 8,
    sources: [FANNIE_ADU, { name: "Fannie Mae Selling Guide, rental income from the subject property", href: "https://selling-guide.fanniemae.com/sel/b3-3.8-02/rental-income-subject-property", note: "Current eligibility and documentation terms should be verified with the lender." }],
    opening: "Fannie Mae’s ADU guidance matters because lenders use it to make decisions about eligible mortgages, appraisals and rental income. It is not a promise that any borrower will qualify, and it does not replace a lender’s underwriting. It does, however, give homeowners a much better set of questions to ask before they assume a future or existing ADU will change their borrowing power.",
    answer: "Fannie Mae describes an ADU as an additional independent living space on the same lot as a one-unit primary home, with living, sleeping, cooking and bathing facilities and independent access. Its published materials set conditions for using ADU rental income in qualifying, including property, appraisal and documentation requirements. Policies change, so the lender must confirm the current rule for your transaction.",
    table: { caption: "Use these points to prepare a lender conversation.", headers: ["Topic", "Why it matters", "Question to ask"], rows: [["ADU classification", "The space must meet the relevant definition", "How will the appraiser classify this unit?"], ["Rental income", "It may be limited and documented", "Can it be used for this loan and how?"], ["Appraisal", "Market rent needs support", "What report or comparable evidence is required?"], ["Transaction type", "Rules differ by purpose", "Is this purchase, refinance or construction route eligible?"]] },
    sections: [
      { heading: "Understand the unit before discussing income", text: "The lender and appraiser need to know what is physically and legally present. An independent entrance, cooking area, sleeping area and bathroom are not cosmetic details. They affect the way the property is described and valued. If you are planning a future ADU, ask how the proposed build and final legal status would be documented. If you already have one, gather permits, plans, lease information and any records of its legal use." },
      { heading: "Rental income has guardrails", text: "Fannie Mae’s published requirements say that rental income from one existing ADU may be eligible in certain cases and are subject to limits and documentation. The rules in force at the time of the loan, the borrower’s profile and the lender’s overlays all matter. Do not convert a marketing message about ‘using future rent’ into a personal affordability conclusion. Ask the lender to state exactly what income they can count and what evidence they need." },
      { heading: "Appraisal evidence is central", text: "Market rent has to be supported rather than guessed. Fannie Mae explains that appraisers may use appropriate rental comparables, including adjusted non-ADU rentals where true ADU comparables are scarce. For a homeowner, the practical lesson is to keep the unit legal, complete and well documented. A nice finish does not replace evidence of independent utility and market rent." },
      { heading: "Prepare a factual lender pack", text: "Bring the property address, ADU permits, plans, photos, lease if there is one, a list of improvements and sensible local rent comparables. Do not try to make the unit sound larger or more separate than it is. A clean factual pack lets the lender and appraiser do their jobs and makes it easier to understand any limits that apply." },
    ],
    example: "A homeowner plans to refinance after completing a permitted ADU. They assume the advertised rent will simply be added to their income. Their lender explains that the transaction type, appraisal, property details and qualifying-income limits all matter. Because the owner has kept permits, final inspection records and a clear rental-market file, the lender can give a precise answer instead of working from a vague description. The paperwork does not guarantee an outcome, but it replaces hope with evidence.",
    nextSteps: "Read the current Fannie Mae materials, then ask a qualified lender about your specific transaction. Keep your ADU’s permits, plans and final approvals organised from the start.",
    cta: { type: "cta", text: "Estimate the ADU project you are financing", href: "/" },
    faq: [{ q: "Can Fannie Mae use ADU rental income to qualify a borrower?", a: "Its published guide permits it in certain eligible situations subject to documentation and limits. A lender must determine whether your loan qualifies." }, { q: "Does a second kitchen automatically make a space an ADU?", a: "No. Fannie Mae’s guidance considers the full independent living setup and access, not just the presence of a kitchen." }, { q: "Do I need ADU rental comparables?", a: "Appraisal and market-rent documentation are important. Ask the lender and appraiser what evidence is required for your transaction." }],
  }),
  editorialGuide({
    slug: "adu-design-ideas",
    image: "/blog/container-home-adu.jpg",
    imageAlt: "Thoughtful ADU design ideas for a compact garden home",
    title: "ADU Design Ideas That Make Small Homes Work Harder",
    description: "Use practical ADU design ideas for light, storage, privacy, accessibility and energy performance without adding expensive, unnecessary complexity.",
    keyword: "adu design ideas",
    category: "Academy",
    supportingKeywords: ["adu designs", "small adu ideas", "backyard cottage design", "adu interior design", "accessible adu design", "energy efficient adu"],
    date: "2026-09-18",
    readingMinutes: 7,
    sources: [DOE_HOME, CALIFORNIA_HCD],
    opening: "The most successful ADU designs are rarely the ones with the most fashionable finishes. They are the ones that notice everyday things: where wet shoes go, whether you can put down a shopping bag, how a guest enters after dark, where towels live and whether two households can look out of their windows without living in each other’s pockets. Small homes reward this kind of attention.",
    answer: "Begin with light, privacy, storage and a simple building shape. Place windows for the site rather than for a generic elevation, create one calm route from entry to living space and give the kitchen and bathroom enough working room. Then add a performance-first envelope and systems that suit the compact area. Decorative features should support the use of the home, not compete with it.",
    table: { caption: "Design moves with a high return in a small ADU.", headers: ["Design move", "Benefit", "Cost trap to avoid"], rows: [["Built-in storage zone", "Reduces clutter and furniture needs", "Custom joinery everywhere"], ["Shared plumbing wall", "Simplifies services", "Forcing an awkward layout just to save pipe"], ["Well placed windows", "Light and privacy", "Large glazing without shading or insulation strategy"], ["Level entry", "Useful for all ages", "Adding steps because they look traditional"]] },
    sections: [
      { heading: "Use the site as a design input", text: "Stand on the proposed footprint at morning, midday and evening. Notice sun, neighbour windows, noise, prevailing weather and the path from the street. A window that frames a tree may be better than a larger one that looks straight into a neighbour’s dining room. A small covered entry can make daily life easier than an oversized feature wall. The site gives the project a character no catalogue plan can supply." },
      { heading: "Make storage part of the architecture", text: "Compact homes become tiring when storage is left for later. Give coats, cleaning supplies, luggage, linen, pantry items and laundry a planned home. This does not require bespoke cabinetry in every corner. One full-height cupboard, a properly sized wardrobe and an entry bench with hooks can do more for the feel of the home than an expensive decorative shelf." },
      { heading: "Spend on comfort before spectacle", text: "The Department of Energy’s efficient-home materials emphasise how enclosure and systems work together. For an ADU, a well-insulated and air-sealed shell, appropriate glazing, ventilation and a right-sized heat-pump system can improve comfort every single day. Those choices may not dominate a social-media photograph, but they reduce drafts, noise and operating cost. They are design choices in the most useful sense.", points: ["Locate outdoor equipment with noise and maintenance in mind.", "Use shading where sun exposure would overheat small rooms.", "Coordinate lighting, switches and outlets with the furniture plan."] },
      { heading: "Design for changing needs", text: "A simple step-free entry, a bathroom that can take grab rails later and a room that can work as a study or bedroom give an ADU a longer useful life. The California HCD handbook recognises the role ADUs can play for extended families and ageing in place. Flexible design is not a clinical look; it is a home that does not need rebuilding when a resident’s needs change." },
    ],
    example: "A designer is asked for a ‘luxury’ 600 sq ft ADU. Instead of starting with expensive finishes, the team creates a covered entry, a proper coat-and-laundry cupboard, cross ventilation, a quiet bedroom wall and a step-free shower. They simplify the roof and use the saved construction complexity for better windows and insulation. The result feels more considered than the first render because it is easier to live in on a rainy Tuesday, not just attractive in a photograph.",
    nextSteps: "Make a site observation list, define the resident’s routine and choose three performance priorities before browsing finishes. Use the plan to coordinate storage, furniture, light and services together.",
    cta: { type: "cta", text: "Estimate the cost of your ADU design", href: "/" },
    faq: [{ q: "What design features make an ADU feel bigger?", a: "Good daylight, clear circulation, useful storage and furniture-scaled rooms usually make the biggest difference." }, { q: "Should an ADU have an accessible entrance?", a: "A level or step-free entrance can benefit many residents and is easier to include at design stage. Check local accessibility requirements." }, { q: "Are big windows always a good ADU design idea?", a: "No. Window placement should balance daylight, privacy, heat gain, insulation and the actual view from the site." }],
  }),
  editorialGuide({
    slug: "mother-in-law-suite-cost",
    image: "/blog/adu-for-aging-parents.jpg",
    imageAlt: "Comfortable mother-in-law suite ADU designed for independent family living",
    title: "Mother-in-Law Suite Cost: Plan a Family ADU",
    description: "Plan the cost of a mother-in-law suite or family ADU. Compare conversion and new-build routes, accessibility decisions and financing questions.",
    keyword: "mother in law suite cost",
    category: "Academy",
    supportingKeywords: ["in law suite cost", "granny flat cost", "adu for parents", "accessible adu cost", "garage conversion for family", "backyard cottage budget"],
    date: "2026-09-18",
    readingMinutes: 8,
    sources: [CALIFORNIA_HCD, CFPB_HELOC],
    opening: "A mother-in-law suite is an emotional project as well as a construction project. It can give a parent privacy and proximity at the same time, but the budget must include the details that make independence genuine: safe entry, a bathroom that works on a difficult day, storage, quiet heating and cooling and enough room for visitors. Starting with those needs produces a more useful cost estimate than picking a number from a generic ADU advert.",
    answer: "The cost of a mother-in-law suite depends first on whether you are converting existing space or building a new, self-contained ADU. A garage or basement conversion can save on the shell when it is structurally suitable, while a detached unit may provide more privacy and accessibility. Spend early on the features that support daily living; retrofitting a threshold, shower or narrow doorway later is usually far more disruptive.",
    table: { caption: "Family ADU decisions should be judged against independence, not just construction cost.", headers: ["Choice", "Potential benefit", "Budget question"], rows: [["Conversion", "May reuse existing structure", "Can the slab, access and services meet code?"], ["Detached unit", "More privacy and adaptable layout", "What site work and utilities are needed?"], ["Single-storey plan", "Avoids stairs", "Can it fit within the site constraints?"], ["Accessible bathroom", "Supports longer independence", "Is future grab-rail blocking included?"]] },
    sections: [
      { heading: "Start with the resident’s routine", text: "Talk through getting up, showering, cooking, receiving post, taking bins out, having friends visit and getting help in an emergency. It can feel detailed, but it prevents a design that looks kind on paper and is difficult in practice. A parent may value a quiet bedroom, a separate entrance and a place to make tea more than an extra metre of living room. Put those priorities in writing before sizing the unit." },
      { heading: "Build in accessibility while walls are open", text: "Level entries, generous routes, lever handles, sensible lighting, a step-free shower and wall blocking for future grab rails are much easier to plan than retrofit. Not every resident needs every feature today. That is precisely why a flexible plan is valuable. It gives the household options without turning the home into an institution.", points: ["Avoid abrupt level changes at entrances and showers.", "Keep a clear route between bed, bathroom and kitchen.", "Consider lighting controls that are easy to reach and understand."] },
      { heading: "Compare family value and financial value separately", text: "A family ADU may produce rent later, but its first value might be avoiding a stressful move or making support practical. Do not force that benefit into a simple rental-yield calculation. Record the cash budget and finance separately, then write down the family outcomes you are buying: proximity, privacy, flexible guest space or future rental potential. A good decision can have both kinds of value without pretending they are the same number." },
      { heading: "Use finance with care", text: "Home-equity borrowing may be one route for a family ADU, but it is secured against the home. The CFPB explains the difference between a lump-sum home-equity loan and a HELOC, including the variable-rate nature common to HELOCs. Compare the payment with the household’s existing commitments and get independent advice if the new borrowing would make the budget tight." },
    ],
    example: "Two siblings want a suite for their father. One imagines a converted garage because it sounds cheap; the other wants a detached cottage for privacy. The feasibility check shows the garage has a damp slab, a step at the only entrance and a long route to a suitable bathroom. A small detached single-storey unit costs more in structure but makes a level entry, accessible bathroom and quiet bedroom straightforward. The family can now compare real costs and real benefits, rather than arguing from a vague idea of ‘cheap’.",
    nextSteps: "Write a resident-first brief, check conversion feasibility honestly and price accessibility features as core scope. Then choose a funding route only after you know the all-in project budget.",
    cta: { type: "cta", text: "Estimate a family ADU or in-law suite", href: "/" },
    faq: [{ q: "Is a mother-in-law suite the same as an ADU?", a: "It can be. A self-contained suite on the same lot may qualify as an ADU, but local definitions and permit requirements apply." }, { q: "What makes a family ADU accessible?", a: "A level entry, clear circulation, accessible bathroom planning and good lighting are common high-value features." }, { q: "Is a garage conversion cheaper for an in-law suite?", a: "It can be if the existing structure and services are suitable, but accessibility, moisture and code upgrades can change the cost materially." }],
  }),
  editorialGuide({
    slug: "california-adu-law-2026-update",
    image: "/blog/california-adu-rules-2026.jpg",
    imageAlt: "California home and current 2026 ADU law handbook update",
    title: "California ADU Law 2026: What the New Handbook Says",
    description: "The California HCD ADU Handbook was updated in 2026. Learn how to use current state guidance alongside your city’s permit process.",
    keyword: "california adu law 2026",
    category: "News",
    supportingKeywords: ["california adu rules 2026", "california adu handbook", "hcd adu handbook", "california accessory dwelling unit law", "adu permit california", "california jadu rules"],
    date: "2026-09-23",
    readingMinutes: 7,
    sources: [CALIFORNIA_HCD, { name: "California HCD, ADU Handbook page", href: "https://www.hcd.ca.gov/building-standards/adu/handbook", note: "Official handbook, addendum and webinar links." }],
    opening: "California homeowners researching an ADU in 2026 should start with the current state source, not a three-year-old explainer. The Department of Housing and Community Development’s ADU Handbook was updated in March 2026 and includes an addendum covering changes effective on 1 January 2026. That is important because the state framework and your local permit process have to be read together. This is a practical guide to using the handbook without mistaking it for a site-specific approval.",
    answer: "The 2026 HCD handbook is the authoritative statewide starting point for California ADU and JADU questions. It explains the state framework, but your city or county still applies it to the real parcel, plans, services and building-code details. Use the handbook to identify the state baseline, then ask local staff for the current submittal checklist and any site-specific requirements.",
    table: { caption: "Use the 2026 handbook in the right order.", headers: ["Question", "Best starting source", "Next check"], rows: [["State ADU and JADU rules", "HCD ADU Handbook and addendum", "City or county ordinance and checklist"], ["Your parcel’s potential", "Official zoning map and planning desk", "Survey, access and utilities"], ["Permit documents", "Local building department instructions", "Coordinated design team documents"], ["Project cost", "Written scopes from providers", "Site-specific allowances and fees"]] },
    sections: [
      { heading: "Why the update matters now", text: "HCD states that its March 2026 handbook reflects changes to state ADU law and links to its addendum and 2026 webinar. That means any article quoting old section numbers, owner-occupancy assumptions or fee guidance should be treated with care. The practical response is not to memorise every line. It is to use the current handbook as the baseline document when you talk to planning staff, a designer or a builder." },
      { heading: "The statewide framework is not the whole permit", text: "State law can limit what a local agency may require, but a specific project still has a location, existing structures, utilities and code issues. The city needs to see the actual plan. A homeowner who says ‘state law allows it’ without a survey or site plan is only halfway through the work. Keep both ideas true at once: know your rights under the state framework and prepare a buildable proposal for your parcel.", points: ["Save the handbook version and date in the project folder.", "Ask the city for its current ADU application checklist.", "Document site constraints and service routes before full design."] },
      { heading: "Read fee and timing claims carefully", text: "ADU articles often repeat a simple claim about approval time or fees without saying what conditions apply. The handbook is the place to understand the actual rule and its boundaries. Your local schedule and complete application still determine the practical path. If a contractor gives you a confident promise, ask which official source and which project assumptions support it." },
      { heading: "Use the handbook to ask precise questions", text: "Bring a short list: Is this lot eligible? Which setbacks and height rules apply? What documents are required? Are there utility or fire-access issues? What is the current fee schedule? Is a pre-application meeting available? Precise questions earn useful answers and leave a written record you can share with the rest of the project team." },
    ],
    example: "A homeowner finds an older blog post saying their local city cannot ask for a particular item. The city’s current checklist seems to say something different. Instead of treating either source as a reason to argue, they read the current HCD handbook, identify the relevant state rule and ask the planning desk how it applies to their conversion project. The answer reveals that the city’s checklist needs a site-specific document, not a discretionary approval. That distinction keeps the project moving and avoids a pointless standoff.",
    nextSteps: "Download the current HCD handbook, save the addendum, then obtain your city or county’s latest ADU checklist. Use both alongside a parcel-specific feasibility review.",
    cta: { type: "cta", text: "Check California ADU feasibility and cost", href: "/california" },
    faq: [{ q: "Where can I find the current California ADU Handbook?", a: "HCD publishes the current handbook, addendum and related materials on its official ADU Handbook page." }, { q: "Does the state handbook approve my specific ADU?", a: "No. It explains state law; your city or county still reviews the actual parcel and permit documents." }, { q: "Should I rely on an old California ADU article?", a: "Use current official HCD and local-government material first, because state law and implementation guidance can change." }],
  }),
  editorialGuide({
    slug: "prefab-vs-site-built-adu-review",
    image: "/blog/prefab-adu-cost.jpg",
    imageAlt: "Prefab and site-built ADU construction approaches compared on a backyard site",
    title: "Prefab vs Site-Built ADU: An Honest Comparison",
    description: "Compare prefab and site-built ADUs on cost scope, programme, design freedom, site access and risk. Pick the route that fits your lot.",
    keyword: "prefab vs site built adu",
    category: "Reviews",
    supportingKeywords: ["prefab adu vs site built", "modular adu vs traditional build", "prefab backyard home", "site built adu cost", "modular adu installation", "best adu construction method"],
    date: "2026-09-22",
    readingMinutes: 8,
    sources: [FANNIE_ADU, DOE_HOME],
    opening: "Prefab versus site-built is not a contest between modern and old-fashioned construction. It is a choice between two supply chains. Factory work can bring repeatability and shorten some on-site work; site-built construction can respond gracefully to a tight, sloping or highly customised plot. The right answer depends less on a brochure and more on access, foundations, utility routes, local approval and the level of design control you need.",
    answer: "Prefab can be compelling when the manufacturer has a suitable model, the factory slot is available and the site can accept delivery and installation. Site-built can be a better fit for difficult access, unusual lots or a plan that needs local adaptation. In both cases, price the complete project: design, permits, foundation, transport, crane or installation, utilities, finishes and landscaping. The ‘unit price’ alone is not a comparison.",
    table: { caption: "Neither route wins every project.", headers: ["Question", "Prefab can suit", "Site-built can suit"], rows: [["Access", "Clear delivery and crane route", "Narrow, steep or constrained access"], ["Design", "Standardised, proven layouts", "Highly tailored plan or unusual site"], ["Programme", "Factory and site work can overlap", "Local sequencing can adapt to changes"], ["Scope control", "Clear manufacturer boundary", "One local team may own more interfaces"]] },
    sections: [
      { heading: "Compare the complete scope, not the box", text: "A factory quote may cover a finished module yet exclude the things that make it habitable on your lot: a foundation, grading, delivery, craning, installation, permits, utility connections, decks and landscaping. A site-built quote may include some of these but leave appliances or engineering as allowances. Put both on the same scope sheet and mark every boundary between suppliers. That is where the real comparison begins." },
      { heading: "Let access decide early", text: "Measure the route from the road to the final position, including turns, overhead wires, trees, slopes and neighbour constraints. A module that cannot be delivered without extraordinary lifting or temporary removals may lose its programme and price advantage. Conversely, a straightforward rear-yard site may make factory installation very efficient. Do not trust a generic site-access assumption; have it assessed for the actual model and route.", points: ["Ask who verifies delivery access and who bears the risk.", "Confirm foundation tolerances and timing before the factory date.", "Check whether the site can safely store materials or a module if schedules change."] },
      { heading: "Look at performance and maintainability", text: "Either route can produce a comfortable, durable home when the envelope, ventilation, heating and cooling are properly designed and commissioned. The Department of Energy’s high-performance-home guidance applies to the whole system, not the label on the construction method. Ask how windows, insulation, air sealing, ventilation and equipment servicing are handled. A factory-built unit is not automatically efficient, and a site-built unit is not automatically wasteful." },
      { heading: "Review warranty and responsibility boundaries", text: "With a prefab project, there may be a manufacturer, transporter, installer, foundation contractor and utility contractor. With site-built work, there may be a general contractor plus specialist trades. In either case, ask who is responsible when a connection between scopes fails. The best contract names the hand-off, inspection and remedy process rather than leaving you to referee it after installation." },
    ],
    example: "A family likes a modular two-bedroom ADU with a published factory price. Their lot, however, has a narrow side path and mature trees that block a crane. A site-built quote is higher on framing but lower on access risk and lets the designer rotate the plan around a sewer easement. On a different, wide-access lot, the same modular product might be the better choice. The review outcome is not a brand verdict. It is a fit-for-site decision based on the full scope.",
    nextSteps: "Get a written scope from both routes, verify access with the actual provider and compare warranties, interfaces, timing and total price before choosing a construction method.",
    cta: { type: "cta", text: "Compare prefab and site-built ADU costs", href: "/cost/prefab" },
    faq: [{ q: "Is a prefab ADU always cheaper?", a: "No. Factory pricing may be competitive, but foundation, delivery, installation, utilities and site constraints can change the all-in result." }, { q: "Can a prefab ADU be financed?", a: "Financing depends on the lender, product, construction method and legal property status. Discuss the specific project with qualified lenders." }, { q: "Is site-built better for a difficult lot?", a: "Often it can be more adaptable, but the right choice depends on access, slope, utilities, local rules and the available providers." }],
  }),
].filter((post) => ![
  // Established guides already own these intents, so publishing another version
  // would split relevance rather than extend the content cluster.
  "adu-setback-requirements",
  "adu-loan-rates",
].includes(post.slug)).map((post) => ({
  ...post,
  date: EDITORIAL_PUBLICATION_DATES[post.slug] ?? post.date,
}));

POSTS.push(...SEPTEMBER_POSTS);
