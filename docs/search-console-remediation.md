# Search Console remediation

## Status: deployed to production on 2026-09-21; Google recrawl pending

| Item | Status | Evidence |
| --- | --- | --- |
| Canonical hostname | Complete | `lib/site.ts` defines `https://www.grannio.com`; all metadata, JSON-LD, robots and sitemap derive from it. |
| Apex redirects | Already live | `https://grannio.com` returns a permanent redirect to `https://www.grannio.com`; HTTP variants redirect before serving content. |
| Sitemap hygiene | Complete | Only canonical, independently supported URLs are emitted. The timestamp is stable until editorial data changes. |
| Thin programmatic pages | Complete policy | Generic state/city routes remain usable but are `noindex`; municipal pages must be added to `lib/city-guides.ts` with an official source before they enter the sitemap. |
| Atlanta and Augusta | Complete | Both have an official municipal source reviewed on 2026-09-21 and factual city-specific content. |
| Production verification | Complete | Deployment `dpl_7deqE7HzPN1TNpMbEBfif2C9Lr6f` is Ready; live robots and sitemap return the canonical `www` URLs. |

## Release checks

- Confirmed: `www` returns `200` with self-referencing canonicals on the home page and indexed city pages; `robots.txt` and `sitemap.xml` advertise only `www` URLs.
- Confirmed: the apex returns one permanent redirect to the equivalent `www` path.
- Remaining external action: submit `https://www.grannio.com/sitemap.xml` to the `https://www.grannio.com/` Search Console property and request indexing only for the home page, the highest-value statewide pages, Atlanta and Augusta.

Google may retain the old redirect and excluded-URL reports while it recrawls. Canonicalisation changes are not an instant re-indexing guarantee.
