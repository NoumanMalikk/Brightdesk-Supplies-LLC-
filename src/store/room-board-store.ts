"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

export type RoomBoardItem = {
  id: string;
  productId: string;
  x: number;
  y: number;
  rotation: number;
};

type RoomBoardState = {
  items: RoomBoardItem[];
  add: (productId: string) => void;
  update: (id: string, patch: Partial<RoomBoardItem>) => void;
  remove: (id: string) => void;
  clear: () => void;
};

export const useRoomBoardStore = create<RoomBoardState>()(
  persist(
    (set, get) => ({
      items: [],
      add: (productId) => {
        const id = `${productId}-${Date.now()}`;
        set({
          items: [
            ...get().items,
            { id, productId, x: 40 + get().items.length * 24, y: 40 + get().items.length * 16, rotation: 0 },
          ],
        });
      },
      update: (id, patch) =>
        set({ items: get().items.map((i) => (i.id === id ? { ...i, ...patch } : i)) }),
      remove: (id) => set({ items: get().items.filter((i) => i.id !== id) }),
      clear: () => set({ items: [] }),
    }),
    { name: "brightdesk-room-board" },
  ),
);
