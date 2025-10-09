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
  colors: ProductColor[]
  sizes: string[]
  tags: string[]
  specifications: Record<string, string>
  rating?: number
  reviews?: number
  badge?: string
  created_at: string
  updated_at: string
}

export interface ProductColor {
  name: string
  value: string
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
  colors: ProductColor[]
  sizes: string[]
  tags: string[]
  specifications: Record<string, string>
}

export interface ProductFilters {
  search: string
  category: string
  status: 'all' | 'active' | 'archived' | 'out_of_stock'
  featured: boolean | null
  tag: string | null
}

export interface StockMovementDb {
  id: string // L'identifiant unique du mouvement (généré automatiquement).
  product_id: string // L'identifiant du produit concerné.
  type: 'in' | 'out' | 'adjustment' // Le type de mouvement.
  quantity_change: number // La quantité qui a été ajoutée ou retirée.
  new_stock: number // La nouvelle quantité en stock après ce mouvement.
  reason?: string // La raison du mouvement (optionnelle).
  user_id?: string // L'identifiant de l'utilisateur qui a effectué le mouvement (optionnel).
  created_at: string // La date et l'heure de l'enregistrement du mouvement.
}

export const PRODUCT_CATEGORIES = [
  'Spécial Fêtes',
  'Femmes',
  'Corsets & Gaines',
  'Maillots de bain',
  'Sacs & portes monnaies',
  'Bijoux',
  'En couple'
]

export const PRODUCT_COLORS = [
  { name: 'Noir', value: '#000000' },
  { name: 'Rouge', value: '#B3001B' },
  { name: 'Blanc', value: '#FFFFFF' },
  { name: 'Rose', value: '#EC4899' },
  { name: 'Bleu', value: '#3B82F6' },
  { name: 'Vert', value: '#10B981' },
  { name: 'Jaune', value: '#F59E0B' },
  { name: 'Violet', value: '#8B5CF6' }
]

export const PRODUCT_SIZES = ['XS', 'S', 'M', 'L', 'XL', 'XXL']

export const PRODUCT_TAGS = [
  'Nouveautés',
  'Soldes',
  'Collections',
  'Exclusivités',
  'Meilleures ventes',
  'Promo'
]
