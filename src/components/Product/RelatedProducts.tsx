import React from 'react'
import { motion } from 'framer-motion'
import { ShoppingCart, Eye, Heart } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Product } from '../../types/product'
import { useNavigate } from 'react-router-dom'

interface RelatedProductsProps {
  products: Product[]
}

export const RelatedProducts: React.FC<RelatedProductsProps> = ({
  products
}) => {
  const naviage = useNavigate()
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
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 12
      }
    }
  }

  return (
    <motion.section
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.6 }}
      className='py-16'
    >
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className='text-center mb-12'
        >
          <h2 className='text-3xl md:text-4xl font-display font-bold text-luxury-black mb-4'>
            Produits Similaires
          </h2>
          <p className='text-lg text-luxury-gray-600 max-w-2xl mx-auto'>
            Découvrez d'autres pièces qui pourraient vous plaire
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial='hidden'
          animate='visible'
          className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6'
        >
          {products.map(product => (
            <motion.div
              key={product.id}
              variants={itemVariants}
              whileHover={{ y: -5 }}
              className='group bg-luxury-white rounded-3xl overflow-hidden shadow-luxury hover:shadow-luxury-lg transition-all duration-300 border border-luxury-gray-100'
            >
              {/* Product Image */}
              <div className='relative overflow-hidden aspect-square'>
                <img
                  src={product.images[0]}
                  alt={product.name}
                  className='w-full h-full object-cover group-hover:scale-110 transition-transform duration-500'
                />

                {/* Badge */}
                {product.badge && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className='absolute top-4 left-4 bg-luxury-red text-luxury-white text-xs font-medium px-3 py-1 rounded-full'
                  >
                    {product.badge}
                  </motion.span>
                )}

                {/* Hover Actions */}
                <div className='absolute inset-0 bg-luxury-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center'>
                  <div className='flex space-x-3'>
                    <motion.button
                      onClick={() => naviage(`/product/${product.id}`)}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className='bg-luxury-white text-luxury-black p-3 rounded-full hover:bg-luxury-red hover:text-luxury-white transition-colors duration-200 shadow-lg'
                      title='Aperçu rapide'
                    >
                      <Eye className='w-5 h-5' />
                    </motion.button>

                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className='bg-luxury-white text-luxury-black p-3 rounded-full hover:bg-luxury-red hover:text-luxury-white transition-colors duration-200 shadow-lg'
                      title='Ajouter aux favoris'
                    >
                      <Heart className='w-5 h-5' />
                    </motion.button>
                  </div>
                </div>
              </div>

              {/* Product Info */}
              <div className='p-6'>
                <Link to={`/product/${product.id}`}>
                  <h3 className='text-luxury-black font-semibold text-lg mb-3 hover:text-luxury-red transition-colors duration-200 line-clamp-2'>
                    {product.name}
                  </h3>
                </Link>

                <div className='flex items-center justify-between mb-4'>
                  <div className='flex items-center space-x-2'>
                    <span className='text-luxury-red font-bold text-xl'>
                      {product.price.toFixed(2)}€
                    </span>
                    {product.original_price && (
                      <span className='text-luxury-gray-400 line-through text-sm'>
                        {product.original_price.toFixed(2)}€
                      </span>
                    )}
                  </div>
                </div>

                <motion.button
                  onClick={() => naviage(`/product/${product.id}`)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className='w-full bg-luxury-red text-luxury-white py-3 rounded-2xl font-medium hover:bg-red-700 transition-colors duration-200 flex items-center justify-center space-x-2'
                >
                  <ShoppingCart className='w-4 h-4' />
                  <span>Voir l'article</span>
                </motion.button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  )
}
