import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Product } from '../lib/supabase';

export interface CartItem {
  id: string;
  product: Product;
  quantity: number;
  selectedSize?: string;
  selectedColor?: string;
}

interface CartState {
  items: CartItem[];
  isOpen: boolean;
  total: number;
  
  // Actions
  addItem: (product: Product, quantity?: number, options?: { size?: string; color?: string }) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  toggleCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  
  // Getters
  getTotalItems: () => number;
  getItemQuantity: (productId: string) => number;
  calculateTotal: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,
      total: 0,

      addItem: (product: Product, quantity = 1, options = {}) => {
        const state = get();
        const existingItemIndex = state.items.findIndex(
          item => item.product.id === product.id && 
                  item.selectedSize === options.size && 
                  item.selectedColor === options.color
        );

        if (existingItemIndex >= 0) {
          // Article existant, augmenter la quantité
          const updatedItems = [...state.items];
          updatedItems[existingItemIndex].quantity += quantity;
          set({ items: updatedItems });
        } else {
          // Nouvel article
          const newItem: CartItem = {
            id: `${product.id}-${options.size || 'default'}-${options.color || 'default'}`,
            product,
            quantity,
            selectedSize: options.size,
            selectedColor: options.color
          };
          set({ items: [...state.items, newItem] });
        }
        
        // Recalculer le total
        get().calculateTotal();
      },

      removeItem: (id: string) => {
        const state = get();
        const updatedItems = state.items.filter(item => item.id !== id);
        set({ items: updatedItems });
        get().calculateTotal();
      },

      updateQuantity: (id: string, quantity: number) => {
        const state = get();
        if (quantity <= 0) {
          get().removeItem(id);
          return;
        }
        
        const updatedItems = state.items.map(item =>
          item.id === id ? { ...item, quantity } : item
        );
        set({ items: updatedItems });
        get().calculateTotal();
      },

      clearCart: () => {
        set({ items: [], total: 0 });
      },

      toggleCart: () => {
        set(state => ({ isOpen: !state.isOpen }));
      },

      openCart: () => {
        set({ isOpen: true });
      },

      closeCart: () => {
        set({ isOpen: false });
      },

      getTotalItems: () => {
        const state = get();
        return state.items.reduce((total, item) => total + item.quantity, 0);
      },

      getItemQuantity: (productId: string) => {
        const state = get();
        const item = state.items.find(item => item.product.id === productId);
        return item ? item.quantity : 0;
      },

      calculateTotal: () => {
        const state = get();
        const total = state.items.reduce(
          (sum, item) => sum + (item.product.price * item.quantity),
          0
        );
        set({ total });
        return total;
      }
    }),
    {
      name: 'cart-storage',
      partialize: (state) => ({
        items: state.items,
        total: state.total
      })
    }
  )
);