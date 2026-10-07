import { NextResponse, type NextRequest } from "next/server";

/**
 * Answer 404 for a path with a percent-encoded dot (`/robots%2etxt`).
 *
 * Scanners probe the encoded name of a real file route. Next decodes it onto the
 * `[state]` page segment, whose cache holds a different kind of entry, and
 * crashes with "Invariant: app-page handler received invalid cache entry
 * APP_ROUTE" (a 500 and a Sentry issue). No real URL on this site contains an
 * encoded dot, so refuse it before routing.
 */
export function proxy(request: NextRequest) {
  const rawPath = request.url.replace(/^[a-z]+:\/\/[^/]+/i, "").split("?")[0];
  if (/%2e/i.test(rawPath)) return new NextResponse("Not found", { status: 404 });
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
