import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'

interface FocusCategory {
  id: string
  name: string
  title: string
  description: string
  image: string
  link: string
  features: string[]
}

const focusCategories: FocusCategory[] = [
  /*
  {
    id: 'wax',
    name: 'Collection Wax',
    title: 'Imprimés Africains Authentiques',
    description: 'Célébrez vos origines avec notre collection exclusive de tissus wax. Des motifs traditionnels revisités dans un style contemporain pour la femme moderne caribéenne.',
    image: 'https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg?auto=compress&cs=tinysrgb&w=600',
    link: '/collections/wax',
    features: ['Tissus authentiques', 'Motifs exclusifs', 'Coupe moderne', 'Confort optimal']
  },
 
  {
    id: 'corsets',
    name: 'Corsets & Gaines',
    title: 'Sculptez Votre Silhouette',
    description:
      'Révélez votre féminité avec notre gamme premium de corsets et gaines. Confort, maintien et élégance pour une silhouette parfaitement sculptée.',
    image: '/gaine-corset.png',
    link: '/shop/category/corsets-gaines',
    features: [
      'Maintien optimal',
      'Matières premium',
      'Confort longue durée',
      'Effet sculptant'
    ]
  },
   */
  {
    id: 'bijoux',
    name: 'Bijoux',
    title: "L'Éclat de nos accessoires",
    description:
      'Sublimez votre beauté naturelle avec nos bijoux. Or, argent et pierres précieuses pour un style authentique.',
    image: '/bijoux.png',
    link: '/shop/category/bijoux',
    features: [
      'Or 18 carats',
      'Pierres naturelles',
      'Design créole',
      'Fabrication artisanale'
    ]
  },
  {
    id: 'sacs-portefeuilles',
    name: 'Sacs & Portes monnaies',
    title: 'Élégance Tropicale',
    description:
      'Découvrez nos sacs et portefeuilles alliants style, fonctionnalité et matériaux nobles, ils subliment votre quotidien avec raffinement.',
    image: '/sacs-portefeuilles.png',
    link: '/shop/category/sacs-portes-monnaies',
    features: [
      'Cuir véritable',
      'Finitions artisanales',
      'Design tropical chic',
      'Praticité et élégance'
    ]
  }
]

export const CategoryFocus: React.FC = () => {
  const [currentCategory, setCurrentCategory] = useState(0)

  const nextCategory = () => {
    setCurrentCategory(prev => (prev + 1) % focusCategories.length)
  }

  const prevCategory = () => {
    setCurrentCategory(
      prev => (prev - 1 + focusCategories.length) % focusCategories.length
    )
  }

  const category = focusCategories[currentCategory]

  return (
    <section className='py-20 bg-luxury-gray-900 overflow-hidden'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className='text-center mb-16'
        >
          <h2 className='text-3xl md:text-4xl font-display font-bold text-luxury-white mb-4'>
            Focus Catégorie
          </h2>
          <p className='text-lg text-luxury-gray-300 max-w-2xl mx-auto'>
            Découvrez en détail nos collections phares
          </p>
        </motion.div>

        <div className='relative'>
          <AnimatePresence mode='wait'>
            <motion.div
              key={currentCategory}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5 }}
              className='grid grid-cols-1 lg:grid-cols-2 gap-12 items-center'
            >
              {/* Content */}
              <div className='order-2 lg:order-1'>
                <motion.span
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className='inline-block text-luxury-red font-medium text-sm uppercase tracking-wider mb-4'
                >
                  {category.name}
                </motion.span>

                <motion.h3
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className='text-3xl md:text-4xl font-display font-bold text-luxury-white mb-6'
                >
                  {category.title}
                </motion.h3>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className='text-luxury-gray-300 text-lg mb-8 leading-relaxed'
                >
                  {category.description}
                </motion.p>

                {/* Features */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className='grid grid-cols-2 gap-4 mb-8'
                >
                  {category.features.map((feature, index) => (
                    <div key={feature} className='flex items-center'>
                      <div className='w-2 h-2 bg-luxury-red rounded-full mr-3' />
                      <span className='text-luxury-gray-400 text-sm'>
                        {feature}
                      </span>
                    </div>
                  ))}
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                >
                  <Link
                    to={category.link}
                    className='inline-flex items-center px-8 py-4 bg-luxury-red text-luxury-white font-semibold rounded-2xl hover:bg-red-700 transition-all duration-300 shadow-luxury-red group'
                  >
                    Découvrir la collection
                    <ArrowRight className='ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-200' />
                  </Link>
                </motion.div>
              </div>

              {/* Image */}
              <div className='order-1 lg:order-2'>
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3, duration: 0.6 }}
                  className='relative'
                >
                  <div className='aspect-square rounded-3xl overflow-hidden border border-luxury-gray-800'>
                    <img
                      src={category.image}
                      alt={category.name}
                      className='w-full h-full object-cover'
                    />
                  </div>

                  {/* Decorative elements */}
                  <div className='absolute -top-4 -right-4 w-24 h-24 bg-luxury-red/20 rounded-full blur-xl' />
                  <div className='absolute -bottom-4 -left-4 w-32 h-32 bg-luxury-red/10 rounded-full blur-xl' />
                </motion.div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div className='flex items-center justify-center mt-12 space-x-4'>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={prevCategory}
              className='p-3 bg-luxury-black border border-luxury-gray-800 text-luxury-white rounded-full hover:border-luxury-red hover:text-luxury-red transition-all duration-200'
            >
              <ChevronLeft className='w-5 h-5' />
            </motion.button>

            <div className='flex space-x-2'>
              {focusCategories.map((_, index) => (
                <motion.button
                  key={index}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setCurrentCategory(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentCategory
                      ? 'bg-luxury-red'
                      : 'bg-luxury-gray-600'
                  }`}
                />
              ))}
            </div>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={nextCategory}
              className='p-3 bg-luxury-black border border-luxury-gray-800 text-luxury-white rounded-full hover:border-luxury-red hover:text-luxury-red transition-all duration-200'
            >
              <ChevronRight className='w-5 h-5' />
            </motion.button>
          </div>
        </div>
      </div>
    </section>
  )
}
