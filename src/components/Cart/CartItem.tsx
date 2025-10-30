import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Minus, Plus, X, Heart } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useProductStore } from '../../store/useProductStore'
import { Product } from '../../types/newproduct'
import { useCartStore } from '../../store/useCartStore'

export interface CartItemData {
  id: string
  productId: string
  name: string
  price: number
  original_price?: number
  image: string
  size?: string
  color?: string
  quantity: number
  inStock: boolean
}

interface CartItemProps {
  item: CartItemData
  onUpdateQuantity: (id: string, quantity: number) => void
  onRemove: (id: string) => void
  onMoveToWishlist?: (id: string) => void
}

export const CartItem: React.FC<CartItemProps> = ({
  item,
  onUpdateQuantity,
  onRemove,
  onMoveToWishlist
}) => {
  const { products } = useProductStore()
  const { updateCartItemVariant } = useCartStore()
  const [productData, setProductData] = useState<Product | null>(null)
  //console.log(item)
  const subtotal = item.price * item.quantity
  const originalSubtotal = item.original_price
    ? item.original_price * item.quantity
    : null
  //console.log('Rendering CartItem:', item);

  useEffect(() => {
    const product = products.find(p => p.id === item.productId)
    if (product) {
      setProductData(product)
    }
  }, [products])

  //console.log('Product data for CartItem:', productData)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -100 }}
      transition={{ duration: 0.3 }}
      className='bg-luxury-white rounded-2xl p-6 shadow-luxury border border-luxury-gray-100 mb-4'
    >
      <div className='flex flex-col sm:flex-row gap-4'>
        {/* Product Image */}
        <div className='flex-shrink-0'>
          <Link to={`/product/${item.productId}`}>
            <motion.img
              whileHover={{ scale: 1.05 }}
              src={item.image}
              alt={item.name}
              className='w-24 h-24 sm:w-32 sm:h-32 object-cover rounded-xl cursor-pointer'
            />
          </Link>
        </div>

        {/* Product Info */}
        <div className='flex-1 min-w-0'>
          <div className='flex justify-between items-start mb-2'>
            <Link to={`/product/${item.productId}`}>
              <h3 className='text-lg font-semibold text-luxury-black hover:text-luxury-red transition-colors duration-200 line-clamp-2'>
                {item.name}
              </h3>
            </Link>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => onRemove(item.id)}
              className='text-luxury-gray-400 hover:text-luxury-red transition-colors duration-200 p-1'
              title='Supprimer'
            >
              <X className='w-5 h-5' />
            </motion.button>
          </div>

          {/* Variants */}
          {productData?.variants && productData.variants.length > 0 && (
            <div className='flex flex-col sm:flex-row gap-4 mb-3 text-sm text-luxury-gray-600'>
              {/* Sélecteur de taille */}
              <div>
                <label className='mr-2 font-medium text-luxury-black'>
                  Taille :
                </label>
                <select
                  value={item.size || ''}
                  onChange={e => {
                    const selectedSize = e.target.value
                    const colorsForSize =
                      productData?.variants?.find(v => v.size === selectedSize)
                        ?.colors || []
                    const defaultColor =
                      colorsForSize.length > 0
                        ? colorsForSize[0].name
                        : undefined
                    updateCartItemVariant(item.id, selectedSize, defaultColor)
                  }}
                  className='border border-luxury-gray-200 rounded-lg px-2 py-1 focus:outline-none'
                >
                  <option value=''>Sélectionner</option>
                  {productData?.variants?.map(variant => (
                    <option key={variant.size} value={variant.size}>
                      {variant.size}
                    </option>
                  ))}
                </select>
              </div>

              {/* Sélecteur de couleur (lié à la taille) */}
              {item.size && (
                <div>
                  <label className='mr-2 font-medium text-luxury-black'>
                    Couleur :
                  </label>
                  <select
                    value={item.color || ''}
                    onChange={e =>
                      updateCartItemVariant(item.id, item.size, e.target.value)
                    }
                    className='border border-luxury-gray-200 rounded-lg px-2 py-1 focus:outline-none'
                  >
                    <option value=''>Sélectionner</option>
                    {productData?.variants
                      .find(v => v.size === item.size)
                      ?.colors.map(c => (
                        <option key={c.name} value={c.name}>
                          {c.name}
                        </option>
                      ))}
                  </select>
                </div>
              )}
            </div>
          )}

          {/* Price and Quantity */}
          <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4'>
            {/* Price */}
            <div className='flex items-center space-x-2'>
              <span className='text-xl font-bold text-luxury-red'>
                {item.price.toFixed(2)}€
              </span>
              {item.original_price && (
                <span className='text-sm text-luxury-gray-400 line-through'>
                  {item.original_price.toFixed(2)}€
                </span>
              )}
            </div>

            {/* Quantity Controls */}
            <div className='flex items-center space-x-4'>
              <div className='flex items-center border-2 border-luxury-gray-200 rounded-xl'>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() =>
                    onUpdateQuantity(item.id, Math.max(1, item.quantity - 1))
                  }
                  className='p-2 text-luxury-gray-600 hover:text-luxury-red transition-colors duration-200'
                  disabled={item.quantity <= 1}
                >
                  <Minus className='w-4 h-4' />
                </motion.button>

                <span className='px-4 py-2 font-medium text-luxury-black min-w-[3rem] text-center'>
                  {item.quantity}
                </span>

                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                  className='p-2 text-luxury-gray-600 hover:text-luxury-red transition-colors duration-200'
                  disabled={!item.inStock}
                >
                  <Plus className='w-4 h-4' />
                </motion.button>
              </div>

              {/* Subtotal */}
              <div className='text-right'>
                <div className='text-lg font-bold text-luxury-black'>
                  {subtotal.toFixed(2)}€
                </div>
                {originalSubtotal && (
                  <div className='text-sm text-luxury-gray-400 line-through'>
                    {originalSubtotal.toFixed(2)}€
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Actions */}
          {/*
            <div className='flex items-center justify-between mt-4 pt-4 border-t border-luxury-gray-100'>
              <div className='flex items-center space-x-4'>
                {onMoveToWishlist && (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => onMoveToWishlist(item.id)}
                    className='flex items-center space-x-2 text-sm text-luxury-gray-600 hover:text-luxury-red transition-colors duration-200'
                  >
                    <Heart className='w-4 h-4' />
                    <span>Sauvegarder pour plus tard</span>
                  </motion.button>
                )}
              </div>

              <div className='text-sm text-luxury-gray-500'>
                {item.inStock ? 'En stock' : 'Stock limité'}
              </div>
            </div>
          */}
        </div>
      </div>
    </motion.div>
  )
}
