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
import { toast } from 'sonner'
import { CartServices } from '../services/cartServices'
import { useNavigate } from 'react-router-dom'
import { createCheckout } from '../lib/createCheckout'

export const Cart: React.FC = () => {
  // Utilisez le store Zustand pour gérer l'état du panier
  const navigate = useNavigate()
  const cartStore = useCartStore()
  const { user, isAuthenticated, signUp, signIn } = useAuthStore()
  const [isCheckoutLoading, setIsCheckoutLoading] = useState(false)
  const [checkoutError, setCheckoutError] = useState<string | null>(null)
  const [address, setAddress] = useState<string | null>(null)
  const [isShipping, setIsShipping] = useState<boolean>(true)

  // Accédez directement aux données du store
  const cartItems = cartStore.items
  const itemCount = cartStore.getTotalItems()
  const subtotal = cartStore.calculateTotal() // Appeler cette fonction pour obtenir le sous-total

  // Le prix de la livraison est maintenant calculé sur le sous-total du store
  const shipping = subtotal >= 80 ? 0 : 5.99
  const total = shipping ? subtotal + shipping : subtotal

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
    //console.log('Move to wishlist:', id)
    cartStore.removeItem(id)
  }

  const handleShipping = (ship: boolean) => {
    setIsShipping(ship)
  }

  //console.log(isShipping)

  // Logique de paiement
  const handleCheckout = async () => {
    if (!isAuthenticated) {
      setCheckoutError('Veuillez vous connecter ou créer un compte')
      setTimeout(() => setCheckoutError(null), 4000)
      return
    }
    if (isShipping === true && !address) {
      setCheckoutError(
        'Veuillez ajouter ou sélectionner une adresse de livraison'
      )
      setTimeout(() => setCheckoutError(null), 4000)
      return
    }
    setIsCheckoutLoading(true)
    try {
      // Intégration Stripe ou autre passerelle de paiement
      /*
      console.log('Proceeding to checkout with items from Zustand store:', {
        cartItems,
        itemCount,
        shipping,
        subtotal,
        total,
        address,
        user: isAuthenticated ? user?.id : null
      })
        */
      if (user?.id) {
        const response = await CartServices.checkout(
          user.id,
          address,
          cartItems,
          itemCount,
          shipping,
          subtotal,
          total,
          isShipping
        )
        if (response.success) {
          //Logique ouverture du checkout
          const data = response.data
          const totalAmount = data.order_details.total
          await createCheckout(data.id, data.user_id, totalAmount)
        }
      }
    } catch (error) {
      console.error('Checkout error:', error)
    } finally {
      setIsCheckoutLoading(false)
    }
  }

  // Fonctions d'authentification (restent inchangées)
  const handleLogin = async (email: string, password: string) => {
    //console.log('Login:', { email, password })
    try {
      await signIn(email, password)
      toast.success('Connexion réussie !')
    } catch (error) {
      toast.error('Échec de la connexion. Vérifiez vos identifiants.')
      console.error('Login error:', error)
    }
  }

  const handleRegister = async (
    email: string,
    password: string,
    name: string
  ) => {
    try {
      await signUp(email, password, { full_name: name })
      toast.success('Inscription réussie ! Vous êtes maintenant connecté.')
    } catch (error) {
      // 1. Déterminer le message d'erreur
      let errorMessage =
        "Une erreur inconnue est survenue lors de l'inscription."

      if (error && typeof error === 'object' && 'message' in error) {
        // Si c'est une erreur Supabase ou une erreur standard avec une propriété 'message'
        errorMessage = (error as { message: string }).message // 2. Adapter le message pour l'utilisateur (optionnel mais recommandé)
        if (errorMessage.includes('at least 6 characters')) {
          errorMessage = 'Le mot de passe doit contenir au moins 6 caractères.'
        } else if (errorMessage.includes('already registered')) {
          errorMessage = 'Cette adresse e-mail est déjà enregistrée.'
        } // Ajoutez d'autres traductions si nécessaire
      } // 3. Afficher le message d'erreur spécifique
      toast.error(`Erreur: ${errorMessage}`) // 4. Afficher l'erreur complète dans la console pour le débogage
      console.error('Registration error:', error)
    }
  }

  const handleGoogleLogin = async () => {
    console.log('Google login')
  }

  const handleContinueAsGuest = () => {
    console.log('Continue as guest')
  }

  const handleSelectedAddress = (id: string) => {
    setAddress(id)
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
                        id: user.id,
                        name: user.user_metadata?.full_name || 'Utilisateur',
                        email: user.email || ''
                      }
                    : undefined
                }
                onLogin={handleLogin}
                onRegister={handleRegister}
                onGoogleLogin={handleGoogleLogin}
                onContinueAsGuest={handleContinueAsGuest}
                onSelectedAddress={handleSelectedAddress}
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
                          productId: item.productId,
                          name: item.product.name,
                          price: parseFloat(item.product.price as string), // Assurez-vous que le prix est un nombre
                          original_price: item.product.original_price
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
                onError={checkoutError}
                isLoading={isCheckoutLoading}
                onShipping={handleShipping}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
