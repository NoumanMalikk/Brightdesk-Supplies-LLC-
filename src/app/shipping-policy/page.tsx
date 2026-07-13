import type { Metadata } from "next";
import { legalConfig } from "@/data/legal-config";

export const metadata: Metadata = {
  title: "Shipping Policy",
  description: "Shipping Policy for Brightdesk Supplies LLC.",
};

export default function Page() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 md:px-6 prose-like">
      <h1 className="font-display text-4xl font-semibold">Shipping Policy</h1>
      <div className="mt-6 space-y-4 text-soft-graphite leading-relaxed">
        
<p>{legalConfig.placeholderToken}</p>
<p>Shipping is calculated from destination, weight, package dimensions, box count, quantity and shipping class when carriers are configured. Demonstration shipping is clearly labeled.</p>
<p>White-glove delivery, room-of-choice delivery, threshold delivery, furniture assembly and packaging removal are not enabled.</p>
<p>Production launch is blocked while policy placeholders remain.</p>

      </div>
    </div>
  );
}
