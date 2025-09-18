// src/components/Shop/SortDropdown.tsx
import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, Check } from 'lucide-react'

interface SortDropdownProps {
  sortOption: string
  handleSortChange: (value: string) => void
}

const sortOptions = [
  { value: 'price-asc', label: 'Prix croissant' },
  { value: 'price-desc', label: 'Prix décroissant' },
  { value: 'name-asc', label: 'Nom A-Z' },
  { value: 'name-desc', label: 'Nom Z-A' }
]

export const SortDropdown: React.FC<SortDropdownProps> = ({
  sortOption,
  handleSortChange
}) => {
  const [isOpen, setIsOpen] = useState(false)

  const selectedLabel =
    sortOptions.find(opt => opt.value === sortOption)?.label || 'Trier par'

  const handleSelect = (value: string) => {
    handleSortChange(value)
    setIsOpen(false)
  }

  return (
    <div className='relative'>
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => setIsOpen(!isOpen)}
        className='flex items-center space-x-2 px-4 py-2 bg-luxury-white border border-luxury-gray-300 rounded-xl hover:border-luxury-red transition-colors duration-200 min-w-[180px]'
      >
        <span className='text-luxury-black font-medium'>{selectedLabel}</span>
        <ChevronDown
          className={`w-4 h-4 text-luxury-gray-600 transition-transform duration-200 ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className='fixed inset-0 z-10'
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className='absolute top-full right-0 mt-2 w-full min-w-[180px] bg-luxury-white border border-luxury-gray-200 rounded-xl shadow-luxury z-20 overflow-hidden'
            >
              {sortOptions.map(option => (
                <motion.button
                  key={option.value}
                  whileHover={{ backgroundColor: '#FEF2F2' }}
                  onClick={() => handleSelect(option.value)}
                  className='w-full px-4 py-3 text-left flex items-center justify-between hover:bg-luxury-gray-50 transition-colors duration-200'
                >
                  <span className='text-luxury-black'>{option.label}</span>
                  {option.value === sortOption && (
                    <Check className='w-4 h-4 text-luxury-red' />
                  )}
                </motion.button>
              ))}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}
