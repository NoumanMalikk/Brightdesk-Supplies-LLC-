import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Assembly Information",
  description: "Assembly Information for Brightdesk Supplies LLC.",
};

export default function Page() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 md:px-6 prose-like">
      <h1 className="font-display text-4xl font-semibold">Assembly Information</h1>
      <div className="mt-6 space-y-4 text-soft-graphite leading-relaxed">
        
<p>Assembly requirements, people recommended, tools, hardware, estimated time, instructions, PDFs and videos are product-specific. Missing values use Verification required.</p>
<p>Assembly times are never invented. Assembly is not described as easy. Paid assembly service is disabled unless configured.</p>

      </div>
    </div>
  );
}
