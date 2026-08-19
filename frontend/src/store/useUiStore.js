import { create } from 'zustand';

export const useUiStore = create((set) => ({
  mobileMenuOpen: false,
  toggleMobileMenu: () =>
    set((state) => ({ mobileMenuOpen: !state.mobileMenuOpen })),
}));
