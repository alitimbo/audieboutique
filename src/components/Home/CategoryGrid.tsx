import React from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import {
  Percent,
  Sparkles,
  Users,
  Shirt,
  Heart,
  Waves,
  ShoppingBag,
  Gem,
  FolderHeart as UserHeart
} from 'lucide-react'
import { PRODUCT_CATEGORIES } from '../../types/product'
import { formatCategoryNameForUrl } from '../../utils/productUrl'

interface Category {
  id: string
  name: string
  icon: React.ReactNode
  link: string
  color: string
  description: string
}

// Mappage des noms de catégories aux propriétés spécifiques
const categoryMap: Record<string, Omit<Category, 'name' | 'link'>> = {
  'Spécial Fêtes': {
    id: 'special-fetes',
    icon: <Sparkles className='w-8 h-8' />,
    color: 'from-yellow-500 to-yellow-600',
    description: 'Collection exclusive'
  },
  Femmes: {
    id: 'femmes',
    icon: <Users className='w-8 h-8' />,
    color: 'from-pink-500 to-pink-600',
    description: 'Mode féminine'
  },
  'Corsets & Gaines': {
    id: 'corsets-et-gaines',
    icon: <Heart className='w-8 h-8' />,
    color: 'from-purple-500 to-purple-600',
    description: 'Silhouette parfaite'
  },
  'Maillots de bain': {
    id: 'maillots-de-bain',
    icon: <Waves className='w-8 h-8' />,
    color: 'from-blue-500 to-blue-600',
    description: 'Collection été'
  },
  'Sacs & portes monnaies': {
    id: 'sacs-et-portes-monnaies',
    icon: <ShoppingBag className='w-8 h-8' />,
    color: 'from-green-500 to-green-600',
    description: 'Accessoires chic'
  },
  Bijoux: {
    id: 'bijoux',
    icon: <Gem className='w-8 h-8' />,
    color: 'from-indigo-500 to-indigo-600',
    description: 'Éclat précieux'
  },
  'En couple': {
    id: 'en-couple',
    icon: <UserHeart className='w-8 h-8' />,
    color: 'from-red-500 to-red-600',
    description: 'Looks assortis'
  }
}

const categories: Category[] = PRODUCT_CATEGORIES.map(categoryName => {
  const formattedLink = `/shop/category/${formatCategoryNameForUrl(
    categoryName
  )}`
  return {
    ...categoryMap[categoryName],
    name: categoryName,
    link: formattedLink
  }
})

export const CategoryGrid: React.FC = () => {
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
    <section className='py-20 bg-luxury-gray-900'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className='text-center mb-16'
        >
          <h2 className='text-3xl md:text-4xl font-display font-bold text-luxury-white mb-4'>
            Nos Catégories
          </h2>
          <p className='text-lg text-luxury-gray-300 max-w-2xl mx-auto'>
            Découvrez notre sélection soigneusement choisie pour sublimer votre
            style
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial='hidden'
          whileInView='visible'
          className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'
        >
          {categories.map(category => (
            <motion.div
              key={category.id}
              variants={itemVariants}
              whileHover={{
                y: -10,
                transition: { type: 'spring', stiffness: 400, damping: 17 }
              }}
              className='group'
            >
              <Link to={category.link}>
                <div className='relative bg-luxury-black rounded-3xl p-8 border border-luxury-gray-800 hover:border-luxury-red transition-all duration-300 shadow-luxury overflow-hidden'>
                  {/* Background Gradient */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
                  />

                  {/* Content */}
                  <div className='relative z-10'>
                    <motion.div
                      className='text-luxury-red mb-4 group-hover:scale-110 transition-transform duration-300'
                      whileHover={{ rotate: 5 }}
                    >
                      {category.icon}
                    </motion.div>

                    <h3 className='text-xl font-semibold text-luxury-white mb-2 group-hover:text-luxury-red transition-colors duration-300'>
                      {category.name}
                    </h3>

                    <p className='text-luxury-gray-400 text-sm'>
                      {category.description}
                    </p>
                  </div>

                  {/* Hover Effect */}
                  <motion.div className='absolute bottom-0 left-0 right-0 h-1 bg-luxury-red transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left' />
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
