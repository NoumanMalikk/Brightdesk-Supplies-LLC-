"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { CartLine, Product } from "@/types/product";
import { clampQuantity } from "@/lib/cart-calculations";
import { canPurchaseInMode } from "@/lib/product-validation";
import { storeConfig } from "@/data/store-config";

type CartState = {
  lines: CartLine[];
  addProduct: (
    product: Product,
    options?: {
      quantity?: number;
      finishId?: string | null;
      finishLabel?: string | null;
      upholsteryId?: string | null;
      upholsteryLabel?: string | null;
      orientationId?: string | null;
      orientationLabel?: string | null;
    },
  ) => { ok: boolean; error?: string };
  updateQuantity: (productId: string, quantity: number, variantKey?: string) => void;
  removeLine: (productId: string, variantKey?: string) => void;
  clear: () => void;
  count: () => number;
};

function variantKey(line: Pick<CartLine, "productId" | "finishId" | "upholsteryId" | "orientationId">) {
  return [line.productId, line.finishId ?? "", line.upholsteryId ?? "", line.orientationId ?? ""].join("|");
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      lines: [],
      addProduct: (product, options = {}) => {
        if (!canPurchaseInMode(product, storeConfig.storeMode)) {
          return { ok: false, error: "This product cannot be purchased until specifications and images are verified for the current store mode." };
        }
        const quantity = clampQuantity(options.quantity ?? 1);
        const next: CartLine = {
          productId: product.id,
          sku: product.sku,
          slug: product.slug,
          title: product.title,
          quantity,
          unitPrice: product.demoPrice,
          finishId: options.finishId ?? product.colorways.find((c) => c.type === "finish")?.id ?? null,
          finishLabel: options.finishLabel ?? product.colorways.find((c) => c.type === "finish")?.label ?? null,
          upholsteryId: options.upholsteryId ?? product.colorways.find((c) => c.type === "upholstery")?.id ?? null,
          upholsteryLabel: options.upholsteryLabel ?? product.colorways.find((c) => c.type === "upholstery")?.label ?? null,
          orientationId: options.orientationId ?? null,
          orientationLabel: options.orientationLabel ?? null,
          width: typeof product.width === "number" ? product.width : null,
          height: typeof product.height === "number" ? product.height : null,
          depth: typeof product.depth === "number" ? product.depth : null,
          boxCount: typeof product.boxCount === "number" ? product.boxCount : null,
          shippingClass: product.shippingClass,
          assemblyRequired: product.assemblyRequired,
          imagePath: product.imageGallery[0] ?? null,
          addedAt: new Date().toISOString(),
        };
        const key = variantKey(next);
        set((state) => {
          const existing = state.lines.find((l) => variantKey(l) === key);
          if (existing) {
            return {
              lines: state.lines.map((l) =>
                variantKey(l) === key ? { ...l, quantity: clampQuantity(l.quantity + quantity) } : l,
              ),
            };
          }
          return { lines: [...state.lines, next] };
        });
        return { ok: true };
      },
      updateQuantity: (productId, quantity, key) => {
        set((state) => ({
          lines: state.lines.map((l) => {
            const match = key ? variantKey(l) === key : l.productId === productId;
            return match ? { ...l, quantity: clampQuantity(quantity) } : l;
          }),
        }));
      },
      removeLine: (productId, key) => {
        set((state) => ({
          lines: state.lines.filter((l) => (key ? variantKey(l) !== key : l.productId !== productId)),
        }));
      },
      clear: () => set({ lines: [] }),
      count: () => get().lines.reduce((sum, l) => sum + l.quantity, 0),
    }),
    { name: "brightdesk-cart" },
  ),
);

export { variantKey as cartVariantKey };
