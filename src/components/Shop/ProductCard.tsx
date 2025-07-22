import React from 'react';
import { motion } from 'framer-motion';
import { ShoppingCart, Heart, Eye, Star } from 'lucide-react';
import { Link } from 'react-router-dom';

export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  colors: string[];
  isNew?: boolean;
  isOnSale?: boolean;
  rating?: number;
  reviews?: number;
  inStock: boolean;
}

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
  onToggleWishlist: (productId: string) => void;
  isInWishlist: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onAddToCart,
  onToggleWishlist,
  isInWishlist
}) => {
  const discountPercentage = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
      className="group bg-luxury-white rounded-3xl overflow-hidden shadow-luxury hover:shadow-luxury-lg transition-all duration-300 border border-luxury-gray-100"
    >
      {/* Product Image */}
      <div className="relative overflow-hidden aspect-square">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          loading="lazy"
        />
        
        {/* Badges */}
        <div className="absolute top-4 left-4 flex flex-col space-y-2">
          {product.isNew && (
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="bg-green-500 text-white text-xs font-medium px-3 py-1 rounded-full"
            >
              Nouveau
            </motion.span>
          )}
          {product.isOnSale && (
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="bg-luxury-red text-white text-xs font-medium px-3 py-1 rounded-full"
            >
              -{discountPercentage}%
            </motion.span>
          )}
          {!product.inStock && (
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="bg-luxury-gray-600 text-white text-xs font-medium px-3 py-1 rounded-full"
            >
              Rupture
            </motion.span>
          )}
        </div>

        {/* Hover Actions */}
        <div className="absolute inset-0 bg-luxury-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <div className="flex space-x-3">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="bg-luxury-white text-luxury-black p-3 rounded-full hover:bg-luxury-red hover:text-luxury-white transition-colors duration-200 shadow-lg"
              title="Aperçu rapide"
            >
              <Eye className="w-5 h-5" />
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => onToggleWishlist(product.id)}
              className={`p-3 rounded-full transition-colors duration-200 shadow-lg ${
                isInWishlist
                  ? 'bg-luxury-red text-luxury-white'
                  : 'bg-luxury-white text-luxury-black hover:bg-luxury-red hover:text-luxury-white'
              }`}
              title={isInWishlist ? 'Retirer des favoris' : 'Ajouter aux favoris'}
            >
              <Heart className={`w-5 h-5 ${isInWishlist ? 'fill-current' : ''}`} />
            </motion.button>
          </div>
        </div>

        {/* Wishlist Button (always visible on mobile) */}
        <button
          onClick={() => onToggleWishlist(product.id)}
          className={`lg:hidden absolute top-4 right-4 p-2 rounded-full transition-colors duration-200 ${
            isInWishlist
              ? 'bg-luxury-red text-luxury-white'
              : 'bg-luxury-white/90 text-luxury-black hover:bg-luxury-red hover:text-luxury-white'
          }`}
        >
          <Heart className={`w-4 h-4 ${isInWishlist ? 'fill-current' : ''}`} />
        </button>
      </div>

      {/* Product Info */}
      <div className="p-6">
        {/* Category */}
        <span className="text-luxury-red text-sm font-medium uppercase tracking-wide">
          {product.category}
        </span>
        
        {/* Product Name */}
        <Link to={`/product/${product.id}`}>
          <h3 className="text-luxury-black font-semibold text-lg mt-2 mb-3 hover:text-luxury-red transition-colors duration-200 line-clamp-2">
            {product.name}
          </h3>
        </Link>
        
        {/* Rating */}
        {product.rating && (
          <div className="flex items-center mb-3">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${
                    i < Math.floor(product.rating!)
                      ? 'text-yellow-400 fill-current'
                      : 'text-luxury-gray-300'
                  }`}
                />
              ))}
            </div>
            {product.reviews && (
              <span className="text-luxury-gray-500 text-sm ml-2">
                ({product.reviews})
              </span>
            )}
          </div>
        )}

        {/* Colors */}
        {product.colors.length > 0 && (
          <div className="flex items-center space-x-2 mb-4">
            <span className="text-luxury-gray-600 text-sm">Couleurs:</span>
            <div className="flex space-x-1">
              {product.colors.slice(0, 4).map((color, index) => (
                <div
                  key={index}
                  className="w-4 h-4 rounded-full border border-luxury-gray-300"
                  style={{ backgroundColor: color }}
                  title={color}
                />
              ))}
              {product.colors.length > 4 && (
                <span className="text-luxury-gray-500 text-xs">
                  +{product.colors.length - 4}
                </span>
              )}
            </div>
          </div>
        )}
        
        {/* Price */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <span className="text-luxury-red font-bold text-xl">
              {product.price.toFixed(2)}€
            </span>
            {product.originalPrice && (
              <span className="text-luxury-gray-400 line-through text-sm">
                {product.originalPrice.toFixed(2)}€
              </span>
            )}
          </div>
        </div>

        {/* Add to Cart Button */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => onAddToCart(product)}
          disabled={!product.inStock}
          className={`w-full py-3 rounded-2xl font-medium transition-all duration-200 flex items-center justify-center space-x-2 ${
            product.inStock
              ? 'bg-luxury-red text-luxury-white hover:bg-red-700 shadow-luxury-red'
              : 'bg-luxury-gray-300 text-luxury-gray-500 cursor-not-allowed'
          }`}
        >
          <ShoppingCart className="w-4 h-4" />
          <span className='text-xs'>{product.inStock ? 'Ajouter au panier' : 'Rupture de stock'}</span>
        </motion.button>
      </div>
    </motion.div>
  );
};