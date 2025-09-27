import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { User, Lock, LogOut, Heart, ShoppingBag, Loader2 } from 'lucide-react'
import { Link, Navigate } from 'react-router-dom'
import { SEO } from '../components/ui/SEO'
import { toast } from 'sonner'
import { useAuthStore } from '../store/useAuthStore'
import { orderService, Order } from '../lib/supabase' // Assurez-vous que orderService et Order sont exportés correctement

// --- Composants Helpers pour la Structure et le Style ---

// En-tête de section stylisé comme dans Cart.tsx
const SectionHeader: React.FC<{ icon: React.ReactNode; title: string }> = ({
  icon,
  title
}) => (
  <div className='flex items-center space-x-3 mb-6'>
    <span className='text-luxury-red'>{icon}</span>
    <h2 className='text-2xl font-semibold font-display text-luxury-black'>
      {title}
    </h2>
  </div>
)

// Bouton de soumission stylisé
const SubmitButton: React.FC<{
  children: React.ReactNode
  isLoading: boolean
  disabled: boolean
}> = ({ children, isLoading, disabled }) => (
  <motion.button
    whileHover={{ scale: 1.01 }}
    whileTap={{ scale: 0.99 }}
    type='submit'
    disabled={isLoading || disabled}
    className={`w-full py-3 rounded-xl font-medium transition-all duration-200 flex items-center justify-center space-x-2 ${
      isLoading || disabled
        ? 'bg-luxury-gray-300 text-luxury-gray-500 cursor-not-allowed'
        : 'bg-luxury-red text-luxury-white hover:bg-red-700'
    }`}
  >
    {isLoading && <Loader2 className='w-5 h-5 animate-spin' />}
    <span>{isLoading ? 'Chargement...' : children}</span>
  </motion.button>
)

// --- Composants pour les Sections Spécifiques ---

const ProfileUpdateForm: React.FC = () => {
  const { user, profile, updateFullName } = useAuthStore()
  const [newFullName, setNewFullName] = useState(
    profile?.full_name || user?.user_metadata?.full_name || ''
  )
  const [formLoading, setFormLoading] = useState(false)

  const handleUpdateFullName = async (e: React.FormEvent) => {
    e.preventDefault()
    if (
      !user ||
      newFullName === (profile?.full_name || user?.user_metadata?.full_name)
    )
      return // Ne rien faire si inchangé

    setFormLoading(true)
    try {
      await updateFullName(user.id, newFullName)
      toast.success('Nom complet mis à jour avec succès !')
    } catch (error) {
      console.error('Update full name error:', error)
      toast.error('Erreur lors de la mise à jour du nom. Veuillez réessayer.')
    } finally {
      setFormLoading(false)
    }
  }

  return (
    <form onSubmit={handleUpdateFullName} className='space-y-4 max-w-md'>
      <div>
        <label
          htmlFor='fullName'
          className='block text-sm font-medium text-luxury-gray-700 mb-1'
        >
          Nom Complet
        </label>
        <input
          id='fullName'
          type='text'
          value={newFullName}
          onChange={e => setNewFullName(e.target.value)}
          className='w-full px-4 py-2 border border-luxury-gray-300 rounded-xl focus:ring-2 focus:ring-luxury-red focus:border-transparent'
          placeholder='Votre nom complet'
          required
          disabled={formLoading}
        />
      </div>
      <SubmitButton isLoading={formLoading} disabled={!newFullName.trim()}>
        Mettre à jour le nom
      </SubmitButton>
    </form>
  )
}

const PasswordUpdateForm: React.FC = () => {
  const { updatePassword } = useAuthStore()
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [formLoading, setFormLoading] = useState(false)

  const isPasswordValid = newPassword.length >= 6
  const passwordsMatch = newPassword === confirmPassword

  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!passwordsMatch) {
      toast.error('Les mots de passe ne correspondent pas.')
      return
    }
    if (!isPasswordValid) {
      toast.error(
        'Le nouveau mot de passe doit contenir au moins 6 caractères.'
      )
      return
    }

    setFormLoading(true)
    try {
      await updatePassword(newPassword)
      setNewPassword('')
      setConfirmPassword('')
      toast.success('Mot de passe mis à jour avec succès !')
    } catch (error) {
      console.error('Update password error:', error)
      toast.error('Erreur lors de la mise à jour du mot de passe.')
    } finally {
      setFormLoading(false)
    }
  }

  return (
    <form onSubmit={handleUpdatePassword} className='space-y-4 max-w-md'>
      <div>
        <label
          htmlFor='newPassword'
          className='block text-sm font-medium text-luxury-gray-700 mb-1'
        >
          Nouveau Mot de Passe (6+ caractères)
        </label>
        <input
          id='newPassword'
          type='password'
          value={newPassword}
          onChange={e => setNewPassword(e.target.value)}
          className='w-full px-4 py-2 border border-luxury-gray-300 rounded-xl focus:ring-2 focus:ring-luxury-red focus:border-transparent'
          placeholder='Nouveau mot de passe'
          required
          disabled={formLoading}
        />
        {!isPasswordValid && newPassword.length > 0 && (
          <p className='text-xs text-luxury-red mt-1'>6 caractères minimum.</p>
        )}
      </div>

      <div>
        <label
          htmlFor='confirmPassword'
          className='block text-sm font-medium text-luxury-gray-700 mb-1'
        >
          Confirmer le Nouveau Mot de Passe
        </label>
        <input
          id='confirmPassword'
          type='password'
          value={confirmPassword}
          onChange={e => setConfirmPassword(e.target.value)}
          className='w-full px-4 py-2 border border-luxury-gray-300 rounded-xl focus:ring-2 focus:ring-luxury-red focus:border-transparent'
          placeholder='Confirmer le mot de passe'
          required
          disabled={formLoading}
        />
        {!passwordsMatch && confirmPassword.length > 0 && (
          <p className='text-xs text-luxury-red mt-1'>
            Les mots de passe ne correspondent pas.
          </p>
        )}
      </div>

      <SubmitButton
        isLoading={formLoading}
        disabled={!isPasswordValid || !passwordsMatch}
      >
        Changer le mot de passe
      </SubmitButton>
    </form>
  )
}

