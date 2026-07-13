"use client";

import Link from "next/link";
import { useWishlistStore } from "@/store/wishlist-store";
import { getProductById } from "@/data/products";
import { ProductCard } from "@/components/product/product-card";
import { useCartStore } from "@/store/cart-store";

export default function WishlistPage() {
  const { items, clear, remove } = useWishlistStore();
  const addProduct = useCartStore((s) => s.addProduct);
  const products = items.map((i) => getProductById(i.productId)).filter(Boolean);

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 md:px-6">
      <div className="flex items-end justify-between gap-4">
        <div>
          <h1 className="font-display text-4xl font-semibold">Wishlist</h1>
          <p className="mt-2 text-soft-graphite">Saved locally on this device. No account required.</p>
        </div>
        {items.length > 0 && (
          <button type="button" className="text-sm underline" onClick={() => { if (confirm("Clear all wishlist items?")) clear(); }}>
            Clear all
          </button>
        )}
      </div>
      {products.length === 0 ? (
        <p className="mt-10 text-soft-graphite">Your wishlist is empty. <Link href="/shop" className="underline">Browse furniture</Link>.</p>
      ) : (
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((p) => p && (
            <div key={p.id} className="space-y-2">
              <ProductCard product={p} />
              <div className="flex gap-2">
                <button type="button" className="h-10 flex-1 rounded-md bg-blueprint-ink text-sm text-paper-cream" onClick={() => addProduct(p)}>Move to cart</button>
                <button type="button" className="h-10 rounded-md border border-border-stone px-3 text-sm" onClick={() => remove(p.id)}>Remove</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
