import type { Metadata } from "next";
import { legalConfig } from "@/data/legal-config";

export const metadata: Metadata = {
  title: "Return and Refund Policy",
  description: "Return and Refund Policy for Brightdesk Supplies LLC.",
};

export default function Page() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 md:px-6 prose-like">
      <h1 className="font-display text-4xl font-semibold">Return and Refund Policy</h1>
      <div className="mt-6 space-y-4 text-soft-graphite leading-relaxed">
        
<p>Return window: {legalConfig.returnWindow}</p>
<p>Refund period: {legalConfig.refundPeriod}</p>
<p>Restocking fee: {legalConfig.restockingFee}</p>
<p>Damaged-item process: {legalConfig.damagedItemProcess}</p>
<p>No invented return windows, warranties or restocking fees are published as final policy.</p>

      </div>
    </div>
  );
}
