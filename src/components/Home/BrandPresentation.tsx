import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Heart, Sparkles } from 'lucide-react';

export const BrandPresentation: React.FC = () => {
  return (
    <section className="py-20 bg-luxury-gray-900 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 w-32 h-32 border border-luxury-red rounded-full" />
        <div className="absolute bottom-10 right-10 w-24 h-24 border border-luxury-red rounded-full" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 h-48 border border-luxury-red rounded-full" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
            className="flex justify-center mb-8"
          >
            <div className="bg-luxury-red/10 p-4 rounded-full">
              <Heart className="w-12 h-12 text-luxury-red" />
            </div>
          </motion.div>

          <motion.h2
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-4xl md:text-5xl font-display font-bold text-luxury-white mb-6"
          >
            Audie Boutique
          </motion.h2>

          <motion.p
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="text-xl md:text-2xl text-luxury-gray-300 mb-8 max-w-4xl mx-auto leading-relaxed"
          >
            La référence de la <span className="text-luxury-red font-semibold">lingerie</span>, 
            <span className="text-luxury-red font-semibold"> mode</span> et 
            <span className="text-luxury-red font-semibold"> accessoires</span> en Martinique.
          </motion.p>

          <motion.p
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="text-lg text-luxury-gray-400 mb-12 max-w-3xl mx-auto"
          >
            Entre <span className="text-luxury-red">audace</span>, 
            <span className="text-luxury-red"> wax</span> et 
            <span className="text-luxury-red"> élégance</span>, 
            nous célébrons la beauté caribéenne sous toutes ses formes.
          </motion.p>

          {/* Features */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.8 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto"
          >
            <motion.div
              whileHover={{ y: -5 }}
              className="flex flex-col items-center text-center"
            >
              <div className="bg-luxury-black p-4 rounded-2xl mb-4 border border-luxury-gray-800">
                <MapPin className="w-8 h-8 text-luxury-red" />
              </div>
              <h3 className="text-luxury-white font-semibold mb-2">Martinique</h3>
              <p className="text-luxury-gray-400 text-sm">Ancrée dans nos racines caribéennes</p>
            </motion.div>

            <motion.div
              whileHover={{ y: -5 }}
              className="flex flex-col items-center text-center"
            >
              <div className="bg-luxury-black p-4 rounded-2xl mb-4 border border-luxury-gray-800">
                <Sparkles className="w-8 h-8 text-luxury-red" />
              </div>
              <h3 className="text-luxury-white font-semibold mb-2">Élégance</h3>
              <p className="text-luxury-gray-400 text-sm">Sélection premium et raffinée</p>
            </motion.div>

            <motion.div
              whileHover={{ y: -5 }}
              className="flex flex-col items-center text-center"
            >
              <div className="bg-luxury-black p-4 rounded-2xl mb-4 border border-luxury-gray-800">
                <Heart className="w-8 h-8 text-luxury-red" />
              </div>
              <h3 className="text-luxury-white font-semibold mb-2">Passion</h3>
              <p className="text-luxury-gray-400 text-sm">Chaque pièce choisie avec amour</p>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};