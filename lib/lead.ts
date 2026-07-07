// Pure lead-routing helpers — single source of truth for how a feasibility-report
// request becomes an email. Kept out of the component so it is fully unit-testable
// (encoding, edge cases, field order). The component only collects the fields.

import { site } from "./site";

export interface LeadFields {
  name?: string;
  email: string;
  zip?: string;
  aduType?: string;
  timeline?: string;
  notes?: string;
}

// Reject whitespace, @, and HTML/quote metacharacters in any part of the address.
const EMAIL_RE = /^[^\s@<>"'`]+@[^\s@<>"'`]+\.[^\s@<>"'`]{2,}$/;

export function isValidEmail(email: string): boolean {
  return EMAIL_RE.test(email.trim());
}

/** Build the body text of the lead email (newline-separated, human-readable). */
export function buildLeadBody(f: LeadFields): string {
  const dash = "—";
  return [
    "Please send my detailed ADU feasibility report.",
    "",
    `Name: ${f.name?.trim() || dash}`,
    `Email: ${f.email.trim()}`,
    `Property ZIP: ${f.zip?.trim() || dash}`,
    `ADU type: ${f.aduType?.trim() || dash}`,
    `Timeline: ${f.timeline?.trim() || dash}`,
    `Notes: ${f.notes?.trim() || dash}`,
  ].join("\n");
}

/** Build a fully-encoded mailto: URL to the Grannio inbox for a lead. */
export function buildLeadMailto(f: LeadFields): string {
  const subject = encodeURIComponent("ADU feasibility report request");
  const body = encodeURIComponent(buildLeadBody(f));
  return `mailto:${site.email}?subject=${subject}&body=${body}`;
}

// --- /api/lead payload: the three monetisation lead types share one endpoint ---

export type LeadKind = "report" | "builder" | "financing";
const LEAD_KINDS: readonly LeadKind[] = ["report", "builder", "financing"];

export interface LeadPayload {
  kind: LeadKind;
  name?: string;
  email: string;
  phone?: string;
  zip?: string;
  stateSlug?: string;
  city?: string;
  aduType?: string;
  sqft?: number;
  lotSqft?: number;
  timeline?: string;
  financingAmount?: number;
  notes?: string;
  sourcePath?: string;
  // Honeypot: a field real visitors never fill in. Non-empty => treat as a bot.
  company?: string;
}

export type LeadValidation = { ok: true } | { ok: false; error: string };

/** Validate a lead payload before it is stored or emailed. Pure — no I/O. */
export function validateLeadPayload(p: Partial<LeadPayload>): LeadValidation {
  if (!p.kind || !LEAD_KINDS.includes(p.kind)) return { ok: false, error: "Unknown lead type." };
  if (!p.email || !isValidEmail(p.email)) return { ok: false, error: "Please enter a valid email address." };
  return { ok: true };
}

const KIND_SUBJECT: Record<LeadKind, string> = {
  report: "New feasibility report request",
  builder: "New builder-match lead",
  financing: "New financing lead",
};

/** Build the plain-text notification email body for any lead kind. */
export function buildLeadNotificationText(p: LeadPayload): string {
  const dash = "—";
  const rows: [string, string | undefined][] = [
    ["Type", KIND_SUBJECT[p.kind]],
    ["Name", p.name],
    ["Email", p.email],
    ["Phone", p.phone],
    ["Property ZIP", p.zip],
    ["State", p.stateSlug],
    ["City", p.city],
    ["ADU type", p.aduType],
    ["Size (sq ft)", p.sqft != null ? String(p.sqft) : undefined],
    ["Lot size (sq ft)", p.lotSqft != null ? String(p.lotSqft) : undefined],
    ["Desired financing amount", p.financingAmount != null ? `$${p.financingAmount}` : undefined],
    ["Timeline", p.timeline],
    ["Notes", p.notes],
    ["Source page", p.sourcePath],
  ];
  return rows.map(([k, v]) => `${k}: ${v?.trim ? v.trim() || dash : v ?? dash}`).join("\n");
}

/** Subject line for the lead notification email, by kind. */
export function leadEmailSubject(kind: LeadKind): string {
  return KIND_SUBJECT[kind];
}
