"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

export type WorkspaceSelection = {
  deskId: string | null;
  primaryChairId: string | null;
  storageId: string | null;
  guestSeatId: string | null;
  softSeatingId: string | null;
};

type WorkspaceState = WorkspaceSelection & {
  setSlot: (slot: keyof WorkspaceSelection, productId: string | null) => void;
  clear: () => void;
  selectedIds: () => string[];
};

const empty: WorkspaceSelection = {
  deskId: null,
  primaryChairId: null,
  storageId: null,
  guestSeatId: null,
  softSeatingId: null,
};

export const useWorkspaceStore = create<WorkspaceState>()(
  persist(
    (set, get) => ({
      ...empty,
      setSlot: (slot, productId) => set({ [slot]: productId }),
      clear: () => set({ ...empty }),
      selectedIds: () =>
        [get().deskId, get().primaryChairId, get().storageId, get().guestSeatId, get().softSeatingId].filter(
          (id): id is string => Boolean(id),
        ),
    }),
    { name: "brightdesk-workspace" },
  ),
);
