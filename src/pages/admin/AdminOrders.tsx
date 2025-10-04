import React, { useState, useEffect, useMemo } from 'react'
import { motion } from 'framer-motion'
import {
  Search,
  Filter,
  Eye,
  Edit,
  Package,
  Truck,
  CheckCircle,
  XCircle,
  Clock,
  DollarSign,
  Calendar,
  User,
  CreditCard
} from 'lucide-react'
// Assurez-vous que ces imports sont bien définis dans votre projet
import { adminServices } from '../../services/adminServices'
import { LoadingData } from '../../components/admin/LoadingData'
import { OrderDetailModal } from '../../components/admin/OrderDetailModal'

// --- Interfaces de Données Brutes (Basées sur votre modèle) ---

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
    // ... autres détails
  }
}

interface ClientUser {
  id: string
  email: string
  full_name: string
  // ... autres détails
}

// --- Interface de Commande Enrichie pour le Composant ---

interface OrderDisplay {
  id: string
  customerName: string
  customerEmail: string
  customerId: string
  total: number
  status: 'pending' | 'shipped' | 'delivered' | 'cancelled' | 'processing'
  itemsCount: number
  createdAt: string
  addressId: string
  // Les adresses sont souvent dans une table séparée, ici on les simplifie pour l'affichage
}

// --- Composant Principal ---

