import type { Metadata } from "next";
import { ProductCard } from "@/components/product/product-card";
import { getProductsByZone } from "@/data/products";
import { getZoneBySlug, functionalZones } from "@/data/functional-zones";
import { notFound } from "next/navigation";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return functionalZones.map((z) => ({ slug: z.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const zone = getZoneBySlug(slug);
  if (!zone) return { title: "Zone" };
  return { title: `${zone.name} Zone`, description: zone.description };
}

export default async function ZonePage({ params }: Props) {
  const { slug } = await params;
  const zone = getZoneBySlug(slug);
  if (!zone) notFound();
  const items = getProductsByZone(zone.id);
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 md:px-6">
      <p className="text-sm uppercase tracking-wide text-workspace-blue">Functional zone</p>
      <h1 className="mt-2 font-display text-4xl font-semibold">{zone.name}</h1>
      <p className="mt-3 max-w-2xl text-lg text-soft-graphite">{zone.headline}</p>
      <p className="mt-2 max-w-2xl text-soft-graphite">{zone.description}</p>
      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {items.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </div>
  );
}
