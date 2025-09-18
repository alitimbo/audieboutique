import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Heart, Crown } from 'lucide-react';

export const ShopHero: React.FC = () => {
  return (
    <section className="pt-10 relative h-100 overflow-hidden bg-gradient-to-br from-luxury-black via-luxury-gray-900 to-luxury-black">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src="/shop-bg.png"
          alt="Audie Boutique Collection"
          className="w-full h-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-luxury-black/80 via-luxury-black/60 to-luxury-black/80" />
      </div>

      {/* Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{ 
            rotate: [0, 360],
            scale: [1, 1.1, 1]
          }}
          transition={{ 
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute top-10 right-10 w-32 h-32 border border-luxury-red/20 rounded-full"
        />
        <motion.div
          animate={{ 
            rotate: [360, 0],
            scale: [1.1, 1, 1.1]
          }}
          transition={{ 
            duration: 15,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute bottom-10 left-10 w-24 h-24 border border-luxury-red/30 rounded-full"
        />
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="flex items-center space-x-3 mb-6"
            >
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="bg-luxury-red/20 p-2 rounded-full"
              >
                <Crown className="w-6 h-6 text-luxury-red" />
              </motion.div>
              <span className="text-luxury-red font-medium text-sm uppercase tracking-wider">
                Collection Premium
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-luxury-white mb-6 leading-tight"
            >
              Découvrez l'Élégance
              <span className="block text-luxury-red">Caribéenne</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-xl text-luxury-gray-300 mb-8 leading-relaxed max-w-2xl"
            >
              Explorez notre collection exclusive de lingerie, mode et accessoires 
              sélectionnés avec passion pour révéler votre beauté naturelle.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-6"
            >
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <Sparkles className="w-5 h-5 text-luxury-red" />
                  <span className="text-luxury-gray-300 text-sm">Nouveautés exclusives</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Heart className="w-5 h-5 text-luxury-red" />
                  <span className="text-luxury-gray-300 text-sm">Sélection soignée</span>
                </div>
              </div>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="flex items-center space-x-8 mt-8"
            >
              <div className="text-center">
                <div className="text-2xl font-bold text-luxury-white">500+</div>
                <div className="text-luxury-gray-400 text-sm">Produits</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-luxury-white">15+</div>
                <div className="text-luxury-gray-400 text-sm">Catégories</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-luxury-white">4.9★</div>
                <div className="text-luxury-gray-400 text-sm">Satisfaction</div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Bottom gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-luxury-gray-50 to-transparent" />
    </section>
  );
};