"use client";

import Link from "next/link";
import { X } from "lucide-react";
import { useCartStore, cartVariantKey } from "@/store/cart-store";
import { useUiStore } from "@/store/ui-store";
import { formatPrice } from "@/lib/format";
import { cartSubtotal } from "@/lib/cart-calculations";
import { ButtonLink } from "@/components/ui/button";
import { ProductImage } from "@/components/product/product-image";

export function CartDrawer() {
  const { cartOpen, setCartOpen } = useUiStore();
  const { lines, updateQuantity, removeLine } = useCartStore();
  const subtotal = cartSubtotal(lines);

  if (!cartOpen) return null;

  return (
    <div className="fixed inset-0 z-[70]" role="dialog" aria-modal="true" aria-label="Shopping cart">
      <button type="button" className="absolute inset-0 bg-blueprint-ink/40" aria-label="Close cart" onClick={() => setCartOpen(false)} />
      <div className="absolute inset-y-0 right-0 flex w-full max-w-md flex-col bg-paper-cream shadow-xl">
        <div className="flex items-center justify-between border-b border-border-stone px-4 py-4">
          <h2 className="font-display text-lg font-semibold">Cart</h2>
          <button type="button" className="inline-flex min-h-11 min-w-11 items-center justify-center" aria-label="Close cart" onClick={() => setCartOpen(false)}>
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto px-4 py-4">
          {lines.length === 0 ? (
            <p className="text-sm text-soft-graphite">Your cart is empty. Browse furniture by zone or category.</p>
          ) : (
            <ul className="space-y-4">
              {lines.map((line) => {
                const key = cartVariantKey(line);
                return (
                  <li key={key} className="flex gap-3 border-b border-border-stone pb-4">
                    <div className="h-20 w-20 overflow-hidden rounded border border-border-stone">
                      <ProductImage src={line.imagePath} alt={line.title} title={line.title} sizes="80px" />
                    </div>
                    <div className="flex-1">
                      <Link href={`/products/${line.slug}`} className="text-sm font-medium hover:underline" onClick={() => setCartOpen(false)}>
                        {line.title}
                      </Link>
                      <p className="font-measure text-xs text-soft-graphite">{line.sku}</p>
                      {(line.finishLabel || line.upholsteryLabel || line.orientationLabel) && (
                        <p className="text-xs text-soft-graphite">
                          {[line.finishLabel, line.upholsteryLabel, line.orientationLabel].filter(Boolean).join(" · ")}
                        </p>
                      )}
                      <div className="mt-2 flex items-center gap-2">
                        <label className="sr-only" htmlFor={`qty-${key}`}>Quantity</label>
                        <input
                          id={`qty-${key}`}
                          type="number"
                          min={1}
                          max={99}
                          value={line.quantity}
                          className="h-9 w-16 rounded border border-border-stone bg-gallery-white px-2 text-sm"
                          onChange={(e) => updateQuantity(line.productId, Number(e.target.value), key)}
                        />
                        <button type="button" className="text-xs underline" onClick={() => removeLine(line.productId, key)}>
                          Remove
                        </button>
                      </div>
                    </div>
                    <p className="text-sm font-semibold">{formatPrice(line.unitPrice * line.quantity)}</p>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
        <div className="border-t border-border-stone p-4">
          <div className="mb-3 flex justify-between text-sm">
            <span>Subtotal</span>
            <span className="font-semibold">{formatPrice(subtotal)}</span>
          </div>
          <p className="mb-3 text-xs text-soft-graphite">Shipping and tax calculated at checkout. Demonstration prices require verification before live purchase.</p>
          <div className="flex flex-col gap-2">
            <ButtonLink href="/cart" variant="outline" onClick={() => setCartOpen(false)}>
              View cart
            </ButtonLink>
            <ButtonLink href="/checkout" onClick={() => setCartOpen(false)}>
              Checkout
            </ButtonLink>
          </div>
        </div>
      </div>
    </div>
  );
}
