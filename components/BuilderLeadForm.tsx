"use client";

import { useState } from "react";
import { ADU_TYPES } from "@/lib/cost";
import { isValidEmail } from "@/lib/lead";
import { site } from "@/lib/site";
import { submitLead } from "@/components/lead-submit";

const inputClass =
  "mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-900 focus:border-emerald-500 focus:outline-none";

// Sells the same qualified-lead inventory a builder would otherwise pay ~$20+/click for
// via Google Ads (see docs/seo_geo_content_plan.md) — but captured organically here.
export default function BuilderLeadForm({ stateSlug, city }: { stateSlug?: string; city?: string }) {
  const [status, setStatus] = useState<"idle" | "submitting" | "sent" | "error">("idle");
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const email = String(f.get("email") || "").trim();
    if (!isValidEmail(email)) {
      setStatus("error");
      setError("Please enter a valid email.");
      return;
    }
    setStatus("submitting");
    setError(null);
    const result = await submitLead({
      kind: "builder",
      name: String(f.get("name") || ""),
      email,
      phone: String(f.get("phone") || ""),
      zip: String(f.get("zip") || ""),
      aduType: String(f.get("aduType") || ""),
      timeline: String(f.get("timeline") || ""),
      stateSlug,
      city,
      sourcePath: window.location.pathname,
    });
    if (result.ok) setStatus("sent");
    else {
      setStatus("error");
      setError(result.error || "Something went wrong.");
    }
  }

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6">
      <h2 className="text-lg font-semibold text-slate-900">
        Get matched with a vetted ADU builder{city ? ` in ${city}` : ""}
      </h2>
      <p className="mt-1 text-sm text-slate-600">
        Tell us about your project and we&apos;ll introduce you to a builder who works in your area. Free, no obligation.
      </p>
      <form onSubmit={handleSubmit} className="mt-4 grid gap-3 sm:grid-cols-2">
        <div>
          <label htmlFor="bl-name" className="block text-sm font-medium text-slate-700">Name</label>
          <input id="bl-name" name="name" type="text" autoComplete="name" className={inputClass} placeholder="Jane Homeowner" />
        </div>
        <div>
          <label htmlFor="bl-email" className="block text-sm font-medium text-slate-700">Email <span className="text-emerald-600">*</span></label>
          <input id="bl-email" name="email" type="email" required autoComplete="email" className={inputClass} placeholder="you@email.com" />
        </div>
        <div>
          <label htmlFor="bl-phone" className="block text-sm font-medium text-slate-700">Phone</label>
          <input id="bl-phone" name="phone" type="tel" autoComplete="tel" className={inputClass} placeholder="Optional" />
        </div>
        <div>
          <label htmlFor="bl-zip" className="block text-sm font-medium text-slate-700">Property ZIP</label>
          <input id="bl-zip" name="zip" type="text" inputMode="numeric" autoComplete="postal-code" maxLength={10} className={inputClass} placeholder="90001" />
        </div>
        <div>
          <label htmlFor="bl-type" className="block text-sm font-medium text-slate-700">ADU type</label>
          <select id="bl-type" name="aduType" className={inputClass}>
            {ADU_TYPES.map((t) => <option key={t.slug} value={t.label}>{t.label}</option>)}
            <option value="Not sure yet">Not sure yet</option>
          </select>
        </div>
        <div>
          <label htmlFor="bl-timeline" className="block text-sm font-medium text-slate-700">Timeline</label>
          <select id="bl-timeline" name="timeline" className={inputClass}>
            <option>Just researching</option>
            <option>Next 3 months</option>
            <option>3–6 months</option>
            <option>6–12 months</option>
          </select>
        </div>
        {status === "error" && (
          <p className="sm:col-span-2 text-sm text-red-600" role="alert">
            {error} Or email us at <a href={`mailto:${site.email}`} className="underline">{site.email}</a>.
          </p>
        )}
        <button type="submit" disabled={status === "submitting"}
          className="sm:col-span-2 rounded-xl bg-emerald-700 px-6 py-3 font-semibold text-white transition hover:bg-emerald-800 disabled:opacity-60">
          {status === "submitting" ? "Sending…" : "Get matched with a builder"}
        </button>
        {status === "sent" && (
          <p className="sm:col-span-2 text-sm text-emerald-700" role="status">
            Thanks — we&apos;ll reach out with a vetted builder match soon.
          </p>
        )}
      </form>
    </div>
  );
}
