import React, { useState, useMemo, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Search,
  Filter,
  Eye,
  EyeOff,
  Edit,
  Mail,
  Users,
  User,
  Crown,
  Plus,
  X,
  ChevronLeft,
  ChevronRight,
  UserCheck,
  DollarSign,
  ShoppingBag,
  Bell,
  Calendar,
  Phone,
  MapPin
} from 'lucide-react'
// Assurez-vous que useAuthStore et adminServices sont correctement définis
import { useAuthStore } from '../../store/useAuthStore'
import { adminServices } from '../../services/adminServices'

// --- Interfaces et Types Réels ---

interface Address {
  street: string
  city: string
  postalCode: string
  country: string
}

// Interface Utilisateur basée sur la structure réelle
interface UserData {
  idx: number
  id: string
  email: string
  full_name: string // Nom réel dans vos données
  provider: string
  role: 'client' | 'agent' | 'admin'
  created_at: string
  is_active: boolean
  phone?: string // Optionnel
  address?: Address // Optionnel
}

// Interface enrichie pour l'affichage (avec stats calculées)
interface UserDisplay extends UserData {
  totalOrders: number
  totalSpent: number
  lastOrderDate?: string
}

// Interface Commande basée sur la structure réelle
interface OrderData {
  id: string
  user_id: string
  status: string
  order_details: string // C'est une chaîne JSON
  created_at: string
  paid_at: string
}

interface ToggleSwitchProps {
  isBlocked: boolean
  onToggle: () => void
}

const ITEMS_PER_PAGE = 10

// --- Composant Modal de Création d'Utilisateur ---

interface CreateUserModalProps {
  isOpen: boolean
  onClose: () => void
  // Remplacez 'string' par 'UserDisplay' si vous attendez l'utilisateur créé en retour
  onCreateUser: (
    email: string,
    password: string,
    fullName: string,
    role: 'client' | 'agent' | 'admin'
  ) => void
}

import { Lock, Unlock } from 'lucide-react' // 👈 N'oubliez pas l'import

// ...
interface ToggleSwitchProps {
  isBlocked: boolean
  onToggle: () => void
}

