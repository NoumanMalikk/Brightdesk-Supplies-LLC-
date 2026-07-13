import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Measuring Guide",
  description: "Measuring Guide for Brightdesk Supplies LLC.",
};

export default function Page() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 md:px-6 prose-like">
      <h1 className="font-display text-4xl font-semibold">Measuring Guide</h1>
      <div className="mt-6 space-y-4 text-soft-graphite leading-relaxed">
        
<p>Measure room width, depth and ceiling height. Also measure doorway width and height, hallway width, stair width, stair turning clearance and elevator dimensions when applicable.</p>
<p>Allow clearance for desks, chair movement, meeting-table circulation and reception seating spacing. Review package dimensions in inches and centimeters.</p>
<p>This guide does not guarantee product fit and does not provide structural or code-compliance advice.</p>

      </div>
    </div>
  );
}
