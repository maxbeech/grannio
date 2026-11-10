// Redirect integrity: retired URLs must 301 to a live post, never to another redirect.
// Run: tsx test/redirects.test.mts
import { POSTS } from "../lib/posts.ts";
import { PERMANENT_REDIRECTS, toNextRedirects } from "../lib/redirects.ts";

let pass = 0, fail = 0;
function check(name: string, cond: boolean, extra = "") {
  if (cond) { pass++; console.log(`  ok   ${name}`); }
  else { fail++; console.error(`  FAIL ${name} ${extra}`); }
}

const liveSlugs = new Set(POSTS.map((p) => p.slug));
const sources = PERMANENT_REDIRECTS.map((r) => r.source);

check("at least one redirect is configured", PERMANENT_REDIRECTS.length >= 1, `got ${PERMANENT_REDIRECTS.length}`);
check("redirect sources are unique", new Set(sources).size === sources.length, JSON.stringify(sources));

for (const r of PERMANENT_REDIRECTS) {
  const sourceSlug = r.source.replace(/^\/blog\//, "");
  check(`${r.source}: source is a blog path`, r.source.startsWith("/blog/"), r.source);
  check(`${r.source}: source is no longer a live post`, !liveSlugs.has(sourceSlug), `slug ${sourceSlug} still in POSTS`);
  const destSlug = r.destination.replace(/^\/blog\//, "");
  check(`${r.source}: destination is a live post`, r.destination.startsWith("/blog/") && liveSlugs.has(destSlug), `dest ${r.destination}`);
  check(`${r.source}: destination is not itself a redirect source (no chain)`, !sources.includes(r.destination), r.destination);
}

const compiled = toNextRedirects();
check("compiled redirects use status 301", compiled.every((r) => r.statusCode === 301), JSON.stringify(compiled));
check("compiled redirects keep source and destination", compiled.length === PERMANENT_REDIRECTS.length && compiled.every((r, i) => r.source === PERMANENT_REDIRECTS[i].source && r.destination === PERMANENT_REDIRECTS[i].destination));

console.log(`\n${pass} passed, ${fail} failed`);
if (fail > 0) process.exit(1);
