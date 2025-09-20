// src/pages/Cart.tsx
import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft, ShoppingBag } from 'lucide-react'
import { Link } from 'react-router-dom'
import { SEO } from '../components/ui/SEO'
import { CartItem } from '../components/Cart/CartItem'
import { OrderSummary } from '../components/Cart/OrderSummary'
import { EmptyCart } from '../components/Cart/EmptyCart'
import { AuthSection } from '../components/Cart/AuthSection'
import { useCartStore } from '../store/useCartStore'
import { useAuthStore } from '../store/useAuthStore'

export const Cart: React.FC = () => {
  // Utilisez le store Zustand pour gérer l'état du panier
  const cartStore = useCartStore()
  const { user, isAuthenticated } = useAuthStore()
  const [isCheckoutLoading, setIsCheckoutLoading] = useState(false)

  // Accédez directement aux données du store
  const cartItems = cartStore.items
  const itemCount = cartStore.getTotalItems()
  const subtotal = cartStore.calculateTotal() // Appeler cette fonction pour obtenir le sous-total

  // Le prix de la livraison est maintenant calculé sur le sous-total du store
  const shipping = subtotal >= 80 ? 0 : 5.99
  const total = subtotal + shipping

  // Fonctions pour interagir avec le store
  const handleUpdateQuantity = (id: string, quantity: number) => {
    cartStore.updateQuantity(id, quantity)
  }

  const handleRemoveItem = (id: string) => {
    cartStore.removeItem(id)
  }

  const handleMoveToWishlist = (id: string) => {
    // Note: L'intégration de la wishlist n'est pas dans le store actuel,
    // mais vous pouvez implémenter cette logique ici.
    console.log('Move to wishlist:', id)
    cartStore.removeItem(id)
  }

  // Logique de paiement
  const handleCheckout = async () => {
    setIsCheckoutLoading(true)
    try {
      // Intégration Stripe ou autre passerelle de paiement
      console.log('Proceeding to checkout with items from Zustand store:', {
        items: cartItems,
        total,
        user: isAuthenticated ? user : null
      })
      await new Promise(resolve => setTimeout(resolve, 2000))
    } catch (error) {
      console.error('Checkout error:', error)
    } finally {
      setIsCheckoutLoading(false)
    }
  }

  // Fonctions d'authentification (restent inchangées)
  const handleLogin = async (email: string, password: string) => {
    console.log('Login:', { email, password })
  }

  const handleRegister = async (
    email: string,
    password: string,
    name: string
  ) => {
    console.log('Register:', { email, password, name })
  }

  const handleGoogleLogin = async () => {
    console.log('Google login')
  }

  const handleContinueAsGuest = () => {
    console.log('Continue as guest')
  }

  // Rendu conditionnel pour le panier vide
  if (cartItems.length === 0) {
    return (
      <>
        <SEO
          title='Panier'
          description='Votre panier Audie Boutique. Découvrez nos dernières nouveautés de mode féminine premium.'
          keywords='panier, commande, audie boutique, mode féminine, lingerie, martinique'
        />
        <div className='min-h-screen bg-luxury-gray-50 pt-20'>
          <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
            <EmptyCart />
          </div>
        </div>
      </>
    )
  }

  // Rendu du panier plein
  return (
    <>
      <SEO
        title='Panier'
        description={`Votre panier contient ${itemCount} article${
          itemCount > 1 ? 's' : ''
        } pour un total de ${total.toFixed(
          2
        )}€. Finalisez votre commande Audie Boutique.`}
        keywords='panier, commande, checkout, audie boutique, mode féminine, paiement sécurisé'
      />

      <div className='min-h-screen bg-luxury-gray-50 pt-20'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className='flex items-center justify-between mb-8'
          >
            <div className='flex items-center space-x-4'>
              <Link
                to='/shop'
                className='flex items-center space-x-2 text-luxury-gray-600 hover:text-luxury-red transition-colors duration-200'
              >
                <ArrowLeft className='w-5 h-5' />
                <span>Continuer mes achats</span>
              </Link>
            </div>

            <div className='flex items-center space-x-3'>
              <ShoppingBag className='w-6 h-6 text-luxury-red' />
              <h1 className='text-3xl font-display font-bold text-luxury-black'>
                Mon Panier
              </h1>
              <span className='bg-luxury-red text-luxury-white text-sm font-medium px-3 py-1 rounded-full'>
                {itemCount}
              </span>
            </div>
          </motion.div>

          {/* Main Content */}
          <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
            {/* Cart Items */}
            <div className='lg:col-span-2 space-y-6'>
              <AuthSection
                isLoggedIn={isAuthenticated}
                user={
                  user
                    ? {
                        name: user.user_metadata?.first_name || 'Utilisateur',
                        email: user.email || ''
                      }
                    : undefined
                }
                onLogin={handleLogin}
                onRegister={handleRegister}
                onGoogleLogin={handleGoogleLogin}
                onContinueAsGuest={handleContinueAsGuest}
              />

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <h2 className='text-xl font-semibold text-luxury-black mb-4'>
                  Articles dans votre panier ({itemCount})
                </h2>

                <div className='space-y-4'>
                  {cartItems.map((item, index) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <CartItem
                        item={{
                          id: item.id,
                          name: item.product.name,
                          price: parseFloat(item.product.price as string), // Assurez-vous que le prix est un nombre
                          originalPrice: item.product.original_price
                            ? parseFloat(item.product.original_price as string)
                            : null,
                          image: item.product.images[0],
                          size: item.selectedSize,
                          color: item.selectedColor,
                          quantity: item.quantity,
                          inStock: item.product.stock > 0
                        }}
                        onUpdateQuantity={handleUpdateQuantity}
                        onRemove={handleRemoveItem}
                        onMoveToWishlist={handleMoveToWishlist}
                      />
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Order Summary */}
            <div className='lg:col-span-1'>
              <OrderSummary
                subtotal={subtotal}
                shipping={shipping}
                total={total}
                itemCount={itemCount}
                onCheckout={handleCheckout}
                isLoading={isCheckoutLoading}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
