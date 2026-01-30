import { create } from "zustand";

export type CartItem = {
  id: string;
  name: string;
  price: number;
  image?: string;
  qty: number;
};

type CartState = {
  items: CartItem[];
  add: (item: Omit<CartItem, "qty">, qty?: number) => void;
  remove: (id: string) => void;
  clear: () => void;
  setQty: (id: string, qty: number) => void;
  total: () => number;
};

export const useCartStore = create<CartState>((set, get) => ({
  items: [],
  add: (item, qty = 1) =>
    set((state) => {
      const existing = state.items.find((i) => i.id === item.id);
      if (existing) {
        return {
          items: state.items.map((i) =>
            i.id === item.id ? { ...i, qty: i.qty + qty } : i
          ),
        };
      }
      return { items: [...state.items, { ...item, qty }] };
    }),
  remove: (id) => set((state) => ({ items: state.items.filter((i) => i.id !== id) })),
  clear: () => set({ items: [] }),
  setQty: (id, qty) =>
    set((state) => ({
      items: state.items.map((i) => (i.id === id ? { ...i, qty } : i)),
    })),
  total: () => get().items.reduce((sum, i) => sum + i.price * i.qty, 0),
}));
