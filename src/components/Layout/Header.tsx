import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ShoppingBag, User, Search, Menu, X } from 'lucide-react'
import { useCartStore } from '../../store/useCartStore'
import { useAuthStore } from '../../store/useAuthStore'
import Logo from '../../images/logo_blanc.png'
import { subscribeNotificationUser } from '../../lib/notificationSubscription'
import { useProductStore } from '../../store/useProductStore'

export const Header: React.FC = () => {
  const location = useLocation()
  const { toggleCart, getTotalItems } = useCartStore()
  const { user } = useAuthStore()
  const totalItems = getTotalItems()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { products } = useProductStore()
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [searchResults, setSearchResults] = useState<any[]>([])

  const handleSearch = async (term: string) => {
    setSearchTerm(term)
    if (term.trim() === '') {
      setSearchResults([])
      return
    }
    const allProducts = products // récupère tous les produits
    const filtered = allProducts.filter(p =>
      p.name.toLowerCase().includes(term.toLowerCase())
    )
    setSearchResults(filtered)
  }

  const navigationItems = [
    { name: 'Accueil', path: '/' },
    { name: 'Boutique', path: '/shop' },
    { name: 'Nouveautés', path: '/shop/tags/nouveautes' },
    { name: 'Soldes', path: '/shop/tags/soldes' },
    { name: 'Contact', path: '/contact' }
  ]

  useEffect(() => {
    if (user) {
      subscribeNotificationUser(user.id)
    }
  }, [])

  return (
    <>
      <motion.header
        className='bg-luxury-black/95 backdrop-blur-luxury border-b border-luxury-gray-800 sticky top-0 z-50'
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='flex items-center justify-between h-20'>
            {/* Logo */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              transition={{ type: 'spring', stiffness: 400, damping: 17 }}
            >
              <Link to='/' className='flex items-center'>
                <img
                  src={Logo}
                  alt='Audie Boutique Logo'
                  className='h-10 w-auto mr-2'
                />
                {/*
                <span className='text-luxury-white font-display font-bold text-2xl lg:text-3xl tracking-wide'>
                  Audie Boutique
                </span>
              */}
              </Link>
            </motion.div>

            {/* Navigation Desktop */}
            <nav className='hidden lg:flex space-x-8'>
              {navigationItems.map(item => (
                <motion.div
                  key={item.name}
                  whileHover={{ y: -2 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                >
                  <Link
                    to={item.path}
                    className={`relative px-3 py-2 text-sm font-medium transition-colors duration-300 ${
                      location.pathname === item.path
                        ? 'text-luxury-red'
                        : 'text-luxury-white hover:text-luxury-red'
                    }`}
                  >
                    {item.name}
                    {location.pathname === item.path && (
                      <motion.div
                        className='absolute bottom-0 left-0 right-0 h-0.5 bg-luxury-red'
                        layoutId='activeTab'
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{
                          type: 'spring',
                          stiffness: 400,
                          damping: 40
                        }}
                      />
                    )}
                  </Link>
                </motion.div>
              ))}
            </nav>

            {/* Actions */}
            <div className='flex items-center space-x-4'>
              {/* Search */}
              <motion.button
                onClick={() => setIsSearchOpen(true)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className='p-2 text-luxury-white hover:text-luxury-red transition-colors duration-200'
              >
                <Search className='h-5 w-5' />
              </motion.button>

              {/* User Account */}
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  to={user ? '/account' : '/login'}
                  className='p-2 text-luxury-white hover:text-luxury-red transition-colors duration-200'
                >
                  <User className='h-5 w-5' />
                </Link>
              </motion.div>

              {/* Cart */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  toggleCart()
                }}
                className='relative p-2 text-luxury-white hover:text-luxury-red transition-colors duration-200'
              >
                <Link to='/cart' className='flex items-center'>
                  <ShoppingBag className='h-5 w-5' />
                  {totalItems > 0 && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className='absolute -top-1 -right-1 bg-luxury-red text-luxury-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium'
                    >
                      {totalItems}
                    </motion.span>
                  )}
                </Link>
              </motion.button>

              {/* Mobile Menu Button */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className='lg:hidden p-2 text-luxury-white hover:text-luxury-red transition-colors duration-200'
              >
                {isMenuOpen ? (
                  <X className='h-6 w-6' />
                ) : (
                  <Menu className='h-6 w-6' />
                )}
              </motion.button>
            </div>
          </div>

          {/* Mobile Menu */}
          <AnimatePresence>
            {isMenuOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className='lg:hidden border-t border-luxury-gray-800'
              >
                <nav className='py-4 space-y-2'>
                  {navigationItems.map(item => (
                    <Link
                      key={item.name}
                      to={item.path}
                      onClick={() => setIsMenuOpen(false)}
                      className={`block px-4 py-2 text-sm font-medium transition-colors duration-200 ${
                        location.pathname === item.path
                          ? 'text-luxury-red bg-luxury-gray-900'
                          : 'text-luxury-white hover:text-luxury-red hover:bg-luxury-gray-900'
                      }`}
                    >
                      {item.name}
                    </Link>
                  ))}
                </nav>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.header>

      <AnimatePresence>
        {isSearchOpen && (
          <motion.div
            className='fixed inset-0 bg-black/40 flex justify-center z-50 p-4 pt-10 sm:items-center'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className='bg-white w-full max-w-lg p-6 rounded-xl shadow-lg relative'
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
            >
              <button
                onClick={() => {
                  setSearchTerm('')
                  setIsSearchOpen(false)
                }}
                // MODIFIÉ : Ajout de classes pour le fond gris, l'arrondi, le centrage (flex) et le redimensionnement du bouton.
                className='absolute top-0 right-0 text-gray-700 hover:text-gray-900 bg-gray-200 hover:bg-gray-300 rounded-full w-8 h-8 flex items-center justify-center transition-colors duration-150'
              >
                <X className='w-4 h-4' />{' '}
                {/* L'icône X est légèrement réduite (w-4 h-4) pour mieux s'intégrer au cercle de 8x8 */}
              </button>

              <input
                type='text'
                value={searchTerm}
                onChange={e => handleSearch(e.target.value)}
                placeholder='Rechercher un article...'
                className='w-full border border-gray-300 rounded-lg p-3 mt-5 mb-4 focus:outline-none focus:ring-2 focus:ring-luxury-red'
              />

              <div className='max-h-96 overflow-y-auto'>
                {searchResults.length > 0 ? (
                  searchResults.map(product => (
                    <Link
                      onClick={() => setIsSearchOpen(false)}
                      title={`${product.name}`}
                      to={`/product/${product.id}`}
                      key={product.id}
                      className='flex items-center justify-between mb-4 mt-4 border-b pb-2'
                    >
                      <div className='flex flex-col mr-4'>
                        <h3 className='text-gray-900 font-semibold'>
                          {product.name}
                        </h3>
                        <p className='text-gray-500 text-sm line-clamp-2'>
                          {product.description}
                        </p>
                      </div>
                      <img
                        src={product.images[0]}
                        alt={product.name}
                        className='w-20 h-20 object-cover rounded-lg'
                      />
                    </Link>
                  ))
                ) : (
                  <p className='text-gray-400 text-center mt-5'>
                    {searchTerm.length > 0
                      ? 'Aucun article trouvé'
                      : 'Rechercher...'}
                  </p>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
