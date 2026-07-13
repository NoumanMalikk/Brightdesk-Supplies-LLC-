import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Materials and Finishes",
  description: "Materials and Finishes for Brightdesk Supplies LLC.",
};

export default function Page() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 md:px-6 prose-like">
      <h1 className="font-display text-4xl font-semibold">Materials and Finishes</h1>
      <div className="mt-6 space-y-4 text-soft-graphite leading-relaxed">
        
<p>Material describes what a product is made from. Finish describes the surface treatment or appearance applied to that material.</p>
<p>Wood species, veneer, engineered wood, painted surfaces, metal frames and hardware finishes are shown only when verified for the specific product. Unverified fields display Verification required or Pending manufacturing specification.</p>
<p>Color and grain can vary between production lots and screens. Always review product-specific verification before ordering.</p>
<p>This page does not claim solid wood, hardwood, FSC certification, recycled content, scratch resistance, water resistance or heat resistance unless verified.</p>

      </div>
    </div>
  );
}
