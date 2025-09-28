import React, { useRef, useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Filter, Grid, List } from 'lucide-react'
import { SEO } from '../components/ui/SEO'
import { ShopHero } from '../components/Shop/ShopHero'
import { FilterSidebar } from '../components/Shop/FilterSidebar'
import { ProductGrid } from '../components/Shop/ProductGrid'
import { SortDropdown } from '../components/Shop/SortDropdown'
import { Pagination } from '../components/Shop/Pagination'
import { useProductStore } from '../store/useProductStore'
import { applyAllFilters, sortProducts } from '../utils/productFilters'
import {
  getOriginalTagWithSwitch,
  getOriginalCategoryNameWithSwitch
} from '../utils/productUrl'
import { useParams } from 'react-router-dom'
import { scrollToGrid } from '../utils/scrollToGrid'

export const Shop: React.FC = () => {
  const { products, loading, error, fetchProducts } = useProductStore()
  const { tags } = useParams<{ tags: string }>()
  const { category } = useParams<{ category: string }>()
  // State for all filters
  const [searchTerm, setSearchTerm] = useState<string>('')
  const [selectedTag, setSelectedTag] = useState<string>('')
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [minPrice, setMinPrice] = useState<number | null>(null)
  const [maxPrice, setMaxPrice] = useState<number | null>(null)
  const [selectedColor, setSelectedColor] = useState<string>('')
  const [isFilterSidebarOpen, setIsFilterSidebarOpen] = useState(false) // Mobile sidebar state
  const gridRef = useRef<HTMLDivElement>(null)

  // State for sorting
  const [sortOption, setSortOption] = useState<string>('price-asc')

  // Nouveaux états pour la pagination
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [itemsPerPage, setItemsPerPage] = useState<number>(12)

  useEffect(() => {
    if (tags) {
      const tag = getOriginalTagWithSwitch(tags)
      setSelectedTag(tag || '')
    }
  }, [tags])

  useEffect(() => {
    if (category) {
      const originalCategory = getOriginalCategoryNameWithSwitch(category)
      if (originalCategory) {
        setSelectedCategories([originalCategory])
      }
    }
  }, [category])

  // Mettre à jour la page actuelle lorsque les filtres changent
  useEffect(() => {
    setCurrentPage(1)
  }, [
    searchTerm,
    selectedTag,
    selectedCategories,
    minPrice,
    maxPrice,
    selectedColor,
    sortOption
  ])

  useEffect(() => {
    if (products.length === 0) {
      fetchProducts()
    }
  }, [fetchProducts, products.length])

  const handleScroll = () => {
    scrollToGrid(gridRef, 'animate-pulse', 3000)
  }

  useEffect(() => {
    handleScroll()
  }, [])

  const handleFilterChange = (filterType: string, value: any) => {
    switch (filterType) {
      case 'search':
        setSearchTerm(value)
        break
      case 'tag':
        setSelectedTag(value)
        break
      case 'categories':
        setSelectedCategories(value)
        break
      case 'minPrice':
        setMinPrice(value)
        break
      case 'maxPrice':
        setMaxPrice(value)
        break
      case 'color':
        setSelectedColor(value)
        break
      default:
        break
    }
  }

  const handleClearFilters = () => {
    setSearchTerm('')
    setSelectedTag('')
    setSelectedCategories([])
    setMinPrice(null)
    setMaxPrice(null)
    setSelectedColor('')
  }

  const handleSortChange = (option: string) => {
    setSortOption(option)
  }

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: 'smooth' }) // Optionnel : remonter en haut de la page
  }

  const handleItemsPerPageChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setItemsPerPage(Number(e.target.value))
    setCurrentPage(1) // Retourner à la première page
  }

  // 1. Filter the products first
  const filteredProducts = applyAllFilters(
    products,
    searchTerm,
    selectedTag,
    selectedCategories,
    minPrice,
    maxPrice,
    selectedColor
  )

  // 2. Then, sort the filtered products
  const sortedAndFilteredProducts = sortProducts(filteredProducts, sortOption)
  // 2. Calculer les produits à afficher sur la page actuelle
  const totalProducts = sortedAndFilteredProducts.length
  const totalPages = Math.ceil(totalProducts / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const paginatedProducts = sortedAndFilteredProducts.slice(
    startIndex,
    endIndex
  )

  return (
    <>
      <SEO
        title='Audie Boutique - Boutique en ligne de lingerie, mode et accessoires premium'
        description='Découvrez notre collection complète de lingerie, mode et accessoires premium.'
        keywords='boutique, lingerie, mode féminine, wax, corsets, bijoux, maillots de bain, sacs, accessoires, martinique, premium, luxe'
      />

      <div className='min-h-screen bg-luxury-gray-50'>
        <div className='pt-0'>
          <ShopHero />
        </div>

        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
          <div className='flex gap-8'>
            {/* Filter Sidebar - Now passes down props */}
            <FilterSidebar
              selectedTag={selectedTag}
              selectedCategories={selectedCategories}
              minPrice={minPrice}
              maxPrice={maxPrice}
              selectedColor={selectedColor}
              handleFilterChange={handleFilterChange}
              handleClearFilters={handleClearFilters}
              isFilterSidebarOpen={isFilterSidebarOpen}
              setIsFilterSidebarOpen={setIsFilterSidebarOpen}
              onScroll={handleScroll}
            />

            {/* Main Content */}
            <div className='flex-1 min-w-0' ref={gridRef}>
              {/* Toolbar */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className='flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8 space-y-4 sm:space-y-0'
              >
                <div className='flex items-center space-x-4'>
                  <span className='text-luxury-gray-600'>
                    {sortedAndFilteredProducts.length} produit
                    {sortedAndFilteredProducts.length > 1 ? 's' : ''} trouvé
                    {sortedAndFilteredProducts.length > 1 ? 's' : ''}
                  </span>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setIsFilterSidebarOpen(true)}
                    className='lg:hidden flex items-center space-x-2 px-3 py-2 border border-luxury-gray-300 rounded-lg'
                  >
                    <Filter className='w-4 h-4' />
                    <span>Filtres</span>
                  </motion.button>
                </div>

                <div className='flex items-center space-x-4'>
                  {/* View Mode Toggle - Still static */}
                  {/*
                    <div className='hidden sm:flex items-center space-x-2 bg-luxury-gray-100 rounded-lg p-1'>
                      <button
                        onClick={() => {}}
                        className='p-2 rounded-md bg-luxury-white text-luxury-red shadow-sm'
                      >
                        <Grid className='w-4 h-4' />
                      </button>
                      <button
                        onClick={() => {}}
                        className='p-2 rounded-md text-luxury-gray-600'
                      >
                        <List className='w-4 h-4' />
                      </button>
                    </div>
                  */}
                  {/* Sort Dropdown - Now passes down props */}
                  <SortDropdown
                    sortOption={sortOption}
                    handleSortChange={handleSortChange}
                  />
                </div>
              </motion.div>

              {/* Products Grid - Now receives the filtered and sorted products */}

              <ProductGrid products={paginatedProducts} />

              {/* Le composant de pagination vient ici */}
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
                totalItems={totalProducts}
                itemsPerPage={itemsPerPage}
                onItemsPerPageChange={handleItemsPerPageChange} // La prop manquante ici
              />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
