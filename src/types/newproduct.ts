// types/product.ts

export interface ProductColor {
  name: string
  value: string
}

export interface ProductVariant {
  size: string
  colors: ProductColor[]
}

export interface Product {
  id: string
  name: string
  description: string
  price: number
  original_price?: number
  category: string
  images: string[]
  stock: number
  featured: boolean
  archived: boolean
  active: boolean
  variants: ProductVariant[]  // ← REMPLACE colors + sizes
  tags: string[]
  specifications: Record<string, string>
  rating?: number
  reviews?: number
  badge?: string
  created_at: string
  updated_at: string
}

export interface ProductFormData {
  name: string
  description: string
  price: number
  original_price?: number
  category: string
  images: string[]
  stock: number
  featured: boolean
  active: boolean
  variants: ProductVariant[]  // ← REMPLACE colors + sizes
  tags: string[]
  specifications: Record<string, string>
}

export interface ProductFilters {
  search: string
  category: string
  status: 'all' | 'active' | 'archived' | 'out_of_stock' | 'down_of_stock'
  featured: boolean | null
  tag: string | null
}

export interface StockMovementDb {
  id: string
  product_id: string
  type: 'in' | 'out' | 'adjustment'
  quantity_change: number
  new_stock: number
  reason?: string
  user_id?: string
  created_at: string
}

// === CONSTANTES ===
export const PRODUCT_CATEGORIES = [
  'Spécial Fêtes',
  'Corsets & Gaines',
  'Maillots de bain',
  'Sacs & portes monnaies',
  'Bijoux',
  'En couple',
  'Ensembles',
  'Chemises & tops',
  'Robes',
  'Combinaisons',
] as const

// SUPPRIMÉ : PRODUCT_COLORS → plus besoin, on utilise le color picker

export const PRODUCT_SIZES = ['T.U', 'XS', 'S', 'M', 'L', 'XL', 'XXL'] as const

export const PRODUCT_TAGS = [
  'Nouveautés',
  'Soldes',
  'Collections',
  'Exclusivités',
  'Meilleures ventes',
  'Promo'
] as const