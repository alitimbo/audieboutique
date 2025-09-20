import React from 'react'
import { motion } from 'framer-motion'
import { ShoppingBag, Heart, Sparkles } from 'lucide-react'
import { Link } from 'react-router-dom'
import { PRODUCT_CATEGORIES } from '../../types/product'
import { formatCategoryNameForUrl } from '../../utils/productUrl'

export const EmptyCart: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className='text-center py-16'
    >
      <div className='max-w-md mx-auto'>
        {/* Icon */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
          className='relative mb-8'
        >
          <div className='bg-gradient-to-br from-luxury-red/10 to-luxury-red/5 p-8 rounded-full inline-block'>
            <ShoppingBag className='w-16 h-16 text-luxury-red' />
          </div>

          {/* Decorative elements */}
          <motion.div
            animate={{
              rotate: [0, 10, -10, 0],
              scale: [1, 1.1, 1]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: 'easeInOut'
            }}
            className='absolute -top-2 -right-2'
          >
            <Sparkles className='w-6 h-6 text-luxury-red/60' />
          </motion.div>

          <motion.div
            animate={{
              rotate: [0, -10, 10, 0],
              scale: [1, 1.2, 1]
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: 1
            }}
            className='absolute -bottom-2 -left-2'
          >
            <Heart className='w-5 h-5 text-luxury-red/40' />
          </motion.div>
        </motion.div>

        {/* Title */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className='text-3xl font-display font-bold text-luxury-black mb-4'
        >
          Votre panier est vide
        </motion.h2>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className='text-lg text-luxury-gray-600 mb-8 leading-relaxed'
        >
          Découvrez nos dernières nouveautés et laissez-vous séduire par notre
          sélection exclusive de mode féminine.
        </motion.p>

        {/* Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className='space-y-4'
        >
          <Link to='/shop'>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className='w-full sm:w-auto px-8 py-4 bg-luxury-red text-luxury-white font-semibold rounded-2xl hover:bg-red-700 transition-all duration-300 shadow-luxury-red'
            >
              Continuer mes achats
            </motion.button>
          </Link>

          <div className='flex flex-col sm:flex-row gap-4 justify-center'>
            <Link to='/shop/tags/nouveautes'>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className='px-6 py-3 border-2 border-luxury-red text-luxury-red font-medium rounded-xl hover:bg-luxury-red hover:text-luxury-white transition-all duration-300'
              >
                Voir les nouveautés
              </motion.button>
            </Link>

            <Link to='/shop/tags/soldes'>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className='px-6 py-3 border-2 border-luxury-gray-300 text-luxury-gray-700 font-medium rounded-xl hover:border-luxury-red hover:text-luxury-red transition-all duration-300'
              >
                Découvrir les soldes
              </motion.button>
            </Link>
          </div>
        </motion.div>

        {/* Suggestions */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className='mt-12 p-6 bg-luxury-gray-50 rounded-2xl'
        >
          <h3 className='font-semibold text-luxury-black mb-3'>
            Suggestions pour vous :
          </h3>
          <div className='flex flex-wrap justify-center gap-2'>
            {PRODUCT_CATEGORIES.map(category => (
              <Link
                key={category}
                to={`/shop/category/${formatCategoryNameForUrl(category)}`}
                className='px-4 py-2 bg-luxury-white text-luxury-gray-700 rounded-full text-sm hover:bg-luxury-red hover:text-luxury-white transition-all duration-200'
              >
                {category}
              </Link>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}
