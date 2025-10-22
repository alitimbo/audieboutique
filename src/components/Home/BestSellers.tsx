import React, { useEffect } from 'react'
import { motion } from 'framer-motion'
import { ShoppingCart, Eye, Star } from 'lucide-react'
import { useProductStore } from '../../store/useProductStore'
import { useNavigate } from 'react-router-dom'
import { useCartStore } from '../../store/useCartStore'
import { toast } from 'sonner'

export const BestSellers: React.FC = () => {
  const navigate = useNavigate()
  const { addItem } = useCartStore()
  const { products, loading, error, fetchProducts } = useProductStore()

  const handleAddToCart = (productId: string) => {
    const product = products.find(p => p.id === productId)
    if (product) {
      addItem(product, 1, {
        size: product.sizes ? product.sizes[0] : '',
        color: product.colors ? product.colors[0]?.name : ''
      })
      toast.success(`${product.name} ajouté au panier`)
    }
  }

  useEffect(() => {
    if (products.length === 0) {
      fetchProducts()
    }
  }, [fetchProducts, products.length])

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
              Nos Meilleures Ventes
            </h2>
            <p className='text-lg text-luxury-gray-300 max-w-2xl mx-auto'>
              Les coups de cœur de nos clientes 
            </p>
          </motion.div>
          <div className='flex justify-center items-center h-48'>
            <div className='loader ease-linear rounded-full border-8 border-t-transparent border-luxury-red h-16 w-16'></div>
          </div>
        </div>
      </section>
    )
  }

  const bestSellersFromStore = products.filter(product => {
    // Vérifie si le tableau de tags du produit contient la valeur 'Meilleures ventes'
    return product.tags.includes('Meilleures ventes')
  })

  if (bestSellersFromStore.length === 0) {
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
              Nos Meilleures Ventes
            </h2>
            <p className='text-lg text-luxury-gray-300 max-w-2xl mx-auto'>
              Les coups de cœur de nos clientes
            </p>
          </motion.div>
          <div className='flex justify-center items-center h-48'>
            <p className='text-luxury-gray-400'>
              Aucun produit disponible pour le moment.
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
            Nos Meilleures Ventes
          </h2>
          <p className='text-lg text-luxury-gray-300 max-w-2xl mx-auto'>
            Les coups de cœur de nos clientes
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial='hidden'
          whileInView='visible'
          className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8'
        >
          {bestSellersFromStore.map(product => (
            <motion.div
              key={product.id}
              variants={itemVariants}
              whileHover={{
                y: -10,
                transition: { type: 'spring', stiffness: 400, damping: 17 }
              }}
              className='group bg-luxury-gray-900 rounded-3xl overflow-hidden border border-luxury-gray-800 hover:border-luxury-red transition-all duration-300 shadow-luxury'
            >
              {/* Product Image */}
              <div className='relative overflow-hidden'>
                <motion.img
                  src={product.images[0]}
                  alt={product.name}
                  className='w-full h-64 object-cover'
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.5 }}
                  loading='lazy'
                />

                {/* Badge */}
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className='absolute top-4 left-4 bg-luxury-red text-white text-xs font-medium px-3 py-1 rounded-full'
                >
                  {product.category}
                </motion.span>

                {/* Hover Overlay */}
                <div className='absolute inset-0 bg-luxury-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center'>
                  <motion.button
                    onClick={() => navigate(`/product/${product.id}`)}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className='bg-luxury-white text-luxury-black p-3 rounded-full hover:bg-luxury-red hover:text-luxury-white transition-colors duration-200 mr-3'
                  >
                    <Eye className='w-5 h-5' />
                  </motion.button>
                  <motion.button
                    onClick={() => handleAddToCart(product.id)}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className='bg-luxury-red text-luxury-white p-3 rounded-full hover:bg-red-700 transition-colors duration-200'
                  >
                    <ShoppingCart className='w-5 h-5' />
                  </motion.button>
                </div>
              </div>

              {/* Product Info */}
              <div className='p-6'>
                <h3 className='text-luxury-white font-medium mb-2 group-hover:text-luxury-red transition-colors duration-200'>
                  {product.name}
                </h3>

                {/* Rating */}
                {/*
                  <div className='flex items-center mb-3'>
                    <div className='flex items-center'>
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < Math.floor(product.rating)
                              ? 'text-yellow-400 fill-current'
                              : 'text-luxury-gray-600'
                          }`}
                        />
                      ))}
                    </div>
                    <span className='text-luxury-gray-400 text-sm ml-2'>
                      ({product.reviews})
                    </span>
                  </div>
                */}

                <div className='flex items-center justify-between mb-4'>
                  <div className='flex items-center space-x-2'>
                    <span className='text-luxury-red font-bold text-lg'>
                      {product.price.toFixed(2)}€
                    </span>
                    {product.original_price && (
                      <span className='text-luxury-gray-400 line-through text-sm'>
                        {product.original_price.toFixed(2)}€
                      </span>
                    )}
                  </div>
                </div>

                <motion.button
                  onClick={() => navigate(`/product/${product.id}`)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className='text-xs w-full bg-luxury-red text-luxury-white py-3 rounded-2xl font-medium hover:bg-red-700 transition-colors duration-200'
                >
                  Voir l'article
                </motion.button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
