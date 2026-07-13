import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Furniture Safety",
  description: "Furniture Safety for Brightdesk Supplies LLC.",
};

export default function Page() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 md:px-6 prose-like">
      <h1 className="font-display text-4xl font-semibold">Furniture Safety</h1>
      <div className="mt-6 space-y-4 text-soft-graphite leading-relaxed">
        
<p>Safety fields tracked per product include weight capacity, tip-over risk, wall anchoring, drawer safety, shelf load, caster locks, folding mechanisms, pinch points, storage hinges, glass components, sharp corners, assembly hardware, upholstered flammability documentation, manufacturer warnings and recall status.</p>
<p>Live purchase is blocked when required warnings or assembly information are missing for live mode.</p>
<p>This page does not claim tip resistance, child safety, commercial grade, standing/climbing/sleeping safety or fire resistance unless verified.</p>

      </div>
    </div>
  );
}
