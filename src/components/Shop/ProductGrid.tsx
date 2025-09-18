import React from 'react'
import { motion } from 'framer-motion'
import { ShoppingCart, Heart, Eye } from 'lucide-react'

const mockProducts = [
  {
    idx: 0,
    id: '2540e94d-961e-4127-8f88-1c836a6fed15',
    name: 'Ensemble Lingerie Dentelle Rouge Passion',
    description:
      'Ensemble lingerie en dentelle française premium avec finitions soignées',
    price: '89.99',
    original_price: '119.99',
    stock: 16,
    category: 'Femmes',
    images: [
      'https://images.pexels.com/photos/1926769/pexels-photo-1926769.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    featured: false,
    archived: false,
    active: true,
    colors:
      '[{"name": "Rouge Passion", "value": "#B3001B"}, {"name": "Noir Élégant", "value": "#000000"}]',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    tags: ['Bestseller', 'Nouveautés'],
    specifications:
      '{"Origine": "Fabriqué en France", "Matière": "Dentelle française 90% Polyamide, 10% Élasthanne", "Entretien": "Lavage à la main recommandé"}',
    rating: null,
    reviews: 0,
    badge: null,
    created_at: '2025-07-29 21:57:58.388992+00',
    updated_at: '2025-09-16 18:39:59.722555+00'
  },
  {
    idx: 1,
    id: '5409b571-de77-4e0e-9c0f-abda77dae68e',
    name: 'Corset Sculptant Premium Noir',
    description: 'Corset sculptant avec armatures pour un maintien parfait',
    price: '75.00',
    original_price: null,
    stock: 18,
    category: 'Corsets & Gaines',
    images: [
      'https://images.pexels.com/photos/1536619/pexels-photo-1536619.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    featured: true,
    archived: false,
    active: true,
    colors: '[{"name": "Noir", "value": "#000000"}]',
    sizes: ['S', 'M', 'L', 'XL'],
    tags: ['Nouveau'],
    specifications:
      '{"Matière": "Satin et dentelle", "Armatures": "Oui", "Fermeture": "Lacets ajustables"}',
    rating: null,
    reviews: 0,
    badge: null,
    created_at: '2025-07-29 21:57:58.388992+00',
    updated_at: '2025-07-30 14:50:29.913354+00'
  }
]

export const ProductGrid: React.FC = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { y: 30, opacity: 0, scale: 0.9 },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 12
      }
    }
  }

  return (
    <motion.div
      variants={containerVariants}
      initial='hidden'
      animate='visible'
      className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'
    >
      {mockProducts.map(product => (
        <motion.div
          key={product.id}
          variants={itemVariants}
          whileHover={{ y: -5 }}
          className='group bg-luxury-white rounded-3xl overflow-hidden border border-luxury-gray-200 hover:border-luxury-red transition-all duration-300 shadow-luxury'
        >
          {/* Product Image */}
          <div className='relative overflow-hidden'>
            <img
              src={product.images[0]}
              alt={product.name}
              className='w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500'
            />

            {/* Hover Actions */}
            <div className='absolute inset-0 bg-luxury-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center space-x-3'>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => {}}
                className='bg-luxury-white text-luxury-black p-2 rounded-full hover:bg-luxury-red hover:text-luxury-white transition-colors duration-200'
              >
                <Eye className='w-4 h-4' />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => {}}
                className='bg-luxury-white text-luxury-black p-2 rounded-full hover:bg-luxury-red hover:text-luxury-white transition-colors duration-200'
              >
                <Heart className='w-4 h-4' />
              </motion.button>
            </div>
          </div>

          {/* Product Info */}
          <div className='p-6'>
            <h3 className='text-luxury-black font-medium mb-2 group-hover:text-luxury-red transition-colors duration-200'>
              {product.name}
            </h3>

            <div className='flex items-center justify-between mb-4'>
              <div className='flex items-center space-x-2'>
                <span className='text-luxury-red font-bold text-lg'>
                  {parseFloat(product.price).toFixed(2)}€
                </span>
                {product.original_price && (
                  <span className='text-luxury-gray-400 line-through text-sm'>
                    {parseFloat(product.original_price).toFixed(2)}€
                  </span>
                )}
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => {}}
              className='w-full bg-luxury-red text-luxury-white py-3 rounded-2xl font-medium hover:bg-red-700 transition-colors duration-200 flex items-center justify-center space-x-2'
            >
              <ShoppingCart className='w-4 h-4' />
              <span className='text-xs'>Ajouter au panier</span>
            </motion.button>
          </div>
        </motion.div>
      ))}
    </motion.div>
  )
}
