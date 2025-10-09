import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  User,
  Mail,
  Lock,
  Eye,
  EyeOff,
  Chrome,
  Loader2,
  X,
  Trash
} from 'lucide-react'
import { AddressServices } from '../../services/AddressServices'
import { toast } from 'sonner'

interface AuthSectionProps {
  isLoggedIn: boolean
  user?: { id: string; name: string; email: string }
  onLogin: (email: string, password: string) => Promise<void>
  onRegister: (email: string, password: string, name: string) => Promise<void>
  onGoogleLogin: () => Promise<void>
  onContinueAsGuest: () => void // Cette fonction ne sera plus utilisée dans le rendu, mais gardée dans l'interface
  onSelectedAddress: (id: string) => void
}

export const AuthSection: React.FC<AuthSectionProps> = ({
  isLoggedIn,
  user,
  onLogin,
  onRegister,
  onGoogleLogin,
  onContinueAsGuest, // On garde cette prop au cas où elle serve ailleurs, mais on l'ignore ici
  onSelectedAddress
}) => {
  // L'état isExpanded est inutile car l'affichage du formulaire est désormais obligatoire si non connecté
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login')
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: ''
  })
  const [addressFormData, setAddressFormData] = useState({
    addressName: '',
    address: '',
    postalCode: '',
    city: '',
    country: ''
  })
  const [isLoading, setIsLoading] = useState(false)
  const [openAdressModal, setOpenAddressModal] = useState(false) // IGNORE
  const [allAddress, setAllAddress] = useState<any[]>([])
  const [selectedAddress, setSelectedAddress] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      if (authMode === 'login') {
        await onLogin(formData.email, formData.password)
      } else {
        await onRegister(formData.email, formData.password, formData.name)
      }
    } catch (error) {
      console.error('Auth error:', error)
    } finally {
      setIsLoading(false)
    }
  } // 1. CAS UTILISATEUR CONNECTÉ

  const handleSubmitAddress = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      if (user?.id) {
        setIsLoading(true)
        const response = await AddressServices.addAddress(
          user?.id,
          addressFormData.addressName,
          addressFormData.address,
          addressFormData.postalCode,
          addressFormData.city,
          addressFormData.country
        )

        if (response) {
          setAllAddress([...allAddress, response])
          toast.success('Ajouter avec succès')
          setOpenAddressModal(false)
        } else {
          toast.error('Champs obligatoire')
        }
      }
    } catch (error) {
      toast.error('Champs obligatoire')
    }
  }

  const handleDeleteAddress = async (id: string) => {
    try {
      const response = await AddressServices.deleteAddress(id)
      if (response)
        setAllAddress(currentAddresses => {
          return currentAddresses.filter(address => address.id !== id)
        })
    } catch (error) {}
  }

  const fetchAddress = async () => {
    if (user?.id) {
      const response = await AddressServices.getAddressByUserId(user.id)
      if (response.length > 0) {
        setAllAddress(response)
        setSelectedAddress(response[0].id)
        onSelectedAddress(response[0].id)
      }
    }
  }

  useEffect(() => {
    fetchAddress()
  }, [])

  if (isLoggedIn && user) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className='bg-luxury-white rounded-2xl p-6 shadow-luxury border border-luxury-gray-100 mb-6'
      >
        <div className='flex items-center space-x-3'>
          <div className='bg-luxury-red/10 p-2 rounded-full'>
            <User className='w-5 h-5 text-luxury-red' />
          </div>
          <div>
            <h3 className='font-semibold text-luxury-black'>
              Connecté en tant que
            </h3>
            <p className='text-luxury-gray-600'>
              {user.name} • {user.email}
            </p>
            <button
              onClick={() => setOpenAddressModal(true)}
              className='mt-2 bg-luxury-red text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-luxury-red/90 transition-all duration-200 shadow-sm'
            >
              Ajouter une nouvelle adresse
            </button>

            <div className='mt-5'>
              {allAddress.map((res, index) => {
                // Déterminer les classes CSS pour l'arrière-plan et la sélection par défaut
                const divClasses = `
                  flex align-center gap-4 p-3 mb-2 rounded-lg cursor-pointer items-center
                  ${
                    selectedAddress === res.id
                      ? 'bg-blue-100 border-2 border-blue-500'
                      : 'bg-gray-50 hover:bg-gray-100'
                  }
                `.trim()

                return (
                  <div
                    key={res.id} // Déplacez la clé ici car c'est le conteneur de la ligne
                    className={divClasses}
                  >
                    <input
                      onClick={() => {
                        setSelectedAddress(res.id), onSelectedAddress(res.id)
                      }}
                      type='radio'
                      name='address'
                      value={res.id}
                      id={res.id}
                      // L'adresse par défaut est celle dont l'index est 0
                      defaultChecked={index === 0}
                    />
                    <label htmlFor={res.id}>
                      {res.full_name} ({res.postalCode} {res.street}, {res.city}{' '}
                      {res.country})
                    </label>
                    <Trash
                      className='text-luxury-red'
                      onClick={() => handleDeleteAddress(res.id)}
                    />
                  </div>
                )
              })}
            </div>
          </div>
        </div>
        {/* Le modal d'adresse peut être géré ici ou dans le composant parent */}
        <AnimatePresence>
          {openAdressModal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4'
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                // Conteneur de la modale : hauteur limitée et position relative pour le bouton
                className='bg-luxury-white rounded-2xl p-6 shadow-luxury w-full max-w-md relative max-h-[90vh]'
              >
                {/* Bouton de fermeture avec un fond pour qu'il soit bien visible */}
                <button
                  onClick={() => setOpenAddressModal(false)}
                  className='absolute top-4 right-4 z-10 p-2 rounded-full bg-luxury-gray-100 text-luxury-gray-400 hover:text-luxury-gray-600 transition-all duration-200'
                >
                  <X className='w-6 h-6' />
                </button>

                <h2 className='text-xl font-semibold text-luxury-black mb-4'>
                  Ajouter une nouvelle adresse
                </h2>

                {/* Le formulaire devient scrollable et son conteneur a une hauteur maximum */}
                <div
                  className='overflow-y-auto pr-2'
                  style={{ maxHeight: 'calc(90vh - 120px)' }}
                >
                  <form className='space-y-4' onSubmit={handleSubmitAddress}>
                    {/* Champs du formulaire d'adresse ici */}
                    <div>
                      <label className='block text-sm font-medium text-luxury-gray-700 mb-2'>
                        Nom complet
                      </label>
                      <input
                        onChange={e =>
                          setAddressFormData({
                            ...addressFormData,
                            addressName: e.target.value
                          })
                        }
                        name='addressName'
                        type='text'
                        className='w-full border border-luxury-gray-300 rounded-xl px-4 py-2 focus:ring-2 focus:ring-luxury-red focus:border-transparent'
                        placeholder='Votre nom complet'
                      />
                    </div>
                    <div>
                      <label className='block text-sm font-medium text-luxury-gray-700 mb-2'>
                        Adresse
                      </label>
                      <input
                        onChange={e =>
                          setAddressFormData({
                            ...addressFormData,
                            address: e.target.value
                          })
                        }
                        name='address'
                        type='text'
                        className='w-full border border-luxury-gray-300 rounded-xl px-4 py-2 focus:ring-2 focus:ring-luxury-red focus:border-transparent'
                        placeholder='123 Rue Exemple, Ville, Pays'
                      />
                    </div>
                    <div>
                      <label className='block text-sm font-medium text-luxury-gray-700 mb-2'>
                        Code Postal
                      </label>
                      <input
                        onChange={e =>
                          setAddressFormData({
                            ...addressFormData,
                            postalCode: e.target.value
                          })
                        }
                        name='postalCode'
                        type='text'
                        className='w-full border border-luxury-gray-300 rounded-xl px-4 py-2 focus:ring-2 focus:ring-luxury-red focus:border-transparent'
                        placeholder='12345'
                      />
                    </div>
                    <div>
                      <label className='block text-sm font-medium text-luxury-gray-700 mb-2'>
                        Ville
                      </label>
                      <input
                        onChange={e =>
                          setAddressFormData({
                            ...addressFormData,
                            city: e.target.value
                          })
                        }
                        name='city'
                        type='text'
                        className='w-full border border-luxury-gray-300 rounded-xl px-4 py-2 focus:ring-2 focus:ring-luxury-red focus:border-transparent'
                        placeholder='Votre ville'
                      />
                    </div>
                    <div>
                      <label className='block text-sm font-medium text-luxury-gray-700 mb-2'>
                        Pays
                      </label>
                      <input
                        onChange={e =>
                          setAddressFormData({
                            ...addressFormData,
                            country: e.target.value
                          })
                        }
                        name='country'
                        type='text'
                        className='w-full border border-luxury-gray-300 rounded-xl px-4 py-2 focus:ring-2 focus:ring-luxury-red focus:border-transparent'
                        placeholder='Votre pays'
                      />
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      type='submit'
                      className='w-full py-3 rounded-xl font-medium bg-luxury-red text-luxury-white hover:bg-red-700 transition-all duration-200'
                    >
                      Enregistrer l'adresse
                    </motion.button>
                  </form>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    )
  } // 2. CAS UTILISATEUR NON CONNECTÉ (Obligé de se connecter ou de s'inscrire)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className='bg-luxury-white rounded-2xl p-6 shadow-luxury border border-luxury-gray-100 mb-6'
    >
      <AnimatePresence mode='wait'>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <h3 className='font-semibold text-luxury-black text-lg mb-4 text-center'>
            Connexion ou Inscription
          </h3>
          {/* Auth Mode Toggle */}
          <div className='flex bg-luxury-gray-100 rounded-xl p-1 mb-6'>
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
          {/* Form */}
          <form onSubmit={handleSubmit} className='space-y-4'>
            {authMode === 'register' && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                <label className='block text-sm font-medium text-luxury-gray-700 mb-2'>
                  Nom complet
                </label>

                <div className='relative'>
                  <User className='absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-luxury-gray-400' />

                  <input
                    type='text'
                    value={formData.name}
                    onChange={e =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className='w-full pl-10 pr-4 py-3 border border-luxury-gray-300 rounded-xl focus:ring-2 focus:ring-luxury-red focus:border-transparent'
                    placeholder='Votre nom complet'
                    required
                  />
                </div>
              </motion.div>
            )}

            <div>
              <label className='block text-sm font-medium text-luxury-gray-700 mb-2'>
                Email
              </label>

              <div className='relative'>
                <Mail className='absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-luxury-gray-400' />

                <input
                  type='email'
                  value={formData.email}
                  onChange={e =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className='w-full pl-10 pr-4 py-3 border border-luxury-gray-300 rounded-xl focus:ring-2 focus:ring-luxury-red focus:border-transparent'
                  placeholder='votre@email.com'
                  required
                />
              </div>
            </div>

            <div>
              <label className='block text-sm font-medium text-luxury-gray-700 mb-2'>
                Mot de passe
              </label>

              <div className='relative'>
                <Lock className='absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-luxury-gray-400' />

                <input
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={e =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  className='w-full pl-10 pr-12 py-3 border border-luxury-gray-300 rounded-xl focus:ring-2 focus:ring-luxury-red focus:border-transparent'
                  placeholder='••••••••'
                  required
                />

                <button
                  type='button'
                  onClick={() => setShowPassword(!showPassword)}
                  className='absolute right-3 top-1/2 transform -translate-y-1/2 text-luxury-gray-400 hover:text-luxury-gray-600'
                >
                  {showPassword ? (
                    <EyeOff className='w-5 h-5' />
                  ) : (
                    <Eye className='w-5 h-5' />
                  )}
                </button>
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type='submit'
              disabled={isLoading}
              className={`w-full py-3 rounded-xl font-medium transition-all duration-200 flex items-center justify-center ${
                isLoading
                  ? 'bg-luxury-gray-300 text-luxury-gray-500 cursor-not-allowed'
                  : 'bg-luxury-red text-luxury-white hover:bg-red-700'
              }`}
            >
              {isLoading ? (
                <Loader2 className='w-5 h-5 animate-spin mr-2' />
              ) : authMode === 'login' ? (
                'Se connecter et Continuer'
              ) : (
                'Créer un compte et Continuer'
              )}
            </motion.button>
          </form>
        </motion.div>
      </AnimatePresence>
    </motion.div>
  )
}
