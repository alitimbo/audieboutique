import React, { useEffect, useState } from 'react'
import {
  X,
  MapPin,
  Package,
  Calendar,
  User,
  Truck,
  DollarSign,
  List,
  Loader2,
  Send,
  Printer,
  CreditCard
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
// Assurez-vous que cette importation correspond à l'emplacement réel
import { adminServices, Address } from '../../services/adminServices'
import { triggerPushNotification } from '../../lib/sendNotification'
import { generateInvoicePDF } from '../../utils/generateInvoicePDF'
import { generateInvoicePDFBlob } from '../../utils/generateInvoicePDFBlob'
// --- Interfaces (À synchroniser avec le composant parent AdminOrders) ---

interface ProductItem {
  product: {
    name: string
    price: number
    images: string[]
  }
  quantity: number
  selectedColor: string
  selectedSize: string
}

interface OrderDetails {
  id: string
  orderId: string
  customerId: string
  customerName: string
  customerEmail: string
  total: number
  is_shipping: boolean
  status:
    | 'pending'
    | 'paid'
    | 'shipped'
    | 'delivered'
    | 'cancelled'
    | 'processing'
  createdAt: string
  itemsCount: number
  addressId: string
  orderDetails: {
    cartItems: ProductItem[]
    subtotal: number
    shipping: number
    total: number
  }
}

interface StatusOption {
  value: string
  label: string
}

interface OrderDetailModalProps {
  order: OrderDetails | null
  onClose: () => void
  getStatusConfig: (status: string) => {
    text: string
    color: string
    icon: React.ElementType
  }
  onStatusChange: (orderId: string, newStatus: string) => void
  statusOptions: StatusOption[]
}

// --- Composant Modal ---

export const OrderDetailModal: React.FC<OrderDetailModalProps> = ({
  order,
  onClose,
  getStatusConfig,
  onStatusChange,
  statusOptions
}) => {
  const [shippingAddress, setShippingAddress] = useState<Address | null>(null)
  const [loadingAddress, setLoadingAddress] = useState(true)
  const [currentStatus, setCurrentStatus] = useState(order?.status || 'pending')
  const [isSaving, setIsSaving] = useState(false)

  // Initialisation du statut local
  useEffect(() => {
    if (order) {
      setCurrentStatus(order.status)
    }
  }, [order])

  // Chargement de l'adresse de livraison
  useEffect(() => {
    if (order?.addressId) {
      setLoadingAddress(true)
      adminServices
        .getAddressById(order.addressId)
        .then(setShippingAddress)
        .catch(error => {
          console.error("Erreur lors du chargement de l'adresse:", error)
          setShippingAddress(null)
        })
        .finally(() => setLoadingAddress(false))
    } else {
      setShippingAddress(null)
      setLoadingAddress(false)
    }
  }, [order?.addressId])

  // Logique de mise à jour du statut
  const handleStatusUpdate = async () => {
    if (!order || currentStatus === order.status) return

    setIsSaving(true)
    try {
      // 1. Mise à jour dans Supabase (doit être implémenté dans adminServices)
      await adminServices.updateOrderStatus(order.orderId, currentStatus)

      const statusConfig = getStatusConfig(currentStatus)

      await triggerPushNotification(
        order.customerId,
        `Mise à jour de votre commande #${order.id.substring(0, 8)}`, // Titre
        `Votre commande est maintenant : ${statusConfig.text}`, // Corps du message
        `` // URL de redirection (par exemple)
      )

      // 2. Mise à jour de l'état global via la prop du parent
      onStatusChange(order.id, currentStatus)

      alert(
        `Statut de la commande #${order.id} mis à jour à: ${
          getStatusConfig(currentStatus).text
        }`
      )
    } catch (error) {
      console.error('Erreur lors de la mise à jour du statut:', error)
      setCurrentStatus(order.status)
      alert('Échec de la mise à jour du statut.')
    } finally {
      setIsSaving(false)
    }
  }

  // Fonction pour l'impression
  const handlePrintInvoice = () => {
    // Déclenche la boîte de dialogue d'impression
    if (order) {
      generateInvoicePDF(order)
    }
  }

  //console.log(order)

  // Fonction de simulation pour renvoyer la facture
  const handleResendInvoice = async () => {
    if (!order) return

    try {
      // 1️⃣ Génère le PDF sous forme d'ArrayBuffer
      const pdfArrayBuffer = generateInvoicePDFBlob(order)

      // 2️⃣ Convertit en Blob
      const pdfBlob = new Blob([pdfArrayBuffer], { type: 'application/pdf' })

      // 3️⃣ Crée un FormData pour envoyer à la fonction Edge
      const formData = new FormData()
      formData.append('customerId', order.customerId)
      formData.append('invoice', pdfBlob, `invoice-${order.id}.pdf`)

      // 4️⃣ Envoie la requête vers l’Edge Function
      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/send-invoice`,
        {
          method: 'POST',
          headers: {},
          body: formData
        }
      )

      // 5️⃣ Vérifie la réponse
      const data = await response.json()
      if (!response.ok) throw new Error(data.error || 'Erreur d’envoi du PDF')

      console.log('Facture envoyée avec succès ✅', data)
    } catch (error) {
      console.error('Erreur lors de l’envoi de la facture :', error)
    }
  }

  if (!order) return null

  // Utiliser CreditCard pour 'Payé' (processing) et le style pour 'Livré' (delivered)
  const statusIconConfig = getStatusConfig(order.status)
  const StatusIcon = statusIconConfig.icon

  // Utilitaire pour le formatage de la date
  const formattedDate = new Date(order.createdAt).toLocaleDateString('fr-FR')

  // On retire l'option 'all' du select, car elle n'est pas un statut réel
  const selectableStatusOptions = statusOptions.filter(
    opt => opt.value !== 'all'
  )

  return (
    <AnimatePresence>
      {/* Conteneur et Overlay */}
      <motion.div
        className='fixed inset-0 z-50 flex items-center justify-center p-4'
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        {/* Overlay (fond cliquable pour fermer) */}
        <div
          className='absolute inset-0 bg-black/50 backdrop-blur-sm'
          onClick={onClose}
        />

        {/* Contenu du Modal */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 50, opacity: 0 }}
          className='relative bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto transform transition-all'
        >
          {/* Header */}
          <div className='sticky top-0 bg-white border-b p-6 flex justify-between items-center z-10 print:hidden'>
            <h2 className='text-2xl font-bold text-gray-900'>
              Détails de la commande{' '}
              <span className='text-luxury-gold'>#{order.id}</span>
            </h2>
            <button
              onClick={onClose}
              className='p-2 rounded-full hover:bg-gray-100 transition-colors'
            >
              <X className='w-6 h-6 text-gray-500' />
            </button>
          </div>

          {/* Body */}
          <div className='p-6 space-y-8 print:p-8'>
            {/* Section: Contrôles Admin (Invisible à l'impression) */}
            <div className='bg-gray-50 p-4 rounded-lg border border-gray-200 print:hidden'>
              <h3 className='flex items-center text-lg font-bold text-gray-900 mb-3'>
                <Truck className='w-5 h-5 mr-2 text-blue-600' /> Actions et
                Statut
              </h3>
              <div className='flex flex-col md:flex-row gap-3 items-end'>
                {/* Changement de Statut */}
                <div className='flex-1 w-full'>
                  <label
                    htmlFor='status-select'
                    className='block text-sm font-medium text-gray-700 mb-1'
                  >
                    Mettre à jour le statut:
                  </label>
                  <div className='flex gap-2'>
                    <select
                      id='status-select'
                      value={currentStatus}
                      onChange={e =>
                        setCurrentStatus(
                          e.target.value as OrderDetails['status']
                        )
                      }
                      className='block w-full border border-gray-300 rounded-lg shadow-sm focus:ring-accent-gold focus:border-accent-gold p-2'
                      disabled={isSaving}
                    >
                      {selectableStatusOptions.map(option => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                    <motion.button
                      onClick={handleStatusUpdate}
                      disabled={isSaving || currentStatus === order.status}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className={`flex items-center justify-center p-2 rounded-lg text-white font-medium transition-colors 
                                                ${
                                                  isSaving ||
                                                  currentStatus === order.status
                                                    ? 'bg-gray-400 cursor-not-allowed'
                                                    : 'bg-green-600 hover:bg-green-700'
                                                }`}
                    >
                      {isSaving ? (
                        <Loader2 className='w-5 h-5 animate-spin' />
                      ) : (
                        'Appliquer'
                      )}
                    </motion.button>
                  </div>
                </div>

                {/* Renvoyer Facture */}
                {/*
                  <motion.button
                    onClick={handleResendInvoice}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className='flex items-center justify-center w-full md:w-auto p-2 border border-gray-300 rounded-lg text-gray-700 bg-white hover:bg-gray-50 transition-colors shadow-sm'
                  >
                    <Send className='w-4 h-4 mr-2' /> Renvoyer Facture
                  </motion.button>
                */}

                {/* Imprimer Facture */}
                <motion.button
                  onClick={handlePrintInvoice}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className='flex items-center justify-center w-full md:w-auto p-2 bg-blue-600 rounded-lg text-white hover:bg-blue-700 transition-colors shadow-sm print:hidden'
                >
                  <Printer className='w-4 h-4 mr-2' /> Imprimer Facture
                </motion.button>
              </div>
            </div>

            {/* Section 1: Récapitulatif et Statut */}
            <div className='grid grid-cols-1 md:grid-cols-3 gap-6 border-b pb-6'>
              <DetailCard
                icon={Calendar}
                title='Date de commande'
                value={formattedDate}
              />
              <DetailCard
                icon={User}
                title='Client'
                value={order.customerName}
                subtitle={order.customerEmail}
              />
              <div className='flex flex-col space-y-1 bg-gray-50 p-3 rounded-lg border'>
                <div className='flex items-center text-sm font-medium text-gray-600'>
                  <StatusIcon className='w-4 h-4 mr-2' /> Statut
                </div>
                <span
                  className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-bold ${statusIconConfig.color
                    .replace(/100|200/g, '200')
                    .replace(/800/g, '900')}`}
                >
                  {statusIconConfig.text}
                </span>
              </div>
            </div>

            {/* Section 2: Adresse de livraison */}
            {order?.is_shipping ? (
              <div>
                <h3 className='flex items-center text-xl font-semibold text-gray-900 mb-4 border-b pb-2'>
                  <MapPin className='w-5 h-5 mr-2 text-luxury-gold' /> Adresse
                  de Livraison
                </h3>
                {loadingAddress ? (
                  <p className='text-gray-500 flex items-center'>
                    <Loader2 className='w-4 h-4 mr-2 animate-spin' /> Chargement
                    de l'adresse...
                  </p>
                ) : shippingAddress ? (
                  <div className='space-y-1 text-gray-600'>
                    <p className='font-medium'>{shippingAddress.full_name}</p>
                    <p>{shippingAddress.street}</p>
                    <p>
                      {shippingAddress.postal_code} {shippingAddress.city},{' '}
                      {shippingAddress.country}
                    </p>
                    {shippingAddress.phone && (
                      <p>Tél: {shippingAddress.phone}</p>
                    )}
                  </div>
                ) : (
                  <p className='text-red-500'>
                    Adresse non trouvée ou erreur de chargement.
                  </p>
                )}
              </div>
            ) : (
              <div className='space-y-1 text-gray-600'>
                <p className='font-bold'>NB: Commande à récupérée en magasin</p>
              </div>
            )}

            {/* Section 3: Détails des articles */}
            <div>
              <h3 className='flex items-center text-xl font-semibold text-gray-900 mb-4 border-b pb-2'>
                <List className='w-5 h-5 mr-2 text-luxury-gold' /> Articles (
                {order.orderDetails.cartItems.length})
              </h3>
              <div className='space-y-4'>
                {order.orderDetails.cartItems.map((item, index) => (
                  <div
                    key={index}
                    className='flex items-center p-3 bg-gray-50 rounded-lg border'
                  >
                    <img
                      src={item.product.images[0]}
                      alt={item.product.name}
                      className='w-16 h-16 object-cover rounded mr-4'
                    />
                    <div className='flex-1'>
                      <p className='font-semibold text-gray-800'>
                        {item.product.name}
                      </p>
                      <p className='text-sm text-gray-500'>
                        Qté: {item.quantity} | Taille: {item.selectedSize} |
                        Couleur: {item.selectedColor}
                      </p>
                    </div>
                    <p className='font-bold text-gray-900'>
                      €{(item.product.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Section 4: Totaux */}
            <div className='border-t pt-6'>
              <h3 className='flex items-center text-xl font-semibold text-gray-900 mb-4 border-b pb-2'>
                <DollarSign className='w-5 h-5 mr-2 text-luxury-gold' />{' '}
                Facturation
              </h3>
              <div className='space-y-2 max-w-sm ml-auto text-right'>
                <TotalLine
                  label='Sous-total'
                  value={order.orderDetails.subtotal}
                />
                <TotalLine
                  label='Livraison'
                  value={order.orderDetails.shipping}
                />
                <div className='flex justify-between font-bold text-xl text-gray-900 pt-2 border-t border-gray-300'>
                  <span>Total Final</span>
                  <span>€{order.orderDetails.total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

// Composants utilitaires
const DetailCard = ({
  icon: Icon,
  title,
  value,
  subtitle
}: {
  icon: React.ElementType
  title: string
  value: string | number
  subtitle?: string
}) => (
  <div className='flex flex-col space-y-1 bg-gray-50 p-3 rounded-lg border'>
    <div className='flex items-center text-sm font-medium text-gray-600'>
      <Icon className='w-4 h-4 mr-2' /> {title}
    </div>
    <p className='text-lg font-bold text-gray-900'>{value}</p>
    {subtitle && <p className='text-xs text-gray-500 truncate'>{subtitle}</p>}
  </div>
)

const TotalLine = ({ label, value }: { label: string; value: number }) => (
  <div className='flex justify-between text-gray-700'>
    <span>{label}</span>
    <span>€{value.toFixed(2)}</span>
  </div>
)
