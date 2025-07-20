import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Star, Heart, ShoppingCart, Zap, Truck, Shield, RotateCcw } from 'lucide-react';
import { useCartStore } from '../../store/useCartStore';

interface ProductInfoProps {
  product: {
    id: string;
    name: string;
    price: number;
    originalPrice?: number;
    rating: number;
    reviews: number;
    badge?: string;
    inStock: boolean;
    colors: { name: string; value: string }[];
    sizes: string[];
    description: string;
  };
}

export const ProductInfo: React.FC<ProductInfoProps> = ({ product }) => {
  const [selectedColor, setSelectedColor] = useState(product.colors[0]?.value || '');
  const [selectedSize, setSelectedSize] = useState(product.sizes[0] || '');
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);

  const { addItem } = useCartStore();

  const discountPercentage = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  const handleAddToCart = () => {
    addItem(product as any, quantity, { size: selectedSize, color: selectedColor });
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  const handleBuyNow = () => {
    handleAddToCart();
    // Redirect to checkout
    window.location.href = '/checkout';
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="space-y-8"
    >
      {/* Product Title & Badge */}
      <div>
        {product.badge && (
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.4, type: "spring", stiffness: 200 }}
            className="inline-block bg-luxury-red text-luxury-white text-sm font-medium px-4 py-2 rounded-full mb-4"
          >
            {product.badge}
          </motion.span>
        )}
        
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="text-3xl md:text-4xl font-display font-bold text-luxury-black mb-4 leading-tight"
        >
          {product.name}
        </motion.h1>

        {/* Rating */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="flex items-center space-x-4 mb-6"
        >
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-5 h-5 ${
                  i < Math.floor(product.rating)
                    ? 'text-yellow-400 fill-current'
                    : 'text-luxury-gray-300'
                }`}
              />
            ))}
          </div>
          <span className="text-luxury-gray-600">
            {product.rating} ({product.reviews} avis)
          </span>
        </motion.div>
      </div>

      {/* Price */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.6 }}
        className="flex items-center space-x-4"
      >
        <span className="text-4xl font-bold text-luxury-red">
          {product.price.toFixed(2)}€
        </span>
        {product.originalPrice && (
          <>
            <span className="text-2xl text-luxury-gray-400 line-through">
              {product.originalPrice.toFixed(2)}€
            </span>
            <span className="bg-luxury-red text-luxury-white text-sm font-medium px-3 py-1 rounded-full">
              -{discountPercentage}%
            </span>
          </>
        )}
      </motion.div>

      {/* Color Selection */}
      {product.colors.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          <h3 className="text-lg font-semibold text-luxury-black mb-4">
            Couleur: {product.colors.find(c => c.value === selectedColor)?.name}
          </h3>
          <div className="flex space-x-3">
            {product.colors.map((color) => (
              <motion.button
                key={color.value}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setSelectedColor(color.value)}
                className={`w-12 h-12 rounded-full border-4 transition-all duration-200 ${
                  selectedColor === color.value
                    ? 'border-luxury-red shadow-lg'
                    : 'border-luxury-gray-300 hover:border-luxury-gray-400'
                }`}
                style={{ backgroundColor: color.value }}
                title={color.name}
              >
                {color.value === '#FFFFFF' && (
                  <div className="w-full h-full border border-luxury-gray-200 rounded-full" />
                )}
              </motion.button>
            ))}
          </div>
        </motion.div>
      )}

      {/* Size Selection */}
      {product.sizes.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.6 }}
        >
          <h3 className="text-lg font-semibold text-luxury-black mb-4">
            Taille: {selectedSize}
          </h3>
          <div className="flex flex-wrap gap-3">
            {product.sizes.map((size) => (
              <motion.button
                key={size}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedSize(size)}
                className={`px-4 py-2 border-2 rounded-xl font-medium transition-all duration-200 ${
                  selectedSize === size
                    ? 'border-luxury-red bg-luxury-red text-luxury-white'
                    : 'border-luxury-gray-300 text-luxury-black hover:border-luxury-red'
                }`}
              >
                {size}
              </motion.button>
            ))}
          </div>
        </motion.div>
      )}

      {/* Quantity */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.6 }}
      >
        <h3 className="text-lg font-semibold text-luxury-black mb-4">Quantité</h3>
        <div className="flex items-center space-x-4">
          <div className="flex items-center border-2 border-luxury-gray-300 rounded-xl">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="px-4 py-2 text-luxury-black hover:bg-luxury-gray-100 transition-colors duration-200"
            >
              -
            </button>
            <span className="px-4 py-2 font-medium">{quantity}</span>
            <button
              onClick={() => setQuantity(quantity + 1)}
              className="px-4 py-2 text-luxury-black hover:bg-luxury-gray-100 transition-colors duration-200"
            >
              +
            </button>
          </div>
          <span className="text-luxury-gray-600">
            {product.inStock ? 'En stock' : 'Rupture de stock'}
          </span>
        </div>
      </motion.div>

      {/* Action Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9, duration: 0.6 }}
        className="space-y-4"
      >
        <div className="flex space-x-4">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleAddToCart}
            disabled={!product.inStock}
            className={`flex-1 flex items-center justify-center space-x-2 py-4 rounded-2xl font-semibold transition-all duration-300 ${
              product.inStock
                ? addedToCart
                  ? 'bg-green-500 text-white'
                  : 'bg-luxury-red text-luxury-white hover:bg-red-700 shadow-luxury-red'
                : 'bg-luxury-gray-300 text-luxury-gray-500 cursor-not-allowed'
            }`}
          >
            <ShoppingCart className="w-5 h-5" />
            <span>
              {addedToCart ? 'Ajouté !' : product.inStock ? 'Ajouter au panier' : 'Rupture de stock'}
            </span>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsWishlisted(!isWishlisted)}
            className={`p-4 rounded-2xl border-2 transition-all duration-300 ${
              isWishlisted
                ? 'border-luxury-red bg-luxury-red text-luxury-white'
                : 'border-luxury-gray-300 text-luxury-black hover:border-luxury-red'
            }`}
          >
            <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-current' : ''}`} />
          </motion.button>
        </div>

        {product.inStock && (
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleBuyNow}
            className="w-full flex items-center justify-center space-x-2 py-4 bg-luxury-black text-luxury-white rounded-2xl font-semibold hover:bg-luxury-gray-900 transition-all duration-300"
          >
            <Zap className="w-5 h-5" />
            <span>Acheter maintenant</span>
          </motion.button>
        )}
      </motion.div>

      {/* Delivery Info */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.6 }}
        className="bg-luxury-gray-50 p-6 rounded-2xl space-y-4"
      >
        <div className="flex items-center space-x-3">
          <Truck className="w-5 h-5 text-luxury-red" />
          <span className="text-luxury-black font-medium">Livraison gratuite dès 80€</span>
        </div>
        <div className="flex items-center space-x-3">
          <Shield className="w-5 h-5 text-luxury-red" />
          <span className="text-luxury-black font-medium">Paiement 100% sécurisé</span>
        </div>
        <div className="flex items-center space-x-3">
          <RotateCcw className="w-5 h-5 text-luxury-red" />
          <span className="text-luxury-black font-medium">Retours sous 30 jours</span>
        </div>
      </motion.div>
    </motion.div>
  );
};