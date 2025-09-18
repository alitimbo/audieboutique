// src/components/Shop/FilterSidebar.tsx
import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ChevronDown, ChevronUp, Filter } from 'lucide-react'
import {
  PRODUCT_CATEGORIES,
  PRODUCT_COLORS,
  PRODUCT_TAGS
} from '../../types/product'

interface FilterSidebarProps {
  selectedTag: string
  selectedCategories: string[]
  minPrice: number | null
  maxPrice: number | null
  selectedColor: string
  handleFilterChange: (filterType: string, value: any) => void
  handleClearFilters: () => void
  isFilterSidebarOpen: boolean // Add mobile state prop
  setIsFilterSidebarOpen: (isOpen: boolean) => void // Add setter
}

export const FilterSidebar: React.FC<FilterSidebarProps> = ({
  selectedTag,
  selectedCategories,
  minPrice,
  maxPrice,
  selectedColor,
  handleFilterChange,
  handleClearFilters,
  isFilterSidebarOpen,
  setIsFilterSidebarOpen
}) => {
  const [isTagsOpen, setIsTagsOpen] = useState(true)
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(true)
  const [isPriceOpen, setIsPriceOpen] = useState(true)
  const [isColorsOpen, setIsColorsOpen] = useState(true)

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
            onClick={handleClearFilters}
            className='text-sm text-luxury-red hover:text-red-700 transition-colors duration-200'
          >
            Tout effacer
          </button>
        </div>

        {/* Tags */}
        <div className='mb-8'>
          <button
            onClick={() => setIsTagsOpen(!isTagsOpen)}
            className='flex items-center justify-between w-full mb-4'
          >
            <h3 className='text-lg font-semibold text-luxury-black'>Tags</h3>
            {isTagsOpen ? (
              <ChevronUp className='w-4 h-4 text-luxury-gray-600' />
            ) : (
              <ChevronDown className='w-4 h-4 text-luxury-gray-600' />
            )}
          </button>
          <AnimatePresence>
            {isTagsOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.2 }}
                className='overflow-hidden'
              >
                <div className='space-y-3'>
                  {PRODUCT_TAGS.map(tag => (
                    <label
                      key={tag}
                      className='flex items-center space-x-3 cursor-pointer group'
                    >
                      <input
                        type='radio'
                        name='tag'
                        checked={selectedTag === tag}
                        onChange={() => handleFilterChange('tag', tag)}
                        className='w-4 h-4 text-luxury-red border-luxury-gray-300 rounded focus:ring-luxury-red focus:ring-2'
                      />
                      <span className='text-luxury-gray-700 group-hover:text-luxury-black transition-colors duration-200'>
                        {tag}
                      </span>
                    </label>
                  ))}
                  {selectedTag && (
                    <button
                      onClick={() => handleFilterChange('tag', '')}
                      className='text-sm text-luxury-red hover:text-red-700 mt-2'
                    >
                      Effacer la sélection
                    </button>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Categories */}
        <div className='mb-8'>
          <button
            onClick={() => setIsCategoriesOpen(!isCategoriesOpen)}
            className='flex items-center justify-between w-full mb-4'
          >
            <h3 className='text-lg font-semibold text-luxury-black'>
              Catégories
            </h3>
            {isCategoriesOpen ? (
              <ChevronUp className='w-4 h-4 text-luxury-gray-600' />
            ) : (
              <ChevronDown className='w-4 h-4 text-luxury-gray-600' />
            )}
          </button>
          <AnimatePresence>
            {isCategoriesOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.2 }}
                className='overflow-hidden'
              >
                <div className='space-y-3'>
                  {PRODUCT_CATEGORIES.map(category => (
                    <label
                      key={category}
                      className='flex items-center space-x-3 cursor-pointer group'
                    >
                      <input
                        type='checkbox'
                        checked={selectedCategories.includes(category)}
                        onChange={e => {
                          const newCategories = e.target.checked
                            ? [...selectedCategories, category]
                            : selectedCategories.filter(c => c !== category)
                          handleFilterChange('categories', newCategories)
                        }}
                        className='w-4 h-4 text-luxury-red border-luxury-gray-300 rounded focus:ring-luxury-red focus:ring-2'
                      />
                      <span className='text-luxury-gray-700 group-hover:text-luxury-black transition-colors duration-200'>
                        {category}
                      </span>
                    </label>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Price Range */}
        <div className='mb-8'>
          <button
            onClick={() => setIsPriceOpen(!isPriceOpen)}
            className='flex items-center justify-between w-full mb-4'
          >
            <h3 className='text-lg font-semibold text-luxury-black'>Prix</h3>
            {isPriceOpen ? (
              <ChevronUp className='w-4 h-4 text-luxury-gray-600' />
            ) : (
              <ChevronDown className='w-4 h-4 text-luxury-gray-600' />
            )}
          </button>
          <AnimatePresence>
            {isPriceOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.2 }}
                className='overflow-hidden'
              >
                <div className='space-y-4'>
                  <div className='flex items-center space-x-4'>
                    <div className='flex-1'>
                      <label className='block text-sm text-luxury-gray-600 mb-1'>
                        Min
                      </label>
                      <input
                        type='number'
                        value={minPrice ?? ''}
                        onChange={e =>
                          handleFilterChange(
                            'minPrice',
                            e.target.value ? Number(e.target.value) : null
                          )
                        }
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
                        value={maxPrice ?? ''}
                        onChange={e =>
                          handleFilterChange(
                            'maxPrice',
                            e.target.value ? Number(e.target.value) : null
                          )
                        }
                        className='w-full px-3 py-2 border border-luxury-gray-300 rounded-lg focus:ring-2 focus:ring-luxury-red focus:border-transparent'
                        placeholder='500'
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Colors */}
        <div className='mb-8'>
          <button
            onClick={() => setIsColorsOpen(!isColorsOpen)}
            className='flex items-center justify-between w-full mb-4'
          >
            <h3 className='text-lg font-semibold text-luxury-black'>
              Couleurs
            </h3>
            {isColorsOpen ? (
              <ChevronUp className='w-4 h-4 text-luxury-gray-600' />
            ) : (
              <ChevronDown className='w-4 h-4 text-luxury-gray-600' />
            )}
          </button>
          <AnimatePresence>
            {isColorsOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.2 }}
                className='overflow-hidden'
              >
                <div className='grid grid-cols-4 gap-3'>
                  {PRODUCT_COLORS.map(color => (
                    <motion.button
                      key={color.value}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => handleFilterChange('color', color.name)}
                      className={`relative w-8 h-8 rounded-full border-2 transition-all duration-200 ${
                        selectedColor === color.name
                          ? 'border-luxury-red scale-110'
                          : 'border-luxury-gray-300'
                      }`}
                      style={{ backgroundColor: color.value }}
                      title={color.name}
                    />
                  ))}
                  {selectedColor && (
                    <button
                      onClick={() => handleFilterChange('color', '')}
                      className='col-span-4 text-sm text-luxury-red hover:text-red-700 mt-2'
                    >
                      Effacer la sélection
                    </button>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
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
        {isFilterSidebarOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className='lg:hidden fixed inset-0 bg-luxury-black/50 z-40'
              onClick={() => setIsFilterSidebarOpen(false)}
            />
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className='lg:hidden fixed left-0 top-0 w-80 h-full z-50'
            >
              <div className='relative h-full'>
                <button
                  onClick={() => setIsFilterSidebarOpen(false)}
                  className='absolute top-4 right-4 z-10 p-2 bg-luxury-white rounded-full shadow-lg'
                >
                  <X className='w-5 h-5 text-luxury-black' />
                </button>
                {sidebarContent}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
