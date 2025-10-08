import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import {
  Plus,
  Search,
  Edit,
  Trash2,
  Archive,
  RotateCcw,
  Package,
  Star,
  Eye,
  AlertTriangle
} from 'lucide-react'
import { toast } from 'sonner'
import {
  Product,
  ProductFormData,
  ProductFilters,
  PRODUCT_CATEGORIES
} from '../../types/product'
import { ProductForm } from '../../components/admin/ProductForm'
import { StockManager } from '../../components/admin/StockManager'
import { ProductService } from '../../services/productService'

// Les données sont maintenant chargées depuis Supabase via ProductService

export const AdminCatalog: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([])
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [filters, setFilters] = useState<ProductFilters>({
    search: '',
    category: 'all',
    status: 'all',
    featured: null
  })

  // Modal states
  const [isProductFormOpen, setIsProductFormOpen] = useState(false)
  const [isStockManagerOpen, setIsStockManagerOpen] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState<Product | undefined>()
  const [formMode, setFormMode] = useState<'create' | 'edit'>('create')

  // Clés pour le sessionStorage
  const FORM_STORAGE_KEY = 'admin_product_form_data'
  const MODAL_STORAGE_KEY = 'admin_product_modal_state'

  // Restaurer l'état du formulaire au chargement
  useEffect(() => {
    const savedModalState = sessionStorage.getItem(MODAL_STORAGE_KEY)
    if (savedModalState) {
      const { isOpen, mode, productId } = JSON.parse(savedModalState)
      if (isOpen) {
        setIsProductFormOpen(true)
        setFormMode(mode)
        if (mode === 'edit' && productId) {
          // Trouver le produit à éditer
          const productToEdit = products.find(p => p.id === productId)
          if (productToEdit) {
            setSelectedProduct(productToEdit)
          }
        }
      }
    }
  }, [products])

  // Sauvegarder l'état du modal
  const saveModalState = (
    isOpen: boolean,
    mode: 'create' | 'edit',
    productId?: string
  ) => {
    if (isOpen) {
      sessionStorage.setItem(
        MODAL_STORAGE_KEY,
        JSON.stringify({
          isOpen,
          mode,
          productId
        })
      )
    } else {
      sessionStorage.removeItem(MODAL_STORAGE_KEY)
      sessionStorage.removeItem(FORM_STORAGE_KEY)
    }
  }

  // Charger les produits depuis Supabase
  const loadProducts = async () => {
    try {
      console.log('🚀 Chargement des produits...')
      setLoading(true)

      // Charger TOUS les produits sans filtres d'abord
      const data = await ProductService.getProducts()
      console.log('📦 Produits chargés:', data)

      setProducts(data)
      setFilteredProducts(data)

      console.log('✅ État mis à jour avec', data.length, 'produits')
    } catch (error) {
      console.error('❌ Erreur lors du chargement des produits:', error)
      toast.error('Erreur lors du chargement des produits')
    } finally {
      setLoading(false)
    }
  }

  // Charger les produits au montage du composant
  useEffect(() => {
    loadProducts()
  }, [])

  // Appliquer les filtres côté client
  const applyFilters = () => {
    console.log('🔍 Application des filtres:', filters)
    let filtered = [...products]

    // Filtrage par recherche
    if (filters.search) {
      const searchTerm = filters.search.toLowerCase()
      filtered = filtered.filter(
        product =>
          product.name.toLowerCase().includes(searchTerm) ||
          //product.description.toLowerCase().includes(searchTerm) ||
          product.category.toLowerCase().includes(searchTerm)
      )
    }

    // Filtrage par catégorie
    if (filters.category && filters.category !== 'all') {
      filtered = filtered.filter(
        product => product.category === filters.category
      )
    }

    // Filtrage par statut
    if (filters.status && filters.status !== 'all') {
      switch (filters.status) {
        case 'active':
          filtered = filtered.filter(
            product => product.active && !product.archived
          )
          break
        case 'archived':
          filtered = filtered.filter(product => product.archived)
          break
        case 'out_of_stock':
          filtered = filtered.filter(product => product.stock === 0)
          break
      }
    }

    // Filtrage par featured
    if (filters.featured !== null) {
      filtered = filtered.filter(
        product => product.featured === filters.featured
      )
    }

    console.log(`📊 Produits filtrés: ${filtered.length}/${products.length}`)
    setFilteredProducts(filtered)
  }

  // Appliquer les filtres quand les produits ou filtres changent
  useEffect(() => {
    applyFilters()
  }, [products, filters])

  // Product CRUD operations
  const handleCreateProduct = () => {
    setSelectedProduct(undefined)
    setFormMode('create')
    setIsProductFormOpen(true)
    saveModalState(true, 'create')
  }

  const handleEditProduct = (product: Product) => {
    setSelectedProduct(product)
    setFormMode('edit')
    setIsProductFormOpen(true)
    saveModalState(true, 'edit', product.id)
  }

  const handleSaveProduct = async (productData: ProductFormData) => {
    try {
      if (formMode === 'create') {
        await ProductService.createProduct(productData)
        console.log(productData)
        toast.success('Produit créé avec succès')
        await loadProducts() // Recharger la liste
      } else if (selectedProduct) {
        await ProductService.updateProduct(selectedProduct.id, productData)
        toast.success('Produit modifié avec succès')
        await loadProducts() // Recharger la liste
      }
    } catch (error) {
      toast.error('Erreur lors de la sauvegarde')
      throw error
    }
  }

  const handleDeleteProduct = async (productId: string) => {
    if (
      window.confirm(
        'Êtes-vous sûr de vouloir supprimer définitivement ce produit ?'
      )
    ) {
      try {
        await ProductService.deleteProduct(productId)
        toast.success('Produit supprimé')
        await loadProducts() // Recharger la liste
      } catch (error) {
        toast.error('Erreur lors de la suppression')
      }
    }
  }

  const handleArchiveProduct = async (productId: string) => {
    if (window.confirm('Êtes-vous sûr de vouloir archiver ce produit ?')) {
      try {
        await ProductService.toggleArchiveProduct(productId, true)
        toast.success('Produit archivé')
        await loadProducts() // Recharger la liste
      } catch (error) {
        toast.error("Erreur lors de l'archivage")
      }
    }
  }

  const handleRestoreProduct = async (productId: string) => {
    if (window.confirm('Êtes-vous sûr de vouloir restaurer ce produit ?')) {
      try {
        await ProductService.toggleArchiveProduct(productId, false)
        toast.success('Produit restauré')
        await loadProducts() // Recharger la liste
      } catch (error) {
        toast.error('Erreur lors de la restauration')
      }
    }
  }

  const handleOpenStockManager = (product: Product) => {
    setSelectedProduct(product)
    setIsStockManagerOpen(true)
  }

  const handleUpdateStock = async (
    productId: string,
    newStock: number,
    movement: {
      type: 'in' | 'out' | 'adjustment'
      quantity: number
      reason: string
    }
  ) => {
    try {
      await ProductService.updateStock(productId, newStock)
      toast.success('Stock mis à jour')
      await loadProducts() // Recharger la liste
      setIsStockManagerOpen(false)
    } catch (error) {
      toast.error('Erreur lors de la mise à jour du stock')
      throw error
    }
  }

  // Stock management
  const getStatusBadge = (product: Product) => {
    if (product.archived) {
      return (
        <span className='px-2 py-1 text-xs font-medium bg-gray-100 text-gray-600 rounded-full'>
          Archivé
        </span>
      )
    }
    if (!product.active) {
      return (
        <span className='px-2 py-1 text-xs font-medium bg-red-100 text-red-600 rounded-full'>
          Inactif
        </span>
      )
    }
    if (product.stock === 0) {
      return (
        <span className='px-2 py-1 text-xs font-medium bg-orange-100 text-orange-600 rounded-full'>
          Rupture
        </span>
      )
    }
    if (product.stock <= 5) {
      return (
        <span className='px-2 py-1 text-xs font-medium bg-yellow-100 text-yellow-600 rounded-full'>
          Stock faible
        </span>
      )
    }
    return (
      <span className='px-2 py-1 text-xs font-medium bg-green-100 text-green-600 rounded-full'>
        En stock
      </span>
    )
  }

  const stats = {
    total: products.length,
    active: products.filter(p => p.active && !p.archived).length,
    archived: products.filter(p => p.archived).length,
    outOfStock: products.filter(p => p.stock === 0).length
  }

  return (
    <div className='p-6'>
      {/* Header */}
      <div className='flex items-center justify-end mb-6'>
        <motion.button
          onClick={handleCreateProduct}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className='bg-accent-gold hover:bg-accent-gold/90 text-luxury-black font-semibold px-4 py-2 rounded-lg transition-all duration-200 inline-flex items-center shadow-lg hover:shadow-xl'
        >
          <Plus className='w-4 h-4 mr-2' />
          Ajouter un produit
        </motion.button>
      </div>

      {/* Stats */}
      <div className='grid grid-cols-1 md:grid-cols-4 gap-6 mb-6'>
        <div className='bg-white p-6 rounded-lg shadow-sm border border-gray-200'>
          <div className='flex items-center justify-between'>
            <div>
              <p className='text-sm font-medium text-gray-600'>
                Total produits
              </p>
              <p className='text-2xl font-bold text-gray-900'>{stats.total}</p>
            </div>
            <Package className='w-8 h-8 text-accent-gold' />
          </div>
        </div>

        <div className='bg-white p-6 rounded-lg shadow-sm border border-gray-200'>
          <div className='flex items-center justify-between'>
            <div>
              <p className='text-sm font-medium text-gray-600'>Actifs</p>
              <p className='text-2xl font-bold text-green-600'>
                {stats.active}
              </p>
            </div>
            <Eye className='w-8 h-8 text-green-500' />
          </div>
        </div>

        <div className='bg-white p-6 rounded-lg shadow-sm border border-gray-200'>
          <div className='flex items-center justify-between'>
            <div>
              <p className='text-sm font-medium text-gray-600'>Archivés</p>
              <p className='text-2xl font-bold text-gray-600'>
                {stats.archived}
              </p>
            </div>
            <Archive className='w-8 h-8 text-gray-500' />
          </div>
        </div>

        <div className='bg-white p-6 rounded-lg shadow-sm border border-gray-200'>
          <div className='flex items-center justify-between'>
            <div>
              <p className='text-sm font-medium text-gray-600'>Rupture stock</p>
              <p className='text-2xl font-bold text-orange-600'>
                {stats.outOfStock}
              </p>
            </div>
            <AlertTriangle className='w-8 h-8 text-orange-500' />
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className='bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-6'>
        <div className='grid grid-cols-1 md:grid-cols-4 gap-4'>
          <div className='relative'>
            <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4' />
            <input
              type='text'
              placeholder='Rechercher un produit...'
              value={filters.search}
              onChange={e =>
                setFilters(prev => ({ ...prev, search: e.target.value }))
              }
              className='w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-gold/50 focus:border-accent-gold/50 transition-all'
            />
          </div>

          <select
            value={filters.category}
            onChange={e =>
              setFilters(prev => ({ ...prev, category: e.target.value }))
            }
            className='border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-accent-gold/50 focus:border-accent-gold/50 transition-all'
          >
            <option value='all'>Toutes les catégories</option>
            {PRODUCT_CATEGORIES.map(category => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>

          <select
            value={filters.status}
            onChange={e =>
              setFilters(prev => ({ ...prev, status: e.target.value as any }))
            }
            className='border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-accent-gold/50 focus:border-accent-gold/50 transition-all'
          >
            <option value='all'>Tous les statuts</option>
            <option value='active'>Actifs</option>
            <option value='archived'>Archivés</option>
            <option value='out_of_stock'>Rupture de stock</option>
          </select>

          <select
            value={
              filters.featured === null ? 'all' : filters.featured.toString()
            }
            onChange={e =>
              setFilters(prev => ({
                ...prev,
                featured:
                  e.target.value === 'all' ? null : e.target.value === 'true'
              }))
            }
            className='border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-accent-gold/50 focus:border-accent-gold/50 transition-all'
          >
            <option value='all'>Tous les produits</option>
            <option value='true'>En vedette</option>
            <option value='false'>Non en vedette</option>
          </select>
        </div>
      </div>

      {/* Products Table */}
      <div className='bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden'>
        <div className='overflow-x-auto'>
          <table className='min-w-full divide-y divide-gray-200'>
            <thead className='bg-gray-50'>
              <tr>
                <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                  Produit
                </th>
                <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                  Catégorie
                </th>
                <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                  Prix
                </th>
                <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                  Stock
                </th>
                <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                  Statut
                </th>
                <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className='bg-white divide-y divide-gray-200'>
              {filteredProducts.map(product => (
                <motion.tr
                  key={product.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className='hover:bg-gray-50 transition-colors'
                >
                  <td className='px-6 py-4 whitespace-nowrap'>
                    <div className='flex items-center'>
                      <div className='flex-shrink-0 h-12 w-12'>
                        <img
                          loading='lazy'
                          className='h-12 w-12 rounded-lg object-cover'
                          src={product.images[0] || '/api/placeholder/48/48'}
                          alt={product.name}
                        />
                      </div>
                      <div className='ml-4'>
                        <div className='text-sm font-medium text-gray-900 flex items-center'>
                          {product.name}
                          {product.featured && (
                            <Star className='w-4 h-4 text-yellow-400 ml-2 fill-current' />
                          )}
                        </div>
                        <div className='text-sm text-gray-500 truncate max-w-xs'>
                          {product.description}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-900'>
                    {product.category}
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-900'>
                    <div>
                      <span className='font-medium'>
                        {product.price.toFixed(2)} €
                      </span>
                      {product.original_price && (
                        <span className='text-gray-500 line-through ml-2'>
                          {product.original_price.toFixed(2)} €
                        </span>
                      )}
                    </div>
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-900'>
                    <button
                      onClick={() => handleOpenStockManager(product)}
                      className='flex items-center space-x-2 hover:text-accent-gold transition-colors'
                    >
                      <Package className='w-4 h-4' />
                      <span>{product.stock}</span>
                    </button>
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap'>
                    {getStatusBadge(product)}
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap text-sm font-medium'>
                    <div className='flex items-center space-x-2'>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => handleEditProduct(product)}
                        className='text-gray-400 hover:text-accent-gold transition-colors'
                        title='Modifier'
                      >
                        <Edit className='w-4 h-4' />
                      </motion.button>

                      {product.archived ? (
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => handleRestoreProduct(product.id)}
                          className='text-gray-400 hover:text-green-600 transition-colors'
                          title='Restaurer'
                        >
                          <RotateCcw className='w-4 h-4' />
                        </motion.button>
                      ) : (
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => handleArchiveProduct(product.id)}
                          className='text-gray-400 hover:text-orange-600 transition-colors'
                          title='Archiver'
                        >
                          <Archive className='w-4 h-4' />
                        </motion.button>
                      )}

                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => handleDeleteProduct(product.id)}
                        className='text-gray-400 hover:text-red-600 transition-colors'
                        title='Supprimer'
                      >
                        <Trash2 className='w-4 h-4' />
                      </motion.button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>

        {loading ? (
          <div className='text-center py-12'>
            <div className='inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-accent-gold'></div>
            <h3 className='mt-2 text-sm font-medium text-gray-900'>
              Chargement des produits...
            </h3>
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className='text-center py-12'>
            <Package className='mx-auto h-12 w-12 text-gray-400' />
            <h3 className='mt-2 text-sm font-medium text-gray-900'>
              Aucun produit trouvé
            </h3>
            <p className='mt-1 text-sm text-gray-500'>
              Commencez par ajouter un nouveau produit ou modifiez vos filtres.
            </p>
          </div>
        ) : null}
      </div>

      {/* Product Form Modal */}
      <ProductForm
        product={selectedProduct}
        isOpen={isProductFormOpen}
        onClose={() => {
          setIsProductFormOpen(false)
          saveModalState(false, 'create')
        }}
        onSave={handleSaveProduct}
        mode={formMode}
      />

      {/* Stock Manager Modal */}
      {selectedProduct && (
        <StockManager
          productId={selectedProduct.id}
          productName={selectedProduct.name}
          currentStock={selectedProduct.stock}
          isOpen={isStockManagerOpen}
          onClose={() => setIsStockManagerOpen(false)}
          onStockUpdate={handleUpdateStock}
        />
      )}
    </div>
  )
}

export default AdminCatalog
