export const ROUTES = {
  HOME: '/',
  SHOP: '/shop',
  PRODUCT: '/product',
  CART: '/cart',
  CHECKOUT: '/checkout',
  ACCOUNT: '/account',
  AUTH: '/auth',
  ADMIN: '/admin',
  ABOUT: '/about',
  COLLECTIONS: '/collections',
  ORDERS: '/orders',
  SUPPORT: '/support',
  SHIPPING: '/shipping',
  RETURNS: '/returns',
  SIZE_GUIDE: '/size-guide',
} as const;

export const BREAKPOINTS = {
  SM: 640,
  MD: 768,
  LG: 1024,
  XL: 1280,
  '2XL': 1536,
} as const;

export const ANIMATIONS = {
  DURATION: {
    FAST: 0.2,
    NORMAL: 0.3,
    SLOW: 0.5,
  },
  EASE: {
    DEFAULT: [0.4, 0, 0.2, 1],
    BOUNCE: [0.68, -0.55, 0.265, 1.55],
    SPRING: { type: 'spring', stiffness: 400, damping: 17 },
  },
} as const;

export const COLORS = {
  LUXURY_BLACK: '#0B0B0B',
  LUXURY_RED: '#B3001B',
  LUXURY_WHITE: '#F5F5F5',
} as const;

export const PRODUCT_CATEGORIES = [
  'electronics',
  'clothing',
  'accessories',
  'home',
  'beauty',
  'sports',
  'books',
  'other',
] as const;

export const ORDER_STATUS = {
  PENDING: 'pending',
  PROCESSING: 'processing',
  SHIPPED: 'shipped',
  DELIVERED: 'delivered',
  CANCELLED: 'cancelled',
} as const;

export const USER_ROLES = {
  USER: 'user',
  ADMIN: 'admin',
} as const;

export const STORAGE_KEYS = {
  CART: 'luxstore-cart',
  AUTH: 'luxstore-auth',
  THEME: 'luxstore-theme',
  WISHLIST: 'luxstore-wishlist',
} as const;