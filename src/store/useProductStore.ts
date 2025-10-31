import { create } from 'zustand'
import { ProductService } from '../services/productService'
import { Product } from '../types/newproduct'

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

      // Mélange aléatoire des produits
      const shuffled = response
        .map(value => ({ value, sort: Math.random() })) // ajoute un score aléatoire
        .sort((a, b) => a.sort - b.sort) // trie par ce score
        .map(({ value }) => value) // récupère les produits

      set({ products: shuffled, loading: false })
    } catch (err) {
      set({ error: 'Échec du chargement des produits.', loading: false })
    }
  }
}))