const ToggleSwitch: React.FC<ToggleSwitchProps> = ({ isBlocked, onToggle }) => (
  <motion.button
    onClick={onToggle}
    whileTap={{ scale: 0.95 }}
    className={`relative inline-flex items-center h-6 rounded-full w-11 transition-colors duration-200 focus:outline-none ${
      isBlocked ? 'bg-red-500' : 'bg-green-500' // Rouge pour Bloqué, Vert pour Actif
    }`}
    title={isBlocked ? 'Débloquer cet utilisateur' : 'Bloquer cet utilisateur'}
  >
    <span className='sr-only'>{isBlocked ? 'Bloqué' : 'Actif'}</span>

    {/* Le cercle blanc qui bascule */}
    <span
      className={`inline-block w-5 h-5 transform bg-white rounded-full transition-transform duration-200 flex items-center justify-center ${
        isBlocked ? 'translate-x-6' : 'translate-x-0.5' // Déplace le cercle
      }`}
    >
      {/* ✨ ICÔNES SUGGÉRÉES ICI ✨ */}
      {isBlocked ? (
        // 🔒 Utilisateur BLOQUÉ (Inactif)
        <Lock className='w-3 h-3 text-red-500' />
      ) : (
        // 🔓 Utilisateur DÉBLOQUÉ (Actif)
        <Unlock className='w-3 h-3 text-green-500' />
      )}
    </span>
  </motion.button>
)
const CreateUserModal: React.FC<CreateUserModalProps> = ({
  isOpen,
  onClose,
  onCreateUser
}) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    role: 'agent' as UserDisplay['role'] // Rôle par défaut
  })
  const [showPassword, setShowPassword] = useState(false)

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.fullName || !formData.email || !formData.password) {
      alert('Veuillez remplir tous les champs obligatoires.')
      return
    }

    // Assurez-vous que le rôle est un type valide
    onCreateUser(
      formData.email,
      formData.password,
      formData.fullName,
      formData.role
    )

    setFormData({ fullName: '', email: '', password: '', role: 'agent' })
    onClose()
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className='fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 sm:p-6'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className='bg-white w-full max-w-md p-8 rounded-xl shadow-2xl relative max-h-full overflow-y-auto'
            initial={{ scale: 0.9, y: 50 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 50 }}
            transition={{ type: 'spring', damping: 20, stiffness: 300 }}
            onClick={e => e.stopPropagation()}
          >
            <button
              onClick={onClose}
              className='absolute top-3 right-3 text-gray-700 hover:text-gray-900 bg-gray-200 hover:bg-gray-300 rounded-full w-8 h-8 flex items-center justify-center transition-colors duration-150'
              title='Fermer'
            >
              <X className='w-4 h-4' />
            </button>

            <h2 className='text-2xl font-bold text-gray-900 mb-6 border-b pb-2'>
              Créer un nouvel utilisateur
            </h2>

            <form onSubmit={handleSubmit} className='space-y-4'>
              {/* Rôle */}
              <div>
                <label
                  htmlFor='role'
                  className='block text-sm font-medium text-gray-700 mb-1'
                >
                  Rôle de l'utilisateur
                </label>
                <select
                  id='role'
                  name='role'
                  value={formData.role}
                  onChange={handleChange}
                  className='w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all bg-white'
                >
                  <option value='agent'>Agent</option>
                </select>
              </div>

              {/* Nom complet */}
              <div>
                <label
                  htmlFor='fullName'
                  className='block text-sm font-medium text-gray-700 mb-1'
                >
                  Nom complet
                </label>
                <input
                  type='text'
                  id='fullName'
                  name='fullName'
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder='Ex: Jean Dupont'
                  required
                  className='w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all'
                />
              </div>

              {/* Email */}
              <div>
                <label
                  htmlFor='email'
                  className='block text-sm font-medium text-gray-700 mb-1'
                >
                  Adresse Email
                </label>
                <input
                  type='email'
                  id='email'
                  name='email'
                  value={formData.email}
                  onChange={handleChange}
                  placeholder='Ex: email@domaine.com'
                  required
                  className='w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all'
                />
              </div>

              {/* Mot de passe */}
              <div>
                <label
                  htmlFor='password'
                  className='block text-sm font-medium text-gray-700 mb-1'
                >
                  Mot de passe
                </label>
                <div className='relative'>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id='password'
                    name='password'
                    value={formData.password}
                    onChange={handleChange}
                    placeholder='Mot de passe'
                    required
                    className='w-full border border-gray-300 rounded-lg p-3 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all'
                  />
                  <button
                    type='button'
                    onClick={() => setShowPassword(!showPassword)}
                    className='absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600'
                    title={
                      showPassword
                        ? 'Masquer le mot de passe'
                        : 'Afficher le mot de passe'
                    }
                  >
                    {showPassword ? (
                      <EyeOff className='w-5 h-5' />
                    ) : (
                      <Eye className='w-5 h-5' />
                    )}
                  </button>
                </div>
              </div>

              {/* Bouton de soumission */}
              <motion.button
                type='submit'
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className='w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-colors'
              >
                Créer l'utilisateur
              </motion.button>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

// --- Composant Principal AdminUsers ---

// Fonction pour calculer les statistiques des commandes
const calculateUserStats = (
  users: UserData[],
  orders: OrderData[]
): UserDisplay[] => {
  const statsMap = new Map<
    string,
    { totalOrders: number; totalSpent: number; lastOrderDate: string }
  >()

  orders.forEach(order => {
    // Parse order_details pour obtenir le total
    let total = 0
    try {
      const details = order.order_details
      total = details.total || 0
    } catch (e) {
      console.error('Erreur de parsing order_details:', e)
    }

    const currentStats = statsMap.get(order.user_id) || {
      totalOrders: 0,
      totalSpent: 0,
      lastOrderDate: ''
    }

    currentStats.totalOrders += 1
    currentStats.totalSpent += total

    // Mettre à jour la dernière date de commande
    if (
      !currentStats.lastOrderDate ||
      order.paid_at > currentStats.lastOrderDate
    ) {
      currentStats.lastOrderDate = order.paid_at
    }

    statsMap.set(order.user_id, currentStats)
  })

  // Fusionner les données utilisateurs avec les statistiques
  return users.map(user => ({
    ...user,
    totalOrders: statsMap.get(user.id)?.totalOrders || 0,
    totalSpent: statsMap.get(user.id)?.totalSpent || 0,
    lastOrderDate: statsMap.get(user.id)?.lastOrderDate || undefined
  }))
}

