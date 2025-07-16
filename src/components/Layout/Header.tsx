import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShoppingBagIcon, UserIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { useCartStore } from '../../store/useCartStore';
import { useAuthStore } from '../../store/useAuthStore';

export const Header: React.FC = () => {
  const location = useLocation();
  const { toggleCart, getTotalItems } = useCartStore();
  const { user } = useAuthStore();
  const totalItems = getTotalItems();

  const navigationItems = [
    { name: 'Accueil', path: '/' },
    { name: 'Boutique', path: '/shop' },
    { name: 'Collections', path: '/collections' },
    { name: 'À propos', path: '/about' },
  ];

  return (
    <motion.header 
      className="bg-luxury-black/95 backdrop-blur-luxury border-b border-luxury-gray-800 sticky top-0 z-50"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            <Link to="/" className="flex items-center">
              <div className="bg-luxury-red w-8 h-8 rounded-lg flex items-center justify-center mr-3">
                <span className="text-luxury-white font-bold text-lg">L</span>
              </div>
              <span className="text-luxury-white font-display font-bold text-xl">
                LuxStore
              </span>
            </Link>
          </motion.div>

          {/* Navigation Desktop */}
          <nav className="hidden md:flex space-x-8">
            {navigationItems.map((item) => (
              <motion.div
                key={item.name}
                whileHover={{ y: -2 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <Link
                  to={item.path}
                  className={`relative px-3 py-2 text-sm font-medium transition-colors duration-200 ${
                    location.pathname === item.path
                      ? 'text-luxury-red'
                      : 'text-luxury-white hover:text-luxury-red'
                  }`}
                >
                  {item.name}
                  {location.pathname === item.path && (
                    <motion.div
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-luxury-red"
                      layoutId="activeTab"
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ type: "spring", stiffness: 400, damping: 40 }}
                    />
                  )}
                </Link>
              </motion.div>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center space-x-4">
            {/* Search */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="p-2 text-luxury-white hover:text-luxury-red transition-colors duration-200"
            >
              <MagnifyingGlassIcon className="h-5 w-5" />
            </motion.button>

            {/* User Account */}
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                to={user ? '/account' : '/auth'}
                className="p-2 text-luxury-white hover:text-luxury-red transition-colors duration-200"
              >
                <UserIcon className="h-5 w-5" />
              </Link>
            </motion.div>

            {/* Cart */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={toggleCart}
              className="relative p-2 text-luxury-white hover:text-luxury-red transition-colors duration-200"
            >
              <ShoppingBagIcon className="h-5 w-5" />
              {totalItems > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1 -right-1 bg-luxury-red text-luxury-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium"
                >
                  {totalItems}
                </motion.span>
              )}
            </motion.button>
          </div>
        </div>
      </div>
    </motion.header>
  );
};