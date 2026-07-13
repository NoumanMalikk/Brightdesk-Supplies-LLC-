"use client";

import Link from "next/link";
import { useCompareStore } from "@/store/compare-store";
import { getProductById } from "@/data/products";
import { displayVerification, formatPrice } from "@/lib/format";
import { ProductImage } from "@/components/product/product-image";

const fields = [
  ["title", "Product"],
  ["sku", "SKU"],
  ["category", "Category"],
  ["width", "Width"],
  ["depth", "Depth"],
  ["height", "Height"],
  ["seatHeight", "Seat height"],
  ["seatWidth", "Seat width"],
  ["seatDepth", "Seat depth"],
  ["drawerCount", "Drawers"],
  ["shelfCount", "Shelves"],
  ["doorCount", "Doors"],
  ["surfaceFinish", "Finish"],
  ["upholsteryColor", "Upholstery"],
  ["assemblyRequired", "Assembly"],
  ["boxCount", "Box count"],
  ["shippingClass", "Shipping class"],
  ["weightCapacity", "Weight capacity"],
  ["seatingCapacity", "Seating capacity"],
  ["cableManagement", "Cable management"],
  ["demoPrice", "Price"],
] as const;

export default function ComparePage() {
  const { items, remove, clear } = useCompareStore();
  const products = items.map((i) => getProductById(i.productId)).filter(Boolean);

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 md:px-6">
      <div className="flex items-end justify-between gap-4">
        <div>
          <h1 className="font-display text-4xl font-semibold">Compare</h1>
          <p className="mt-2 text-soft-graphite">Compare up to four products. Missing values are not invented.</p>
        </div>
        {items.length > 0 && <button type="button" className="text-sm underline" onClick={clear}>Clear</button>}
      </div>
      {products.length === 0 ? (
        <p className="mt-10 text-soft-graphite">No products selected. <Link href="/shop" className="underline">Browse furniture</Link>.</p>
      ) : (
        <div className="mt-8 overflow-x-auto">
          <table className="min-w-full border-collapse text-sm">
            <thead>
              <tr>
                <th className="border border-border-stone bg-gallery-white p-3 text-left">Field</th>
                {products.map((p) => p && (
                  <th key={p.id} className="border border-border-stone bg-gallery-white p-3 text-left align-top">
                    <div className="mb-2 h-28 w-28 overflow-hidden rounded border">
                      <ProductImage src={p.imageGallery[0]} alt={p.title} title={p.title} sizes="112px" />
                    </div>
                    <Link href={`/products/${p.slug}`} className="font-medium hover:underline">{p.title}</Link>
                    <button type="button" className="mt-2 block text-xs underline" onClick={() => remove(p.id)}>Remove</button>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {fields.slice(1).map(([key, label]) => (
                <tr key={key}>
                  <th className="border border-border-stone bg-paper-cream p-3 text-left font-medium">{label}</th>
                  {products.map((p) => {
                    if (!p) return null;
                    const raw = p[key as keyof typeof p];
                    const value = key === "demoPrice" ? formatPrice(p.demoPrice) : displayVerification(raw as never);
                    return <td key={p.id + key} className="border border-border-stone p-3 font-measure">{value}</td>;
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
