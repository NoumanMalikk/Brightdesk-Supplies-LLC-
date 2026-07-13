import type { Metadata } from "next";
import { ProductCard } from "@/components/product/product-card";
import { products } from "@/data/products";
import { getRoomBySlug, rooms } from "@/data/rooms";
import { notFound } from "next/navigation";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return rooms.map((r) => ({ slug: r.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const room = getRoomBySlug(slug);
  if (!room) return { title: "Room" };
  return { title: room.name, description: room.description };
}

export default async function RoomPage({ params }: Props) {
  const { slug } = await params;
  const room = getRoomBySlug(slug);
  if (!room) notFound();
  const items = products.filter((p) =>
    p.rooms.some((label) => room.matchLabels.some((m) => label.toLowerCase().includes(m.toLowerCase().split(" ")[0]) || m.toLowerCase().includes(label.toLowerCase().split(" ")[0])))
  );
  // simpler match
  const matched = products.filter((p) =>
    p.rooms.some((label) => room.matchLabels.some((m) => label === m || label.toLowerCase().includes(m.toLowerCase()) || m.toLowerCase().includes(label.toLowerCase())))
  );
  const list = matched.length ? matched : items;
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 md:px-6">
      <p className="text-sm uppercase tracking-wide text-workspace-blue">Shop by room</p>
      <h1 className="mt-2 font-display text-4xl font-semibold">{room.name}</h1>
      <p className="mt-3 max-w-2xl text-soft-graphite">{room.description}</p>
      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {list.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </div>
  );
}
