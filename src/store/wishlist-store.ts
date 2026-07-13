"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { WishlistItem } from "@/types/product";

type WishlistState = {
  items: WishlistItem[];
  toggle: (item: Omit<WishlistItem, "addedAt">) => void;
  remove: (productId: string) => void;
  clear: () => void;
  has: (productId: string) => boolean;
};

export const useWishlistStore = create<WishlistState>()(
  persist(
    (set, get) => ({
      items: [],
      toggle: (item) => {
        const exists = get().items.some((i) => i.productId === item.productId);
        if (exists) {
          set({ items: get().items.filter((i) => i.productId !== item.productId) });
        } else {
          set({
            items: [...get().items, { ...item, addedAt: new Date().toISOString() }],
          });
        }
      },
      remove: (productId) => set({ items: get().items.filter((i) => i.productId !== productId) }),
      clear: () => set({ items: [] }),
      has: (productId) => get().items.some((i) => i.productId === productId),
    }),
    { name: "brightdesk-wishlist" },
  ),
);
