import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { toast } from 'sonner'
import { Save, Key, Eye, EyeOff, User, Shield } from 'lucide-react'
import { useAuthStore } from '../../store/useAuthStore' // Assurez-vous que ce chemin est correct

/**
 * Composant pour la gestion des paramètres du profil utilisateur (Nom et Mot de passe).
 * Ce composant a été simplifié pour ne contenir que ces deux sections.
 */
export const AdminSettings: React.FC = () => {
  // Récupération du profil et des fonctions d'authentification simulées
  const { profile, updateFullName, updatePassword } = useAuthStore()

  // États pour la section 'Nom Complet'
  const [fullName, setFullName] = useState(profile?.full_name || '')
  const [isLoadingName, setIsLoadingName] = useState(false)

  // États pour la section 'Mot de passe'
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmNewPassword, setConfirmNewPassword] = useState('')
  const [isLoadingPassword, setIsLoadingPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)

  /**
   * Gère la mise à jour du nom complet de l'utilisateur.
   * Cette fonction doit appeler votre logique de mise à jour Supabase.
   */
  const handleUpdateName = async () => {
    const trimmedName = fullName.trim()
    if (!trimmedName) {
      return toast.error('Le nom complet ne peut pas être vide.')
    }

    setIsLoadingName(true)
    try {
      // TODO: Remplacez ceci par l'appel réel à Supabase via votre store
      if (profile) {
        await updateFullName(profile?.id, trimmedName)
        toast.success('Nom mis à jour avec succès.')
      }
    } catch (error) {
      console.error('Erreur de mise à jour du nom:', error)
      toast.error('Échec de la mise à jour du nom. (Voir console)')
    } finally {
      setIsLoadingName(false)
    }
  }

  /**
   * Gère le changement de mot de passe.
   * Cette fonction doit appeler votre logique de changement de mot de passe Supabase.
   */
  const handleChangePassword = async () => {
    if (!newPassword || !confirmNewPassword) {
      return toast.error('Veuillez remplir tous les champs de mot de passe.')
    }
    if (newPassword.length < 6) {
      // Supabase recommande 6 caractères minimum par défaut
      return toast.error(
        'Le nouveau mot de passe doit contenir au moins 6 caractères.'
      )
    }
    if (newPassword !== confirmNewPassword) {
      return toast.error('Les nouveaux mots de passe ne correspondent pas.')
    }

    setIsLoadingPassword(true)
    try {
      // TODO: Remplacez ceci par l'appel réel à Supabase via votre store.
      // NOTE: Le changement de mot de passe dans Supabase nécessite souvent
      // que l'utilisateur se soit connecté récemment pour des raisons de sécurité.
      await updatePassword(newPassword)
      await new Promise(resolve => setTimeout(resolve, 1500)) // Simulation

      toast.success('Mot de passe mis à jour avec succès.')
      // Réinitialiser les champs après succès
      setCurrentPassword('')
      setNewPassword('')
      setConfirmNewPassword('')
    } catch (error) {
      console.error('Erreur de changement de mot de passe:', error)
      toast.error(
        'Échec du changement de mot de passe. Vérifiez le mot de passe actuel.'
      )
    } finally {
      setIsLoadingPassword(false)
    }
  }

  return (
    <div className='max-w-4xl mx-auto space-y-8 p-4 sm:p-6 lg:p-8'>
      <h1 className='text-3xl font-bold text-gray-900 mb-6'>
        Paramètres du Profil
      </h1>

      {/* Carte 1: Nom Complet */}
      <div className='bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden'>
        <div className='p-6 border-b border-gray-100 bg-gray-50 flex items-center space-x-3'>
          <User className='w-6 h-6 text-accent-gold' />
          <h2 className='text-xl font-semibold text-gray-800'>
            Mise à jour du Nom
          </h2>
        </div>

        <div className='p-6 space-y-6'>
          <div>
            <label className='block text-sm font-medium text-gray-700 mb-2'>
              Nom Complet
            </label>
            <input
              type='text'
              value={fullName}
              onChange={e => setFullName(e.target.value)}
              className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-gold/50 focus:border-accent-gold transition-all shadow-sm'
              placeholder='Votre nom et prénom'
            />
          </div>

          <motion.button
            onClick={handleUpdateName}
            disabled={isLoadingName || fullName.trim() === profile?.full_name}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className='w-full sm:w-auto bg-accent-gold hover:bg-accent-gold/90 text-luxury-black font-semibold px-6 py-2 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center justify-center'
          >
            <Save className='w-4 h-4 mr-2' />
            {isLoadingName ? 'Mise à jour...' : 'Sauvegarder le Nom'}
          </motion.button>
        </div>
      </div>

      {/* Carte 2: Mot de passe */}
      <div className='bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden'>
        <div className='p-6 border-b border-gray-100 bg-gray-50 flex items-center space-x-3'>
          <Shield className='w-6 h-6 text-accent-gold' />
          <h2 className='text-xl font-semibold text-gray-800'>
            Changer le Mot de Passe
          </h2>
        </div>

        <div className='p-6 space-y-6'>
          {/* Mot de passe actuel */}
          {/*
            <div className='relative'>
              <label className='block text-sm font-medium text-gray-700 mb-2'>
                Mot de passe actuel
              </label>
              <input
                type={showNewPassword ? 'text' : 'password'}
                value={currentPassword}
                onChange={e => setCurrentPassword(e.target.value)}
                className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-gold/50 focus:border-accent-gold transition-all shadow-sm pr-12'
                placeholder='••••••••'
              />
            </div>
          */}

          {/* Nouveau Mot de passe */}
          <div className='relative'>
            <label className='block text-sm font-medium text-gray-700 mb-2'>
              Nouveau mot de passe
            </label>
            <input
              type={showNewPassword ? 'text' : 'password'}
              value={newPassword}
              onChange={e => setNewPassword(e.target.value)}
              className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-gold/50 focus:border-accent-gold transition-all shadow-sm pr-12'
              placeholder='•••••••• (minimum 6 caractères)'
            />
            <button
              type='button'
              onClick={() => setShowNewPassword(!showNewPassword)}
              className='absolute inset-y-0 right-0 top-6 flex items-center pr-3 text-gray-400 hover:text-gray-600'
            >
              {showNewPassword ? (
                <EyeOff className='w-5 h-5' />
              ) : (
                <Eye className='w-5 h-5' />
              )}
            </button>
          </div>

          {/* Confirmer Nouveau Mot de passe */}
          <div className='relative'>
            <label className='block text-sm font-medium text-gray-700 mb-2'>
              Confirmer le nouveau mot de passe
            </label>
            <input
              type={showNewPassword ? 'text' : 'password'}
              value={confirmNewPassword}
              onChange={e => setConfirmNewPassword(e.target.value)}
              className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-gold/50 focus:border-accent-gold transition-all shadow-sm pr-12'
              placeholder='••••••••'
            />
          </div>

          <motion.button
            onClick={handleChangePassword}
            disabled={
              isLoadingPassword ||
              !currentPassword ||
              !newPassword ||
              !confirmNewPassword
            }
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className='w-full sm:w-auto bg-luxury-black hover:bg-gray-800 text-white font-semibold px-6 py-2 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center justify-center'
          >
            <Key className='w-4 h-4 mr-2' />
            {isLoadingPassword
              ? 'Changement en cours...'
              : 'Changer le Mot de Passe'}
          </motion.button>
        </div>
      </div>
    </div>
  )
}

export default AdminSettings