const OrderHistory: React.FC<{ userId: string }> = ({ userId }) => {
  const [orders, setOrders] = useState<any[] | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  console.log(orders)

  useEffect(() => {
    const fetchOrders = async () => {
      if (!userId) {
        setLoading(false)
        return
      }
      try {
        const fetchedOrders = await orderService.getByUserId(userId)
        setOrders(fetchedOrders)
      } catch (err) {
        console.error('Error fetching orders:', err)
        setError(
          "Impossible de charger l'historique des commandes. Vérifiez vos permissions RLS."
        )
      } finally {
        setLoading(false)
      }
    }
    fetchOrders()
  }, [userId])

  if (loading) {
    return (
      <div className='flex items-center justify-center p-8 bg-luxury-gray-100 rounded-xl'>
        <Loader2 className='w-6 h-6 animate-spin text-luxury-red' />
        <span className='ml-2 text-luxury-gray-600'>
          Chargement des commandes...
        </span>
      </div>
    )
  }

  if (error) {
    return (
      <p className='text-luxury-red p-4 bg-red-50 border border-luxury-red rounded-xl'>
        {error}
      </p>
    )
  }

  if (!orders || orders.length === 0) {
    return (
      <p className='text-luxury-gray-600 p-4 bg-luxury-gray-100 rounded-xl'>
        Vous n'avez pas encore passé de commande.
      </p>
    )
  }

  const getStatusColor = (status: Order['status']) => {
    switch (status) {
      case 'delivered':
        return 'bg-green-100 text-green-800 border-green-300'
      case 'shipped':
        return 'bg-blue-100 text-blue-800 border-blue-300'
      case 'processing':
        return 'bg-yellow-100 text-yellow-800 border-yellow-300'
      case 'cancelled':
        return 'bg-red-100 text-red-800 border-red-300'
      default:
        return 'bg-luxury-gray-100 text-luxury-gray-600 border-luxury-gray-300'
    }
  }

  const frenchStatus = (status: Order['status']) => {
    switch (status) {
      case 'delivered':
        return 'Livré'
      case 'shipped':
        return 'Expédié' // Corrigé : ajout de l'accent aigu
      case 'processing':
        return 'En cours de traitement' // Plus précis que 'En cours'
      case 'cancelled':
        return 'Annulée'
      default:
        return 'En attente' // Corrigé : 'En attente'
    }
  }

  return (
    <div className='space-y-4'>
      {orders.length > 0
        ? orders.map(order => (
            <div
              key={order.id}
              className='bg-luxury-white p-6 rounded-xl shadow-md border border-luxury-gray-100 transition-shadow hover:shadow-lg'
            >
              <div className='flex justify-between items-start mb-3'>
                <div>
                  <p className='text-sm font-medium text-luxury-gray-500'>
                    Commande #{order.id.substring(0, 8)}
                  </p>
                  <p className='text-lg font-bold text-luxury-black'>
                    {order.order_details.total.toFixed(2)} €
                  </p>
                </div>
                <span
                  className={`text-xs font-semibold px-3 py-1 rounded-full border ${getStatusColor(
                    order.status
                  )}`}
                >
                  {frenchStatus(order.status)}
                </span>
              </div>
              <p className='text-sm text-luxury-gray-500 mb-2'>
                Passée le:{' '}
                {new Date(order.created_at).toLocaleDateString('fr-FR')}
              </p>
              <div className='text-sm space-y-1 pt-3 border-t border-luxury-gray-100'>
                <p className='font-semibold'>
                  Articles ({order.order_details.cartItems.length}) :
                </p>
                <ul className='list-disc list-inside ml-2 text-luxury-gray-600'>
                  {order.order_details.cartItems
                    .slice(0, 3)
                    .map((item: any, index: number) => (
                      <li key={index} className='truncate'>
                        {item.quantity} x{' '}
                        {item.product?.name || 'Article inconnu'}
                      </li>
                    ))}
                  {order.order_details.cartItems.length > 3 && (
                    <li>... et {order.items.length - 3} autres articles.</li>
                  )}
                </ul>
              </div>
            </div>
          ))
        : null}
    </div>
  )
}

