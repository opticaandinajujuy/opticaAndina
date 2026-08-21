import { create } from 'zustand';

export const useProductStore = create((set) => ({
  products: [],
  category: 'sol',
  search: '',
  setProducts: (products) => set({ products }),
  setCategory: (category) => set({ category }),
  setSearch: (search) => set({ search }),
}));
