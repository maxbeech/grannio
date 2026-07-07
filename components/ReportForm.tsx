"use client";

import { useState } from "react";
import { ADU_TYPES } from "@/lib/cost";
import { buildLeadMailto, isValidEmail } from "@/lib/lead";
import { submitReportCheckout } from "@/components/report-checkout";

// Real checkout: posts to /api/checkout/report, which creates a $49 Stripe Checkout
// Session, and redirects the browser to Stripe. There is no client-side "submitted!"
// state for success — the report is only recorded as a lead once Stripe's webhook
// confirms the payment actually went through (see app/api/webhooks/stripe/route.ts).
// On a failure to even start checkout, we show the actual error plus a mailto fallback.
export default function ReportForm() {
  const [status, setStatus] = useState<"idle" | "submitting" | "error">("idle");
  const [error, setError] = useState<string | null>(null);
  const [fallback, setFallback] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const values = {
      name: String(f.get("name") || ""),
      email: String(f.get("email") || "").trim(),
      zip: String(f.get("zip") || ""),
      aduType: String(f.get("aduType") || ""),
      timeline: String(f.get("timeline") || ""),
    };
    if (!isValidEmail(values.email)) {
      setStatus("error");
      setError("Please enter a valid email so we can send your report.");
      return;
    }
    setStatus("submitting");
    setError(null);
    const result = await submitReportCheckout({ ...values, sourcePath: window.location.pathname });
    if (result.ok && result.url) {
      window.location.href = result.url;
      return;
    }
    setStatus("error");
    setError(result.error || "Something went wrong.");
    setFallback(buildLeadMailto(values));
  }

  return (
    <form onSubmit={handleSubmit} className="mx-auto mt-6 max-w-xl text-left">
      <div className="grid gap-3 sm:grid-cols-2">
        <div>
          <label htmlFor="lead-name" className="block text-sm font-medium text-slate-200">Name</label>
          <input id="lead-name" name="name" type="text" autoComplete="name"
            className="mt-1 w-full rounded-lg border border-slate-600 bg-slate-800 px-3 py-2 text-white placeholder-slate-400 focus:border-emerald-400 focus:outline-none" placeholder="Jane Homeowner" />
        </div>
        <div>
          <label htmlFor="lead-email" className="block text-sm font-medium text-slate-200">Email <span className="text-emerald-400">*</span></label>
          <input id="lead-email" name="email" type="email" required autoComplete="email"
            className="mt-1 w-full rounded-lg border border-slate-600 bg-slate-800 px-3 py-2 text-white placeholder-slate-400 focus:border-emerald-400 focus:outline-none" placeholder="you@email.com" />
        </div>
        <div>
          <label htmlFor="lead-zip" className="block text-sm font-medium text-slate-200">Property ZIP</label>
          <input id="lead-zip" name="zip" type="text" inputMode="numeric" autoComplete="postal-code" maxLength={10}
            className="mt-1 w-full rounded-lg border border-slate-600 bg-slate-800 px-3 py-2 text-white placeholder-slate-400 focus:border-emerald-400 focus:outline-none" placeholder="90001" />
        </div>
        <div>
          <label htmlFor="lead-type" className="block text-sm font-medium text-slate-200">ADU type</label>
          <select id="lead-type" name="aduType"
            className="mt-1 w-full rounded-lg border border-slate-600 bg-slate-800 px-3 py-2 text-white focus:border-emerald-400 focus:outline-none">
            {ADU_TYPES.map((t) => <option key={t.slug} value={t.label}>{t.label}</option>)}
            <option value="Not sure yet">Not sure yet</option>
          </select>
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="lead-timeline" className="block text-sm font-medium text-slate-200">Timeline</label>
          <select id="lead-timeline" name="timeline"
            className="mt-1 w-full rounded-lg border border-slate-600 bg-slate-800 px-3 py-2 text-white focus:border-emerald-400 focus:outline-none">
            <option>Just researching</option>
            <option>Next 3 months</option>
            <option>3–6 months</option>
            <option>6–12 months</option>
          </select>
        </div>
      </div>
      {status === "error" && (
        <p className="mt-2 text-sm text-amber-300" role="alert">
          {error}{" "}
          {fallback && <a href={fallback} className="underline">Email us your details instead →</a>}
        </p>
      )}
      <button type="submit" disabled={status === "submitting"}
        className="mt-4 w-full rounded-xl bg-emerald-700 px-6 py-3 font-semibold text-white transition hover:bg-emerald-600 disabled:opacity-60">
        {status === "submitting" ? "Redirecting to checkout…" : "Get my report — $49"}
      </button>
      <p className="mt-3 text-xs text-slate-400">
        Secure checkout via Stripe. We use your details only to prepare your report and connect you with vetted ADU builders. No spam.
      </p>
    </form>
  );
}
