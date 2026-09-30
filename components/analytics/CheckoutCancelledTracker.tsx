"use client";

import { useEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";
import { trackEvent } from "@/lib/analytics-events";

// The checkout route sends people back to the page they came from with ?report=cancelled
// when they leave Stripe without paying. Mount inside <Suspense> (useSearchParams).
export default function CheckoutCancelledTracker() {
  const params = useSearchParams();
  const sent = useRef(false);
  const cancelled = params?.get("report") === "cancelled";

  useEffect(() => {
    if (!cancelled || sent.current) return;
    sent.current = true;
    trackEvent("checkout_cancelled", {});
  }, [cancelled]);
  return null;
}
