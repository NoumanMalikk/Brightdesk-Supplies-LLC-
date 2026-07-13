import type { Metadata } from "next";
import { storeConfig } from "@/data/store-config";

export const metadata: Metadata = {
  title: "Accessibility Statement",
  description: "Accessibility Statement for Brightdesk Supplies LLC.",
};

export default function Page() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 md:px-6 prose-like">
      <h1 className="font-display text-4xl font-semibold">Accessibility Statement</h1>
      <div className="mt-6 space-y-4 text-soft-graphite leading-relaxed">
        
<p>Brightdesk Supplies LLC aims to meet WCAG 2.2 AA for the customer-facing website, including keyboard access, focus states, text alternatives, contrast and reduced-motion support.</p>
<p>If you encounter an accessibility barrier, contact us by phone at {storeConfig.phoneDisplay}.</p>

      </div>
    </div>
  );
}
