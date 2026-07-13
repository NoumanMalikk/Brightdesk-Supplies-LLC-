"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

type RecentlyViewedState = {
  ids: string[];
  add: (productId: string) => void;
};

export const useRecentlyViewedStore = create<RecentlyViewedState>()(
  persist(
    (set, get) => ({
      ids: [],
      add: (productId) => {
        const next = [productId, ...get().ids.filter((id) => id !== productId)].slice(0, 8);
        set({ ids: next });
      },
    }),
    { name: "brightdesk-recent" },
  ),
);