export const AdminUsers: React.FC = () => {
  const { signUpAgent, signUp } = useAuthStore() // Assumer que signUp est disponible
  const [usersData, setUsersData] = useState<UserData[]>([])
  const [ordersData, setOrdersData] = useState<OrderData[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedFilter, setSelectedFilter] = useState('all')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedUserIds, setSelectedUserIds] = useState<Set<string>>(new Set())
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isToggling, setIsToggling] = useState<Set<string>>(new Set())

  const fetchData = useCallback(async () => {
    setIsLoading(true)
    setError(null)
    try {
      // 1. Récupération des utilisateurs et des commandes
      const responseUsers = (await adminServices.getAllUsers()).filter(
        (elt: any) => elt.role !== 'admin'
      ) as UserData[] // Assurez-vous que cela renvoie UserData[]
      const responseOrders = (await adminServices.getOrders()) as OrderData[] // Assurez-vous que cela renvoie OrderData[]

      setUsersData(responseUsers)
      setOrdersData(responseOrders)
    } catch (err) {
      console.error('Erreur de récupération des données:', err)
      setError('Erreur lors du chargement des utilisateurs et des commandes.')
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  // Données enrichies des utilisateurs (calculées)
  const users: UserDisplay[] = useMemo(() => {
    return calculateUserStats(usersData, ordersData)
  }, [usersData, ordersData])

  // --- Fonctions utilitaires ---

  const handleToggleUserStatus = useCallback(
    async (userId: string, currentStatus: boolean) => {
      // Empêche les doubles clics
      if (isToggling.has(userId)) return

      const newStatus = !currentStatus
      const action = newStatus ? 'débloquer' : 'bloquer'

      if (
        !window.confirm(`Êtes-vous sûr de vouloir ${action} cet utilisateur ?`)
      ) {
        return
      }

      // 1. Démarrer le chargement
      setIsToggling(prev => new Set(prev).add(userId))

      try {
        // 2. Appel du service réel Supabase
        const updatedUser = await adminServices.toggleUserActiveStatus(
          userId,
          newStatus
        )

        // 3. Mettre à jour l'état local (`usersData`)
        setUsersData(prevUsers =>
          prevUsers.map(user =>
            user.id === userId
              ? { ...user, is_active: updatedUser.is_active }
              : user
          )
        )

        // Mettre à jour l'état actif/inactif
        const statusMessage = updatedUser.is_active
          ? 'actif (débloqué)'
          : 'inactif (bloqué)'
        alert(
          `✅ Statut de l'utilisateur ${updatedUser.full_name} mis à jour : ${statusMessage}.`
        )
      } catch (err) {
        console.error('Erreur lors du basculement du statut:', err)
        alert(`❌ Échec de l'opération de ${action}. Veuillez réessayer.`)
      } finally {
        // 4. Arrêter le chargement
        setIsToggling(prev => {
          const newSet = new Set(prev)
          newSet.delete(userId)
          return newSet
        })
      }
    },
    [isToggling]
  )

  const getRoleIcon = (role: UserDisplay['role']) => {
    switch (role) {
      case 'admin':
        return <Crown className='w-5 h-5 text-purple-500' />
      case 'agent':
        return <UserCheck className='w-5 h-5 text-yellow-600' />
      case 'client':
      default:
        return <User className='w-5 h-5 text-blue-500' />
    }
  }

  const getRoleBadge = (role: UserDisplay['role']) => {
    switch (role) {
      case 'admin':
        return 'bg-purple-100 text-purple-800'
      case 'agent':
        return 'bg-yellow-100 text-yellow-800'
      case 'client':
      default:
        return 'bg-blue-100 text-blue-800'
    }
  }

  const getProviderIcon = (provider: string) => {
    switch (provider) {
      case 'google':
        return '🔍'
      case 'email':
        return '📧'
      default:
        return '👤'
    }
  }

  const getClientStats = () => {
    const totalClients = users.filter(c => c.role === 'client').length
    const totalAdmins = users.filter(c => c.role === 'admin').length
    const totalAgents = users.filter(c => c.role === 'agent').length
    const activeClients = users.filter(
      c => c.role === 'client' && c.totalOrders > 0
    ).length
    const totalRevenue = users.reduce((sum, user) => sum + user.totalSpent, 0)

    return {
      totalClients,
      totalAdmins,
      totalAgents,
      activeClients,
      totalRevenue
    }
  }

  // --- Logique de Filtrage et Pagination ---

  const filterOptions = [
    { value: 'all', label: 'Tous les utilisateurs' },
    { value: 'client', label: 'Clients' },
    { value: 'agent', label: 'Agents' },
    { value: 'admin', label: 'Administrateurs' },
    { value: 'recent', label: 'Récents (30 jours)' },
    { value: 'active', label: 'Clients actifs' }
  ]

  const filteredUsers = useMemo(() => {
    return users.filter(user => {
      const matchesSearch =
        user.full_name.toLowerCase().includes(searchTerm.toLowerCase()) || // Changement de fullName à full_name
        user.email.toLowerCase().includes(searchTerm.toLowerCase())

      let matchesFilter = true
      switch (selectedFilter) {
        case 'client':
        case 'agent':
        case 'admin':
          matchesFilter = user.role === selectedFilter
          break
        case 'recent':
          const thirtyDaysAgo = new Date()
          thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)
          matchesFilter = new Date(user.created_at) >= thirtyDaysAgo // Changement de createdAt à created_at
          break
        case 'active':
          matchesFilter = user.totalOrders > 0 && user.role === 'client'
          break
      }

      return matchesSearch && matchesFilter
    })
  }, [users, searchTerm, selectedFilter])

  const totalPages = Math.ceil(filteredUsers.length / ITEMS_PER_PAGE)
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const paginatedUsers = filteredUsers.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  )

  const isAllOnPageSelected =
    paginatedUsers.length > 0 &&
    paginatedUsers.every(user => selectedUserIds.has(user.id))

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page)
    }
  }

  const toggleSelectAll = () => {
    const newSelectedIds = new Set(selectedUserIds)

    if (isAllOnPageSelected) {
      paginatedUsers.forEach(user => newSelectedIds.delete(user.id))
    } else {
      paginatedUsers.forEach(user => newSelectedIds.add(user.id))
    }
    setSelectedUserIds(newSelectedIds)
  }

  const toggleSelectUser = (userId: string) => {
    const newSelectedIds = new Set(selectedUserIds)
    if (newSelectedIds.has(userId)) {
      newSelectedIds.delete(userId)
    } else {
      newSelectedIds.add(userId)
    }
    setSelectedUserIds(newSelectedIds)
  }

  const handleSendNotification = () => {
    if (selectedUserIds.size === 0) return

    const count = selectedUserIds.size

    alert(
      `Notification simulée envoyée à ${count} utilisateur(s) sélectionnés: ${Array.from(
        selectedUserIds
      ).join(', ')}`
    )

    setSelectedUserIds(new Set())
  }

  // Fonction de création d'utilisateur, appelle les services d'authentification et rafraîchit la liste
  const handleCreateUser = async (
    email: string,
    password: string,
    fullName: string,
    role: UserDisplay['role']
  ) => {
    try {
      let response = null
      if (role === 'agent') {
        response = await signUpAgent(email, password, { full_name: fullName })
      } else if (role === 'client') {
        // Supposons que vous avez une fonction signUp pour les clients dans useAuthStore
        // Si vous ne créez que des agents et admins, vous pouvez supprimer ceci
        response = await (signUp as any)(email, password, {
          full_name: fullName
        })
      } else if (role === 'admin') {
        // Vous devrez probablement appeler un service admin pour créer un admin directement dans la base
        alert(
          "La création d'administrateur n'est pas implémentée via cette interface."
        )
        return
      }

      if (response && response.user) {
        alert(`Utilisateur ${role} ${fullName} créé avec succès!`)
        fetchData() // Rafraîchir la liste après création
      } else {
        alert(`Échec de la création de l'utilisateur. Vérifiez les logs.`)
      }
    } catch (e) {
      console.error("Erreur de création d'utilisateur:", e)
      alert(`Erreur de création: ${(e as Error).message}`)
    }
  }

  const stats = getClientStats()

  // Rendu en cas de chargement ou d'erreur
  if (isLoading && users.length === 0) {
    return (
      <div className='text-center py-20'>
        <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto'></div>
        <p className='mt-4 text-gray-600'>Chargement des données...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className='text-center py-20 bg-red-50 border border-red-200 rounded-lg mx-4'>
        <X className='w-12 h-12 text-red-500 mx-auto mb-4' />
        <p className='text-red-700 font-semibold'>{error}</p>
      </div>
    )
  }

  // --- Rendu du composant principal ---

  return (
    <div className='space-y-6'>
      {/* En-tête + Boutons d'Action */}
      <div className='flex justify-between items-center'>
        <h1 className='text-3xl font-bold text-gray-900'>
          Gestion des Utilisateurs
        </h1>
        <div className='flex space-x-4'>
          {/* Bouton d'action de masse conditionnel */}
          {selectedUserIds.size > 0 && (
            <motion.button
              onClick={handleSendNotification}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className='flex items-center bg-yellow-600 hover:bg-yellow-700 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition-colors'
            >
              <Bell className='w-5 h-5 mr-2' />
              Notifier ({selectedUserIds.size})
            </motion.button>
          )}

          {/* Bouton Ajouter */}
          <motion.button
            onClick={() => setIsModalOpen(true)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className='flex items-center bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition-colors'
          >
            <Plus className='w-5 h-5 mr-2' />
            Ajouter un utilisateur
          </motion.button>
        </div>
      </div>

      <hr />

      {/* --- Statistiques --- */}
      <div className='grid grid-cols-2 md:grid-cols-5 gap-4'>
        <StatCard
          Icon={Users}
          title='Total Clients'
          value={stats.totalClients}
          color='text-blue-500'
        />
        <StatCard
          Icon={UserCheck}
          title='Agents'
          value={stats.totalAgents}
          color='text-yellow-600'
        />
        <StatCard
          Icon={Crown}
          title='Administrateurs'
          value={stats.totalAdmins}
          color='text-purple-500'
        />
        <StatCard
          Icon={UserCheck}
          title='Clients actifs'
          value={stats.activeClients}
          color='text-green-500'
        />
        <StatCard
          Icon={DollarSign}
          title='CA total'
          value={`€${stats.totalRevenue.toFixed(2)}`}
          color='text-green-600'
        />
      </div>

      <hr />

      {/* --- Filtres et recherche --- */}
      <div className='bg-white rounded-lg p-6 shadow-sm border border-gray-200'>
        <div className='flex flex-col lg:flex-row gap-4'>
          <div className='flex-1'>
            <div className='relative'>
              <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400' />
              <input
                type='text'
                placeholder='Rechercher par nom ou email...'
                value={searchTerm}
                onChange={e => {
                  setSearchTerm(e.target.value)
                  setCurrentPage(1)
                }}
                className='w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all'
              />
            </div>
          </div>
          <div className='flex items-center space-x-2'>
            <Filter className='w-4 h-4 text-gray-400' />
            <select
              value={selectedFilter}
              onChange={e => {
                setSelectedFilter(e.target.value)
                setCurrentPage(1)
              }}
              className='border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all'
            >
              {filterOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <hr />

      {/* --- Liste des utilisateurs et pagination --- */}
      <div className='bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden'>
        <div className='overflow-x-auto'>
          <table className='min-w-full divide-y divide-gray-200'>
            <thead className='bg-gray-50'>
              <tr>
                <th className='px-3 py-3 w-10'>
                  <input
                    type='checkbox'
                    checked={isAllOnPageSelected}
                    onChange={toggleSelectAll}
                    className='form-checkbox h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500'
                  />
                </th>
                <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                  Utilisateur / Rôle
                </th>
                <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                  Contact
                </th>
                <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                  Inscription
                </th>
                <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                  Commandes
                </th>
                <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                  Total dépensé
                </th>
                <th className='px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider'>
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className='bg-white divide-y divide-gray-200'>
              {paginatedUsers.map((user, index) => (
                <motion.tr
                  key={user.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className={`hover:bg-gray-50 ${
                    selectedUserIds.has(user.id) ? 'bg-blue-50/50' : ''
                  }`}
                >
                  <td className='px-3 py-4 whitespace-nowrap'>
                    <input
                      type='checkbox'
                      checked={selectedUserIds.has(user.id)}
                      onChange={() => toggleSelectUser(user.id)}
                      className='form-checkbox h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500'
                    />
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap'>
                    <div className='flex items-center'>
                      <div className='flex-shrink-0'>
                        <div className='w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center'>
                          {getRoleIcon(user.role)}
                        </div>
                      </div>
                      <div className='ml-4'>
                        <div className='flex items-center'>
                          <div className='text-sm font-medium text-gray-900'>
                            {user.full_name}{' '}
                            {/* Changement de fullName à full_name */}
                          </div>
                          <span
                            className={`ml-2 inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${getRoleBadge(
                              user.role
                            )}`}
                          >
                            {user.role.charAt(0).toUpperCase() +
                              user.role.slice(1)}
                          </span>
                        </div>
                        <div className='text-sm text-gray-500 flex items-center'>
                          <span className='mr-1'>
                            {getProviderIcon(user.provider)}
                          </span>
                          {user.provider === 'google' ? 'Google' : 'Email'}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap'>
                    <div className='text-sm text-gray-900'>
                      <div className='flex items-center mb-1'>
                        <Mail className='w-4 h-4 text-gray-400 mr-2' />
                        {user.email}
                      </div>
                      {user.phone && (
                        <div className='flex items-center'>
                          <Phone className='w-4 h-4 text-gray-400 mr-2' />
                          {user.phone}
                        </div>
                      )}
                    </div>
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap'>
                    <div className='flex items-center text-sm text-gray-900'>
                      <Calendar className='w-4 h-4 text-gray-400 mr-2' />
                      {new Date(user.created_at).toLocaleDateString(
                        'fr-FR'
                      )}{' '}
                      {/* Changement de createdAt à created_at */}
                    </div>
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap'>
                    <div className='flex items-center text-sm text-gray-900'>
                      <ShoppingBag className='w-4 h-4 text-gray-400 mr-2' />
                      {user.totalOrders}
                    </div>
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900'>
                    €{user.totalSpent.toFixed(2)}
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap text-right text-sm font-medium'>
                    <div className='flex items-center justify-end space-x-2'>
                      {isToggling.has(user.id) ? (
                        <div className='animate-pulse text-sm text-gray-500'>
                          Mise à jour...
                        </div>
                      ) : (
                        <ToggleSwitch
                          isBlocked={!user.is_active} // isBlocked est l'inverse de is_active
                          onToggle={() =>
                            handleToggleUserStatus(user.id, user.is_active)
                          }
                        />
                      )}
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredUsers.length === 0 && (
          <div className='text-center py-12'>
            <Users className='w-12 h-12 text-gray-300 mx-auto mb-4' />
            <p className='text-gray-500'>
              {searchTerm || selectedFilter !== 'all'
                ? `Aucun utilisateur ne correspond aux critères de recherche/filtre.`
                : `Aucun utilisateur trouvé.`}
            </p>
          </div>
        )}

        {/* --- Pagination --- */}
        {totalPages > 1 && (
          <div className='flex justify-between items-center p-4 border-t border-gray-200'>
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className={`flex items-center px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                currentPage === 1
                  ? 'text-gray-400 bg-gray-100 cursor-not-allowed'
                  : 'text-blue-600 bg-blue-50 hover:bg-blue-100'
              }`}
            >
              <ChevronLeft className='w-4 h-4 mr-2' />
              Précédent
            </button>
            <span className='text-sm text-gray-700'>
              Page <span className='font-semibold'>{currentPage}</span> sur{' '}
              <span className='font-semibold'>{totalPages}</span>
            </span>
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`flex items-center px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                currentPage === totalPages
                  ? 'text-gray-400 bg-gray-100 cursor-not-allowed'
                  : 'text-blue-600 bg-blue-50 hover:bg-blue-100'
              }`}
            >
              Suivant
              <ChevronRight className='w-4 h-4 ml-2' />
            </button>
          </div>
        )}
      </div>

      {/* Rendu du Modal de Création */}
      <CreateUserModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onCreateUser={handleCreateUser}
      />
    </div>
  )
}

// Composant d'aide pour les statistiques (pour éviter la répétition dans le JSX)
const StatCard = ({
  Icon,
  title,
  value,
  color
}: {
  Icon: any
  title: string
  value: string | number
  color: string
}) => (
  <div className='bg-white rounded-lg p-4 shadow-sm border border-gray-200'>
    <div className='flex items-center'>
      <Icon className={`w-8 h-8 ${color}`} />
      <div className='ml-3'>
        <p className='text-sm font-medium text-gray-600'>{title}</p>
        <p className='text-xl font-bold text-gray-900'>{value}</p>
      </div>
    </div>
  </div>
)

export default AdminUsers
