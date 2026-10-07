// The proxy refuses encoded-dot probes (/robots%2etxt) before Next's router can crash on them.
// Run: tsx test/proxy.test.mts
import { NextRequest } from "next/server";
import { proxy } from "../proxy";

let fail = 0;
function check(name: string, cond: boolean) {
  console.log(`  ${cond ? "ok  " : "FAIL"} ${name}`);
  if (!cond) fail++;
}

for (const path of ["/robots%2etxt", "/robots%2Etxt"]) {
  const res = proxy(new NextRequest(`https://www.grannio.com${path}`));
  check(`${path} -> 404`, res.status === 404);
}
for (const path of ["/", "/texas", "/texas/austin", "/robots.txt", "/sitemap.xml?x=a.b"]) {
  const res = proxy(new NextRequest(`https://www.grannio.com${path}`));
  check(`${path} passes through`, res.status === 200 && res.headers.get("x-middleware-next") === "1");
}
if (fail) process.exit(1);
