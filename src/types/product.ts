export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  category: string;
  images: string[];
  stock: number;
  featured: boolean;
  archived: boolean;
  active: boolean;
  colors: ProductColor[];
  sizes: string[];
  tags: string[];
  specifications: Record<string, string>;
  rating?: number;
  reviews?: number;
  badge?: string;
  created_at: string;
  updated_at: string;
}

export interface ProductColor {
  name: string;
  value: string;
}

export interface ProductFormData {
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  category: string;
  images: string[];
  stock: number;
  featured: boolean;
  active: boolean;
  colors: ProductColor[];
  sizes: string[];
  tags: string[];
  specifications: Record<string, string>;
}

export interface ProductFilters {
  search: string;
  category: string;
  status: 'all' | 'active' | 'archived' | 'out_of_stock';
  featured: boolean | null;
}

export const PRODUCT_CATEGORIES = [
  'Soldes',
  'Spécial Fêtes', 
  'Femmes',
  'Wax',
  'Corsets & Gaines',
  'Maillots de bain',
  'Sacs & portes monnaies',
  'Bijoux',
  'En couple'
];

export const PRODUCT_COLORS = [
  { name: 'Noir', value: '#000000' },
  { name: 'Rouge', value: '#B3001B' },
  { name: 'Blanc', value: '#FFFFFF' },
  { name: 'Rose', value: '#EC4899' },
  { name: 'Bleu', value: '#3B82F6' },
  { name: 'Vert', value: '#10B981' },
  { name: 'Jaune', value: '#F59E0B' },
  { name: 'Violet', value: '#8B5CF6' }
];

export const PRODUCT_SIZES = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];

export const PRODUCT_TAGS = [
  'Nouveautés',
  'Soldes',
  'Collections',
  'Exclusivités',
  'Bestseller',
  'Promo',
  'Nouveau'
];
