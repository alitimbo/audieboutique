import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Mail, Lock, Eye, EyeOff, Chrome } from 'lucide-react';

interface AuthSectionProps {
  isLoggedIn: boolean;
  user?: { name: string; email: string };
  onLogin: (email: string, password: string) => Promise<void>;
  onRegister: (email: string, password: string, name: string) => Promise<void>;
  onGoogleLogin: () => Promise<void>;
  onContinueAsGuest: () => void;
}

export const AuthSection: React.FC<AuthSectionProps> = ({
  isLoggedIn,
  user,
  onLogin,
  onRegister,
  onGoogleLogin,
  onContinueAsGuest
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: ''
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      if (authMode === 'login') {
        await onLogin(formData.email, formData.password);
      } else {
        await onRegister(formData.email, formData.password, formData.name);
      }
    } catch (error) {
      console.error('Auth error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoggedIn && user) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-luxury-white rounded-2xl p-6 shadow-luxury border border-luxury-gray-100 mb-6"
      >
        <div className="flex items-center space-x-3">
          <div className="bg-luxury-red/10 p-2 rounded-full">
            <User className="w-5 h-5 text-luxury-red" />
          </div>
          <div>
            <h3 className="font-semibold text-luxury-black">Connecté en tant que</h3>
            <p className="text-luxury-gray-600">{user.name} • {user.email}</p>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-luxury-white rounded-2xl p-6 shadow-luxury border border-luxury-gray-100 mb-6"
    >
      {!isExpanded ? (
        <div className="text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <User className="w-5 h-5 text-luxury-red" />
            <h3 className="font-semibold text-luxury-black">Compte utilisateur</h3>
          </div>
          
          <p className="text-luxury-gray-600 mb-4 text-sm">
            Souhaitez-vous vous connecter pour un suivi facile de votre commande ?
          </p>
          
          <div className="flex flex-col sm:flex-row gap-3">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setIsExpanded(true)}
              className="flex-1 px-4 py-3 bg-luxury-red text-luxury-white rounded-xl font-medium hover:bg-red-700 transition-colors duration-200"
            >
              Se connecter
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={onContinueAsGuest}
              className="flex-1 px-4 py-3 border-2 border-luxury-gray-300 text-luxury-gray-700 rounded-xl font-medium hover:border-luxury-red hover:text-luxury-red transition-all duration-200"
            >
              Continuer sans compte
            </motion.button>
          </div>
        </div>
      ) : (
        <AnimatePresence mode="wait">
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Auth Mode Toggle */}
            <div className="flex bg-luxury-gray-100 rounded-xl p-1 mb-6">
              <button
                onClick={() => setAuthMode('login')}
                className={`flex-1 py-2 px-4 rounded-lg font-medium transition-all duration-200 ${
                  authMode === 'login'
                    ? 'bg-luxury-white text-luxury-red shadow-sm'
                    : 'text-luxury-gray-600'
                }`}
              >
                Connexion
              </button>
              <button
                onClick={() => setAuthMode('register')}
                className={`flex-1 py-2 px-4 rounded-lg font-medium transition-all duration-200 ${
                  authMode === 'register'
                    ? 'bg-luxury-white text-luxury-red shadow-sm'
                    : 'text-luxury-gray-600'
                }`}
              >
                Inscription
              </button>
            </div>

            {/* Google Login */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={onGoogleLogin}
              className="w-full flex items-center justify-center space-x-3 py-3 border-2 border-luxury-gray-300 rounded-xl font-medium text-luxury-gray-700 hover:border-luxury-red hover:text-luxury-red transition-all duration-200 mb-4"
            >
              <Chrome className="w-5 h-5" />
              <span>Continuer avec Google</span>
            </motion.button>

            <div className="relative mb-4">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-luxury-gray-200" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-luxury-white text-luxury-gray-500">ou</span>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {authMode === 'register' && (
                <div>
                  <label className="block text-sm font-medium text-luxury-gray-700 mb-2">
                    Nom complet
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-luxury-gray-400" />
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full pl-10 pr-4 py-3 border border-luxury-gray-300 rounded-xl focus:ring-2 focus:ring-luxury-red focus:border-transparent"
                      placeholder="Votre nom complet"
                      required
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-luxury-gray-700 mb-2">
                  Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-luxury-gray-400" />
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full pl-10 pr-4 py-3 border border-luxury-gray-300 rounded-xl focus:ring-2 focus:ring-luxury-red focus:border-transparent"
                    placeholder="votre@email.com"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-luxury-gray-700 mb-2">
                  Mot de passe
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-luxury-gray-400" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className="w-full pl-10 pr-12 py-3 border border-luxury-gray-300 rounded-xl focus:ring-2 focus:ring-luxury-red focus:border-transparent"
                    placeholder="••••••••"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-luxury-gray-400 hover:text-luxury-gray-600"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={isLoading}
                className={`w-full py-3 rounded-xl font-medium transition-all duration-200 ${
                  isLoading
                    ? 'bg-luxury-gray-300 text-luxury-gray-500 cursor-not-allowed'
                    : 'bg-luxury-red text-luxury-white hover:bg-red-700'
                }`}
              >
                {isLoading ? 'Traitement...' : authMode === 'login' ? 'Se connecter' : 'Créer un compte'}
              </motion.button>
            </form>

            <div className="mt-4 text-center">
              <button
                onClick={onContinueAsGuest}
                className="text-sm text-luxury-gray-600 hover:text-luxury-red transition-colors duration-200"
              >
                Ou continuer sans compte
              </button>
            </div>
          </motion.div>
        </AnimatePresence>
      )}
    </motion.div>
  );
};