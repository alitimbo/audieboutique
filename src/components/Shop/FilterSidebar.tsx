import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ChevronDown, ChevronUp, Filter } from 'lucide-react'
import {
  PRODUCT_CATEGORIES,
  PRODUCT_COLORS,
  PRODUCT_TAGS
} from '../../types/product'

const categories = PRODUCT_CATEGORIES

const colors = PRODUCT_COLORS

const tags = PRODUCT_TAGS

// Le composant ne prend plus de props
export const FilterSidebar: React.FC = () => {
  const sidebarContent = (
    <div className='h-full bg-luxury-white border-r border-luxury-gray-200 overflow-y-auto'>
      <div className='p-6'>
        {/* Header */}
        <div className='flex items-center justify-between mb-6'>
          <div className='flex items-center space-x-2'>
            <Filter className='w-5 h-5 text-luxury-red' />
            <h2 className='text-xl font-display font-bold text-luxury-black'>
              Filtres
            </h2>
          </div>
          <button
            onClick={() => {}} // Fonction vide
            className='text-sm text-luxury-red hover:text-red-700 transition-colors duration-200'
          >
            Tout effacer
          </button>
        </div>

        {/* Tags */}
        <div className='mb-8'>
          <button
            onClick={() => {}} // Fonction vide
            className='flex items-center justify-between w-full mb-4'
          >
            <h3 className='text-lg font-semibold text-luxury-black'>Tags</h3>
            <ChevronUp className='w-4 h-4 text-luxury-gray-600' />
          </button>
          <div className='space-y-3'>
            {tags.map(tag => (
              <label
                key={tag}
                className='flex items-center space-x-3 cursor-pointer group'
              >
                <input
                  type='radio'
                  name='tag'
                  className='w-4 h-4 text-luxury-red border-luxury-gray-300 rounded focus:ring-luxury-red focus:ring-2'
                />
                <span className='text-luxury-gray-700 group-hover:text-luxury-black transition-colors duration-200'>
                  {tag}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Categories */}
        <div className='mb-8'>
          <button
            onClick={() => {}} // Fonction vide
            className='flex items-center justify-between w-full mb-4'
          >
            <h3 className='text-lg font-semibold text-luxury-black'>
              Catégories
            </h3>
            <ChevronUp className='w-4 h-4 text-luxury-gray-600' />
          </button>
          <div className='space-y-3'>
            {categories.map(category => (
              <label
                key={category}
                className='flex items-center space-x-3 cursor-pointer group'
              >
                <input
                  type='checkbox'
                  className='w-4 h-4 text-luxury-red border-luxury-gray-300 rounded focus:ring-luxury-red focus:ring-2'
                />
                <span className='text-luxury-gray-700 group-hover:text-luxury-black transition-colors duration-200'>
                  {category}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Price Range */}
        <div className='mb-8'>
          <button
            onClick={() => {}} // Fonction vide
            className='flex items-center justify-between w-full mb-4'
          >
            <h3 className='text-lg font-semibold text-luxury-black'>Prix</h3>
            <ChevronUp className='w-4 h-4 text-luxury-gray-600' />
          </button>
          <div className='space-y-4'>
            <div className='flex items-center space-x-4'>
              <div className='flex-1'>
                <label className='block text-sm text-luxury-gray-600 mb-1'>
                  Min
                </label>
                <input
                  type='number'
                  className='w-full px-3 py-2 border border-luxury-gray-300 rounded-lg focus:ring-2 focus:ring-luxury-red focus:border-transparent'
                  placeholder='0'
                />
              </div>
              <div className='flex-1'>
                <label className='block text-sm text-luxury-gray-600 mb-1'>
                  Max
                </label>
                <input
                  type='number'
                  className='w-full px-3 py-2 border border-luxury-gray-300 rounded-lg focus:ring-2 focus:ring-luxury-red focus:border-transparent'
                  placeholder='500'
                />
              </div>
            </div>
            <div className='text-sm text-luxury-gray-600'>0€ - 500€</div>
          </div>
        </div>

        {/* Colors */}
        <div className='mb-8'>
          <button
            onClick={() => {}} // Fonction vide
            className='flex items-center justify-between w-full mb-4'
          >
            <h3 className='text-lg font-semibold text-luxury-black'>
              Couleurs
            </h3>
            <ChevronUp className='w-4 h-4 text-luxury-gray-600' />
          </button>
          <div className='grid grid-cols-4 gap-3'>
            {colors.map(color => (
              <motion.button
                key={color.value}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => {}} // Fonction vide
                className={`relative w-8 h-8 rounded-full border-2 border-luxury-gray-300 transition-all duration-200`}
                style={{ backgroundColor: color.value }}
                title={color.name}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )

  return (
    <>
      {/* Desktop Sidebar */}
      <div className='hidden lg:block w-80 h-full'>{sidebarContent}</div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className='lg:hidden fixed inset-0 bg-luxury-black/50 z-40'
          onClick={() => {}} // Fonction vide
        />
        <motion.div
          initial={{ x: -320 }}
          animate={{ x: 0 }}
          exit={{ x: -320 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          className='lg:hidden fixed left-0 top-0 w-80 h-full z-50'
        >
          <div className='relative h-full'>
            <button
              onClick={() => {}} // Fonction vide
              className='absolute top-4 right-4 z-10 p-2 bg-luxury-white rounded-full shadow-lg'
            >
              <X className='w-5 h-5 text-luxury-black' />
            </button>
            {sidebarContent}
          </div>
        </motion.div>
      </AnimatePresence>
    </>
  )
}
