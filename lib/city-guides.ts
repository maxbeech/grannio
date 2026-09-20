// Verified municipal guidance for city pages that are eligible for indexing.
// Keep these records factual and source-backed: unsupported city routes remain
// useful calculator entry points, but are deliberately excluded from search.

export interface CityGuide {
  stateSlug: string;
  citySlug: string;
  sourceTitle: string;
  sourceUrl: string;
  reviewedAt: string;
  summary: string;
  facts: readonly string[];
}

export const CITY_GUIDES: readonly CityGuide[] = [
  {
    stateSlug: "georgia",
    citySlug: "atlanta",
    sourceTitle: "City of Atlanta zoning, development and permitting services",
    sourceUrl: "https://www.atlantaga.gov/government/departments/city-planning/zoning-development-permitting-services/getting-started-with-our-zd-p-services",
    reviewedAt: "2026-09-21",
    summary:
      "Atlanta treats ADUs as a project that needs zoning and permitting review. What can be built depends on the parcel's zoning district and the scope of the work, so start by checking the address before commissioning plans.",
    facts: [
      "Atlanta's Department of City Planning lists ADUs among commonly permitted projects.",
      "The city says approval and permitting depend on the scope of work and zoning district.",
      "Use the city parcel and zoning tools to confirm the property's district before relying on a cost estimate.",
    ],
  },
  {
    stateSlug: "georgia",
    citySlug: "augusta",
    sourceTitle: "Augusta-Richmond County zoning ordinance, Article 3",
    sourceUrl: "https://www.augustaga.gov/DocumentCenter/View/19957/Article-3-_-Use-Regulations",
    reviewedAt: "2026-09-21",
    summary:
      "Augusta-Richmond County's zoning ordinance sets city-specific conditions for ADUs. It requires a building permit for a new ADU or a conversion and requires the proposal to meet zoning, building, health and safety codes.",
    facts: [
      "One household is permitted per ADU under the ordinance's general requirements.",
      "Either the primary residence or ADU must be owner-occupied for at least nine months of the calendar year.",
      "An ADU cannot be sold separately from the principal dwelling, and short-term rental use is restricted unless another local ordinance expressly allows it.",
    ],
  },
];

export function getCityGuide(stateSlug: string, citySlug: string): CityGuide | undefined {
  return CITY_GUIDES.find((guide) => guide.stateSlug === stateSlug && guide.citySlug === citySlug);
}
