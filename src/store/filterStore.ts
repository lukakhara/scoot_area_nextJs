import { create } from "zustand";

type FilterState = {
  filtersOpen: boolean;
  toggleFilters: () => void;
  closeFilters: () => void;
};

export const useFilterStore = create<FilterState>((set) => ({
  filtersOpen: false,
  toggleFilters: () => set((s) => ({ filtersOpen: !s.filtersOpen })),
  closeFilters: () => set({ filtersOpen: false }),
}));