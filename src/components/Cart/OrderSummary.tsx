import React from 'react';
import { motion } from 'framer-motion';
import { Truck, Tag, Shield, CreditCard } from 'lucide-react';

interface OrderSummaryProps {
  subtotal: number;
  shipping: number;
  discount?: number;
  total: number;
  itemCount: number;
  onCheckout: () => void;
  isLoading?: boolean;
}

export const OrderSummary: React.FC<OrderSummaryProps> = ({
  subtotal,
  shipping,
  discount = 0,
  total,
  itemCount,
  onCheckout,
  isLoading = false
}) => {
  const freeShippingThreshold = 80;
  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - subtotal);

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="bg-luxury-white rounded-2xl p-6 shadow-luxury border border-luxury-gray-100 sticky top-24"
    >
      <h2 className="text-2xl font-display font-bold text-luxury-black mb-6">
        Résumé de la commande
      </h2>

      {/* Free Shipping Progress */}
      {remainingForFreeShipping > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-luxury-red/10 to-luxury-red/5 p-4 rounded-xl mb-6 border border-luxury-red/20"
        >
          <div className="flex items-center space-x-2 mb-2">
            <Truck className="w-5 h-5 text-luxury-red" />
            <span className="text-sm font-medium text-luxury-red">
              Plus que {remainingForFreeShipping.toFixed(2)}€ pour la livraison gratuite !
            </span>
          </div>
          <div className="w-full bg-luxury-gray-200 rounded-full h-2">
            <div
              className="bg-luxury-red h-2 rounded-full transition-all duration-500"
              style={{ width: `${Math.min(100, (subtotal / freeShippingThreshold) * 100)}%` }}
            />
          </div>
        </motion.div>
      )}

      {/* Order Details */}
      <div className="space-y-4 mb-6">
        <div className="flex justify-between items-center">
          <span className="text-luxury-gray-600">
            Sous-total ({itemCount} article{itemCount > 1 ? 's' : ''})
          </span>
          <span className="font-semibold text-luxury-black">
            {subtotal.toFixed(2)}€
          </span>
        </div>

        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Truck className="w-4 h-4 text-luxury-gray-500" />
            <span className="text-luxury-gray-600">Livraison</span>
          </div>
          <span className={`font-semibold ${shipping === 0 ? 'text-green-600' : 'text-luxury-black'}`}>
            {shipping === 0 ? 'Gratuite' : `${shipping.toFixed(2)}€`}
          </span>
        </div>

        {discount > 0 && (
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <Tag className="w-4 h-4 text-green-600" />
              <span className="text-luxury-gray-600">Remise</span>
            </div>
            <span className="font-semibold text-green-600">
              -{discount.toFixed(2)}€
            </span>
          </div>
        )}

        <div className="border-t border-luxury-gray-200 pt-4">
          <div className="flex justify-between items-center">
            <span className="text-lg font-bold text-luxury-black">Total</span>
            <span className="text-2xl font-bold text-luxury-red">
              {total.toFixed(2)}€
            </span>
          </div>
          <p className="text-sm text-luxury-gray-500 mt-1">TVA incluse</p>
        </div>
      </div>

      {/* Checkout Button */}
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={onCheckout}
        disabled={isLoading}
        className={`w-full py-4 rounded-2xl font-semibold text-lg transition-all duration-300 flex items-center justify-center space-x-2 ${
          isLoading
            ? 'bg-luxury-gray-300 text-luxury-gray-500 cursor-not-allowed'
            : 'bg-luxury-red text-luxury-white hover:bg-red-700 shadow-luxury-red'
        }`}
      >
        <CreditCard className="w-5 h-5" />
        <span>{isLoading ? 'Traitement...' : 'Procéder au paiement'}</span>
      </motion.button>

      {/* Security Info */}
      <div className="mt-6 space-y-3">
        <div className="flex items-center space-x-3 text-sm text-luxury-gray-600">
          <Shield className="w-4 h-4 text-green-600" />
          <span>Paiement 100% sécurisé</span>
        </div>
        <div className="flex items-center space-x-3 text-sm text-luxury-gray-600">
          <Truck className="w-4 h-4 text-luxury-red" />
          <span>Livraison sous 48h en Martinique</span>
        </div>
      </div>

      {/* Payment Methods */}
      <div className="mt-6 pt-6 border-t border-luxury-gray-200">
        <p className="text-sm text-luxury-gray-600 mb-3">Moyens de paiement acceptés :</p>
        <div className="flex items-center space-x-2">
          {['Visa', 'Mastercard', 'PayPal', 'Apple Pay'].map((method) => (
            <div
              key={method}
              className="bg-luxury-gray-100 text-luxury-gray-700 px-2 py-1 rounded text-xs font-medium"
            >
              {method}
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};