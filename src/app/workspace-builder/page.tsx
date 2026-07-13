"use client";

import Link from "next/link";
import { useWorkspaceStore } from "@/store/workspace-store";
import { productsForSlot } from "@/data/workspace-compatibility";
import { getProductById } from "@/data/products";
import { ProductImage } from "@/components/product/product-image";
import { formatDimensions, formatPrice } from "@/lib/format";
import { estimateCombinedFootprint } from "@/lib/footprint";
import { useCartStore } from "@/store/cart-store";
import { Button } from "@/components/ui/button";

const slots = [
  { key: "deskId" as const, label: "Desk", slot: "desk" as const },
  { key: "primaryChairId" as const, label: "Primary chair", slot: "primaryChair" as const },
  { key: "storageId" as const, label: "Storage", slot: "storage" as const },
  { key: "guestSeatId" as const, label: "Guest seat", slot: "guestSeat" as const },
  { key: "softSeatingId" as const, label: "Soft seating", slot: "softSeating" as const },
];

export default function WorkspaceBuilderPage() {
  const store = useWorkspaceStore();
  const addProduct = useCartStore((s) => s.addProduct);
  const selected = store.selectedIds().map((id) => getProductById(id)).filter(Boolean);
  const total = selected.reduce((sum, p) => sum + (p?.demoPrice ?? 0), 0);
  const footprint = estimateCombinedFootprint(selected.map((p) => p!));

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 md:px-6">
      <h1 className="font-display text-4xl font-semibold">Workspace builder</h1>
      <p className="mt-3 max-w-2xl text-soft-graphite">
        Combine compatible furniture using manually configured compatibility IDs. Add each product separately — no fake bundles or discounts. Footprint is an estimate only.
      </p>
      <p className="mt-2 rounded-md border border-drafting-yellow bg-drafting-yellow/20 p-3 text-sm">
        Confirm room, doorway and circulation dimensions before ordering.
      </p>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        {slots.map((s) => {
          const options = productsForSlot(s.slot).map((id) => getProductById(id)).filter(Boolean);
          const current = store[s.key] ? getProductById(store[s.key]!) : null;
          return (
            <section key={s.key} className="rounded-lg border border-border-stone bg-gallery-white p-5">
              <h2 className="font-display text-xl font-semibold">{s.label}</h2>
              <label className="mt-3 block text-sm" htmlFor={s.key}>Select product</label>
              <select
                id={s.key}
                className="mt-1 h-11 w-full rounded-md border border-border-stone px-3 text-sm"
                value={store[s.key] ?? ""}
                onChange={(e) => store.setSlot(s.key, e.target.value || null)}
              >
                <option value="">None</option>
                {options.map((p) => p && (
                  <option key={p.id} value={p.id}>{p.title}</option>
                ))}
              </select>
              {current && (
                <div className="mt-4 flex gap-3">
                  <div className="h-24 w-24 overflow-hidden rounded border">
                    <ProductImage src={current.imageGallery[0]} alt={current.title} title={current.title} sizes="96px" />
                  </div>
                  <div className="text-sm">
                    <Link href={`/products/${current.slug}`} className="font-medium hover:underline">{current.title}</Link>
                    <p className="font-measure text-xs text-soft-graphite">{formatDimensions(current)}</p>
                    <p>{formatPrice(current.demoPrice)}</p>
                    <p className="text-xs text-soft-graphite">{current.surfaceFinish || current.upholsteryColor || "Finish pending"}</p>
                  </div>
                </div>
              )}
            </section>
          );
        })}
      </div>

      <div className="mt-8 rounded-xl border border-border-stone bg-gallery-white p-6">
        <h2 className="font-display text-2xl font-semibold">Plan summary</h2>
        <p className="mt-2 text-lg font-semibold">Combined total: {formatPrice(total)}</p>
        <p className="mt-2 font-measure text-sm text-soft-graphite">
          Approx. footprint: W {footprint.widthInches ?? "—"}&quot; × D {footprint.depthInches ?? "—"}&quot;
        </p>
        <p className="mt-2 text-sm text-soft-graphite">{footprint.note}</p>
        <div className="mt-4 flex flex-wrap gap-3">
          <Button
            onClick={() => {
              selected.forEach((p) => p && addProduct(p));
            }}
            disabled={selected.length === 0}
          >
            Add each item to cart
          </Button>
          <Button variant="outline" onClick={() => store.clear()}>Clear plan</Button>
          <Link href="/room-board" className="inline-flex h-11 items-center text-sm underline">Open room board</Link>
        </div>
      </div>
    </div>
  );
}
