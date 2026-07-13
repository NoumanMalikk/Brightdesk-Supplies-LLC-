"use client";

import { useRoomBoardStore } from "@/store/room-board-store";
import { products } from "@/data/products";
import { getProductById } from "@/data/products";
import { formatPrice } from "@/lib/format";
import { Button } from "@/components/ui/button";

export default function RoomBoardPage() {
  const { items, add, update, remove, clear } = useRoomBoardStore();
  const placed = items.map((i) => ({ ...i, product: getProductById(i.productId) }));
  const total = placed.reduce((sum, i) => sum + (i.product?.demoPrice ?? 0), 0);

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 md:px-6">
      <h1 className="font-display text-4xl font-semibold">Room board</h1>
      <p className="mt-3 max-w-2xl text-soft-graphite">
        Visually arrange furniture cutouts for planning. This tool does not claim architectural accuracy, professional space planning or code compliance.
      </p>
      <p className="mt-2 rounded-md border border-drafting-yellow bg-drafting-yellow/20 p-3 text-sm">
        Confirm room, doorway and circulation dimensions before ordering.
      </p>

      <div className="mt-6 flex flex-wrap gap-2">
        {products.slice(0, 12).map((p) => (
          <button key={p.id} type="button" className="rounded-md border border-border-stone bg-gallery-white px-3 py-2 text-xs" onClick={() => add(p.id)}>
            Add {p.title.split(",")[0]}
          </button>
        ))}
        <Button variant="outline" size="sm" onClick={clear}>Clear board</Button>
      </div>

      <div className="relative mt-6 h-[480px] overflow-hidden rounded-xl border border-border-stone bg-gallery-white draft-grid">
        {placed.map((item) => (
          <div
            key={item.id}
            className="absolute w-28 cursor-move rounded border border-blueprint-ink/40 bg-paper-cream/95 p-2 text-[10px] shadow-sm"
            style={{ left: item.x, top: item.y, transform: `rotate(${item.rotation}deg)` }}
            draggable
            onDragEnd={(e) => {
              const parent = (e.target as HTMLElement).parentElement?.getBoundingClientRect();
              if (!parent) return;
              update(item.id, { x: Math.max(0, e.clientX - parent.left - 40), y: Math.max(0, e.clientY - parent.top - 20) });
            }}
          >
            <p className="font-medium leading-tight">{item.product?.title}</p>
            <p className="font-measure">{typeof item.product?.width === "number" ? `${item.product.width}"` : "-"}</p>
            <p>{item.product ? formatPrice(item.product.demoPrice) : ""}</p>
            <button type="button" className="mt-1 underline" onClick={() => remove(item.id)}>Remove</button>
          </div>
        ))}
      </div>
      <p className="mt-4 text-sm font-semibold">Combined total: {formatPrice(total)}</p>
    </div>
  );
}
