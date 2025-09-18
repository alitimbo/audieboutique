import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { ProductService } from '../services/productService' // Assurez-vous que ce chemin est correct
import { Product } from '../types/product' // Assurez-vous que ce chemin est correct

interface ProductState {
  products: Product[]
  loading: boolean
  error: string | null
  fetchProducts: () => Promise<void>
}

export const useProductStore = create<ProductState>()(
  persist(
    set => ({
      // État initial du store
      products: [],
      loading: false,
      error: null,

      // Fonction pour récupérer les produits
      fetchProducts: async () => {
        set({ loading: true, error: null })
        try {
          const response = await ProductService.getAllProducts() // Appel à votre service
          set({ products: response, loading: false })
        } catch (err) {
          set({ error: 'Échec du chargement des produits.', loading: false })
        }
      }
    }),
    {
      // Configuration de 'persist'
      name: 'product-storage',
      storage: createJSONStorage(() => localStorage)
    }
  )
)
