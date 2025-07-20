import React from 'react';
import { motion } from 'framer-motion';
import { ProductCard, Product } from './ProductCard';
import { ShoppingBag } from 'lucide-react';

interface ProductGridProps {
  products: Product[];
  loading: boolean;
  onAddToCart: (product: Product) => void;
  onToggleWishlist: (productId: string) => void;
  wishlistItems: string[];
}

export const ProductGrid: React.FC<ProductGridProps> = ({
  products,
  loading,
  onAddToCart,
  onToggleWishlist,
  wishlistItems
}) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {[...Array(8)].map((_, index) => (
          <div
            key={index}
            className="bg-luxury-white rounded-3xl overflow-hidden shadow-luxury animate-pulse"
          >
            <div className="aspect-square bg-luxury-gray-200" />
            <div className="p-6 space-y-4">
              <div className="h-4 bg-luxury-gray-200 rounded w-1/2" />
              <div className="h-6 bg-luxury-gray-200 rounded w-3/4" />
              <div className="h-4 bg-luxury-gray-200 rounded w-1/3" />
              <div className="h-12 bg-luxury-gray-200 rounded" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col items-center justify-center py-20 text-center"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className="bg-luxury-gray-100 p-8 rounded-full mb-6"
        >
          <ShoppingBag className="w-16 h-16 text-luxury-gray-400" />
        </motion.div>
        
        <motion.h3
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-2xl font-display font-bold text-luxury-black mb-4"
        >
          Aucun produit trouvé
        </motion.h3>
        
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-luxury-gray-600 max-w-md"
        >
          Essayez de modifier vos filtres ou explorez nos autres catégories pour découvrir nos magnifiques produits.
        </motion.p>
        
        <motion.button
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="mt-8 px-8 py-3 bg-luxury-red text-luxury-white rounded-2xl font-medium hover:bg-red-700 transition-colors duration-200"
          onClick={() => window.location.reload()}
        >
          Réinitialiser les filtres
        </motion.button>
      </motion.div>
    );
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
    >
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onAddToCart={onAddToCart}
          onToggleWishlist={onToggleWishlist}
          isInWishlist={wishlistItems.includes(product.id)}
        />
      ))}
    </motion.div>
  );
};