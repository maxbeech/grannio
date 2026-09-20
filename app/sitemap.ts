import type { MetadataRoute } from "next";
import { getIndexableSitemapEntries } from "@/lib/indexability";

export default function sitemap(): MetadataRoute.Sitemap {
  return getIndexableSitemapEntries();
}
