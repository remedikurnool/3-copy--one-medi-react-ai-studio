import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface CartItem {
  id: string;
  type: 'medicine' | 'lab';
  name: string;
  price: number;
  mrp: number;
  image?: string;
  packSize?: string;
  qty: number;
  discount?: string;
  isPrescriptionRequired?: boolean;
}

interface CartState {
  items: CartItem[];
  prescription: string | null;
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, qty: number) => void;
  setPrescription: (url: string | null) => void;
  clearCart: () => void;
  totalPrice: () => number;
  totalMrp: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      prescription: null,
      addToCart: (item) => set((state) => {
        const existing = state.items.find((i) => i.id === item.id);
        if (existing) {
          return {
            items: state.items.map((i) =>
              i.id === item.id ? { ...i, qty: i.qty + 1 } : i
            ),
          };
        }
        return { items: [...state.items, { ...item, qty: 1 }] };
      }),
      removeFromCart: (id) => set((state) => ({
        items: state.items.filter((i) => i.id !== id),
      })),
      updateQuantity: (id, qty) => set((state) => {
        if (qty <= 0) {
          return { items: state.items.filter((i) => i.id !== id) };
        }
        return {
          items: state.items.map((i) => i.id === id ? { ...i, qty } : i)
        };
      }),
      setPrescription: (url) => set({ prescription: url }),
      clearCart: () => set({ items: [], prescription: null }),
      totalPrice: () => get().items.reduce((acc, item) => acc + (item.price * item.qty), 0),
      totalMrp: () => get().items.reduce((acc, item) => acc + (item.mrp * item.qty), 0),
    }),
    {
      name: 'one-medi-cart', // localStorage key
    }
  )
);