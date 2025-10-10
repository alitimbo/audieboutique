import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { ShoppingCart, Heart, Eye } from 'lucide-react'
import { useProductStore } from '../../store/useProductStore'
import { useNavigate } from 'react-router-dom'
import { useCartStore } from '../../store/useCartStore'
import { toast } from 'sonner'
import { useAuthStore } from '../../store/useAuthStore'
import { ProductService } from '../../services/productService'

export const ProductGrid: React.FC = () => {
  const naviage = useNavigate()
  const { user, isAuthenticated } = useAuthStore()
  const [allFavoris, setAllFavoris] = useState<any[]>([])
  const { addItem } = useCartStore()
  const { products, loading, error, fetchProducts } = useProductStore()

  useEffect(() => {
    if (products.length === 0) {
      fetchProducts()
    }
  }, [fetchProducts, products.length])

  const fetchUserFavoris = async () => {
    if (user) {
      const response = await ProductService.getFavorisByUserId(user.id)
      if (response.length > 0) {
        setAllFavoris(response)
      }
    }
  }

  useEffect(() => {
    fetchUserFavoris()
  }, [user])

  const handleAddToCart = (productId: string) => {
    const product = products.find(p => p.id === productId)
    if (product) {
      addItem(product, 1, {
        size: product.sizes ? product.sizes[0] : "",
        color: product.colors ? product.colors[0]?.name : ""
      })
      toast.success(`${product.name} ajouté au panier`)
    }
  }

  const handleAddFavoris = async (productId: string) => {
    const product = products.find(p => p.id === productId)
    if (product && user) {
      const response = await ProductService.addFavoris(user?.id, product)
      setAllFavoris(prev => [...prev, response])
      toast.success(`${product.name} ajouté au favoris`)
    }
  }

  const handleRemoveFavoris = async (productId: string) => {
    if (user) {
      await ProductService.removeFavoris(user.id, productId)
      setAllFavoris(prev => prev.filter(f => f.product.id !== productId))
      toast.info('Produit retiré des favoris')
    }
  }
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
    hidden: { y: 30, opacity: 0, scale: 0.9 },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 12
      }
    }
  }
  if (loading) {
    return (
      <section className='py-20 bg-luxury-black'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className='text-center mb-16'
          >
            <h2 className='text-3xl md:text-4xl font-display font-bold text-luxury-white mb-4'>
              Nouveautés
            </h2>
            <p className='text-lg text-luxury-gray-300 max-w-2xl mx-auto'>
              Découvrez les dernières pièces de notre collection, sélectionnées
              avec passion
            </p>
          </motion.div>
          <div className='flex justify-center items-center h-48'>
            <div className='loader ease-linear rounded-full border-8 border-t-transparent border-luxury-red h-16 w-16'></div>
          </div>
        </div>
      </section>
    )
  }

  const newProductsFromStore = products.filter(product => {
    // Vérifie si le tableau de tags du produit contient la valeur 'Nouveautés'
    return product.tags.includes('Nouveautés')
  })

  if (newProductsFromStore.length === 0) {
    return (
      <section className='py-20 bg-luxury-black'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className='text-center mb-16'
          >
            <h2 className='text-3xl md:text-4xl font-display font-bold text-luxury-white mb-4'>
              Nouveautés
            </h2>
            <p className='text-lg text-luxury-gray-300 max-w-2xl mx-auto'>
              Découvrez les dernières pièces de notre collection, sélectionnées
              avec passion
            </p>
          </motion.div>
          <div className='flex justify-center items-center h-48'>
            <p className='text-luxury-gray-400'>
              Aucun nouveau produit pour le moment.
            </p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className='py-20 bg-luxury-black'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className='text-center mb-16'
        >
          <h2 className='text-3xl md:text-4xl font-display font-bold text-luxury-white mb-4'>
            Nouveautés
          </h2>
          <p className='text-lg text-luxury-gray-300 max-w-2xl mx-auto'>
            Découvrez les dernières pièces de notre collection, sélectionnées
            avec passion
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial='hidden'
          whileInView='visible'
          className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6'
        >
          {newProductsFromStore.map(product => {
            const isFavoris = allFavoris.some(f => f.product.id === product.id)
            return (
              <motion.div
                key={product.id}
                variants={itemVariants}
                whileHover={{ y: -5 }}
                className='group bg-luxury-gray-900 rounded-3xl overflow-hidden border border-luxury-gray-800 hover:border-luxury-red transition-all duration-300 shadow-luxury'
              >
                {/* Product Image */}
                <div className='relative overflow-hidden'>
                  <img
                    loading='lazy'
                    src={product.images[0]} // Utilise la première image
                    alt={product.name}
                    className='w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500'
                  />

                  {/* Badge */}
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className={`absolute top-4 left-4 bg-luxury-red text-white text-xs font-medium px-3 py-1 rounded-full`}
                  >
                    {product.category}
                  </motion.span>

                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className={`absolute top-4 left-4 bg-green-500 text-white text-xs font-medium px-3 py-1 rounded-full`}
                  >
                    Nouveau
                  </motion.span>

                  {/* Hover Actions */}
                  <div className='absolute inset-0 bg-luxury-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center space-x-3'>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => naviage(`/product/${product.id}`)}
                      className='bg-luxury-white text-luxury-black p-2 rounded-full hover:bg-luxury-red hover:text-luxury-white transition-colors duration-200'
                    >
                      <Eye className='w-4 h-4' />
                    </motion.button>
                    {isAuthenticated && user ? (
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() =>
                          isFavoris
                            ? handleRemoveFavoris(product.id)
                            : handleAddFavoris(product.id)
                        }
                        className={`p-2 rounded-full transition-colors duration-200 ${
                          isFavoris
                            ? 'bg-luxury-red text-luxury-white'
                            : 'bg-luxury-white text-luxury-black hover:bg-luxury-red hover:text-luxury-white'
                        }`}
                      >
                        <Heart className='w-4 h-4' />
                      </motion.button>
                    ) : null}
                  </div>
                </div>

                {/* Product Info */}
                <div className='p-6'>
                  <h3 className='text-luxury-white font-medium mb-2 group-hover:text-luxury-red transition-colors duration-200'>
                    {product.name}
                  </h3>

                  <div className='flex items-center justify-between mb-4'>
                    <div className='flex items-center space-x-2'>
                      <span className='text-luxury-red font-bold text-lg'>
                        {parseFloat(product.price).toFixed(2)}€
                      </span>
                      {product.original_price && (
                        <span className='text-luxury-gray-400 line-through text-sm'>
                          {parseFloat(product.original_price).toFixed(2)}€
                        </span>
                      )}
                    </div>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleAddToCart(product.id)}
                    className='w-full bg-luxury-red text-luxury-white py-3 rounded-2xl font-medium hover:bg-red-700 transition-colors duration-200 flex items-center justify-center space-x-2'
                  >
                    <ShoppingCart className='w-4 h-4' />
                    <span className='text-xs'>Ajouter au panier</span>
                  </motion.button>
                </div>
              </motion.div>
            )
          })}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className='text-center mt-12'
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => naviage('/shop')}
            className='inline-flex items-center px-8 py-4 border-2 border-luxury-red text-luxury-red font-semibold rounded-2xl hover:bg-luxury-red hover:text-luxury-white transition-all duration-300'
          >
            Voir tous les produits
          </motion.button>
        </motion.div>
      </div>
    </section>
  )
}
