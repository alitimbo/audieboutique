import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronDown, ChevronUp, Filter } from 'lucide-react';

interface FilterSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  filters: ShopFilters;
  onFiltersChange: (filters: ShopFilters) => void;
  selectedTag?: string;
  onTagChange?: (tag?: string) => void;
}

export interface ShopFilters {
  categories: string[];
  priceRange: [number, number];
  colors: string[];
  availability: string[];
  sortBy: string;
}

const categories = [
  'Soldes',
  'Spécial Fêtes', 
  'Femmes',
  'Wax',
  'Corsets & Gaines',
  'Maillots de bain',
  'Sacs & portes monnaies',
  'Bijoux',
  'En couple'
];

const colors = [
  { name: 'Noir', value: 'black', color: '#000000' },
  { name: 'Rouge', value: 'red', color: '#B3001B' },
  { name: 'Blanc', value: 'white', color: '#FFFFFF' },
  { name: 'Rose', value: 'pink', color: '#EC4899' },
  { name: 'Bleu', value: 'blue', color: '#3B82F6' },
  { name: 'Vert', value: 'green', color: '#10B981' },
  { name: 'Jaune', value: 'yellow', color: '#F59E0B' },
  { name: 'Violet', value: 'purple', color: '#8B5CF6' }
];

const availabilityOptions = [
  'En promotion',
  'En stock'
];

const tags = [
  { label: 'Nouveautés', value: 'nouveautes' },
  { label: 'Soldes', value: 'soldes' },
  { label: 'Collections', value: 'collections' },
  { label: 'Exclusivités', value: 'exclusivites' }
];

