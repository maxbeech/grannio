// Permanent (301) redirects for URLs retired by content consolidation.
// Consumed by next.config.ts `redirects()`. Next docs: https://nextjs.org/docs/app/api-reference/config/next-config-js/redirects
//
// Rules (enforced by test/redirects.test.mts):
//   - a source must no longer exist in the content registry (lib/posts.ts),
//   - a destination must be a live post slug,
//   - no redirect may point at another redirect source (no chains).

export type PermanentRedirect = {
  source: string;
  destination: string;
};

export const PERMANENT_REDIRECTS: readonly PermanentRedirect[] = [
  // Consolidated 2026-11-10: the HB 1337 guide overlapped the statewide rules guide
  // on the same Washington ADU law query. Its useful material now lives in the survivor.
  {
    source: "/blog/washington-adu-law-hb-1337",
    destination: "/blog/washington-state-adu-rules",
  },
];

/** Shape Next.js expects from `redirects()`: a 301 status, not the 307/308 default. */
export function toNextRedirects(redirects: readonly PermanentRedirect[] = PERMANENT_REDIRECTS) {
  return redirects.map((r) => ({ source: r.source, destination: r.destination, statusCode: 301 }));
}
