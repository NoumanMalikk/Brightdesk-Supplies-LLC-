import type { Metadata } from "next";
import { legalConfig } from "@/data/legal-config";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy Policy for Brightdesk Supplies LLC.",
};

export default function Page() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 md:px-6 prose-like">
      <h1 className="font-display text-4xl font-semibold">Privacy Policy</h1>
      <div className="mt-6 space-y-4 text-soft-graphite leading-relaxed">
        
<p>Effective date: {legalConfig.privacyEffectiveDate}</p>
<p>Brightdesk Supplies LLC collects information you submit through contact, quote, newsletter, checkout and order-tracking forms to respond to requests and fulfill orders.</p>
<p>Card details are processed by Stripe and are not stored by Brightdesk form inputs.</p>
<p>{legalConfig.placeholderToken}</p>

      </div>
    </div>
  );
}
