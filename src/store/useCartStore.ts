// src/store/useCartStore.ts

import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { Product } from '../types/product'
import { toast } from 'sonner'

export interface CartItem {
  id: string
  productId: string
  product: Product
  quantity: number
  selectedSize?: string
  selectedColor?: string
}

interface CartState {
  items: CartItem[]
  isOpen: boolean
  total: number

  // Actions
  addItem: (
    product: Product,
    quantity?: number,
    options?: { size?: string; color?: string }
  ) => void
  removeItem: (id: string) => void
  updateQuantity: (id: string, quantity: number) => void
  clearCart: () => void
  toggleCart: () => void
  openCart: () => void
  closeCart: () => void

  // Getters
  getTotalItems: () => number
  getItemQuantity: (productId: string) => number

  // Fonctions de calcul qui ne modifient pas l'état
  calculateTotal: (items?: CartItem[]) => number
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,
      total: 0,

      // --- Actions ---

      addItem: (product: Product, quantity = 1, options = {}) => {
        const state = get()

        const existingItemIndex = state.items.findIndex(
          item =>
            item.product.id === product.id &&
            item.selectedSize === options.size &&
            item.selectedColor === options.color
        )

        let updatedItems

        // 🔍 Vérification du stock
        const currentQuantity =
          existingItemIndex >= 0 ? state.items[existingItemIndex].quantity : 0
        const totalRequested = currentQuantity + quantity

        if (totalRequested > product.stock) {
          toast.error(
            `⚠️ Stock insuffisant pour "${product.name}" — stock dispo: ${product.stock}, demandé: ${totalRequested}`
          )
          return // Stoppe l'ajout
        }

        if (existingItemIndex >= 0) {
          updatedItems = [...state.items]
          updatedItems[existingItemIndex].quantity += quantity
        } else {
          const newItem: CartItem = {
            id: `${product.id}-${options.size || 'default'}-${
              options.color || 'default'
            }`,
            productId: product.id,
            product,
            quantity,
            selectedSize: options.size,
            selectedColor: options.color
          }
          updatedItems = [...state.items, newItem]
        }

        // ✅ Mise à jour atomique
        set({
          items: updatedItems,
          total: get().calculateTotal(updatedItems)
        })
      },

      removeItem: (id: string) => {
        const state = get()
        const updatedItems = state.items.filter(item => item.id !== id)

        // Mise à jour atomique
        set({
          items: updatedItems,
          total: get().calculateTotal(updatedItems)
        })
      },

      updateQuantity: (id: string, quantity: number) => {
        const state = get()

        if (quantity <= 0) {
          get().removeItem(id)
          return
        }

        // Trouver le produit concerné
        const item = state.items.find(i => i.id === id)
        if (!item) return

        // Vérifier le stock disponible
        if (quantity > item.product.stock) {
          toast.error(
            `⚠️ Stock insuffisant pour "${item.product.name}" — stock dispo: ${item.product.stock}, demandé: ${quantity}`
          )
          return
        }

        const updatedItems = state.items.map(i =>
          i.id === id ? { ...i, quantity } : i
        )

        // ✅ Mise à jour atomique
        set({
          items: updatedItems,
          total: get().calculateTotal(updatedItems)
        })
      },

      clearCart: () => {
        set({ items: [], total: 0 })
      },

      toggleCart: () => {
        set(state => ({ isOpen: !state.isOpen }))
      },

      openCart: () => {
        set({ isOpen: true })
      },

      closeCart: () => {
        set({ isOpen: false })
      },

      // --- Getters ---

      getTotalItems: () => {
        const state = get()
        return state.items.reduce((total, item) => total + item.quantity, 0)
      },

      getItemQuantity: (productId: string) => {
        const state = get()
        const item = state.items.find(item => item.product.id === productId)
        return item ? item.quantity : 0
      },

      // Fonction de calcul qui ne modifie pas l'état
      calculateTotal: (items = get().items) => {
        return items.reduce(
          (sum, item) => sum + Number(item.product.price) * item.quantity,
          0
        )
      }
    }),
    {
      name: 'cart-storage',
      partialize: state => ({
        items: state.items,
        total: state.total
      })
      // Cela évite les erreurs de persistance avec les types complexes
      // et garantit que les données sont bien des chaînes dans le localStorage.
      // NOTE: Le parse et le stringify ne sont nécessaires que si vous avez des types
      // complexes qui ne peuvent pas être sérialisés directement par JSON.
    }
  )
)
