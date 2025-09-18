import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, Check } from 'lucide-react'

const sortOptions = [
  { value: 'newest', label: 'Plus récents' },
  { value: 'price-asc', label: 'Prix croissant' },
  { value: 'price-desc', label: 'Prix décroissant' },
  { value: 'name-asc', label: 'Nom A-Z' },
  { value: 'name-desc', label: 'Nom Z-A' },
  { value: 'rating', label: 'Mieux notés' }
]

// Le composant ne prend plus de props
export const SortDropdown: React.FC = () => {
  return (
    <div className='relative'>
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => {}} // Fonction vide
        className='flex items-center space-x-2 px-4 py-2 bg-luxury-white border border-luxury-gray-300 rounded-xl hover:border-luxury-red transition-colors duration-200 min-w-[180px]'
      >
        <span className='text-luxury-black font-medium'>Plus récents</span>
        <ChevronDown className='w-4 h-4 text-luxury-gray-600 transition-transform duration-200' />
      </motion.button>

      {/* Le menu déroulant reste fermé de manière statique */}
      <AnimatePresence>
        {false && ( // Le menu ne s'ouvre jamais
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className='fixed inset-0 z-10'
              onClick={() => {}} // Fonction vide
            />
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className='absolute top-full left-0 mt-2 w-full bg-luxury-white border border-luxury-gray-200 rounded-xl shadow-luxury z-20 overflow-hidden'
            >
              {sortOptions.map(option => (
                <motion.button
                  key={option.value}
                  whileHover={{ backgroundColor: '#FEF2F2' }}
                  onClick={() => {}} // Fonction vide
                  className='w-full px-4 py-3 text-left flex items-center justify-between hover:bg-luxury-gray-50 transition-colors duration-200'
                >
                  <span className='text-luxury-black'>{option.label}</span>
                  {/* Ne montre jamais le 'Check' */}
                </motion.button>
              ))}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}
