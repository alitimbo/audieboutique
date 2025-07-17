import React from 'react';
import { motion } from 'framer-motion';
import { Truck, Shield, Heart } from 'lucide-react';

const features = [
  {
    icon: <Truck className="w-12 h-12" />,
    title: 'Livraison Rapide',
    description: 'Livraison gratuite dès 80€ d\'achat partout en France. Expédition sous 24h.'
  },
  {
    icon: <Shield className="w-12 h-12" />,
    title: 'Paiement Sécurisé',
    description: 'Vos transactions sont protégées par un cryptage SSL de niveau bancaire.'
  },
  {
    icon: <Heart className="w-12 h-12" />,
    title: 'Sélection Soignée',
    description: 'Chaque produit est choisi avec passion pour sa qualité et son style unique.'
  }
];

export const WhyAudie: React.FC = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12
      }
    }
  };

  return (
    <section className="py-20 bg-luxury-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-display font-bold text-luxury-white mb-6">
            Pourquoi Audie Boutique ?
          </h2>
          <p className="text-xl text-luxury-gray-300 max-w-3xl mx-auto leading-relaxed">
            "Chaque femme mérite de se sentir belle, confiante et unique. 
            Chez Audie Boutique, nous créons bien plus qu'une boutique : 
            nous offrons une expérience qui révèle votre élégance naturelle."
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              variants={itemVariants}
              whileHover={{ 
                y: -10,
                transition: { type: "spring", stiffness: 400, damping: 17 }
              }}
              className="text-center group"
            >
              <div className="bg-luxury-black p-8 rounded-3xl border border-luxury-gray-800 hover:border-luxury-red transition-all duration-300 shadow-luxury">
                <motion.div
                  className="text-luxury-red mb-6 flex justify-center group-hover:scale-110 transition-transform duration-300"
                  whileHover={{ rotate: 5 }}
                >
                  {feature.icon}
                </motion.div>
                
                <h3 className="text-xl font-semibold text-luxury-white mb-4 group-hover:text-luxury-red transition-colors duration-300">
                  {feature.title}
                </h3>
                
                <p className="text-luxury-gray-300 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Quote Section */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-20 text-center"
        >
          <div className="bg-gradient-to-r from-luxury-red/10 to-luxury-red/5 p-12 rounded-4xl border border-luxury-red/20">
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              transition={{ delay: 0.6, type: "spring", stiffness: 200 }}
              className="text-luxury-red text-6xl mb-4"
            >
              "
            </motion.div>
            <p className="text-2xl font-display text-luxury-white mb-4 italic">
              L'élégance n'est pas se faire remarquer, c'est être inoubliable.
            </p>
            <p className="text-luxury-gray-400">
              — Audie Boutique
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};