// --- Composant Principal de la Page Compte ---

export const Account: React.FC = () => {
  const { user, profile, signOut, isAuthenticated, isLoading } = useAuthStore()
  const [isSigningOut, setIsSigningOut] = useState(false)

  // Redirection si non authentifié
  if (!isAuthenticated && !isLoading) {
    toast.info('Veuillez vous connecter pour accéder à votre compte.')
    return <Navigate to='/cart' /> // Rediriger l'utilisateur vers le panier/login
  }

  // Affiche un état de chargement initial si l'authentification est en cours
  if (isLoading || !user) {
    return (
      <div className='min-h-screen bg-luxury-gray-50 pt-20 flex items-center justify-center'>
        <Loader2 className='w-10 h-10 animate-spin text-luxury-red' />
      </div>
    )
  }

  const handleSignOut = async () => {
    setIsSigningOut(true)
    try {
      await signOut()
      toast.success('Déconnexion réussie !')
    } catch (error) {
      console.error('Sign out error:', error)
      toast.error('Erreur lors de la déconnexion. Veuillez réessayer.')
    } finally {
      setIsSigningOut(false)
    }
  }

  return (
    <>
      <SEO
        title='Mon Compte'
        description='Gérez votre profil, vos commandes et vos favoris.'
      />

      <div className='min-h-screen bg-luxury-gray-50 pt-20'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className='flex items-center justify-between mb-8'
          >
            <div className='flex items-center space-x-3'>
              <User className='w-6 h-6 text-luxury-red' />
              <h1 className='text-3xl font-display font-bold text-luxury-black'>
                Mon Espace Client
              </h1>
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleSignOut}
              disabled={isSigningOut}
              className={`flex items-center space-x-2 text-sm px-4 py-2 rounded-xl font-medium transition-colors duration-200 ${
                isSigningOut
                  ? 'bg-luxury-gray-300 text-luxury-gray-500 cursor-not-allowed'
                  : 'bg-luxury-red text-luxury-white hover:bg-red-700'
              }`}
            >
              {isSigningOut ? (
                <Loader2 className='w-4 h-4 animate-spin' />
              ) : (
                <LogOut className='w-4 h-4' />
              )}
              <span>{isSigningOut ? 'Déconnexion...' : 'Se Déconnecter'}</span>
            </motion.button>
          </motion.div>

          {/* Main Content: 2 colonnes */}
          <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
            {/* Colonne de Gauche: Profil et Sécurité */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className='lg:col-span-1 space-y-10 p-8 bg-luxury-white rounded-2xl shadow-xl'
            >
              {/* Information de Connexion */}
              <div className='p-4 bg-luxury-red/5 border-l-4 border-luxury-red rounded-lg'>
                <p className='font-bold text-luxury-red'>
                  Bienvenue, {profile?.full_name || user.email} !
                </p>
                <p className='text-sm text-luxury-gray-600'>
                  Email: {user.email}
                </p>
                <p className='text-sm text-luxury-gray-600'>
                  Statut:{' '}
                  {profile?.role ? profile.role.toUpperCase() : 'CLIENT'}
                </p>
              </div>

              {/* Section 1: Nom Complet */}
              <div>
                <SectionHeader
                  icon={<User className='w-6 h-6' />}
                  title='Informations Personnelles'
                />
                <ProfileUpdateForm />
              </div>

              {/* Section 2: Mot de Passe */}
              <div>
                <SectionHeader
                  icon={<Lock className='w-6 h-6' />}
                  title='Changer le Mot de Passe'
                />
                <PasswordUpdateForm />
              </div>

              {/* Section 3: Liste des Favoris (Placeholder) */}
              <div>
                <SectionHeader
                  icon={<Heart className='w-6 h-6' />}
                  title='Mes Favoris'
                />
                <div className='bg-luxury-gray-100 p-6 rounded-xl border border-dashed border-luxury-gray-300'>
                  <p className='text-sm text-luxury-gray-600'>
                    <span className='font-semibold text-luxury-red'>
                      Fonctionnalité à venir :
                    </span>{' '}
                    Retrouvez ici tous les articles que vous avez ajoutés à
                    votre liste de souhaits.
                  </p>
                  <Link
                    to='/shop'
                    className='mt-3 inline-block text-luxury-red hover:underline text-sm'
                  >
                    Découvrir nos produits →
                  </Link>
                </div>
              </div>
            </motion.div>

            {/* Colonne de Droite: Historique des Commandes */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className='lg:col-span-2 space-y-10 p-8 bg-luxury-white rounded-2xl shadow-xl'
            >
              <SectionHeader
                icon={<ShoppingBag className='w-6 h-6' />}
                title='Historique des Commandes'
              />
              <OrderHistory userId={user.id} />
            </motion.div>
          </div>
        </div>
      </div>
    </>
  )
}
