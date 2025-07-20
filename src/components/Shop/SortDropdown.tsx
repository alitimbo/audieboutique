import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Check } from 'lucide-react';

interface SortDropdownProps {
  value: string;
  onChange: (value: string) => void;
}

const sortOptions = [
  { value: 'newest', label: 'Plus récents' },
  { value: 'price-asc', label: 'Prix croissant' },
  { value: 'price-desc', label: 'Prix décroissant' },
  { value: 'name-asc', label: 'Nom A-Z' },
  { value: 'name-desc', label: 'Nom Z-A' },
  { value: 'rating', label: 'Mieux notés' }
];

export const SortDropdown: React.FC<SortDropdownProps> = ({ value, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  const selectedOption = sortOptions.find(option => option.value === value);

  return (
    <div className="relative">
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-4 py-2 bg-luxury-white border border-luxury-gray-300 rounded-xl hover:border-luxury-red transition-colors duration-200 min-w-[180px]"
      >
        <span className="text-luxury-black font-medium">
          {selectedOption?.label || 'Trier par'}
        </span>
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
              className="fixed inset-0 z-10"
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="absolute top-full left-0 mt-2 w-full bg-luxury-white border border-luxury-gray-200 rounded-xl shadow-luxury z-20 overflow-hidden"
            >
              {sortOptions.map((option) => (
                <motion.button
                  key={option.value}
                  whileHover={{ backgroundColor: '#FEF2F2' }}
                  onClick={() => {
                    onChange(option.value);
                    setIsOpen(false);
                  }}
                  className="w-full px-4 py-3 text-left flex items-center justify-between hover:bg-luxury-gray-50 transition-colors duration-200"
                >
                  <span className={`${
                    value === option.value ? 'text-luxury-red font-medium' : 'text-luxury-black'
                  }`}>
                    {option.label}
                  </span>
                  {value === option.value && (
                    <Check className="w-4 h-4 text-luxury-red" />
                  )}
                </motion.button>
              ))}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};