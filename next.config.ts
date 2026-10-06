import { withSentryConfig } from "@sentry/nextjs";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
};

export default withSentryConfig(nextConfig, {
  org: process.env.SENTRY_ORG || "maxed-labs",
  project: process.env.SENTRY_PROJECT || "grannio_web",
  silent: !process.env.CI,
  widenClientFileUpload: true,
  // Route browser SDK requests through our own domain so ad blockers do not
  // drop them. `true` picks a random path per build (a fixed "/monitoring" is
  // on blocklists). Source maps upload only when SENTRY_AUTH_TOKEN is set.
  tunnelRoute: true,
  sourcemaps: { deleteSourcemapsAfterUpload: true },
});
