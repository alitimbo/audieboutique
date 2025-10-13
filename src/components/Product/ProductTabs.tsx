import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Package, Truck, RotateCcw, Shield } from 'lucide-react'

interface ProductTabsProps {
  description: string
  specifications?: { [key: string]: string }
}

export const ProductTabs: React.FC<ProductTabsProps> = ({
  description,
  specifications
}) => {

  console.log(specifications)
  const [activeTab, setActiveTab] = useState('description')

  const tabs = [
    { id: 'description', label: 'Description', icon: Package },
    { id: 'delivery', label: 'Livraison & Retours', icon: Truck }
  ]

  const tabContent = {
    description: (
      <div className='prose prose-lg max-w-none'>
        <p className='text-luxury-gray-700 leading-relaxed mb-6'>
          {description}
        </p>

        {specifications && (
          <div className='mt-8'>
            <h4 className='text-xl font-semibold text-luxury-black mb-4'>
              Caractéristiques
            </h4>
            {Object.entries(specifications).map(([key, value]) => (
              <div
                key={key}
                className='flex justify-between py-2 border-b border-luxury-gray-200'
              >
                <span className='font-medium text-luxury-black'>{key}</span>
                <span className='text-luxury-gray-600'>{value}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    ),
    delivery: (
      <div className='space-y-8'>
        <div>
          <div className='flex items-center space-x-3 mb-4'>
            <Truck className='w-6 h-6 text-luxury-red' />
            <h4 className='text-xl font-semibold text-luxury-black'>
              Livraison
            </h4>
          </div>
          <div className='space-y-3 text-luxury-gray-700'>
            <p>
              <strong>Livraison gratuite</strong> dès 80€ d'achat partout en
              Martinique
            </p>
            <p>
              <strong>Livraison express</strong> sous 24h pour Fort-de-France et
              environs
            </p>
            <p>
              <strong>Livraison standard</strong> sous 48-72h pour le reste de
              la Martinique
            </p>
            <p>
              <strong>Suivi de commande</strong> par email
            </p>
          </div>
        </div>

        <div>
          <div className='flex items-center space-x-3 mb-4'>
            <RotateCcw className='w-6 h-6 text-luxury-red' />
            <h4 className='text-xl font-semibold text-luxury-black'>
              Retours & Échanges
            </h4>
          </div>
          <div className='space-y-3 text-luxury-gray-700'>
            <p>
              <strong>30 jours</strong> pour retourner ou échanger votre article
            </p>
            <p>
              <strong>Retour gratuit</strong> en point relais ou à domicile
            </p>
            <p>
              <strong>Remboursement</strong> sous 5-7 jours ouvrés
            </p>
            <p>
              <strong>Articles neufs</strong> avec étiquettes obligatoires
            </p>
          </div>
        </div>

        <div>
          <div className='flex items-center space-x-3 mb-4'>
            <Shield className='w-6 h-6 text-luxury-red' />
            <h4 className='text-xl font-semibold text-luxury-black'>
              Garanties
            </h4>
          </div>
          <div className='space-y-3 text-luxury-gray-700'>
            <p>
              <strong>Paiement sécurisé</strong> SSL et cryptage bancaire
            </p>
            <p>
              <strong>Protection acheteur</strong> garantie satisfaction
            </p>
            <p>
              <strong>Service client</strong> disponible 6j/7
            </p>
            <p>
              <strong>Qualité premium</strong> contrôlée avant expédition
            </p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.4 }}
      className='bg-luxury-white rounded-3xl p-8 shadow-luxury'
    >
      {/* Tab Navigation */}
      <div className='flex space-x-1 mb-8 bg-luxury-gray-100 p-1 rounded-2xl'>
        {tabs.map(tab => {
          const Icon = tab.icon
          return (
            <motion.button
              key={tab.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 flex items-center justify-center space-x-2 py-3 px-4 rounded-xl font-medium transition-all duration-300 ${
                activeTab === tab.id
                  ? 'bg-luxury-white text-luxury-red shadow-sm'
                  : 'text-luxury-gray-600 hover:text-luxury-black'
              }`}
            >
              <Icon className='w-5 h-5' />
              <span>{tab.label}</span>
            </motion.button>
          )
        })}
      </div>

      {/* Tab Content */}
      <AnimatePresence mode='wait'>
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          {tabContent[activeTab as keyof typeof tabContent]}
        </motion.div>
      </AnimatePresence>
    </motion.div>
  )
}
