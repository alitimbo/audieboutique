import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import BannerOne from '../../images/banner_one_op.png'
import BannerTwo from '../../images/banner_two.png'

interface Slide {
  id: number
  title: string
  subtitle: string
  description: string
  cta: string
  ctaLink: string
  backgroundImage?: string
  backgroundClass?: string
}

const slides: Slide[] = [
  {
    id: 1,
    title: "L'élégance s'invite à la Martinique",
    subtitle: 'Audie Boutique - Luxe & Sensualité Tropicale',
    description:
      'Découvrez nos collections raffinées, inspirées par la beauté des Caraïbes.',
    cta: 'Explorer nos collections',
    ctaLink: '/shop',
    //backgroundImage: BannerOne
    backgroundClass:
      'bg-gradient-to-br from-luxury-gray-900 via-luxury-black to-luxury-red/10'
  },
  /*
  {
    id: 2,
    title: 'Collection Wax Exclusive',
    subtitle: 'Imprimés Africains Authentiques',
    description:
      'Entre tradition et modernité, exprimez votre identité caribéenne.',
    cta: 'Voir la collection Wax',
    ctaLink: '/collections/wax',
    backgroundClass:
      'bg-gradient-to-br from-luxury-red/20 via-luxury-black to-luxury-gray-900'
  },
  */
  {
    id: 3,
    title: 'Soldes Exceptionnels',
    subtitle: "Jusqu'à -70% sur une sélection",
    description: 'Profitez de nos prix réduits sur vos articles préférés.',
    cta: 'Voir les Soldes',
    ctaLink: '/shop/tags/soldes',
    backgroundClass:
      'bg-gradient-to-br from-luxury-gray-900 via-luxury-black to-luxury-red/10'
  },
  /*
  {
    id: 4,
    title: 'Corsets & Gaines Premium',
    subtitle: 'Silhouette Parfaite',
    description:
      'Sculptez votre silhouette avec nos pièces de lingerie haut de gamme.',
    cta: 'Découvrir la gamme',
    ctaLink: '/shop/category/corsets-gaines',
    backgroundClass:
      'bg-gradient-to-br from-purple-900/30 via-luxury-black to-luxury-gray-900'
  },
  */
  {
    id: 5,
    title: 'Bijoux d’Exception',
    subtitle: 'Élégance et Raffinement',
    description:
      'Découvrez notre collection exclusive de bijoux en Martinique, alliant luxe, finesse et éclat. Chaque pièce est conçue pour sublimer votre style et illuminer vos moments précieux.',
    cta: 'Explorer la gamme',
    ctaLink: '/shop/category/bijoux',
    backgroundClass:
      'bg-gradient-to-br from-yellow-600/30 via-luxury-black to-luxury-gray-900'
  }
]

export const HeroSlider: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % slides.length)
    }, 8000) // Changed to 8 seconds

    return () => clearInterval(timer)
  }, [])

  const nextSlide = () => {
    setCurrentSlide(prev => (prev + 1) % slides.length)
  }

  const prevSlide = () => {
    setCurrentSlide(prev => (prev - 1 + slides.length) % slides.length)
  }

  const currentSlideData = slides[currentSlide]

  return (
    <section className='relative h-screen overflow-hidden'>
      {/* Background Image/Gradient Container */}
      <AnimatePresence mode='wait'>
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: 'easeInOut' }}
          className='absolute inset-0 z-0'
        >
          {/* Affiche l'image de fond si elle existe */}
          {currentSlideData.backgroundImage ? (
            <img
              src={currentSlideData.backgroundImage}
              alt={currentSlideData.title}
              className='w-full h-full object-cover' // 👈 S'assure que l'image couvre le conteneur
            />
          ) : (
            // Affiche le dégradé si l'image n'est pas définie
            <div
              className={`absolute inset-0 ${currentSlideData.backgroundClass}`}
            />
          )}

          {/* Superposition sombre pour améliorer la lisibilité du texte */}
          <div className='absolute inset-0 bg-black opacity-30 z-10' />

          {/* Background Logo Watermark - Maintenant positionné correctement */}
          <div className='absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none z-20'>
            <img
              src={BannerOne}
              alt='Audie Boutique Watermark'
              className='w-auto h-full max-w-none transform rotate-12 scale-150 object-cover'
            />
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Contenu textuel et CTA (superposé) */}
      <div className='relative h-full flex items-center justify-center text-center z-30'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <motion.div
            key={currentSlide + 'content'}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            <motion.span
              className='inline-block text-luxury-red font-medium text-sm uppercase tracking-wider mb-4'
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.5, type: 'spring', stiffness: 200 }}
            >
              {currentSlideData.subtitle}
            </motion.span>

            <motion.h1
              className='text-4xl md:text-6xl lg:text-7xl font-display font-bold text-luxury-white mb-6'
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              {currentSlideData.title}
            </motion.h1>

            <motion.p
              className='text-xl md:text-2xl text-luxury-gray-300 mb-8 max-w-3xl mx-auto'
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              {currentSlideData.description}
            </motion.p>

            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.8 }}
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  to={currentSlideData.ctaLink}
                  className='inline-flex items-center px-8 py-4 bg-luxury-red text-luxury-white font-semibold rounded-2xl hover:bg-red-700 transition-all duration-300 shadow-luxury-red'
                >
                  {currentSlideData.cta}
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Navigation Arrows */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={prevSlide}
        className='absolute left-4 top-1/2 transform -translate-y-1/2 bg-luxury-black/50 hover:bg-luxury-red/80 text-luxury-white p-3 rounded-full transition-all duration-300 z-40'
      >
        <ChevronLeft className='w-6 h-6' />
      </motion.button>

      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={nextSlide}
        className='absolute right-4 top-1/2 transform -translate-y-1/2 bg-luxury-black/50 hover:bg-luxury-red/80 text-luxury-white p-3 rounded-full transition-all duration-300 z-40'
      >
        <ChevronRight className='w-6 h-6' />
      </motion.button>

      {/* Slide Indicators */}
      <div className='absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3 z-40'>
        {slides.map((_, index) => (
          <motion.button
            key={index}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide ? 'bg-luxury-red' : 'bg-luxury-white/50'
            }`}
          />
        ))}
      </div>
    </section>
  )
}
