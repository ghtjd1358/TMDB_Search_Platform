import { create } from 'zustand';
import type { Category } from '@/constants/categories';

interface CategoryState {
  selected: Category | null;
  select: (c: Category) => void;
  clear: () => void;
}

export const useCategoryStore = create<CategoryState>((set) => ({
  selected: null,
  select: (selected) => set({ selected }),
  clear: () => set({ selected: null }),
}));
