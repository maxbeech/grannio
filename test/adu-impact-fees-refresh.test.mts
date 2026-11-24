// Regression test for the 2026-11-24 refresh of /blog/adu-impact-fees.
// Guards the Washington impact-fee correction (RCW 36.70A.681(1)(a) caps ADU
// impact fees at 50% of the principal-unit fee) and the sourced California citation.
// Run: tsx test/adu-impact-fees-refresh.test.mts
import { POSTS, getPost, type Block } from "../lib/posts.ts";

let pass = 0, fail = 0;
function check(name: string, cond: boolean, extra = "") {
  if (cond) { pass++; console.log(`  ok   ${name}`); }
  else { fail++; console.error(`  FAIL ${name} ${extra}`); }
}

const post = getPost("adu-impact-fees");
check("adu-impact-fees post exists", post !== undefined);
if (!post) {
  console.log(`\n${pass} passed, ${fail} failed`);
  process.exit(1);
}

const text = (blocks: Block[]) => blocks.flatMap((b) =>
  b.type === "ul" ? b.items : b.type === "table" ? [b.caption ?? "", ...b.headers, ...b.rows.flat()] : [b.text]);
const body = text(post.blocks).join(" ");

check("Washington section no longer claims there is no statewide fee rule", !/no statewide impact fee exemption/i.test(body), body.slice(0, 120));
check("Washington section cites RCW 36.70A.681 and the 50% cap", body.includes("RCW 36.70A.681") && body.includes("50% of the fees charged on the principal unit"));
check("California section cites the statute recodified as Government Code §66314", body.includes("Government Code §66314"));
check("California section no longer cites the old 65852.2(f)(3) subsection", !body.includes("65852.2(f)(3)"));
check("California worked example uses floor-area ratio wording", body.includes("divided by the main house's floor area"));

const rcw = (post.sources ?? []).find((s) => s.href.includes("RCW%20%2036%20.%2070A.681") || s.href.includes("36.70A.681"));
check("post lists the RCW 36.70A.681 source", rcw !== undefined, JSON.stringify(post.sources));
check("all sources are HTTPS and distinct", (post.sources ?? []).every((s) => s.href.startsWith("https://")) && new Set((post.sources ?? []).map((s) => s.href)).size === (post.sources?.length ?? 0));
check("sources count is within 2-5", (post.sources?.length ?? 0) >= 2 && (post.sources?.length ?? 0) <= 5, `got ${post.sources?.length ?? 0}`);

check("visible date is the refresh date 2026-11-24", post.date === "2026-11-24", `got ${post.date}`);

const ctas = post.blocks.filter((b): b is Extract<Block, { type: "cta" }> => b.type === "cta");
const washingtonCta = ctas.find((c) => c.href === "/blog/washington-state-adu-rules");
check("internal link to the Washington guide is present", washingtonCta !== undefined, JSON.stringify(ctas));
check("internal link target is a live post", washingtonCta !== undefined && getPost("washington-state-adu-rules") !== undefined);
check("every internal CTA href is a live route", ctas.every((c) => !c.href.startsWith("/blog/") || POSTS.some((p) => `/blog/${p.slug}` === c.href)));

console.log(`\n${pass} passed, ${fail} failed`);
if (fail > 0) process.exit(1);
