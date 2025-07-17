import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Slide {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  cta: string;
  ctaLink: string;
  background: string;
}

const slides: Slide[] = [
  {
    id: 1,
    title: "Révélez votre féminité avec style",
    subtitle: "Lingerie & Mode Premium",
    description: "Découvrez notre sélection exclusive de pièces audacieuses et élégantes",
    cta: "Découvrir la boutique",
    ctaLink: "/shop",
    background: "bg-gradient-to-br from-luxury-black via-luxury-gray-900 to-luxury-black"
  },
  {
    id: 2,
    title: "Collection Wax Exclusive",
    subtitle: "Imprimés Africains Authentiques",
    description: "Entre tradition et modernité, exprimez votre identité caribéenne",
    cta: "Voir la collection Wax",
    ctaLink: "/collections/wax",
    background: "bg-gradient-to-br from-luxury-red/20 via-luxury-black to-luxury-gray-900"
  },
  {
    id: 3,
    title: "Soldes Exceptionnels",
    subtitle: "Jusqu'à -70% sur une sélection",
    description: "Profitez de nos prix réduits sur vos articles préférés",
    cta: "Voir les Soldes",
    ctaLink: "/soldes",
    background: "bg-gradient-to-br from-luxury-gray-900 via-luxury-black to-luxury-red/10"
  },
  {
    id: 4,
    title: "Corsets & Gaines Premium",
    subtitle: "Silhouette Parfaite",
    description: "Sculptez votre silhouette avec nos pièces de lingerie haut de gamme",
    cta: "Découvrir la gamme",
    ctaLink: "/collections/corsets",
    background: "bg-gradient-to-br from-purple-900/30 via-luxury-black to-luxury-gray-900"
  }
];

export const HeroSlider: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <section className="relative h-screen overflow-hidden">
      {/* Background Logo Watermark */}
      <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none z-10">
        <span className="text-luxury-white font-display text-9xl font-bold transform rotate-12">
          Audie
        </span>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className={`absolute inset-0 ${slides[currentSlide].background}`}
        >
          <div className="relative h-full flex items-center justify-center">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <motion.div
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.8 }}
              >
                <motion.span
                  className="inline-block text-luxury-red font-medium text-sm uppercase tracking-wider mb-4"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
                >
                  {slides[currentSlide].subtitle}
                </motion.span>
                
                <motion.h1
                  className="text-4xl md:text-6xl lg:text-7xl font-display font-bold text-luxury-white mb-6"
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.4, duration: 0.8 }}
                >
                  {slides[currentSlide].title}
                </motion.h1>
                
                <motion.p
                  className="text-xl md:text-2xl text-luxury-gray-300 mb-8 max-w-3xl mx-auto"
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.6, duration: 0.8 }}
                >
                  {slides[currentSlide].description}
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
                      to={slides[currentSlide].ctaLink}
                      className="inline-flex items-center px-8 py-4 bg-luxury-red text-luxury-white font-semibold rounded-2xl hover:bg-red-700 transition-all duration-300 shadow-luxury-red"
                    >
                      {slides[currentSlide].cta}
                    </Link>
                  </motion.div>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation Arrows */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={prevSlide}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-luxury-black/50 hover:bg-luxury-red/80 text-luxury-white p-3 rounded-full transition-all duration-300 z-20"
      >
        <ChevronLeft className="w-6 h-6" />
      </motion.button>

      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={nextSlide}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-luxury-black/50 hover:bg-luxury-red/80 text-luxury-white p-3 rounded-full transition-all duration-300 z-20"
      >
        <ChevronRight className="w-6 h-6" />
      </motion.button>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3 z-20">
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
  );
};