"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { CompareItem } from "@/types/product";

type CompareState = {
  items: CompareItem[];
  toggle: (productId: string) => { ok: boolean; error?: string };
  remove: (productId: string) => void;
  clear: () => void;
  has: (productId: string) => boolean;
};

export const useCompareStore = create<CompareState>()(
  persist(
    (set, get) => ({
      items: [],
      toggle: (productId) => {
        const exists = get().items.some((i) => i.productId === productId);
        if (exists) {
          set({ items: get().items.filter((i) => i.productId !== productId) });
          return { ok: true };
        }
        if (get().items.length >= 4) {
          return { ok: false, error: "You can compare up to four products." };
        }
        set({
          items: [...get().items, { productId, addedAt: new Date().toISOString() }],
        });
        return { ok: true };
      },
      remove: (productId) => set({ items: get().items.filter((i) => i.productId !== productId) }),
      clear: () => set({ items: [] }),
      has: (productId) => get().items.some((i) => i.productId === productId),
    }),
    { name: "brightdesk-compare" },
  ),
);
