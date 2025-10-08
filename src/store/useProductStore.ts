import { create } from 'zustand'
import { ProductService } from '../services/productService'
import { Product } from '../types/product'

interface ProductState {
  products: Product[]
  loading: boolean
  error: string | null
  fetchProducts: () => Promise<void>
}

export const useProductStore = create<ProductState>(set => ({
  products: [],
  loading: false,
  error: null,

  fetchProducts: async () => {
    set({ loading: true, error: null })
    try {
      const response = await ProductService.getAllProducts()
      set({ products: response, loading: false })
    } catch (err) {
      set({ error: 'Échec du chargement des produits.', loading: false })
    }
  }
}))
