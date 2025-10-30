import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Heart, ShoppingCart, Truck, Shield, RotateCcw } from 'lucide-react'
import { useCartStore } from '../../store/useCartStore'
import { ProductService } from '../../services/productService'
import { useProductStore } from '../../store/useProductStore'
import { useAuthStore } from '../../store/useAuthStore'
import { toast } from 'sonner'
import { Product } from '../../types/newproduct'

export const ProductInfo: React.FC<{ product: Product }> = ({ product }) => {
  const { isAuthenticated, user } = useAuthStore()
  const { products } = useProductStore()
  const [allFavoris, setAllFavoris] = useState<any[]>([])

  // === Gestion variantes ===
  const [selectedSize, setSelectedSize] = useState(
    product.variants[0]?.size || ''
  )
  const [selectedColor, setSelectedColor] = useState(
    product.variants[0]?.colors[0] || { name: '', value: '' }
  )

  const [quantity, setQuantity] = useState(1)
  const [addedToCart, setAddedToCart] = useState(false)
  const { addItem } = useCartStore()

  // === Favoris ===
  const fetchUserFavoris = async () => {
    if (user) {
      const response = await ProductService.getFavorisByUserId(user.id)
      if (response.length > 0) setAllFavoris(response)
    }
  }

  useEffect(() => {
    fetchUserFavoris()
  }, [])

  const handleAddToCart = () => {
    addItem(product as any, quantity, {
      size: selectedSize,
      color: selectedColor?.name
    })
    setAddedToCart(true)
    setTimeout(() => setAddedToCart(false), 2000)
  }

  const handleAddFavoris = async (productId: string) => {
    const productItem = products.find(p => p.id === productId)
    if (productItem && user) {
      const response = await ProductService.addFavoris(user.id, productItem)
      setAllFavoris(prev => [...prev, response])
      toast.success(`${productItem.name} ajouté aux favoris`)
    }
  }

  const handleRemoveFavoris = async (productId: string) => {
    if (user) {
      await ProductService.removeFavoris(user.id, productId)
      setAllFavoris(prev => prev.filter(f => f.product.id !== productId))
      toast.info('Produit retiré des favoris')
    }
  }

  const isFavoris = allFavoris.some(f => f.product.id === product.id)

  const discountPercentage = product.original_price
    ? Math.round(
        ((product.original_price - product.price) / product.original_price) *
          100
      )
    : 0

  // === Trouver les couleurs pour la taille sélectionnée ===
  const currentVariant = product.variants.find(v => v.size === selectedSize)
  const availableColors = currentVariant?.colors || []

  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className='space-y-8'
    >
      {/* --- Titre & catégorie --- */}
      <div>
        <motion.span
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.4, type: 'spring', stiffness: 200 }}
          className='inline-block bg-luxury-red text-luxury-white text-sm font-medium px-4 py-2 rounded-full mb-4'
        >
          {product.tags.length > 0 ? product.tags[0] : product.category}
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className='text-3xl md:text-4xl font-display font-bold text-luxury-black mb-4 leading-tight'
        >
          {product.name}
        </motion.h1>
      </div>

      {/* --- Prix --- */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.6 }}
        className='flex items-center space-x-4'
      >
        <span className='text-4xl font-bold text-luxury-red'>
          {product.price.toFixed(2)}€
        </span>
        {product.original_price && (
          <>
            <span className='text-2xl text-luxury-gray-400 line-through'>
              {product.original_price.toFixed(2)}€
            </span>
            <span className='bg-luxury-red text-luxury-white text-sm font-medium px-3 py-1 rounded-full'>
              -{discountPercentage}%
            </span>
          </>
        )}
      </motion.div>

      {/* --- Sélection taille --- */}
      {product.variants.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          <h3 className='text-lg font-semibold text-luxury-black mb-4'>
            Taille : {selectedSize}
          </h3>
          <div className='flex flex-wrap gap-3'>
            {product.variants.map(variant => (
              <motion.button
                key={variant.size}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setSelectedSize(variant.size)
                  setSelectedColor(variant.colors[0] || { name: '', value: '' })
                }}
                className={`px-4 py-2 border-2 rounded-xl font-medium transition-all duration-200 ${
                  selectedSize === variant.size
                    ? 'border-luxury-red bg-luxury-red text-luxury-white'
                    : 'border-luxury-gray-300 text-luxury-black hover:border-luxury-red'
                }`}
              >
                {variant.size}
              </motion.button>
            ))}
          </div>
        </motion.div>
      )}

      {/* --- Sélection couleur --- */}
      {availableColors.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.6 }}
        >
          <h3 className='text-lg font-semibold text-luxury-black mb-4'>
            Couleur : {selectedColor.name}
          </h3>
          <div className='flex space-x-3'>
            {availableColors.map(color => (
              <motion.button
                key={color.value}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setSelectedColor(color)}
                className={`w-12 h-12 rounded-full border-4 transition-all duration-200 ${
                  selectedColor.value === color.value
                    ? 'border-luxury-red shadow-lg'
                    : 'border-luxury-gray-300 hover:border-luxury-gray-400'
                }`}
                style={{ backgroundColor: color.value }}
                title={color.name}
              >
                {color.value === '#FFFFFF' && (
                  <div className='w-full h-full border border-luxury-gray-200 rounded-full' />
                )}
              </motion.button>
            ))}
          </div>
        </motion.div>
      )}

      {/* --- Quantité --- */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.6 }}
      >
        <h3 className='text-lg font-semibold text-luxury-black mb-4'>
          Quantité
        </h3>
        <div className='flex items-center space-x-4'>
          <div className='flex items-center border-2 border-luxury-gray-300 rounded-xl'>
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className='px-4 py-2 text-luxury-black hover:bg-luxury-gray-100 transition-colors duration-200'
            >
              -
            </button>
            <span className='px-4 py-2 font-medium'>{quantity}</span>
            <button
              onClick={() => setQuantity(quantity + 1)}
              className='px-4 py-2 text-luxury-black hover:bg-luxury-gray-100 transition-colors duration-200'
            >
              +
            </button>
          </div>

          <span className='text-luxury-gray-600'>
            {product.stock > 0 ? 'En stock' : 'Rupture de stock'}
          </span>
        </div>
      </motion.div>

      {/* --- Boutons actions --- */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9, duration: 0.6 }}
        className='space-y-4'
      >
        <div className='flex space-x-4'>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleAddToCart}
            disabled={product.stock <= 0 || addedToCart}
            className={`flex-1 flex items-center justify-center space-x-2 py-4 rounded-2xl font-semibold transition-all duration-300 ${
              product.stock > 0
                ? addedToCart
                  ? 'bg-green-500 text-white'
                  : 'bg-luxury-red text-luxury-white hover:bg-red-700 shadow-luxury-red'
                : 'bg-luxury-gray-300 text-luxury-gray-500 cursor-not-allowed'
            }`}
          >
            <ShoppingCart className='w-5 h-5' />
            <span>
              {addedToCart
                ? 'Ajouté !'
                : product.stock > 0
                ? 'Ajouter au panier'
                : 'Rupture de stock'}
            </span>
          </motion.button>

          {isAuthenticated && user && (
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() =>
                isFavoris
                  ? handleRemoveFavoris(product.id)
                  : handleAddFavoris(product.id)
              }
              className={`p-4 rounded-2xl border-2 transition-all duration-300 ${
                isFavoris
                  ? 'border-luxury-red bg-luxury-red text-luxury-white'
                  : 'border-luxury-gray-300 text-luxury-black hover:border-luxury-red'
              }`}
            >
              <Heart className={`w-5 h-5 ${isFavoris ? 'fill-current' : ''}`} />
            </motion.button>
          )}
        </div>
      </motion.div>

      {/* --- Infos livraison --- */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.6 }}
        className='bg-luxury-gray-50 p-6 rounded-2xl space-y-4'
      >
        <div className='flex items-center space-x-3'>
          <Truck className='w-5 h-5 text-luxury-red' />
          <span className='text-luxury-black font-medium'>
            Livraison gratuite dès 80€
          </span>
        </div>
        <div className='flex items-center space-x-3'>
          <Shield className='w-5 h-5 text-luxury-red' />
          <span className='text-luxury-black font-medium'>
            Paiement 100% sécurisé
          </span>
        </div>
        <div className='flex items-center space-x-3'>
          <RotateCcw className='w-5 h-5 text-luxury-red' />
          <span className='text-luxury-black font-medium'>
            Retours sous 30 jours
          </span>
        </div>
      </motion.div>
    </motion.div>
  )
}
