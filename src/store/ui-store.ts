"use client";

import { create } from "zustand";

type UiState = {
  cartOpen: boolean;
  searchOpen: boolean;
  mobileNavOpen: boolean;
  setCartOpen: (open: boolean) => void;
  setSearchOpen: (open: boolean) => void;
  setMobileNavOpen: (open: boolean) => void;
};

export const useUiStore = create<UiState>((set) => ({
  cartOpen: false,
  searchOpen: false,
  mobileNavOpen: false,
  setCartOpen: (cartOpen) => set({ cartOpen }),
  setSearchOpen: (searchOpen) => set({ searchOpen }),
  setMobileNavOpen: (mobileNavOpen) => set({ mobileNavOpen }),
}));
