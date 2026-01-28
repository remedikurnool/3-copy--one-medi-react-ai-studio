import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { supabase } from '../lib/supabase';

export interface CartItem {
  id: string;
  type: 'medicine' | 'lab' | 'scan' | 'doctor' | 'service' | 'insurance';
  name: string;
  price: number;
  mrp: number;
  image?: string;
  packSize?: string;
  qty: number;
  discount?: string;
  isPrescriptionRequired?: boolean;
  vendorId?: string;
  serviceCatalogId?: string;
}

interface CartState {
  items: CartItem[];
  prescription: string | null;
  cartId: string | null;
  syncing: boolean;

  // Actions
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, qty: number) => void;
  setPrescription: (url: string | null) => void;
  clearCart: () => void;

  // Sync with Supabase
  syncCartToSupabase: (userId: string) => Promise<void>;
  loadCartFromSupabase: (userId: string) => Promise<void>;

  // Computed
  totalPrice: () => number;
  totalMrp: () => number;
  totalItems: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      prescription: null,
      cartId: null,
      syncing: false,

      addToCart: (item) => set((state) => {
        const existing = state.items.find((i) => i.id === item.id);
        if (existing) {
          return {
            items: state.items.map((i) =>
              i.id === item.id ? { ...i, qty: i.qty + (item.qty || 1) } : i
            ),
          };
        }
        return { items: [...state.items, { ...item, qty: item.qty || 1 }] };
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

      syncCartToSupabase: async (userId: string) => {
        const { items, cartId, syncing } = get();
        if (syncing) return;

        set({ syncing: true });

        try {
          let currentCartId = cartId;

          // Create or get cart
          if (!currentCartId) {
            // Check if user has existing cart
            const { data: existingCart } = await supabase
              .from('carts')
              .select('id')
              .eq('profile_id', userId)
              .single();

            if (existingCart) {
              currentCartId = existingCart.id;
            } else {
              // Create new cart
              const { data: newCart, error } = await supabase
                .from('carts')
                .insert({ profile_id: userId })
                .select()
                .single();

              if (error) throw error;
              currentCartId = newCart.id;
            }
            set({ cartId: currentCartId });
          }

          // Clear existing cart items
          await supabase
            .from('cart_items')
            .delete()
            .eq('cart_id', currentCartId);

          // Add current items
          if (items.length > 0) {
            const cartItems = items.map(item => ({
              cart_id: currentCartId,
              service_catalog_id: item.serviceCatalogId || item.id,
              quantity: item.qty,
              unit_price: item.price,
              vendor_id: item.vendorId,
              notes: JSON.stringify({
                name: item.name,
                type: item.type,
                mrp: item.mrp,
                image: item.image,
                packSize: item.packSize,
                discount: item.discount,
                isPrescriptionRequired: item.isPrescriptionRequired,
              }),
            }));

            const { error } = await supabase
              .from('cart_items')
              .insert(cartItems);

            if (error) throw error;
          }
        } catch (error) {
          console.error('Error syncing cart to Supabase:', error);
        } finally {
          set({ syncing: false });
        }
      },

      loadCartFromSupabase: async (userId: string) => {
        set({ syncing: true });

        try {
          // Get user's cart
          const { data: cart } = await supabase
            .from('carts')
            .select('id')
            .eq('profile_id', userId)
            .single();

          if (!cart) {
            set({ cartId: null, syncing: false });
            return;
          }

          set({ cartId: cart.id });

          // Get cart items
          const { data: cartItems, error } = await supabase
            .from('cart_items')
            .select('*')
            .eq('cart_id', cart.id);

          if (error) throw error;

          if (cartItems && cartItems.length > 0) {
            const items: CartItem[] = cartItems.map(item => {
              const notes = item.notes ? JSON.parse(item.notes as string) : {};
              return {
                id: item.service_catalog_id,
                type: notes.type || 'medicine',
                name: notes.name || 'Unknown',
                price: item.unit_price || 0,
                mrp: notes.mrp || item.unit_price || 0,
                image: notes.image,
                packSize: notes.packSize,
                qty: item.quantity || 1,
                discount: notes.discount,
                isPrescriptionRequired: notes.isPrescriptionRequired,
                vendorId: item.vendor_id || undefined,
                serviceCatalogId: item.service_catalog_id,
              };
            });
            set({ items });
          }
        } catch (error) {
          console.error('Error loading cart from Supabase:', error);
        } finally {
          set({ syncing: false });
        }
      },

      totalPrice: () => get().items.reduce((acc, item) => acc + (item.price * item.qty), 0),
      totalMrp: () => get().items.reduce((acc, item) => acc + (item.mrp * item.qty), 0),
      totalItems: () => get().items.reduce((acc, item) => acc + item.qty, 0),
    }),
    {
      name: 'one-medi-cart',
      partialize: (state) => ({
        items: state.items,
        prescription: state.prescription,
      }),
    }
  )
);