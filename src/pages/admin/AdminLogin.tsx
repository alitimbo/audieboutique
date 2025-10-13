import React, { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { toast } from 'sonner'
import { Eye, EyeOff, Lock, Mail, Shield } from 'lucide-react'
import { useAuthStore } from '../../store/useAuthStore'

export const AdminLogin: React.FC = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const { adminSignIn } = useAuthStore()
  const navigate = useNavigate()

  type AdminSignInResponse = {
    role: 'agent' | 'admin'
    // add other properties if needed
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!email || !password) {
      toast.error('Veuillez remplir tous les champs')
      return
    }

    try {
      setIsLoading(true)
      const response = (await adminSignIn(email, password)) as
        | AdminSignInResponse
        | undefined
      if (response?.role === 'agent') {
        navigate('/admin/catalog')
      } else if (response?.role === 'admin') {
        navigate('/admin/dashboard')
      }

      setTimeout(() => window.location.reload(), 1000)
    } catch (error: any) {
      toast.error(error.message || 'Erreur lors de la connexion')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className='min-h-screen bg-gradient-to-br from-luxury-black via-gray-900 to-luxury-black flex items-center justify-center p-4'>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className='w-full max-w-md'
      >
        {/* Logo et titre */}
        <div className='text-center mb-8'>
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
            className='inline-flex items-center justify-center w-16 h-16 bg-luxury-gold/10 rounded-full mb-4'
          >
            <Shield className='w-8 h-8 text-luxury-gold' />
          </motion.div>
          <h1 className='text-3xl font-bold text-white mb-2'>Administration</h1>
          <p className='text-gray-400'>Accès réservé aux administrateurs</p>
        </div>

        {/* Formulaire */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className='bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 shadow-2xl'
        >
          <form onSubmit={handleSubmit} className='space-y-6'>
            {/* Email */}
            <div>
              <label
                htmlFor='email'
                className='block text-sm font-medium text-gray-300 mb-2'
              >
                Adresse email
              </label>
              <div className='relative'>
                <Mail className='absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400' />
                <input
                  id='email'
                  type='email'
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className='w-full pl-10 pr-4 py-3 bg-white/10 border border-white/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-luxury-gold focus:border-luxury-gold transition-all backdrop-blur-sm'
                  placeholder='admin@audieboutique.com'
                  required
                />
              </div>
            </div>

            {/* Mot de passe */}
            <div>
              <label
                htmlFor='password'
                className='block text-sm font-medium text-gray-300 mb-2'
              >
                Mot de passe
              </label>
              <div className='relative'>
                <Lock className='absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400' />
                <input
                  id='password'
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  className='w-full pl-10 pr-12 py-3 bg-white/10 border border-white/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-luxury-gold focus:border-luxury-gold transition-all backdrop-blur-sm'
                  placeholder='••••••••'
                  required
                />
                <button
                  type='button'
                  onClick={() => setShowPassword(!showPassword)}
                  className='absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors'
                >
                  {showPassword ? (
                    <EyeOff className='w-5 h-5' />
                  ) : (
                    <Eye className='w-5 h-5' />
                  )}
                </button>
              </div>
            </div>

            {/* Bouton de connexion */}
            <motion.button
              type='submit'
              disabled={isLoading}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className='w-full bg-accent-gold hover:bg-accent-gold/90 text-luxury-black font-semibold py-3 px-4 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl'
            >
              {isLoading ? 'Connexion...' : 'Se connecter'}
            </motion.button>

            {/* Lien mot de passe oublié */}
            <div className='text-center'>
              <Link
                to='/admin/reset-password'
                className='text-sm text-luxury-gold hover:text-luxury-gold/80 transition-colors'
              >
                Mot de passe oublié ?
              </Link>
            </div>
          </form>
        </motion.div>

        {/* Retour au site */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className='text-center mt-6'
        >
          <Link
            to='/'
            className='text-gray-400 hover:text-white transition-colors text-sm'
          >
            ← Retour au site
          </Link>
        </motion.div>
      </motion.div>
    </div>
  )
}

export default AdminLogin
