"use client";

import * as Sentry from "@sentry/nextjs";
import { useEffect } from "react";

// Last-resort boundary: a render error that escaped every other boundary.
// Report it before showing the fallback.
export default function GlobalError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    Sentry.captureException(error);
  }, [error]);

  return (
    <html lang="en">
      <body style={{ margin: 0, fontFamily: "system-ui, sans-serif", background: "#f8fafc", color: "#0f172a" }}>
        <div style={{ minHeight: "100vh", display: "grid", placeItems: "center", padding: "2rem", textAlign: "center" }}>
          <div style={{ maxWidth: 440 }}>
            <h1 style={{ fontSize: "1.5rem", fontWeight: 700, marginBottom: "0.75rem" }}>Something went wrong</h1>
            <p style={{ color: "#475569", marginBottom: "1.5rem" }}>
              We&apos;ve been told about it. Please try again, or come back in a moment.
            </p>
            <button
              onClick={reset}
              style={{ padding: "0.6rem 1.25rem", background: "#0f172a", color: "#fff", border: 0, borderRadius: "0.5rem", fontWeight: 600, cursor: "pointer" }}
            >
              Try again
            </button>
          </div>
        </div>
      </body>
    </html>
  );
}
