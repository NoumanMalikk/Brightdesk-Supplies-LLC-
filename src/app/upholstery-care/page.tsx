import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Upholstery and Care",
  description: "Upholstery and Care for Brightdesk Supplies LLC.",
};

export default function Page() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 md:px-6 prose-like">
      <h1 className="font-display text-4xl font-semibold">Upholstery and Care</h1>
      <div className="mt-6 space-y-4 text-soft-graphite leading-relaxed">
        
<p>Upholstery material, fabric composition, cleaning codes, cushion construction and foam documentation are product-specific and must be verified before live sale.</p>
<p>Color variation, seam details and manufacturer care instructions are shown when available. Spot-cleaning and replacement-cover status remain pending until documented.</p>
<p>This page does not claim genuine leather, vegan leather, performance fabric, stain resistance, spill resistance, pet friendliness, child safety, flame resistance or high-density foam unless verified.</p>

      </div>
    </div>
  );
}