export const FilterSidebar: React.FC<FilterSidebarProps> = ({
  isOpen,
  onClose,
  filters,
  onFiltersChange,
  selectedTag,
  onTagChange
}) => {
  const [expandedSections, setExpandedSections] = useState({
    categories: true,
    price: true,
    colors: true,
    availability: true,
    tags: true
  });

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const handleCategoryChange = (category: string) => {
    const newCategories = filters.categories.includes(category)
      ? filters.categories.filter(c => c !== category)
      : [...filters.categories, category];
    
    onFiltersChange({ ...filters, categories: newCategories });
  };

  const handleColorChange = (color: string) => {
    const newColors = filters.colors.includes(color)
      ? filters.colors.filter(c => c !== color)
      : [...filters.colors, color];
    
    onFiltersChange({ ...filters, colors: newColors });
  };

  const handleAvailabilityChange = (availability: string) => {
    const newAvailability = filters.availability.includes(availability)
      ? filters.availability.filter(a => a !== availability)
      : [...filters.availability, availability];
    
    onFiltersChange({ ...filters, availability: newAvailability });
  };

  const handlePriceChange = (min: number, max: number) => {
    onFiltersChange({ ...filters, priceRange: [min, max] });
  };

  const clearAllFilters = () => {
    onFiltersChange({
      categories: [],
      priceRange: [0, 500],
      colors: [],
      availability: [],
      sortBy: 'newest'
    });
  };

  const sidebarContent = (
    <div className="h-full bg-luxury-white border-r border-luxury-gray-200 overflow-y-auto">
      <div className="p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-2">
            <Filter className="w-5 h-5 text-luxury-red" />
            <h2 className="text-xl font-display font-bold text-luxury-black">
              Filtres
            </h2>
          </div>
          <button
            onClick={clearAllFilters}
            className="text-sm text-luxury-red hover:text-red-700 transition-colors duration-200"
          >
            Tout effacer
          </button>
        </div>

        {/* Tags */}
        <div className="mb-8">
          <button
            onClick={() => toggleSection('tags')}
            className="flex items-center justify-between w-full mb-4"
          >
            <h3 className="text-lg font-semibold text-luxury-black">Tags</h3>
            {expandedSections.tags ? (
              <ChevronUp className="w-4 h-4 text-luxury-gray-600" />
            ) : (
              <ChevronDown className="w-4 h-4 text-luxury-gray-600" />
            )}
          </button>
          <AnimatePresence>
            {expandedSections.tags && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="space-y-3"
              >
                {tags.map(tag => (
                  <label
                    key={tag.value}
                    className="flex items-center space-x-3 cursor-pointer group"
                  >
                    <input
                      type="radio"
                      name="tag"
                      checked={selectedTag === tag.value}
                      onChange={() => onTagChange && onTagChange(selectedTag === tag.value ? undefined : tag.value)}
                      className="w-4 h-4 text-luxury-red border-luxury-gray-300 rounded focus:ring-luxury-red focus:ring-2"
                    />
                    <span className="text-luxury-gray-700 group-hover:text-luxury-black transition-colors duration-200">
                      {tag.label}
                    </span>
                  </label>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Categories */}
        <div className="mb-8">
          <button
            onClick={() => toggleSection('categories')}
            className="flex items-center justify-between w-full mb-4"
          >
            <h3 className="text-lg font-semibold text-luxury-black">Catégories</h3>
            {expandedSections.categories ? (
              <ChevronUp className="w-4 h-4 text-luxury-gray-600" />
            ) : (
              <ChevronDown className="w-4 h-4 text-luxury-gray-600" />
            )}
          </button>
          
          <AnimatePresence>
            {expandedSections.categories && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="space-y-3"
              >
                {categories.map((category) => (
                  <label
                    key={category}
                    className="flex items-center space-x-3 cursor-pointer group"
                  >
                    <input
                      type="checkbox"
                      checked={filters.categories.includes(category)}
                      onChange={() => handleCategoryChange(category)}
                      className="w-4 h-4 text-luxury-red border-luxury-gray-300 rounded focus:ring-luxury-red focus:ring-2"
                    />
                    <span className="text-luxury-gray-700 group-hover:text-luxury-black transition-colors duration-200">
                      {category}
                    </span>
                  </label>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Price Range */}
        <div className="mb-8">
          <button
            onClick={() => toggleSection('price')}
            className="flex items-center justify-between w-full mb-4"
          >
            <h3 className="text-lg font-semibold text-luxury-black">Prix</h3>
            {expandedSections.price ? (
              <ChevronUp className="w-4 h-4 text-luxury-gray-600" />
            ) : (
              <ChevronDown className="w-4 h-4 text-luxury-gray-600" />
            )}
          </button>
          
          <AnimatePresence>
            {expandedSections.price && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="space-y-4"
              >
                <div className="flex items-center space-x-4">
                  <div className="flex-1">
                    <label className="block text-sm text-luxury-gray-600 mb-1">Min</label>
                    <input
                      type="number"
                      value={filters.priceRange[0]}
                      onChange={(e) => handlePriceChange(Number(e.target.value), filters.priceRange[1])}
                      className="w-full px-3 py-2 border border-luxury-gray-300 rounded-lg focus:ring-2 focus:ring-luxury-red focus:border-transparent"
                      placeholder="0"
                    />
                  </div>
                  <div className="flex-1">
                    <label className="block text-sm text-luxury-gray-600 mb-1">Max</label>
                    <input
                      type="number"
                      value={filters.priceRange[1]}
                      onChange={(e) => handlePriceChange(filters.priceRange[0], Number(e.target.value))}
                      className="w-full px-3 py-2 border border-luxury-gray-300 rounded-lg focus:ring-2 focus:ring-luxury-red focus:border-transparent"
                      placeholder="500"
                    />
                  </div>
                </div>
                <div className="text-sm text-luxury-gray-600">
                  {filters.priceRange[0]}€ - {filters.priceRange[1]}€
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Colors */}
        <div className="mb-8">
          <button
            onClick={() => toggleSection('colors')}
            className="flex items-center justify-between w-full mb-4"
          >
            <h3 className="text-lg font-semibold text-luxury-black">Couleurs</h3>
            {expandedSections.colors ? (
              <ChevronUp className="w-4 h-4 text-luxury-gray-600" />
            ) : (
              <ChevronDown className="w-4 h-4 text-luxury-gray-600" />
            )}
          </button>
          
          <AnimatePresence>
            {expandedSections.colors && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-4 gap-3"
              >
                {colors.map((color) => (
                  <motion.button
                    key={color.value}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => handleColorChange(color.value)}
                    className={`relative w-8 h-8 rounded-full border-2 transition-all duration-200 ${
                      filters.colors.includes(color.value)
                        ? 'border-luxury-red shadow-lg'
                        : 'border-luxury-gray-300 hover:border-luxury-gray-400'
                    }`}
                    style={{ backgroundColor: color.color }}
                    title={color.name}
                  >
                    {color.value === 'white' && (
                      <div className="absolute inset-1 border border-luxury-gray-200 rounded-full" />
                    )}
                    {filters.colors.includes(color.value) && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-2 h-2 bg-luxury-red rounded-full" />
                      </div>
                    )}
                  </motion.button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Availability */}
        <div className="mb-8">
          <button
            onClick={() => toggleSection('availability')}
            className="flex items-center justify-between w-full mb-4"
          >
            <h3 className="text-lg font-semibold text-luxury-black">Disponibilité</h3>
            {expandedSections.availability ? (
              <ChevronUp className="w-4 h-4 text-luxury-gray-600" />
            ) : (
              <ChevronDown className="w-4 h-4 text-luxury-gray-600" />
            )}
          </button>
          
          <AnimatePresence>
            {expandedSections.availability && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="space-y-3"
              >
                {availabilityOptions.map((option) => (
                  <label
                    key={option}
                    className="flex items-center space-x-3 cursor-pointer group"
                  >
                    <input
                      type="checkbox"
                      checked={filters.availability.includes(option)}
                      onChange={() => handleAvailabilityChange(option)}
                      className="w-4 h-4 text-luxury-red border-luxury-gray-300 rounded focus:ring-luxury-red focus:ring-2"
                    />
                    <span className="text-luxury-gray-700 group-hover:text-luxury-black transition-colors duration-200">
                      {option}
                    </span>
                  </label>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden lg:block w-80 h-full">
        {sidebarContent}
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="lg:hidden fixed inset-0 bg-luxury-black/50 z-40"
              onClick={onClose}
            />
            <motion.div
              initial={{ x: -320 }}
              animate={{ x: 0 }}
              exit={{ x: -320 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="lg:hidden fixed left-0 top-0 w-80 h-full z-50"
            >
              <div className="relative h-full">
                <button
                  onClick={onClose}
                  className="absolute top-4 right-4 z-10 p-2 bg-luxury-white rounded-full shadow-lg"
                >
                  <X className="w-5 h-5 text-luxury-black" />
                </button>
                {sidebarContent}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};