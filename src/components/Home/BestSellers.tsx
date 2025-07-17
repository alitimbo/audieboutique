import React from 'react';
import { motion } from 'framer-motion';
import { ShoppingCart, Eye, Star } from 'lucide-react';

interface BestSellerProduct {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  rating: number;
  reviews: number;
  badge?: string;
}

const bestSellers: BestSellerProduct[] = [
  {
    id: '1',
    name: 'Ensemble Lingerie Dentelle Rouge',
    price: 89.99,
    originalPrice: 119.99,
    image: 'https://images.pexels.com/photos/1926769/pexels-photo-1926769.jpeg?auto=compress&cs=tinysrgb&w=400',
    rating: 4.8,
    reviews: 124,
    badge: 'Bestseller'
  },
  {
    id: '2',
    name: 'Robe Wax Traditionnelle Moderne',
    price: 125.00,
    image: 'https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg?auto=compress&cs=tinysrgb&w=400',
    rating: 4.9,
    reviews: 89,
    badge: 'Coup de cœur'
  },
  {
    id: '3',
    name: 'Corset Sculptant Premium',
    price: 75.00,
    image: 'https://images.pexels.com/photos/1536619/pexels-photo-1536619.jpeg?auto=compress&cs=tinysrgb&w=400',
    rating: 4.7,
    reviews: 156,
    badge: 'Top vente'
  },
  {
    id: '4',
    name: 'Parure Bijoux Dorés Créoles',
    price: 45.00,
    image: 'https://images.pexels.com/photos/1926769/pexels-photo-1926769.jpeg?auto=compress&cs=tinysrgb&w=400',
    rating: 4.6,
    reviews: 78
  },
  {
    id: '5',
    name: 'Maillot de Bain Tropical Chic',
    price: 65.00,
    originalPrice: 85.00,
    image: 'https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg?auto=compress&cs=tinysrgb&w=400',
    rating: 4.8,
    reviews: 92,
    badge: 'Promo'
  },
  {
    id: '6',
    name: 'Sac à Main Cuir Caraïbe',
    price: 150.00,
    image: 'https://images.pexels.com/photos/1536619/pexels-photo-1536619.jpeg?auto=compress&cs=tinysrgb&w=400',
    rating: 4.9,
    reviews: 67,
    badge: 'Exclusif'
  }
];

export const BestSellers: React.FC = () => {
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

  const itemVariants = {
    hidden: { y: 30, opacity: 0, scale: 0.9 },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12
      }
    }
  };

  return (
    <section className="py-20 bg-luxury-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-display font-bold text-luxury-white mb-4">
            Nos Meilleures Ventes
          </h2>
          <p className="text-lg text-luxury-gray-300 max-w-2xl mx-auto">
            Les coups de cœur de nos clientes martiniquaises
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {bestSellers.map((product) => (
            <motion.div
              key={product.id}
              variants={itemVariants}
              whileHover={{ 
                y: -10,
                transition: { type: "spring", stiffness: 400, damping: 17 }
              }}
              className="group bg-luxury-gray-900 rounded-3xl overflow-hidden border border-luxury-gray-800 hover:border-luxury-red transition-all duration-300 shadow-luxury"
            >
              {/* Product Image */}
              <div className="relative overflow-hidden">
                <motion.img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-64 object-cover"
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.5 }}
                />
                
                {/* Badge */}
                {product.badge && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute top-4 left-4 bg-luxury-red text-white text-xs font-medium px-3 py-1 rounded-full"
                  >
                    {product.badge}
                  </motion.span>
                )}

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-luxury-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="bg-luxury-white text-luxury-black p-3 rounded-full hover:bg-luxury-red hover:text-luxury-white transition-colors duration-200 mr-3"
                  >
                    <Eye className="w-5 h-5" />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="bg-luxury-red text-luxury-white p-3 rounded-full hover:bg-red-700 transition-colors duration-200"
                  >
                    <ShoppingCart className="w-5 h-5" />
                  </motion.button>
                </div>
              </div>

              {/* Product Info */}
              <div className="p-6">
                <h3 className="text-luxury-white font-medium mb-2 group-hover:text-luxury-red transition-colors duration-200">
                  {product.name}
                </h3>
                
                {/* Rating */}
                <div className="flex items-center mb-3">
                  <div className="flex items-center">
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
                  <span className="text-luxury-gray-400 text-sm ml-2">
                    ({product.reviews})
                  </span>
                </div>
                
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <span className="text-luxury-red font-bold text-lg">
                      {product.price.toFixed(2)}€
                    </span>
                    {product.originalPrice && (
                      <span className="text-luxury-gray-400 line-through text-sm">
                        {product.originalPrice.toFixed(2)}€
                      </span>
                    )}
                  </div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-luxury-red text-luxury-white py-3 rounded-2xl font-medium hover:bg-red-700 transition-colors duration-200"
                >
                  Voir l'article
                </motion.button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};