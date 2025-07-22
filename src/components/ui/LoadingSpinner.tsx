import React from 'react'
import { motion } from 'framer-motion'

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg'
  color?: 'red' | 'white' | 'gray'
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = 'md',
  color = 'red'
}) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12'
  }

  const colorClasses = {
    red: 'border-luxury-red',
    white: 'border-luxury-white',
    gray: 'border-luxury-gray-400'
  }

  return (
    <motion.div
      className={`${sizeClasses[size]} ${colorClasses[color]} border-2 border-solid border-t-transparent rounded-full`}
      animate={{ rotate: 360 }}
      transition={{
        duration: 1,
        repeat: Infinity,
        ease: 'linear'
      }}
    />
  )
}

export const LoadingPage: React.FC = () => {
  return (
    <div className='min-h-screen bg-luxury-black flex items-center justify-center'>
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className='flex flex-col items-center gap-4'
      >
        <LoadingSpinner size='lg' color='red' />
        <p className='text-luxury-white font-medium text-lg'>Chargement...</p>
      </motion.div>
    </div>
  )
}
