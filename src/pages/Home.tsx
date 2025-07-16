import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRightIcon, SparklesIcon, ShieldCheckIcon, TruckIcon } from '@heroicons/react/24/outline';
import { SEO } from '../components/ui/SEO';

export const Home: React.FC = () => {
  const features = [
    {
      icon: <SparklesIcon className="w-8 h-8" />,
      title: 'Qualité Premium',
      description: 'Produits sélectionnés avec soin pour leur excellence'
    },
    {
      icon: <ShieldCheckIcon className="w-8 h-8" />,
      title: 'Garantie Luxe',
      description: 'Satisfaction garantie ou remboursé sous 30 jours'
    },
    {
      icon: <TruckIcon className="w-8 h-8" />,
      title: 'Livraison Express',
      description: 'Livraison gratuite et rapide dans toute la France'
    }
  ];

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
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10
      }
    }
  };

  return (
    <>
      <SEO
        title="Accueil"
        description="Découvrez LuxStore, votre boutique en ligne premium. Collections exclusives, design luxueux et qualité exceptionnelle."
        keywords="luxe, premium, boutique, e-commerce, mode, design, qualité"
      />
      
      <div className="min-h-screen bg-luxury-black">
        {/* Hero Section */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-luxury-black via-luxury-black to-luxury-gray-900" />
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-32"
          >
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="text-center"
            >
              <motion.h1
                variants={itemVariants}
                className="text-4xl md:text-6xl lg:text-7xl font-bold text-luxury-white mb-6"
              >
                Luxe
                <motion.span
                  initial={{ color: '#F5F5F5' }}
                  animate={{ color: '#B3001B' }}
                  transition={{ delay: 1, duration: 0.8 }}
                  className="block"
                >
                  Redéfini
                </motion.span>
              </motion.h1>
              
              <motion.p
                variants={itemVariants}
                className="text-xl md:text-2xl text-luxury-gray-300 mb-8 max-w-3xl mx-auto"
              >
                Découvrez notre collection exclusive de produits premium, 
                conçus pour les connaisseurs les plus exigeants.
              </motion.p>
              
              <motion.div
                variants={itemVariants}
                className="flex flex-col sm:flex-row gap-4 justify-center"
              >
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link
                    to="/shop"
                    className="inline-flex items-center px-8 py-4 bg-luxury-red text-luxury-white font-semibold rounded-2xl hover:bg-red-700 transition-all duration-300 shadow-luxury-red"
                  >
                    Découvrir la Collection
                    <ArrowRightIcon className="ml-2 w-5 h-5" />
                  </Link>
                </motion.div>
                
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link
                    to="/about"
                    className="inline-flex items-center px-8 py-4 border-2 border-luxury-white text-luxury-white font-semibold rounded-2xl hover:bg-luxury-white hover:text-luxury-black transition-all duration-300"
                  >
                    Notre Histoire
                  </Link>
                </motion.div>
              </motion.div>
            </motion.div>
          </motion.div>
          
          {/* Decorative Elements */}
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 0.1, scale: 1 }}
            transition={{ delay: 2, duration: 1 }}
            className="absolute top-20 right-10 w-72 h-72 bg-luxury-red rounded-full blur-3xl"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 0.05, scale: 1 }}
            transition={{ delay: 2.5, duration: 1 }}
            className="absolute bottom-20 left-10 w-96 h-96 bg-luxury-white rounded-full blur-3xl"
          />
        </section>

        {/* Features Section */}
        <section className="py-20 bg-luxury-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-luxury-white mb-4">
                L'Excellence à Votre Service
              </h2>
              <p className="text-lg text-luxury-gray-300 max-w-2xl mx-auto">
                Découvrez ce qui fait de LuxStore une expérience shopping unique et premium.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  whileHover={{ y: -10 }}
                  className="bg-luxury-black p-8 rounded-3xl border border-luxury-gray-800 hover:border-luxury-red transition-all duration-300 shadow-luxury"
                >
                  <div className="text-luxury-red mb-4">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-luxury-white mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-luxury-gray-300">
                    {feature.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-luxury-black">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="text-center bg-gradient-to-r from-luxury-red to-red-700 p-12 rounded-4xl"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-luxury-white mb-4">
                Prêt à Découvrir le Luxe ?
              </h2>
              <p className="text-lg text-luxury-white/90 mb-8 max-w-2xl mx-auto">
                Rejoignez notre communauté exclusive et accédez à des produits premium 
                sélectionnés avec soin.
              </p>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  to="/shop"
                  className="inline-flex items-center px-8 py-4 bg-luxury-white text-luxury-black font-semibold rounded-2xl hover:bg-luxury-gray-100 transition-all duration-300"
                >
                  Commencer Mon Shopping
                  <ArrowRightIcon className="ml-2 w-5 h-5" />
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
};