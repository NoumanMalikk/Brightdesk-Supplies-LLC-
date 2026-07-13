import type { Metadata } from "next";
import { ProductCard } from "@/components/product/product-card";
import { getProductsByCategory } from "@/data/products";
import { getCategoryBySlug, categories } from "@/data/categories";
import { notFound } from "next/navigation";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return categories.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const cat = getCategoryBySlug(slug);
  if (!cat) return { title: "Collection" };
  return { title: cat.name, description: cat.description };
}

export default async function CollectionPage({ params }: Props) {
  const { slug } = await params;
  const cat = getCategoryBySlug(slug);
  if (!cat) notFound();
  const items = getProductsByCategory(slug);
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 md:px-6">
      <h1 className="font-display text-4xl font-semibold">{cat.name}</h1>
      <p className="mt-3 max-w-2xl text-soft-graphite">{cat.description}</p>
      <p className="mt-2 text-sm text-soft-graphite">{items.length} products · Demonstration catalog</p>
      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {items.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </div>
  );
}
