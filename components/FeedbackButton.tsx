"use client";

import { useState } from "react";
import { site } from "@/lib/site";

/**
 * The user-facing feedback control. Opens Sentry's feedback dialog so a report
 * lands in the same Sentry project as the exceptions. The SDK is imported
 * lazily so it stays out of the initial bundle until someone asks.
 */
export default function FeedbackButton({ className = "", label = "Send feedback" }: { className?: string; label?: string }) {
  const [unavailable, setUnavailable] = useState(false);

  const open = async () => {
    const Sentry = await import("@sentry/nextjs");
    const feedback = Sentry.getFeedback();
    if (!feedback) {
      // No DSN on this deployment: say so rather than a control that does nothing.
      setUnavailable(true);
      return;
    }
    const form = await feedback.createForm();
    form.appendToDom();
    form.open();
  };

  if (unavailable) {
    return (
      <span className={className}>
        Feedback isn&apos;t set up here. Email{" "}
        <a className="underline underline-offset-2" href={`mailto:${site.email}`}>{site.email}</a>.
      </span>
    );
  }

  return (
    <button type="button" onClick={open} className={className} data-testid="feedback-button">
      {label}
    </button>
  );
}
