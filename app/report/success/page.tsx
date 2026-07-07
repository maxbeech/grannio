import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/lib/site";
import { getStripe } from "@/lib/stripe";

// Dynamic on purpose — reads the Stripe session for this specific visitor at request
// time, so it can only show a real confirmation once Stripe itself confirms payment
// (never a static/cached "success" page).
export const metadata: Metadata = {
  title: "Report request received",
  description: "Your Grannio detailed ADU feasibility report request was received.",
  robots: { index: false, follow: false },
};

type Props = { searchParams: Promise<{ session_id?: string }> };

export default async function ReportSuccessPage({ searchParams }: Props) {
  const { session_id: sessionId } = await searchParams;
  const session = sessionId ? await fetchSession(sessionId) : null;
  const paid = session?.payment_status === "paid";
  const email = session?.customer_details?.email || session?.customer_email || undefined;

  return (
    <div className="mx-auto max-w-xl space-y-6 text-center">
      {paid ? (
        <>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">Payment received</h1>
          <p className="text-lg text-slate-600">
            Thanks{email ? `, we'll email your report to ${email}` : " — your report request is confirmed"}. Your
            detailed ADU feasibility report will arrive within 2 business days.
          </p>
        </>
      ) : (
        <>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">We couldn&apos;t confirm that payment</h1>
          <p className="text-lg text-slate-600">
            If you completed checkout, hold on — this can take a few seconds. If a charge went through and this
            keeps happening, email us at <a href={`mailto:${site.email}`} className="underline">{site.email}</a> and
            we&apos;ll sort it out.
          </p>
        </>
      )}
      <Link href="/" className="inline-block rounded-xl bg-emerald-700 px-6 py-3 font-semibold text-white transition hover:bg-emerald-600">
        Back to the calculator
      </Link>
    </div>
  );
}

async function fetchSession(sessionId: string) {
  try {
    const stripe = getStripe();
    return await stripe.checkout.sessions.retrieve(sessionId);
  } catch (err) {
    console.error("[report/success] Failed to retrieve Stripe session:", err);
    return null;
  }
}
