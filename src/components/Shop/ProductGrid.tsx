import React from 'react'
import { motion } from 'framer-motion'
import { ShoppingCart, Heart, Eye } from 'lucide-react'
import { Product } from '../../types/product' // Assurez-vous que ce chemin est correct

// La liste de produits statique n'est plus nécessaire ici
// car les produits seront passés via les props.

// 1. Définir l'interface des props
interface ProductGridProps {
  products: Product[]
}

// 2. Mettre à jour la signature du composant pour utiliser les props
export const ProductGrid: React.FC<ProductGridProps> = ({ products }) => {
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

  // 3. Utiliser la prop 'products' au lieu de 'mockProducts'
  return (
    <motion.div
      variants={containerVariants}
      initial='hidden'
      animate='visible'
      className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'
    >
      {products.length === 0 ? (
        <p className='col-span-full text-center text-luxury-gray-600 py-12'>
          Aucun produit ne correspond à votre recherche.
        </p>
      ) : (
        products.map(product => (
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
                    {parseFloat(product.price as string).toFixed(2)}€
                  </span>
                  {product.original_price && (
                    <span className='text-luxury-gray-400 line-through text-sm'>
                      {parseFloat(product.original_price as string).toFixed(2)}€
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
        ))
      )}
    </motion.div>
  )
}
