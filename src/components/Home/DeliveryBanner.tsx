import React from 'react'
import { motion } from 'framer-motion'
import { Truck, MapPin, Clock } from 'lucide-react'

export const DeliveryBanner: React.FC = () => {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className='py-6 bg-gradient-to-r from-luxury-red to-red-700 relative overflow-hidden'
    >
      {/* Background Pattern */}
      <div className='absolute inset-0 opacity-10'>
        <div className='absolute top-0 left-0 w-32 h-32 bg-luxury-white rounded-full -translate-x-16 -translate-y-16' />
        <div className='absolute bottom-0 right-0 w-24 h-24 bg-luxury-white rounded-full translate-x-12 translate-y-12' />
      </div>

      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10'>
        <div className='flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-8'>
          {/* Main Message */}
          <motion.div
            initial={{ x: -20, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className='flex items-center space-x-3'
          >
            <motion.div
              animate={{
                y: [0, -5, 0],
                rotate: [0, 5, 0]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut'
              }}
              className='bg-luxury-white/20 p-2 rounded-full'
            >
              <Truck className='w-6 h-6 text-luxury-white' />
            </motion.div>
            <div>
              <h3 className='text-luxury-white font-bold text-lg md:text-xl'>
                Livraison gratuite dès 80€ d'achat
              </h3>
              <p className='text-luxury-white/90 text-sm'>Partout dans le monde !</p>
            </div>
          </motion.div>

          {/* Additional Info */}
          <motion.div
            initial={{ x: 20, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className='flex items-center space-x-6'
          >
            <div className='flex items-center space-x-2'>
              <MapPin className='w-4 h-4 text-luxury-white/80' />
              <span className='text-luxury-white/90 text-sm'>
                Partout dans le monde
              </span>
            </div>
            <div className='flex items-center space-x-2'>
              <Clock className='w-4 h-4 text-luxury-white/80' />
              <span className='text-luxury-white/90 text-sm'>
                Livraison entre 2 à 10 jours
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  )
}
