// Grannio runs on Helm7, not Vercel. Anything that names Vercel either does nothing there or
// silently changes behaviour: a `VERCEL_*` check is always unset, so a Sentry environment read
// from one reports every production error as "development". Keep them out.
// Files marked GENERATED are copies of shared service clients edited at their canonical source,
// so they are not policed here.
// Run: tsx test/no-vercel.test.mts
import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";

let pass = 0, fail = 0;
function check(name: string, cond: boolean, extra = "") {
  if (cond) { pass++; console.log(`  ok   ${name}`); }
  else { fail++; console.error(`  FAIL ${name} ${extra}`); }
}

function sourceFiles(dir: string, found: string[] = []): string[] {
  for (const entry of readdirSync(dir)) {
    const p = join(dir, entry);
    if (statSync(p).isDirectory()) sourceFiles(p, found);
    else if (/\.(ts|tsx|mts|mjs)$/.test(entry)) found.push(p);
  }
  return found;
}

const TOP_LEVEL = ["next.config.ts", "middleware.ts", "proxy.ts", "instrumentation.ts", "instrumentation-client.ts", "sentry.server.config.ts", "sentry.edge.config.ts"];
const files = [...["app", "components", "lib"].flatMap((r) => sourceFiles(r)), ...TOP_LEVEL.filter(existsSync)].filter(
  (f) => !/GENERATED/.test(readFileSync(f, "utf8").slice(0, 400)),
);
check("finds the source to police", files.length > 30, `got ${files.length}`);

const offenders = files.filter((f) => /vercel/i.test(readFileSync(f, "utf8")));
check("names Vercel nowhere in application code", offenders.length === 0, offenders.join(", "));

const pkg = JSON.parse(readFileSync("package.json", "utf8")) as {
  scripts?: Record<string, string>;
  dependencies?: Record<string, string>;
  devDependencies?: Record<string, string>;
};
const packages = Object.keys({ ...pkg.dependencies, ...pkg.devDependencies }).filter((n) => n === "vercel" || n.startsWith("@vercel/"));
check("has no Vercel package", packages.length === 0, packages.join(", "));
const scripts = Object.entries(pkg.scripts ?? {}).filter(([, cmd]) => /(^|[\s&;|])vercel(\s|$)/.test(cmd));
check("has no script that calls the Vercel CLI", scripts.length === 0, scripts.map(([k]) => k).join(", "));
check("has no vercel.json", !existsSync("vercel.json"));
// Helm7 runs `npm start` with PORT set; a hard-coded port leaves the health check probing nothing.
check("npm start honours PORT", (pkg.scripts?.start ?? "").includes("${PORT"), pkg.scripts?.start ?? "");

console.log(`\n${pass} passed, ${fail} failed`);
if (fail > 0) process.exit(1);
