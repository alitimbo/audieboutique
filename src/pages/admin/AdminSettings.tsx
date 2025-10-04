import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { toast } from 'sonner'
import {
  Save,
  Mail,
  Globe,
  Shield,
  Bell,
  Palette,
  Database,
  Key,
  Eye,
  EyeOff
} from 'lucide-react'

interface SettingsSection {
  id: string
  title: string
  icon: React.ComponentType<{ className?: string }>
}

const settingsSections: SettingsSection[] = [
  { id: 'general', title: 'Général', icon: Globe },
  { id: 'email', title: 'Email', icon: Mail },
  { id: 'security', title: 'Sécurité', icon: Shield },
  { id: 'notifications', title: 'Notifications', icon: Bell },
  { id: 'appearance', title: 'Apparence', icon: Palette },
  { id: 'database', title: 'Base de données', icon: Database }
]

export const AdminSettings: React.FC = () => {
  const [activeSection, setActiveSection] = useState('general')
  const [isLoading, setIsLoading] = useState(false)
  const [showApiKey, setShowApiKey] = useState(false)

  // États pour les différentes sections
  const [generalSettings, setGeneralSettings] = useState({
    siteName: 'Audieboutique',
    siteDescription: 'Votre boutique audio de luxe',
    contactEmail: 'contact@audieboutique.com',
    phone: '+33 1 23 45 67 89',
    address: '123 Rue de la Musique, 75001 Paris',
    currency: 'EUR',
    language: 'fr',
    timezone: 'Europe/Paris'
  })

  const [emailSettings, setEmailSettings] = useState({
    smtpHost: 'smtp.gmail.com',
    smtpPort: '587',
    smtpUser: 'noreply@audieboutique.com',
    smtpPassword: '',
    fromName: 'Audieboutique',
    fromEmail: 'noreply@audieboutique.com'
  })

  const [securitySettings, setSecuritySettings] = useState({
    twoFactorEnabled: false,
    sessionTimeout: '24',
    passwordMinLength: '8',
    requireSpecialChars: true,
    apiKey: 'sk_test_1234567890abcdef...',
    allowRegistration: true
  })

  const [notificationSettings, setNotificationSettings] = useState({
    newOrderEmail: true,
    lowStockEmail: true,
    newUserEmail: true,
    systemUpdates: true,
    marketingEmails: false
  })

  const handleSaveSettings = async () => {
    setIsLoading(true)
    try {
      // Ici vous pourrez intégrer la sauvegarde en base de données
      await new Promise(resolve => setTimeout(resolve, 1000)) // Simulation
      toast.success('Paramètres sauvegardés avec succès')
    } catch (error) {
      toast.error('Erreur lors de la sauvegarde')
    } finally {
      setIsLoading(false)
    }
  }

  const renderGeneralSettings = () => (
    <div className='space-y-6'>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
        <div>
          <label className='block text-sm font-medium text-gray-700 mb-2'>
            Nom du site
          </label>
          <input
            type='text'
            value={generalSettings.siteName}
            onChange={e =>
              setGeneralSettings({
                ...generalSettings,
                siteName: e.target.value
              })
            }
            className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-luxury-gold/50'
          />
        </div>
        <div>
          <label className='block text-sm font-medium text-gray-700 mb-2'>
            Email de contact
          </label>
          <input
            type='email'
            value={generalSettings.contactEmail}
            onChange={e =>
              setGeneralSettings({
                ...generalSettings,
                contactEmail: e.target.value
              })
            }
            className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-luxury-gold/50'
          />
        </div>
      </div>

      <div>
        <label className='block text-sm font-medium text-gray-700 mb-2'>
          Description du site
        </label>
        <textarea
          value={generalSettings.siteDescription}
          onChange={e =>
            setGeneralSettings({
              ...generalSettings,
              siteDescription: e.target.value
            })
          }
          rows={3}
          className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-luxury-gold/50'
        />
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
        <div>
          <label className='block text-sm font-medium text-gray-700 mb-2'>
            Téléphone
          </label>
          <input
            type='tel'
            value={generalSettings.phone}
            onChange={e =>
              setGeneralSettings({ ...generalSettings, phone: e.target.value })
            }
            className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-luxury-gold/50'
          />
        </div>
        <div>
          <label className='block text-sm font-medium text-gray-700 mb-2'>
            Devise
          </label>
          <select
            value={generalSettings.currency}
            onChange={e =>
              setGeneralSettings({
                ...generalSettings,
                currency: e.target.value
              })
            }
            className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-gold/50 focus:border-accent-gold/50 transition-all'
          >
            <option value='EUR'>Euro (€)</option>
            <option value='USD'>Dollar ($)</option>
            <option value='GBP'>Livre (£)</option>
          </select>
        </div>
      </div>

      <div>
        <label className='block text-sm font-medium text-gray-700 mb-2'>
          Adresse
        </label>
        <input
          type='text'
          value={generalSettings.address}
          onChange={e =>
            setGeneralSettings({ ...generalSettings, address: e.target.value })
          }
          className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-gold/50 focus:border-accent-gold/50 transition-all'
        />
      </div>
    </div>
  )

  const renderEmailSettings = () => (
    <div className='space-y-6'>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
        <div>
          <label className='block text-sm font-medium text-gray-700 mb-2'>
            Serveur SMTP
          </label>
          <input
            type='text'
            value={emailSettings.smtpHost}
            onChange={e =>
              setEmailSettings({ ...emailSettings, smtpHost: e.target.value })
            }
            className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-gold/50 focus:border-accent-gold/50 transition-all'
          />
        </div>
        <div>
          <label className='block text-sm font-medium text-gray-700 mb-2'>
            Port SMTP
          </label>
          <input
            type='text'
            value={emailSettings.smtpPort}
            onChange={e =>
              setEmailSettings({ ...emailSettings, smtpPort: e.target.value })
            }
            className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-gold/50 focus:border-accent-gold/50 transition-all'
          />
        </div>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
        <div>
          <label className='block text-sm font-medium text-gray-700 mb-2'>
            Nom d'expéditeur
          </label>
          <input
            type='text'
            value={emailSettings.fromName}
            onChange={e =>
              setEmailSettings({ ...emailSettings, fromName: e.target.value })
            }
            className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-gold/50 focus:border-accent-gold/50 transition-all'
          />
        </div>
        <div>
          <label className='block text-sm font-medium text-gray-700 mb-2'>
            Email d'expéditeur
          </label>
          <input
            type='email'
            value={emailSettings.fromEmail}
            onChange={e =>
              setEmailSettings({ ...emailSettings, fromEmail: e.target.value })
            }
            className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-gold/50 focus:border-accent-gold/50 transition-all'
          />
        </div>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
        <div>
          <label className='block text-sm font-medium text-gray-700 mb-2'>
            Utilisateur SMTP
          </label>
          <input
            type='email'
            value={emailSettings.smtpUser}
            onChange={e =>
              setEmailSettings({ ...emailSettings, smtpUser: e.target.value })
            }
            className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-gold/50 focus:border-accent-gold/50 transition-all'
          />
        </div>
        <div>
          <label className='block text-sm font-medium text-gray-700 mb-2'>
            Mot de passe SMTP
          </label>
          <input
            type='password'
            value={emailSettings.smtpPassword}
            onChange={e =>
              setEmailSettings({
                ...emailSettings,
                smtpPassword: e.target.value
              })
            }
            className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-gold/50 focus:border-accent-gold/50 transition-all'
            placeholder='••••••••'
          />
        </div>
      </div>
    </div>
  )

  const renderSecuritySettings = () => (
    <div className='space-y-6'>
      <div className='flex items-center justify-between p-4 bg-gray-50 rounded-lg'>
        <div>
          <h4 className='font-medium text-gray-900'>
            Authentification à deux facteurs
          </h4>
          <p className='text-sm text-gray-600'>
            Ajouter une couche de sécurité supplémentaire
          </p>
        </div>
        <label className='relative inline-flex items-center cursor-pointer'>
          <input
            type='checkbox'
            checked={securitySettings.twoFactorEnabled}
            onChange={e =>
              setSecuritySettings({
                ...securitySettings,
                twoFactorEnabled: e.target.checked
              })
            }
            className='sr-only peer'
          />
          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-accent-gold/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-accent-gold"></div>
        </label>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
        <div>
          <label className='block text-sm font-medium text-gray-700 mb-2'>
            Durée de session (heures)
          </label>
          <input
            type='number'
            value={securitySettings.sessionTimeout}
            onChange={e =>
              setSecuritySettings({
                ...securitySettings,
                sessionTimeout: e.target.value
              })
            }
            className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-gold/50 focus:border-accent-gold/50 transition-all'
          />
        </div>
        <div>
          <label className='block text-sm font-medium text-gray-700 mb-2'>
            Longueur minimale du mot de passe
          </label>
          <input
            type='number'
            value={securitySettings.passwordMinLength}
            onChange={e =>
              setSecuritySettings({
                ...securitySettings,
                passwordMinLength: e.target.value
              })
            }
            className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-gold/50 focus:border-accent-gold/50 transition-all'
          />
        </div>
      </div>

      <div>
        <label className='block text-sm font-medium text-gray-700 mb-2'>
          Clé API
        </label>
        <div className='relative'>
          <input
            type={showApiKey ? 'text' : 'password'}
            value={securitySettings.apiKey}
            readOnly
            className='w-full px-3 py-2 pr-20 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-accent-gold/50 focus:border-accent-gold/50 transition-all'
          />
          <div className='absolute inset-y-0 right-0 flex items-center space-x-2 pr-3'>
            <button
              type='button'
              onClick={() => setShowApiKey(!showApiKey)}
              className='text-gray-400 hover:text-gray-600'
            >
              {showApiKey ? (
                <EyeOff className='w-4 h-4' />
              ) : (
                <Eye className='w-4 h-4' />
              )}
            </button>
            <button
              type='button'
              className='text-gray-400 hover:text-red-600'
              title='Régénérer'
            >
              <Key className='w-4 h-4' />
            </button>
          </div>
        </div>
      </div>

      <div className='flex items-center justify-between p-4 bg-gray-50 rounded-lg'>
        <div>
          <h4 className='font-medium text-gray-900'>
            Autoriser les inscriptions
          </h4>
          <p className='text-sm text-gray-600'>
            Permettre aux nouveaux utilisateurs de s'inscrire
          </p>
        </div>
        <label className='relative inline-flex items-center cursor-pointer'>
          <input
            type='checkbox'
            checked={securitySettings.allowRegistration}
            onChange={e =>
              setSecuritySettings({
                ...securitySettings,
                allowRegistration: e.target.checked
              })
            }
            className='sr-only peer'
          />
          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-accent-gold/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-accent-gold"></div>
        </label>
      </div>
    </div>
  )

  const renderNotificationSettings = () => (
    <div className='space-y-4'>
      {Object.entries(notificationSettings).map(([key, value]) => {
        const labels = {
          newOrderEmail: 'Nouvelles commandes',
          lowStockEmail: 'Stock faible',
          newUserEmail: 'Nouveaux utilisateurs',
          systemUpdates: 'Mises à jour système',
          marketingEmails: 'Emails marketing'
        }

        return (
          <div
            key={key}
            className='flex items-center justify-between p-4 bg-gray-50 rounded-lg'
          >
            <div>
              <h4 className='font-medium text-gray-900'>
                {labels[key as keyof typeof labels]}
              </h4>
              <p className='text-sm text-gray-600'>
                Recevoir des notifications par email
              </p>
            </div>
            <label className='relative inline-flex items-center cursor-pointer'>
              <input
                type='checkbox'
                checked={value}
                onChange={e =>
                  setNotificationSettings({
                    ...notificationSettings,
                    [key]: e.target.checked
                  })
                }
                className='sr-only peer'
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-accent-gold/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-accent-gold"></div>
            </label>
          </div>
        )
      })}
    </div>
  )

  const renderContent = () => {
    switch (activeSection) {
      case 'general':
        return renderGeneralSettings()
      case 'email':
        return renderEmailSettings()
      case 'security':
        return renderSecuritySettings()
      case 'notifications':
        return renderNotificationSettings()
      default:
        return (
          <div className='text-center py-8 text-gray-500'>
            Section en cours de développement
          </div>
        )
    }
  }

  return (
    <div className='space-y-6'>
      {/* En-tête */}

      <div className='grid grid-cols-1 lg:grid-cols-4 gap-6'>
        {/* Navigation des sections */}
        <div className='lg:col-span-1'>
          <nav className='space-y-1'>
            {settingsSections.map(section => {
              const Icon = section.icon
              return (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-all ${
                    activeSection === section.id
                      ? 'bg-accent-gold text-luxury-black'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  }`}
                >
                  <Icon className='w-5 h-5 mr-3' />
                  {section.title}
                </button>
              )
            })}
          </nav>
        </div>

        {/* Contenu de la section */}
        <div className='lg:col-span-3'>
          <div className='bg-white rounded-lg shadow-sm border border-gray-200 p-6'>
            <div className='flex items-center justify-between mb-6'>
              <h2 className='text-xl font-semibold text-gray-900'>
                {settingsSections.find(s => s.id === activeSection)?.title}
              </h2>
              <motion.button
                onClick={handleSaveSettings}
                disabled={isLoading}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className='bg-accent-gold hover:bg-accent-gold/90 text-luxury-black font-semibold px-6 py-2 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center'
              >
                <Save className='w-4 h-4 mr-2' />
                {isLoading ? 'Sauvegarde...' : 'Sauvegarder'}
              </motion.button>
            </div>

            {renderContent()}
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminSettings
