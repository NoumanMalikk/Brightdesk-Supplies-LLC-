"use client";

import Link from "next/link";
import { Heart, GitCompareArrows } from "lucide-react";
import type { Product } from "@/types/product";
import { ProductImage } from "@/components/product/product-image";
import { formatDimensions, formatPrice, formatAssembly } from "@/lib/format";
import { getPrimaryActionLabel } from "@/lib/product-validation";
import { useWishlistStore } from "@/store/wishlist-store";
import { useCompareStore } from "@/store/compare-store";
import { useCartStore } from "@/store/cart-store";
import { useUiStore } from "@/store/ui-store";
import { cn } from "@/lib/utils";

export function ProductCard({ product, className }: { product: Product; className?: string }) {
  const action = getPrimaryActionLabel(product);
  const wish = useWishlistStore();
  const compare = useCompareStore();
  const addProduct = useCartStore((s) => s.addProduct);
  const setCartOpen = useUiStore((s) => s.setCartOpen);
  const finish = product.colorways.find((c) => c.type === "finish" || c.type === "upholstery");

  return (
    <article
      className={cn(
        "group flex h-full flex-col overflow-hidden rounded-lg border border-border-stone bg-gallery-white transition-shadow duration-200 hover:shadow-md",
        className,
      )}
    >
      <Link href={`/products/${product.slug}`} className="relative block overflow-hidden bg-gallery-white">
        <ProductImage
          src={product.imageGallery[0]}
          alt={`${product.title} studio product photograph`}
          title={product.title}
          sizes="(max-width: 768px) 50vw, 25vw"
        />
        <span className="absolute left-3 top-3 rounded bg-paper-cream/95 px-2 py-1 text-[11px] font-medium uppercase tracking-wide text-workspace-blue">
          {product.functionalZones[0]}
        </span>
      </Link>
      <div className="flex flex-1 flex-col gap-2 p-4">
        <p className="text-xs uppercase tracking-wide text-soft-graphite">{product.category}</p>
        <h3 className="font-display text-base font-semibold leading-snug">
          <Link href={`/products/${product.slug}`} className="line-clamp-2" title={product.title}>
            {product.title}
          </Link>
        </h3>
        <p className="font-measure text-xs text-soft-graphite">{formatDimensions(product)}</p>
        <p className="line-clamp-1 text-xs text-soft-graphite">
          {finish ? `${finish.type === "upholstery" ? "Upholstery" : "Finish"}: ${finish.label}` : "Finish: Verification required"}
        </p>
        <p className="font-display text-lg font-semibold">{formatPrice(product.demoPrice)}</p>
        <p className="text-xs text-soft-graphite">{formatAssembly(product.assemblyRequired)}</p>
        <div className="mt-auto flex items-center gap-2 pt-2">
          <button
            type="button"
            className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-md border border-border-stone"
            aria-label={wish.has(product.id) ? "Remove from wishlist" : "Add to wishlist"}
            onClick={() =>
              wish.toggle({
                productId: product.id,
                finishId: null,
                upholsteryId: null,
                orientationId: null,
              })
            }
          >
            <Heart className={cn("h-4 w-4", wish.has(product.id) && "fill-upholstery-rust text-upholstery-rust")} />
          </button>
          <button
            type="button"
            className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-md border border-border-stone"
            aria-label={compare.has(product.id) ? "Remove from compare" : "Add to compare"}
            onClick={() => compare.toggle(product.id)}
          >
            <GitCompareArrows className={cn("h-4 w-4", compare.has(product.id) && "text-workspace-blue")} />
          </button>
          {action === "Add to Cart" ? (
            <button
              type="button"
              className="ml-auto inline-flex h-11 flex-1 items-center justify-center rounded-md bg-blueprint-ink px-3 text-sm font-medium text-paper-cream transition-colors hover:bg-workspace-blue"
              onClick={() => {
                const result = addProduct(product);
                if (result.ok) setCartOpen(true);
              }}
            >
              Add to Cart
            </button>
          ) : (
            <Link
              href={`/products/${product.slug}`}
              className="ml-auto inline-flex h-11 flex-1 items-center justify-center rounded-md bg-blueprint-ink px-3 text-sm font-medium text-paper-cream transition-colors hover:bg-workspace-blue"
            >
              {action}
            </Link>
          )}
        </div>
      </div>
    </article>
  );
}
