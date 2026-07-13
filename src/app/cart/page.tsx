"use client";

import Link from "next/link";
import { useCartStore, cartVariantKey } from "@/store/cart-store";
import { useWishlistStore } from "@/store/wishlist-store";
import { formatPrice } from "@/lib/format";
import { cartSubtotal } from "@/lib/cart-calculations";
import { ProductImage } from "@/components/product/product-image";
import { ButtonLink } from "@/components/ui/button";

export default function CartPage() {
  const { lines, updateQuantity, removeLine } = useCartStore();
  const wish = useWishlistStore();
  const subtotal = cartSubtotal(lines);

  return (
    <div className="mx-auto max-w-4xl px-4 py-12 md:px-6">
      <h1 className="font-display text-4xl font-semibold">Cart</h1>
      {lines.length === 0 ? (
        <p className="mt-8 text-soft-graphite">Your cart is empty. <Link href="/shop" className="underline">Shop furniture</Link>.</p>
      ) : (
        <>
          <ul className="mt-8 space-y-6">
            {lines.map((line) => {
              const key = cartVariantKey(line);
              return (
                <li key={key} className="flex gap-4 border-b border-border-stone pb-6">
                  <div className="h-28 w-28 overflow-hidden rounded border">
                    <ProductImage src={line.imagePath} alt={line.title} title={line.title} sizes="112px" />
                  </div>
                  <div className="flex-1">
                    <Link href={`/products/${line.slug}`} className="font-medium hover:underline">{line.title}</Link>
                    <p className="font-measure text-xs text-soft-graphite">{line.sku}</p>
                    <p className="text-xs text-soft-graphite">{[line.finishLabel, line.upholsteryLabel, line.orientationLabel].filter(Boolean).join(" · ")}</p>
                    <p className="font-measure text-xs text-soft-graphite">W {line.width ?? "—"} × D {line.depth ?? "—"} × H {line.height ?? "—"} · Boxes: {line.boxCount ?? "Verification required"}</p>
                    <p className="text-xs text-soft-graphite">Shipping: {line.shippingClass} · Assembly: {String(line.assemblyRequired)}</p>
                    <div className="mt-2 flex flex-wrap gap-3">
                      <input type="number" min={1} max={99} value={line.quantity} className="h-10 w-16 rounded border px-2" onChange={(e) => updateQuantity(line.productId, Number(e.target.value), key)} aria-label={`Quantity for ${line.title}`} />
                      <button type="button" className="text-sm underline" onClick={() => removeLine(line.productId, key)}>Remove</button>
                      <button type="button" className="text-sm underline" onClick={() => wish.toggle({ productId: line.productId, finishId: line.finishId, upholsteryId: line.upholsteryId, orientationId: line.orientationId })}>Move to wishlist</button>
                    </div>
                  </div>
                  <p className="font-semibold">{formatPrice(line.unitPrice * line.quantity)}</p>
                </li>
              );
            })}
          </ul>
          <div className="mt-8 flex items-center justify-between">
            <p className="text-lg font-semibold">Subtotal {formatPrice(subtotal)}</p>
            <ButtonLink href="/checkout">Proceed to checkout</ButtonLink>
          </div>
        </>
      )}
    </div>
  );
}
