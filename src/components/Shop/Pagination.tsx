import React from 'react'
import { motion } from 'framer-motion'
import { ChevronLeft, ChevronRight, MoreHorizontal } from 'lucide-react'

interface PaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
  totalItems: number
  itemsPerPage: number
  onItemsPerPageChange: (e: React.ChangeEvent<HTMLSelectElement>) => void
}

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  totalItems,
  itemsPerPage,
  onItemsPerPageChange
}) => {
  const startItem = (currentPage - 1) * itemsPerPage + 1
  const endItem = Math.min(currentPage * itemsPerPage, totalItems)

  const getVisiblePages = () => {
    const delta = 2
    const range = []
    const rangeWithDots = []

    for (
      let i = Math.max(2, currentPage - delta);
      i <= Math.min(totalPages - 1, currentPage + delta);
      i++
    ) {
      range.push(i)
    }

    if (currentPage - delta > 2) {
      rangeWithDots.push(1, 'dots1')
    } else {
      rangeWithDots.push(1)
    }

    rangeWithDots.push(...range)

    if (currentPage + delta < totalPages - 1) {
      rangeWithDots.push('dots2', totalPages)
    } else {
      rangeWithDots.push(totalPages)
    }

    return rangeWithDots
  }

  if (totalPages <= 1) return null

  return (
    <div className='flex flex-col items-center space-y-4 mt-12'>
      {/* Items info */}
      <p className='text-luxury-gray-600 text-sm'>
        Affichage de {startItem} à {endItem} sur {totalItems} produits
      </p>

      {/* Pagination controls */}
      <div className='flex items-center space-x-2'>
        {/* Previous button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={`flex items-center space-x-2 px-4 py-2 rounded-xl font-medium transition-all duration-200 ${
            currentPage === 1
              ? 'bg-luxury-gray-100 text-luxury-gray-400 cursor-not-allowed'
              : 'bg-luxury-white text-luxury-black border border-luxury-gray-300 hover:border-luxury-red hover:text-luxury-red shadow-sm'
          }`}
        >
          <ChevronLeft className='w-4 h-4' />
          <span className='hidden sm:inline'>Précédent</span>
        </motion.button>

        {/* Page numbers */}
        <div className='flex items-center space-x-1'>
          {getVisiblePages().map((page, index) => {
            if (page === 'dots1' || page === 'dots2') {
              return (
                <div key={page} className='px-3 py-2'>
                  <MoreHorizontal className='w-4 h-4 text-luxury-gray-400' />
                </div>
              )
            }

            const pageNumber = page as number
            const isActive = pageNumber === currentPage

            return (
              <motion.button
                key={pageNumber}
                whileHover={{ scale: isActive ? 1 : 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => onPageChange(pageNumber)}
                className={`w-10 h-10 rounded-xl font-medium transition-all duration-200 ${
                  isActive
                    ? 'bg-luxury-red text-luxury-white shadow-luxury-red'
                    : 'bg-luxury-white text-luxury-black border border-luxury-gray-300 hover:border-luxury-red hover:text-luxury-red'
                }`}
              >
                {pageNumber}
              </motion.button>
            )
          })}
        </div>

        {/* Next button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`flex items-center space-x-2 px-4 py-2 rounded-xl font-medium transition-all duration-200 ${
            currentPage === totalPages
              ? 'bg-luxury-gray-100 text-luxury-gray-400 cursor-not-allowed'
              : 'bg-luxury-white text-luxury-black border border-luxury-gray-300 hover:border-luxury-red hover:text-luxury-red shadow-sm'
          }`}
        >
          <span className='hidden sm:inline'>Suivant</span>
          <ChevronRight className='w-4 h-4' />
        </motion.button>
      </div>

      {/* Items per page selector */}
      <div className='flex items-center space-x-2 text-sm'>
        <span className='text-luxury-gray-600'>Produits par page:</span>
        <select
          value={itemsPerPage}
          onChange={onItemsPerPageChange}
          className='px-3 py-1 border border-luxury-gray-300 rounded-lg focus:ring-2 focus:ring-luxury-red focus:border-transparent'
        >
          <option value={12}>12</option>
          <option value={24}>24</option>
          <option value={48}>48</option>
        </select>
      </div>
    </div>
  )
}
