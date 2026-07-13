import type { Metadata } from "next";
import { faqs } from "@/data/faq";

export const metadata: Metadata = {
  title: "FAQ",
  description: "Frequently asked questions about Brightdesk furniture, dimensions, shipping and ordering.",
};

export default function FaqPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 md:px-6">
      <h1 className="font-display text-4xl font-semibold">FAQ</h1>
      <div className="mt-8 space-y-4">
        {faqs.map((f) => (
          <details key={f.id} className="rounded-lg border border-border-stone bg-gallery-white p-4">
            <summary className="cursor-pointer font-medium">{f.question}</summary>
            <p className="mt-3 text-sm text-soft-graphite">{f.answer}</p>
          </details>
        ))}
      </div>
    </div>
  );
}
