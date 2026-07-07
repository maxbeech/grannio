// Financing partner directory — config-driven so links can be swapped without touching
// any component. Every href below is a real, currently-live public page (verified, not
// guessed) — none carry affiliate tracking yet. Once a partner programme is signed, swap
// the `href` for the tracked affiliate link and set `affiliate: true`; nothing else changes.

export interface FinancingPartner {
  name: string;
  description: string;
  href: string;
  cta: string;
  affiliate: boolean;
  status?: string; // honest caveat when a programme isn't fully live right now
}

export const FINANCING_PARTNERS: FinancingPartner[] = [
  {
    name: "RenoFi",
    description:
      "Renovation-specific loans (home equity loan, HELOC or cash-out refinance) that lend against your home's value after the ADU is built, so you can often borrow more than a standard HELOC allows.",
    href: "https://www.renofi.com/adus/adu/financing/",
    cta: "Compare RenoFi ADU loan options",
    affiliate: false,
  },
  {
    name: "Fannie Mae HomeStyle Renovation",
    description:
      "A conventional mortgage that rolls ADU construction costs into a single loan, with down payments as low as 3% for qualifying first-time buyers.",
    href: "https://yourhome.fanniemae.com/buy/homestyle-renovation",
    cta: "See HomeStyle Renovation",
    affiliate: false,
  },
  {
    name: "CalHFA ADU Grant Program",
    description:
      "Reimburses up to $40,000 of pre-development costs (design, permits, soil tests) for California homeowners building an ADU.",
    href: "https://www.calhfa.ca.gov/adu/",
    cta: "Check CalHFA grant status",
    affiliate: false,
    status: "Current round of funding is fully allocated — the page covers what to check for reopening.",
  },
];
