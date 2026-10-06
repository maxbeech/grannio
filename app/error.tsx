"use client";

import * as Sentry from "@sentry/nextjs";
import { useEffect } from "react";

// Segment boundary: report the error, then let the visitor retry in place.
export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    Sentry.captureException(error);
  }, [error]);

  return (
    <div className="py-16 text-center">
      <h1 className="text-2xl font-bold text-slate-900">Something went wrong</h1>
      <p className="mt-2 text-slate-600">We&apos;ve been told about it. Please try again.</p>
      <button onClick={reset} className="mt-6 rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-700">
        Try again
      </button>
    </div>
  );
}
