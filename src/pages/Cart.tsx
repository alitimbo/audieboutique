import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, ShoppingBag } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SEO } from '../components/ui/SEO';
import { CartItem, CartItemData } from '../components/Cart/CartItem';
import { OrderSummary } from '../components/Cart/OrderSummary';
import { EmptyCart } from '../components/Cart/EmptyCart';
import { AuthSection } from '../components/Cart/AuthSection';
import { useCartStore } from '../store/useCartStore';
import { useAuthStore } from '../store/useAuthStore';

// Mock cart data for demonstration
const mockCartItems: CartItemData[] = [
  {
    id: '1',
    name: 'Ensemble Lingerie Dentelle Rouge Passion Premium',
    price: 89.99,
    originalPrice: 119.99,
    image: 'https://images.pexels.com/photos/1926769/pexels-photo-1926769.jpeg?auto=compress&cs=tinysrgb&w=300',
    size: 'M',
    color: 'Rouge',
    quantity: 1,
    inStock: true
  },
  {
    id: '2',
    name: 'Robe Wax Traditionnelle Moderne',
    price: 125.00,
    image: 'https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg?auto=compress&cs=tinysrgb&w=300',
    size: 'L',
    color: 'Multicolore',
    quantity: 2,
    inStock: true
  },
  {
    id: '3',
    name: 'Corset Sculptant Premium Noir',
    price: 75.00,
    image: 'https://images.pexels.com/photos/1536619/pexels-photo-1536619.jpeg?auto=compress&cs=tinysrgb&w=300',
    size: 'S',
    color: 'Noir',
    quantity: 1,
    inStock: true
  }
];

export const Cart: React.FC = () => {
  const [cartItems, setCartItems] = useState<CartItemData[]>(mockCartItems);
  const [isCheckoutLoading, setIsCheckoutLoading] = useState(false);
  const { user, isAuthenticated } = useAuthStore();

  // Calculate totals
  const { subtotal, shipping, total, itemCount } = useMemo(() => {
    const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const itemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
    const shipping = subtotal >= 80 ? 0 : 5.99;
    const total = subtotal + shipping;

    return { subtotal, shipping, total, itemCount };
  }, [cartItems]);

  const handleUpdateQuantity = (id: string, quantity: number) => {
    setCartItems(items =>
      items.map(item =>
        item.id === id ? { ...item, quantity } : item
      )
    );
  };

  const handleRemoveItem = (id: string) => {
    setCartItems(items => items.filter(item => item.id !== id));
  };

  const handleMoveToWishlist = (id: string) => {
    // Implementation for moving to wishlist
    console.log('Move to wishlist:', id);
    handleRemoveItem(id);
  };

  const handleCheckout = async () => {
    setIsCheckoutLoading(true);
    
    try {
      // Here you would integrate with Stripe
      console.log('Proceeding to Stripe checkout with:', {
        items: cartItems,
        total,
        user: isAuthenticated ? user : null
      });
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Redirect to Stripe Checkout would happen here
      // window.location.href = stripeCheckoutUrl;
      
    } catch (error) {
      console.error('Checkout error:', error);
    } finally {
      setIsCheckoutLoading(false);
    }
  };

  const handleLogin = async (email: string, password: string) => {
    // Implementation for login
    console.log('Login:', { email, password });
  };

  const handleRegister = async (email: string, password: string, name: string) => {
    // Implementation for register
    console.log('Register:', { email, password, name });
  };

  const handleGoogleLogin = async () => {
    // Implementation for Google login
    console.log('Google login');
  };

  const handleContinueAsGuest = () => {
    // Implementation for guest checkout
    console.log('Continue as guest');
  };

  if (cartItems.length === 0) {
    return (
      <>
        <SEO
          title="Panier"
          description="Votre panier Audie Boutique. Découvrez nos dernières nouveautés de mode féminine premium."
          keywords="panier, commande, audie boutique, mode féminine, lingerie, martinique"
        />
        
        <div className="min-h-screen bg-luxury-gray-50 pt-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <EmptyCart />
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <SEO
        title="Panier"
        description={`Votre panier contient ${itemCount} article${itemCount > 1 ? 's' : ''} pour un total de ${total.toFixed(2)}€. Finalisez votre commande Audie Boutique.`}
        keywords="panier, commande, checkout, audie boutique, mode féminine, paiement sécurisé"
      />
      
      <div className="min-h-screen bg-luxury-gray-50 pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-between mb-8"
          >
            <div className="flex items-center space-x-4">
              <Link
                to="/shop"
                className="flex items-center space-x-2 text-luxury-gray-600 hover:text-luxury-red transition-colors duration-200"
              >
                <ArrowLeft className="w-5 h-5" />
                <span>Continuer mes achats</span>
              </Link>
            </div>
            
            <div className="flex items-center space-x-3">
              <ShoppingBag className="w-6 h-6 text-luxury-red" />
              <h1 className="text-3xl font-display font-bold text-luxury-black">
                Mon Panier
              </h1>
              <span className="bg-luxury-red text-luxury-white text-sm font-medium px-3 py-1 rounded-full">
                {itemCount}
              </span>
            </div>
          </motion.div>

          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-6">
              {/* Auth Section */}
              <AuthSection
                isLoggedIn={isAuthenticated}
                user={user ? { name: user.user_metadata?.first_name || 'Utilisateur', email: user.email || '' } : undefined}
                onLogin={handleLogin}
                onRegister={handleRegister}
                onGoogleLogin={handleGoogleLogin}
                onContinueAsGuest={handleContinueAsGuest}
              />

              {/* Cart Items List */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <h2 className="text-xl font-semibold text-luxury-black mb-4">
                  Articles dans votre panier ({itemCount})
                </h2>
                
                <div className="space-y-4">
                  {cartItems.map((item, index) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <CartItem
                        item={item}
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
            <div className="lg:col-span-1">
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
  );
};