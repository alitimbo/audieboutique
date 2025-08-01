import React from 'react';
import { motion } from 'framer-motion';
import { ShoppingCart, Heart, Eye } from 'lucide-react';

interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  badge?: 'Nouveau' | 'Promo' | 'Exclusif';
  badgeColor?: string;
}

const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Robe Élégante Noire',
    price: 89.99,
    originalPrice: 129.99,
    image: 'https://images.pexels.com/photos/1536619/pexels-photo-1536619.jpeg?auto=compress&cs=tinysrgb&w=400',
    badge: 'Promo',
    badgeColor: 'bg-luxury-red'
  },
  {
    id: '2',
    name: 'Ensemble Wax Coloré',
    price: 75.00,
    image: 'https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg?auto=compress&cs=tinysrgb&w=400',
    badge: 'Nouveau',
    badgeColor: 'bg-green-500'
  },
  {
    id: '3',
    name: 'Corset Dentelle Rouge',
    price: 65.00,
    image: 'https://images.pexels.com/photos/1926769/pexels-photo-1926769.jpeg?auto=compress&cs=tinysrgb&w=400',
    badge: 'Exclusif',
    badgeColor: 'bg-purple-500'
  },
  {
    id: '4',
    name: 'Maillot de Bain Tropical',
    price: 45.00,
    image: 'https://images.pexels.com/photos/1536619/pexels-photo-1536619.jpeg?auto=compress&cs=tinysrgb&w=400',
    badge: 'Nouveau',
    badgeColor: 'bg-green-500'
  },
  {
    id: '5',
    name: 'Sac à Main Cuir Premium',
    price: 120.00,
    image: 'https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    id: '6',
    name: 'Bijoux Dorés Élégants',
    price: 35.00,
    originalPrice: 50.00,
    image: 'https://images.pexels.com/photos/1926769/pexels-photo-1926769.jpeg?auto=compress&cs=tinysrgb&w=400',
    badge: 'Promo',
    badgeColor: 'bg-luxury-red'
  },
  {
    id: '7',
    name: 'Tenue Couple Assortie',
    price: 150.00,
    image: 'https://images.pexels.com/photos/1536619/pexels-photo-1536619.jpeg?auto=compress&cs=tinysrgb&w=400',
    badge: 'Exclusif',
    badgeColor: 'bg-purple-500'
  },
  {
    id: '8',
    name: 'Robe de Soirée Paillettes',
    price: 199.99,
    image: 'https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg?auto=compress&cs=tinysrgb&w=400',
    badge: 'Nouveau',
    badgeColor: 'bg-green-500'
  }
];

export const ProductGrid: React.FC = () => {
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
            Nouveautés
          </h2>
          <p className="text-lg text-luxury-gray-300 max-w-2xl mx-auto">
            Découvrez les dernières pièces de notre collection, sélectionnées avec passion
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {mockProducts.map((product) => (
            <motion.div
              key={product.id}
              variants={itemVariants}
              whileHover={{ y: -5 }}
              className="group bg-luxury-gray-900 rounded-3xl overflow-hidden border border-luxury-gray-800 hover:border-luxury-red transition-all duration-300 shadow-luxury"
            >
              {/* Product Image */}
              <div className="relative overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                
                {/* Badge */}
                {product.badge && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className={`absolute top-4 left-4 ${product.badgeColor} text-white text-xs font-medium px-3 py-1 rounded-full`}
                  >
                    {product.badge}
                  </motion.span>
                )}

                {/* Hover Actions */}
                <div className="absolute inset-0 bg-luxury-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center space-x-3">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="bg-luxury-white text-luxury-black p-2 rounded-full hover:bg-luxury-red hover:text-luxury-white transition-colors duration-200"
                  >
                    <Eye className="w-4 h-4" />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="bg-luxury-white text-luxury-black p-2 rounded-full hover:bg-luxury-red hover:text-luxury-white transition-colors duration-200"
                  >
                    <Heart className="w-4 h-4" />
                  </motion.button>
                </div>
              </div>

              {/* Product Info */}
              <div className="p-6">
                <h3 className="text-luxury-white font-medium mb-2 group-hover:text-luxury-red transition-colors duration-200">
                  {product.name}
                </h3>
                
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
                  className="w-full bg-luxury-red text-luxury-white py-3 rounded-2xl font-medium hover:bg-red-700 transition-colors duration-200 flex items-center justify-center space-x-2"
                >
                  <ShoppingCart className="w-4 h-4" />
                  <span className='text-xs'>Ajouter au panier</span>
                </motion.button>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-12"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center px-8 py-4 border-2 border-luxury-red text-luxury-red font-semibold rounded-2xl hover:bg-luxury-red hover:text-luxury-white transition-all duration-300"
          >
            Voir tous les produits
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};