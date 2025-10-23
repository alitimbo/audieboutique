import React, { useState, useEffect, useMemo } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import {
  TrendingUp,
  Users,
  Package,
  ShoppingCart,
  DollarSign,
  Eye,
  Calendar,
  Clock,
  CreditCard,
  Truck,
  CheckCircle,
  XCircle
} from 'lucide-react'
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts'
import { useProductStore } from '../../store/useProductStore'
import { adminServices } from '../../services/adminServices'

// --- MOCKING DES SERVICES ET COMPOSANTS (POUR AUTONOMIE) ---
// Remplacement des imports externes pour que le fichier soit autonome et fonctionnel.

interface RawOrder {
  id: string
  created_at: string
  user_id: string
  address_id: string
  status:
    | 'pending'
    | 'paid'
    | 'shipped'
    | 'delivered'
    | 'cancelled'
    | 'processing'
  order_details: {
    total: number
    itemCount: number
  }
}

interface ClientUser {
  id: string
  email: string
  full_name: string
}

const LoadingData = () => (
  <div className='flex justify-center items-center h-48'>
    {/* Utilisation directe du hex code #FACC15 pour la couleur accent-gold */}
    <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-[#FACC15]'></div>
  </div>
)

// --- COMPOSANT CARD ET LOGIQUE DE BASE ---

interface StatCardProps {
  title: string
  value: string
  icon: React.ComponentType<{ className?: string }>
}

const StatCard: React.FC<StatCardProps> = ({ title, value, icon: Icon }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className='bg-white rounded-lg p-6 shadow-sm border border-gray-200'
  >
    <div className='flex items-center justify-between'>
      <div>
        <p className='text-sm font-medium text-gray-600'>{title}</p>
        <p className='text-2xl font-bold text-gray-900 mt-1'>{value}</p>
      </div>
      {/* Utilisation directe du hex code #FACC15 pour la couleur accent-gold */}
      <div className='p-3 bg-[#FACC15]/10 rounded-lg'>
        <Icon className='w-6 h-6 text-[#FACC15]' />
      </div>
    </div>
  </motion.div>
)

// --- FONCTION UTILITAIRE DE FORMATAGE DE DATE ---
const formatDate = (date: Date): string => date.toISOString().split('T')[0]

// 2. Logique de filtrage des commandes par période
const getFilteredOrders = (
  allOrders: RawOrder[],
  start: string,
  end: string
): RawOrder[] => {
  const startTimestamp = new Date(start).getTime()
  // Ajoutez un jour à la date de fin pour inclure les commandes de toute la journée
  const endDay = new Date(end)
  endDay.setDate(endDay.getDate() + 1)
  const endTimestamp = endDay.getTime()

  return allOrders.filter(order => {
    const orderDate = new Date(order.created_at).getTime()
    return orderDate >= startTimestamp && orderDate < endTimestamp
  })
}

// --- COMPOSANT PRINCIPAL : ADMIN DASHBOARD ---

export const AdminDashboard: React.FC = () => {
  const navigate = useNavigate()
  const { products, fetchProducts } = useProductStore()

  const [loading, setLoading] = useState(true)
  const [orders, setOrders] = useState<RawOrder[]>([])
  const [clientUsers, setClientUsers] = useState<ClientUser[]>([])
  // Le nombre de produits est récupéré directement via le mock store.
  const productCount = products.length

  // --- ÉTATS POUR LE FILTRE DE DATE ---
  // Date par défaut : 30 derniers jours
  const today = new Date()
  const defaultStartDate = new Date(today.getTime())
  defaultStartDate.setDate(today.getDate() - 30)

  const [startDate, setStartDate] = useState<string>(
    formatDate(defaultStartDate)
  )
  const [endDate, setEndDate] = useState<string>(formatDate(today))
  // ----------------------------------------------

  // 1. Récupération des données initiales
  const fetchData = async () => {
    try {
      const results = await Promise.allSettled([
        adminServices.getOrders(),
        adminServices.getClientUsers(),
        fetchProducts()
      ])

      if (results[0].status === 'fulfilled') {
        setOrders(results[0].value as RawOrder[])
      }
      if (results[1].status === 'fulfilled') {
        setClientUsers(results[1].value as ClientUser[])
      }

      setLoading(false)
    } catch (error) {
      setLoading(false)
      console.error('Erreur lors de la récupération des données :', error)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  // 3. Commandes filtrées (dépend de la période sélectionnée)
  const filteredOrders = useMemo(() => {
    return getFilteredOrders(orders, startDate, endDate)
  }, [orders, startDate, endDate])

  // 4. Calcul des statistiques via useMemo
  const stats = useMemo(() => {
    let totalRevenue = 0
    let totalOrders = filteredOrders.filter(
      elt => elt.status !== 'cancelled' && elt.status !== 'pending'
    ).length
    let totalClients = clientUsers.length

    filteredOrders.forEach(order => {
      // Comptez le revenu uniquement pour les commandes payées/traitées/expédiées/livrées
      if (
        order.status !== 'cancelled' &&
        order.status !== 'pending' &&
        order.order_details.total
      ) {
        totalRevenue += order.order_details.total
      }
    })

    // Utilisez un Set pour compter les clients uniques ayant passé commande dans cette période
    const clientsInPeriod = new Set(filteredOrders.map(order => order.user_id))
      .size

    return {
      totalRevenue: totalRevenue.toFixed(2),
      totalOrders: totalOrders.toLocaleString('fr-FR'),
      totalClients: totalClients.toLocaleString('fr-FR'), // Total des clients enregistrés
      clientsInPeriod: clientsInPeriod.toLocaleString('fr-FR'), // Clients ayant commandé dans la période
      totalProducts: productCount.toLocaleString('fr-FR')
    }
  }, [filteredOrders, clientUsers, productCount])

  // 5. Préparation des données pour Recharts : Revenu par jour
  const chartData = useMemo(() => {
    const dailyRevenue = new Map<string, number>()

    const dateRange: string[] = []
    let currentDate = new Date(startDate)
    const endLimit = new Date(endDate)

    // Pour s'assurer que la boucle inclut le jour de fin (endLimit)
    endLimit.setDate(endLimit.getDate() + 1)

    while (currentDate < endLimit) {
      dateRange.push(formatDate(currentDate))
      currentDate.setDate(currentDate.getDate() + 1)
    }

    // Initialiser toutes les dates de la période à 0
    dateRange.forEach(date => dailyRevenue.set(date, 0))

    // Agréger les revenus par jour
    filteredOrders.forEach(order => {
      // Clé de date au format YYYY-MM-DD
      const dateKey = formatDate(new Date(order.created_at))
      const revenue = order.order_details.total || 0

      // N'ajoutez que les commandes qui ont généré un revenu (non annulées)
      if (
        order.status !== 'cancelled' &&
        order.status !== 'pending' &&
        dailyRevenue.has(dateKey)
      ) {
        const currentTotal = dailyRevenue.get(dateKey) || 0
        dailyRevenue.set(dateKey, currentTotal + revenue)
      }
    })

    // Transformer la Map en tableau formaté pour Recharts, en utilisant le format DD/MM pour l'affichage
    const data = dateRange.map(dateKey => {
      const dateForLabel = new Date(dateKey).toLocaleDateString('fr-FR', {
        day: '2-digit',
        month: '2-digit'
      })
      const total = dailyRevenue.get(dateKey) || 0

      return {
        name: dateForLabel, // Format DD/MM pour l'axe X
        Ventes: parseFloat(total.toFixed(2)) // Revenu du jour
      }
    })

    return data
  }, [filteredOrders, startDate, endDate])

  const getStatusConfig = (status: string) => {
    switch (status) {
      case 'pending':
        return {
          text: 'Abandonné',
          color: 'bg-yellow-100 text-yellow-800 border-yellow-200',
          icon: Clock
        }
      case 'processing':
        return {
          text: 'Payé',
          color: 'bg-blue-100 text-blue-800 border-blue-200',
          icon: CreditCard // Changement pour mieux correspondre à 'Payé'
        }
      case 'shipped':
        return {
          text: 'Expédié',
          color: 'bg-purple-100 text-purple-800 border-purple-200',
          icon: Truck
        }
      case 'delivered':
        return {
          text: 'Livré',
          color: 'bg-green-100 text-green-800 border-green-200',
          icon: CheckCircle
        }
      case 'cancelled':
        return {
          text: 'Annulé',
          color: 'bg-red-100 text-red-800 border-red-200',
          icon: XCircle
        }
      default:
        return {
          text: 'Inconnu',
          color: 'bg-gray-100 text-gray-800 border-gray-200',
          icon: Clock
        }
    }
  }

  // 6. Commandes récentes (les 4 dernières)
  const recentOrders = useMemo(() => {
    const usersMap = new Map<string, ClientUser>()
    clientUsers.forEach(user => usersMap.set(user.id, user))

    return filteredOrders
      .sort(
        (a, b) =>
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      )
      .slice(0, 4)
      .map(order => {
        const user = usersMap.get(order.user_id)
        return {
          id: `#${order.id.substring(0, 8)}`,
          customer: user ? user.full_name : 'Utilisateur inconnu',
          amount: `€${order.order_details.total.toFixed(2)}`,
          status: getStatusConfig(order.status).text,
          date: new Date(order.created_at).toLocaleDateString('fr-FR')
        }
      })
  }, [filteredOrders, clientUsers])

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Livré':
        return 'bg-green-100 text-green-800'
      case 'Payé':
        return 'bg-blue-100 text-blue-800'
      case 'En cours':
        return 'bg-yellow-100 text-yellow-800'
      case 'En attente':
        return 'bg-gray-100 text-gray-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const handleNavigation = (url: string) => {
    navigate(`${url}`)
  }

  if (loading) return <LoadingData />

  return (
    <div className='space-y-6 p-4 sm:p-6 bg-gray-50 min-h-screen'>
      {/* En-tête et Filtre de Date */}
      <div className='flex flex-col sm:flex-row items-start sm:items-center justify-between'>
        <div className='flex flex-col sm:flex-row items-center space-y-3 sm:space-y-0 sm:space-x-4 w-full sm:w-auto'>
          {/* Champs de Date */}
          <div className='flex items-center space-x-2 w-full sm:w-auto'>
            <Calendar className='w-4 h-4 text-gray-500 hidden sm:block' />
            <span className='text-sm text-gray-700'>Du:</span>
            <input
              type='date'
              value={startDate}
              onChange={e => setStartDate(e.target.value)}
              // Utilisation du hex code #FACC15
              className='border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-[#FACC15]/50 focus:border-[#FACC15]/50 transition-all w-full'
            />
          </div>
          <div className='flex items-center space-x-2 w-full sm:w-auto'>
            <span className='text-sm text-gray-700'>Au:</span>
            <input
              type='date'
              value={endDate}
              onChange={e => setEndDate(e.target.value)}
              // Utilisation du hex code #FACC15
              className='border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-[#FACC15]/50 focus:border-[#FACC15]/50 transition-all w-full'
            />
          </div>

          {/* Bouton Voir le site */}
          <motion.button
            onClick={() =>
              window.open('https://audieboutique-coaq.vercel.app/', '_blank')
            }
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            // Utilisation du hex code #FACC15
            className='w-full sm:w-auto bg-[#FACC15] hover:bg-[#FACC15]/90 text-gray-900 font-semibold px-4 py-2 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg'
          >
            <Eye className='w-4 h-4 inline mr-2' />
            Voir le site
          </motion.button>
        </div>
      </div>
      <hr className='border-gray-200' />

      {/* Statistiques Dynamiques */}
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <StatCard
            title="Chiffre d'affaires"
            value={`€${stats.totalRevenue}`}
            icon={DollarSign}
          />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <StatCard
            title='Commandes'
            value={stats.totalOrders}
            icon={ShoppingCart}
          />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <StatCard
            title='Clients (Période)'
            value={stats.clientsInPeriod}
            icon={Users}
          />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <StatCard
            title='Total Produits'
            value={stats.totalProducts}
            icon={Package}
          />
        </motion.div>
      </div>

      {/* Graphiques et tableaux */}
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
        {/* Graphique des ventes (RECHARTS) */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
          className='bg-white rounded-lg p-6 shadow-sm border border-gray-200'
        >
          <div className='flex items-center justify-between mb-4'>
            <h3 className='text-lg font-semibold text-gray-900'>
              Évolution du Chiffre d'affaires
            </h3>
            <TrendingUp className='w-5 h-5 text-[#FACC15]' />
          </div>
          <div className='h-64'>
            {chartData.length > 0 ? (
              <ResponsiveContainer width='100%' height='100%'>
                <AreaChart
                  data={chartData}
                  margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
                >
                  <defs>
                    {/* Définition du dégradé de couleur en utilisant le code hexadécimal */}
                    <linearGradient
                      id='colorRevenue'
                      x1='0'
                      y1='0'
                      x2='0'
                      y2='1'
                    >
                      <stop offset='5%' stopColor='#FACC15' stopOpacity={0.8} />
                      <stop offset='95%' stopColor='#FACC15' stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray='3 3' stroke='#e5e7eb' />
                  <XAxis dataKey='name' stroke='#9ca3af' />
                  <YAxis
                    stroke='#9ca3af'
                    tickFormatter={(value: number) => `€${value.toFixed(0)}`}
                  />
                  <Tooltip
                    formatter={(value: number) => [
                      `€${value.toFixed(2)}`,
                      'Ventes'
                    ]}
                    labelFormatter={label => `Jour: ${label}`}
                    contentStyle={{
                      borderRadius: '8px',
                      border: 'none',
                      boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
                    }}
                  />
                  <Area
                    type='monotone'
                    dataKey='Ventes'
                    stroke='#FACC15'
                    fillOpacity={1}
                    fill='url(#colorRevenue)'
                    strokeWidth={2}
                  />
                </AreaChart>
              </ResponsiveContainer>
            ) : (
              <div className='h-full flex items-center justify-center text-center text-gray-500 bg-gray-50 rounded-lg'>
                Aucune donnée de vente pour cette période.
              </div>
            )}
          </div>
        </motion.div>

        {/* Commandes récentes (basées sur les données filtrées) */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6 }}
          className='bg-white rounded-lg p-6 shadow-sm border border-gray-200'
        >
          <div className='flex items-center justify-between mb-4'>
            <h3 className='text-lg font-semibold text-gray-900'>
              4 dernières commandes de la période
            </h3>
            <ShoppingCart className='w-5 h-5 text-[#FACC15]' />
          </div>
          <div className='space-y-3'>
            {recentOrders.length > 0 ? (
              recentOrders.map((order, index) => (
                <motion.div
                  key={order.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 + index * 0.1 }}
                  className='flex items-center justify-between p-3 bg-gray-50 rounded-lg'
                >
                  <div className='flex-1'>
                    <div className='flex items-center justify-between'>
                      <span className='font-medium text-gray-900'>
                        {order.id}
                      </span>
                      <span className='text-sm text-gray-500'>
                        {order.date}
                      </span>
                    </div>
                    <p className='text-sm text-gray-600'>{order.customer}</p>
                  </div>
                  <div className='text-right ml-4'>
                    <p className='font-semibold text-gray-900'>
                      {order.amount}
                    </p>
                    <span
                      className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(
                        order.status
                      )}`}
                    >
                      {order.status}
                    </span>
                  </div>
                </motion.div>
              ))
            ) : (
              <div className='text-center py-8 text-gray-500'>
                Aucune commande trouvée dans cette période.
              </div>
            )}
          </div>
          <motion.button
            onClick={() => handleNavigation('/admin/orders')}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className='w-full mt-4 text-[#FACC15] hover:text-[#FACC15]/80 font-medium text-sm transition-colors hover:underline'
          >
            Voir toutes les commandes →
          </motion.button>
        </motion.div>
      </div>

      {/* Actions rapides (Inchangées) */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className='bg-white rounded-lg p-6 shadow-sm border border-gray-200'
      >
        <h3 className='text-lg font-semibold text-gray-900 mb-4'>
          Actions rapides
        </h3>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
          <motion.button
            onClick={() => handleNavigation('/admin/catalog')}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            // Utilisation du hex code #FACC15
            className='p-4 border border-gray-200 rounded-lg hover:border-[#FACC15]/50 hover:bg-[#FACC15]/5 transition-all duration-200 hover:shadow-md text-left'
          >
            <Package className='w-6 h-6 text-[#FACC15] mb-2' />
            <p className='font-medium text-gray-900'>Ajouter un produit</p>
            <p className='text-sm text-gray-600'>Créer un nouveau produit</p>
          </motion.button>

          <motion.button
            onClick={() => handleNavigation('/admin/orders')}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            // Utilisation du hex code #FACC15
            className='p-4 border border-gray-200 rounded-lg hover:border-[#FACC15]/50 hover:bg-[#FACC15]/5 transition-all duration-200 hover:shadow-md text-left'
          >
            <ShoppingCart className='w-6 h-6 text-[#FACC15] mb-2' />
            <p className='font-medium text-gray-900'>Gérer les commandes</p>
            <p className='text-sm text-gray-600'>
              Traiter les commandes en attente
            </p>
          </motion.button>

          <motion.button
            onClick={() => handleNavigation('/admin/utilisateurs')}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            // Utilisation du hex code #FACC15
            className='p-4 border border-gray-200 rounded-lg hover:border-[#FACC15]/50 hover:bg-[#FACC15]/5 transition-all duration-200 hover:shadow-md text-left'
          >
            <Users className='w-6 h-6 text-[#FACC15] mb-2' />
            <p className='font-medium text-gray-900'>Voir les clients</p>
            <p className='text-sm text-gray-600'>Gérer la base clients</p>
          </motion.button>
        </div>
      </motion.div>
    </div>
  )
}

export default AdminDashboard
