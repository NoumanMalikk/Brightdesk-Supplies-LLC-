import type { Metadata } from "next";
import { legalConfig } from "@/data/legal-config";

export const metadata: Metadata = {
  title: "Terms and Conditions",
  description: "Terms and Conditions for Brightdesk Supplies LLC.",
};

export default function Page() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 md:px-6 prose-like">
      <h1 className="font-display text-4xl font-semibold">Terms and Conditions</h1>
      <div className="mt-6 space-y-4 text-soft-graphite leading-relaxed">
        
<p>Effective date: {legalConfig.termsEffectiveDate}</p>
<p>By using this website and placing orders you agree to review product dimensions, finishes, upholstery, assembly and delivery-access requirements.</p>
<p>{legalConfig.placeholderToken}</p>

      </div>
    </div>
  );
}