export const AdminOrders: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(true)
  const [orders, setOrders] = useState<RawOrder[]>([])
  const [clientUsers, setClientUsers] = useState<ClientUser[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedStatus, setSelectedStatus] = useState<
    'all' | RawOrder['status']
  >('all')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedOrder, setSelectedOrder] = useState<any | null>(null)

  // Service pour récupérer les données (Assurez-vous qu'il correspond)
  const fetchData = async () => {
    try {
      const results = await Promise.allSettled([
        adminServices.getOrders(), // Utilisé getCommandes comme dans votre code
        adminServices.getClientUsers() // Fonction à ajouter dans adminServices (voir note)
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

  // --------------------------------------------------------
  // 1. MAPPING ET JOINTURE DES DONNÉES
  // --------------------------------------------------------

  const mappedOrders: OrderDisplay[] = useMemo(() => {
    const usersMap = new Map<string, ClientUser>()
    clientUsers.forEach(user => usersMap.set(user.id, user))

    return orders.map(order => {
      const user = usersMap.get(order.user_id)

      return {
        id: order.id.substring(0, 8),
        orderId: order.id,
        customerName: user ? user.full_name : 'Utilisateur inconnu',
        customerEmail: user ? user.email : 'N/A',
        customerId: user ? user.id : null,
        total: order.order_details.total,
        status: order.status,
        itemsCount: order.order_details.itemCount,
        createdAt: order.created_at,
        addressId: order.address_id, // L'ID pour la recherche d'adresse
        orderDetails: order.order_details // Les détails complets
      } as any as OrderDisplay // Utiliser 'any' ici pour simplifier le mapping vers OrderDisplay enrichi
    })
  }, [orders, clientUsers])

  // --------------------------------------------------------
  // 2. FILTRAGE DES COMMANDES
  // --------------------------------------------------------

  const filteredOrders: OrderDisplay[] = useMemo(() => {
    return mappedOrders.filter(order => {
      // Filtrage par Statut
      const matchesStatus =
        selectedStatus === 'all' || order.status === selectedStatus

      // Filtrage par Recherche (ID, Nom ou Email)
      const lowerCaseSearch = searchTerm.toLowerCase()
      const matchesSearch =
        order.id.toLowerCase().includes(lowerCaseSearch) ||
        order.customerName.toLowerCase().includes(lowerCaseSearch) ||
        order.customerEmail.toLowerCase().includes(lowerCaseSearch)

      return matchesSearch && matchesStatus
    })
  }, [mappedOrders, searchTerm, selectedStatus])

  // --------------------------------------------------------
  // 3. CALCUL DES STATISTIQUES
  // --------------------------------------------------------

  const stats = useMemo(() => {
    const total = mappedOrders.length
    let pending = 0
    let processing = 0
    let shipped = 0
    let delivered = 0
    let totalRevenue = 0

    mappedOrders.forEach(order => {
      // Compte des statuts
      if (order.status === 'pending') pending++
      if (order.status === 'processing') processing++
      if (order.status === 'shipped') shipped++
      if (order.status === 'delivered') delivered++

      // Revenu total (excluant les commandes annulées)
      if (order.status !== 'cancelled') {
        totalRevenue += order.total
      }
    })

    return {
      total,
      pending,
      paid: processing,
      shipped,
      delivered,
      totalRevenue
    }
  }, [mappedOrders])

  const handleOpenModal = (order: OrderDisplay) => {
    // Étant donné que mappedOrders contient déjà tout, il suffit de le définir
    setSelectedOrder(order as any)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setSelectedOrder(null)
  }

  const handleStatusChange = (orderId: string, newStatus: string) => {
    // Mettre à jour la commande dans le tableau 'orders'
    setOrders(prevOrders =>
      prevOrders.map(order =>
        order.id.substring(0, 8) === orderId
          ? { ...order, status: newStatus as RawOrder['status'] }
          : order
      )
    )

    // Mettre à jour la commande dans le modal si elle est encore ouverte
    if (selectedOrder && selectedOrder.id === orderId) {
      setSelectedOrder((prev: OrderDisplay | null) =>
        prev ? { ...prev, status: newStatus as OrderDisplay['status'] } : null
      )
    }
  }

  const statusOptions = [
    { value: 'all', label: 'Tous les statuts' },
    { value: 'pending', label: 'En attente' },
    { value: 'processing', label: 'Payé' },
    { value: 'shipped', label: 'Expédié' },
    { value: 'delivered', label: 'Livré' },
    { value: 'cancelled', label: 'Annulé' }
  ]

  const getStatusConfig = (status: string) => {
    switch (status) {
      case 'pending':
        return {
          text: 'En attente',
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

  if (loading) return <LoadingData />

  return (
    <div className='space-y-6'>
      {/* Statistiques */}
      <div className='grid grid-cols-1 md:grid-cols-5 gap-4'>
        {/* Total commandes */}
        <div className='bg-white rounded-lg p-4 shadow-sm border border-gray-200'>
          <div className='flex items-center'>
            <Package className='w-8 h-8 text-blue-500' />
            <div className='ml-3'>
              <p className='text-sm font-medium text-gray-600'>
                Total commandes
              </p>
              <p className='text-xl font-bold text-gray-900'>{stats.total}</p>
            </div>
          </div>
        </div>

        {/* En retention */}
        <div className='bg-white rounded-lg p-4 shadow-sm border border-gray-200'>
          <div className='flex items-center'>
            <Clock className='w-8 h-8 text-yellow-500' />
            <div className='ml-3'>
              <p className='text-sm font-medium text-gray-600'>En attente</p>
              <p className='text-xl font-bold text-gray-900'>{stats.pending}</p>
            </div>
          </div>
        </div>

        {/* En attente */}
        <div className='bg-white rounded-lg p-4 shadow-sm border border-gray-200'>
          <div className='flex items-center'>
            <Clock className='w-8 h-8 text-yellow-500' />
            <div className='ml-3'>
              <p className='text-sm font-medium text-gray-600'>Payées</p>
              <p className='text-xl font-bold text-gray-900'>{stats.paid}</p>
            </div>
          </div>
        </div>

        {/* Expédiées */}
        <div className='bg-white rounded-lg p-4 shadow-sm border border-gray-200'>
          <div className='flex items-center'>
            <Truck className='w-8 h-8 text-purple-500' />
            <div className='ml-3'>
              <p className='text-sm font-medium text-gray-600'>Expédiées</p>
              <p className='text-xl font-bold text-gray-900'>{stats.shipped}</p>
            </div>
          </div>
        </div>

        {/* Livrées */}
        <div className='bg-white rounded-lg p-4 shadow-sm border border-gray-200'>
          <div className='flex items-center'>
            <CheckCircle className='w-8 h-8 text-green-500' />
            <div className='ml-3'>
              <p className='text-sm font-medium text-gray-600'>Livrées</p>
              <p className='text-xl font-bold text-gray-900'>
                {stats.delivered}
              </p>
            </div>
          </div>
        </div>

        {/* Chiffre d'affaires */}
        {/*
          <div className='bg-white rounded-lg p-4 shadow-sm border border-gray-200'>
            <div className='flex items-center'>
              <DollarSign className='w-8 h-8 text-green-600' />
              <div className='ml-3'>
                <p className='text-sm font-medium text-gray-600'>
                  Chiffre d'affaires
                </p>
                <p className='text-xl font-bold text-gray-900'>
                  €{stats.totalRevenue.toFixed(2)}
                </p>
              </div>
            </div>
          </div>
        */}
      </div>

      {/* Filtres et recherche */}
      <div className='bg-white rounded-lg p-6 shadow-sm border border-gray-200'>
        <div className='flex flex-col lg:flex-row gap-4'>
          {/* Recherche */}
          <div className='flex-1'>
            <div className='relative'>
              <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400' />
              <input
                type='text'
                placeholder='Rechercher par numéro, nom ou email...'
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className='w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-gold/50 focus:border-accent-gold/50 transition-all'
              />
            </div>
          </div>

          {/* Filtre par statut */}
          <div className='flex items-center space-x-2'>
            <Filter className='w-4 h-4 text-gray-400' />
            <select
              value={selectedStatus}
              onChange={e =>
                setSelectedStatus(e.target.value as RawOrder['status'] | 'all')
              }
              className='border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-accent-gold/50 focus:border-accent-gold/50 transition-all'
            >
              {statusOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Liste des commandes */}
      <div className='bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden'>
        <div className='overflow-x-auto'>
          <table className='min-w-full divide-y divide-gray-200'>
            <thead className='bg-gray-50'>
              <tr>
                <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                  Commande
                </th>
                <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                  Client
                </th>
                <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                  Date
                </th>
                <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                  Statut
                </th>
                <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                  Total
                </th>
                <th className='px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider'>
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className='bg-white divide-y divide-gray-200'>
              {filteredOrders.map((order, index) => {
                const statusConfig = getStatusConfig(order.status)
                const StatusIcon = statusConfig.icon

                return (
                  <motion.tr
                    key={order.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }} // Animation ajustée
                    className='hover:bg-gray-50'
                  >
                    <td className='px-6 py-4 whitespace-nowrap'>
                      <div className='flex items-center'>
                        <div className='flex-shrink-0'>
                          <div className='w-10 h-10 bg-luxury-gold/10 rounded-lg flex items-center justify-center'>
                            <Package className='w-5 h-5 text-luxury-gold' />
                          </div>
                        </div>
                        <div className='ml-4'>
                          <div className='text-sm font-medium text-gray-900'>
                            #{order.id}
                          </div>
                          <div className='text-sm text-gray-500'>
                            {order.itemsCount} article
                            {order.itemsCount > 1 ? 's' : ''}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className='px-6 py-4 whitespace-nowrap'>
                      <div className='flex items-center'>
                        <div className='flex-shrink-0'>
                          <div className='w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center'>
                            <User className='w-4 h-4 text-gray-600' />
                          </div>
                        </div>
                        <div className='ml-3'>
                          <div className='text-sm font-medium text-gray-900'>
                            {order.customerName}
                          </div>
                          <div className='text-sm text-gray-500'>
                            {order.customerEmail}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className='px-6 py-4 whitespace-nowrap'>
                      <div className='flex items-center text-sm text-gray-900'>
                        <Calendar className='w-4 h-4 text-gray-400 mr-2' />
                        {new Date(order.createdAt).toLocaleDateString('fr-FR')}
                      </div>
                    </td>
                    <td className='px-6 py-4 whitespace-nowrap'>
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${statusConfig.color}`}
                      >
                        <StatusIcon className='w-3 h-3 mr-1' />
                        {statusConfig.text}
                      </span>
                    </td>
                    <td className='px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900'>
                      €{order.total.toFixed(2)}
                    </td>
                    <td className='px-6 py-4 whitespace-nowrap text-right text-sm font-medium'>
                      <div className='flex items-center justify-end space-x-2'>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => handleOpenModal(order)} // L'ACTION ICI
                          className='text-gray-400 hover:text-accent-gold transition-colors'
                          title='Voir les détails'
                        >
                          <Eye className='w-4 h-4' />
                        </motion.button>
                        {/*
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            className='text-gray-400 hover:text-blue-600 transition-colors'
                            title='Modifier le statut'
                          >
                            <Edit className='w-4 h-4' />
                          </motion.button>
                        */}
                      </div>
                    </td>
                  </motion.tr>
                )
              })}
            </tbody>
          </table>
        </div>

        {isModalOpen && selectedOrder && (
          <OrderDetailModal
            order={selectedOrder}
            onClose={handleCloseModal}
            getStatusConfig={getStatusConfig}
            onStatusChange={handleStatusChange} // PASSEZ LA FONCTION ICI
            statusOptions={statusOptions}
          />
        )}

        {filteredOrders.length === 0 && (
          <div className='text-center py-12'>
            <Package className='w-12 h-12 text-gray-300 mx-auto mb-4' />
            <p className='text-gray-500'>Aucune commande trouvée</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default AdminOrders
