import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { ProductService } from "../services/productService"; 
import { Product } from "../types/product";

// Durée de vie du cache (exemple : 30 minutes)
const TTL = 1000 * 60 * 30;

interface ProductState {
  products: Product[];
  loading: boolean;
  error: string | null;
  fetchProducts: () => Promise<void>;
}

export const useProductStore = create<ProductState>()(
  persist(
    (set) => ({
      products: [],
      loading: false,
      error: null,

      fetchProducts: async () => {
        set({ loading: true, error: null });
        try {
          const response = await ProductService.getAllProducts();
          set({ products: response, loading: false });
        } catch (err) {
          set({ error: "Échec du chargement des produits.", loading: false });
        }
      },
    }),
    {
      name: "product-storage",
      storage: createJSONStorage(() => ({
        getItem: (name) => {
          const str = localStorage.getItem(name);
          if (!str) return null;

          try {
            const data = JSON.parse(str);
            const now = Date.now();

            if (now - data.timestamp > TTL) {
              localStorage.removeItem(name);
              return null;
            }

            return data.state;
          } catch {
            return null;
          }
        },
        setItem: (name, value) => {
          const data = { state: value, timestamp: Date.now() };
          localStorage.setItem(name, JSON.stringify(data));
        },
        removeItem: (name) => localStorage.removeItem(name),
      })),
    }
  )
);
