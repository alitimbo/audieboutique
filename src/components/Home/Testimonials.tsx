import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Quote } from 'lucide-react';

interface Testimonial {
  id: string;
  name: string;
  location: string;
  rating: number;
  comment: string;
  product: string;
  avatar: string;
}

const testimonials: Testimonial[] = [
  {
    id: '1',
    name: 'Marie-Claire',
    location: 'Fort-de-France',
    rating: 5,
    comment: 'Absolument ravie de ma commande ! La qualité des tissus wax est exceptionnelle et la coupe parfaite. Je recommande vivement Audie Boutique.',
    product: 'Robe Wax Traditionnelle',
    avatar: 'https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg?auto=compress&cs=tinysrgb&w=100'
  },
  {
    id: '2',
    name: 'Sandrine',
    location: 'Le Lamentin',
    rating: 5,
    comment: 'Le corset que j\'ai acheté est parfait ! Confortable et très efficace. L\'équipe d\'Audie Boutique est aux petits soins avec ses clientes.',
    product: 'Corset Sculptant Premium',
    avatar: 'https://images.pexels.com/photos/1926769/pexels-photo-1926769.jpeg?auto=compress&cs=tinysrgb&w=100'
  },
  {
    id: '3',
    name: 'Joséphine',
    location: 'Schoelcher',
    rating: 5,
    comment: 'Service client impeccable et livraison rapide ! Mes bijoux créoles sont magnifiques et de très belle qualité. Merci Audie Boutique !',
    product: 'Parure Bijoux Créoles',
    avatar: 'https://images.pexels.com/photos/1536619/pexels-photo-1536619.jpeg?auto=compress&cs=tinysrgb&w=100'
  },
  {
    id: '4',
    name: 'Valérie',
    location: 'Saint-Pierre',
    rating: 5,
    comment: 'Une boutique qui comprend vraiment les femmes caribéennes ! Les tailles sont parfaites et le style correspond exactement à ce que je cherchais.',
    product: 'Ensemble Lingerie Dentelle',
    avatar: 'https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg?auto=compress&cs=tinysrgb&w=100'
  }
];

export const Testimonials: React.FC = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-20 bg-luxury-black relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-20 w-40 h-40 border border-luxury-red rounded-full" />
        <div className="absolute bottom-20 right-20 w-32 h-32 border border-luxury-red rounded-full" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-display font-bold text-luxury-white mb-4">
            Témoignages Clients
          </h2>
          <p className="text-lg text-luxury-gray-300 max-w-2xl mx-auto">
            Ce que nos clientes martiniquaises pensent d'Audie Boutique
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentTestimonial}
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -50, scale: 0.9 }}
              transition={{ duration: 0.6 }}
              className="bg-luxury-gray-900 rounded-4xl p-8 md:p-12 border border-luxury-gray-800 relative"
            >
              {/* Quote Icon */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
                className="absolute top-6 left-6 text-luxury-red/20"
              >
                <Quote className="w-12 h-12" />
              </motion.div>

              <div className="text-center">
                {/* Rating */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="flex justify-center mb-6"
                >
                  {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-6 h-6 text-yellow-400 fill-current mx-1"
                    />
                  ))}
                </motion.div>

                {/* Comment */}
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="text-luxury-white text-lg md:text-xl font-medium mb-8 leading-relaxed italic"
                >
                  "{testimonials[currentTestimonial].comment}"
                </motion.p>

                {/* Product */}
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="text-luxury-red text-sm font-medium mb-6"
                >
                  Produit acheté : {testimonials[currentTestimonial].product}
                </motion.p>

                {/* Customer Info */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 }}
                  className="flex items-center justify-center space-x-4"
                >
                  <img
                    src={testimonials[currentTestimonial].avatar}
                    alt={testimonials[currentTestimonial].name}
                    className="w-12 h-12 rounded-full object-cover border-2 border-luxury-red"
                  />
                  <div className="text-left">
                    <h4 className="text-luxury-white font-semibold">
                      {testimonials[currentTestimonial].name}
                    </h4>
                    <p className="text-luxury-gray-400 text-sm">
                      {testimonials[currentTestimonial].location}
                    </p>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Indicators */}
          <div className="flex justify-center mt-8 space-x-3">
            {testimonials.map((_, index) => (
              <motion.button
                key={index}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setCurrentTestimonial(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentTestimonial ? 'bg-luxury-red' : 'bg-luxury-gray-600'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};