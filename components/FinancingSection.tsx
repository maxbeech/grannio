"use client";

import { useState } from "react";
import { FINANCING_PARTNERS } from "@/lib/financing-partners";
import { isValidEmail } from "@/lib/lead";
import { site } from "@/lib/site";
import { submitLead } from "@/components/lead-submit";

const inputClass =
  "mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-900 focus:border-emerald-500 focus:outline-none";

export default function FinancingSection() {
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
    const amountDigits = String(f.get("financingAmount") || "").replace(/[^0-9]/g, "");
    setStatus("submitting");
    setError(null);
    const result = await submitLead({
      kind: "financing",
      name: String(f.get("name") || ""),
      email,
      phone: String(f.get("phone") || ""),
      financingAmount: amountDigits ? Number(amountDigits) : undefined,
      timeline: String(f.get("timeline") || ""),
      sourcePath: window.location.pathname,
    });
    if (result.ok) setStatus("sent");
    else {
      setStatus("error");
      setError(result.error || "Something went wrong.");
    }
  }

  return (
    <div className="grid gap-8 lg:grid-cols-2">
      <div>
        <h2 className="text-2xl font-bold text-slate-900">Financing your ADU</h2>
        <p className="mt-2 text-slate-600">
          A handful of loan and grant programmes are built specifically for ADUs. These are
          informational links we don&apos;t currently earn a commission on — not paid placements.
        </p>
        <div className="mt-4 space-y-3">
          {FINANCING_PARTNERS.map((p) => (
            <a key={p.name} href={p.href} target="_blank" rel="noopener noreferrer nofollow"
              className="block rounded-xl border border-slate-200 bg-white p-4 transition hover:border-emerald-400 hover:shadow-sm">
              <div className="flex items-baseline justify-between gap-3">
                <h3 className="font-semibold text-slate-900">{p.name}</h3>
                <span className="shrink-0 text-sm font-medium text-emerald-700">{p.cta} →</span>
              </div>
              <p className="mt-1 text-sm text-slate-600">{p.description}</p>
              {p.status && <p className="mt-1 text-xs font-medium text-amber-700">{p.status}</p>}
            </a>
          ))}
        </div>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-6">
        <h3 className="text-lg font-semibold text-slate-900">Want financing options matched to your project?</h3>
        <p className="mt-1 text-sm text-slate-600">
          Tell us roughly what you need to borrow and we&apos;ll point you to lenders who work with ADU projects.
        </p>
        <form onSubmit={handleSubmit} className="mt-4 grid gap-3 sm:grid-cols-2">
          <div>
            <label htmlFor="fin-name" className="block text-sm font-medium text-slate-700">Name</label>
            <input id="fin-name" name="name" type="text" autoComplete="name" className={inputClass} placeholder="Jane Homeowner" />
          </div>
          <div>
            <label htmlFor="fin-email" className="block text-sm font-medium text-slate-700">Email <span className="text-emerald-600">*</span></label>
            <input id="fin-email" name="email" type="email" required autoComplete="email" className={inputClass} placeholder="you@email.com" />
          </div>
          <div>
            <label htmlFor="fin-phone" className="block text-sm font-medium text-slate-700">Phone</label>
            <input id="fin-phone" name="phone" type="tel" autoComplete="tel" className={inputClass} placeholder="Optional" />
          </div>
          <div>
            <label htmlFor="fin-amount" className="block text-sm font-medium text-slate-700">Amount needed</label>
            <input id="fin-amount" name="financingAmount" type="text" inputMode="numeric" className={inputClass} placeholder="$150,000" />
          </div>
          <div className="sm:col-span-2">
            <label htmlFor="fin-timeline" className="block text-sm font-medium text-slate-700">Timeline</label>
            <select id="fin-timeline" name="timeline" className={inputClass}>
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
            {status === "submitting" ? "Sending…" : "Get financing options"}
          </button>
          {status === "sent" && (
            <p className="sm:col-span-2 text-sm text-emerald-700" role="status">
              Thanks — we&apos;ll follow up with financing options that fit.
            </p>
          )}
        </form>
      </div>
    </div>
  );
}
