import { getCityGuide } from "@/lib/city-guides";
import { ADU_TYPES } from "@/lib/cost";
import { POSTS } from "@/lib/posts";
import { site } from "@/lib/site";
import { STATES, citySlug, type StateData } from "@/lib/states";

// The XML sitemap must advertise only URLs with enough first-party or official
// source material to stand independently in search. This prevents the sitemap
// from asking Google to crawl generic, scaled location variations.
export function isStateIndexable(state: StateData): boolean {
  return state.rules.statewideLaw;
}

export function isCityIndexable(stateSlug: string, citySlug: string): boolean {
  return getCityGuide(stateSlug, citySlug) !== undefined;
}

export interface SitemapEntry {
  url: string;
  lastModified: Date;
  changeFrequency: "weekly" | "monthly" | "yearly";
  priority: number;
}

export function getIndexableSitemapEntries(): SitemapEntry[] {
  const reviewedAt = new Date(`${site.contentLastReviewed}T00:00:00.000Z`);
  const entries: SitemapEntry[] = [
    { url: site.url, lastModified: reviewedAt, changeFrequency: "weekly", priority: 1 },
    { url: `${site.url}/states`, lastModified: reviewedAt, changeFrequency: "monthly", priority: 0.8 },
    { url: `${site.url}/blog`, lastModified: reviewedAt, changeFrequency: "weekly", priority: 0.7 },
    { url: `${site.url}/methodology`, lastModified: reviewedAt, changeFrequency: "yearly", priority: 0.4 },
    ...ADU_TYPES.map((type) => ({
      url: `${site.url}/cost/${type.slug}`,
      lastModified: reviewedAt,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];

  for (const state of STATES) {
    if (isStateIndexable(state)) {
      entries.push({ url: `${site.url}/${state.slug}`, lastModified: reviewedAt, changeFrequency: "monthly", priority: 0.9 });
    }
    for (const cityName of state.cities) {
      const city = citySlug(cityName);
      if (isCityIndexable(state.slug, city)) {
        entries.push({ url: `${site.url}/${state.slug}/${city}`, lastModified: reviewedAt, changeFrequency: "monthly", priority: 0.7 });
      }
    }
  }

  for (const post of POSTS) {
    entries.push({ url: `${site.url}/blog/${post.slug}`, lastModified: new Date(post.date), changeFrequency: "monthly", priority: 0.6 });
  }

  return entries;
}
