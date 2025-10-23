import { useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useAuthStore } from '../../store/useAuthStore'
import { LoadingSpinner } from './LoadingSpinner'

export const AuthInitializer = () => {
  const { initialize, isLoading, isAdmin, isAgent } = useAuthStore()
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    const initAuth = async () => {
      await initialize() // Appelle la fonction initialize pour charger l'utilisateur et le profil

      // Redirection après l'initialisation, seulement si nécessaire
      if (!isLoading) {
        const pathname = location.pathname
        if (isAdmin && !pathname.startsWith('/admin/')) {
          navigate('/admin/dashboard') // Redirige vers le tableau de bord pour les admins seulement si pas déjà dans /admin/
        } else if (isAgent && !pathname.startsWith('/admin/')) {
          navigate('/admin/catalogue') // Redirige vers le catalogue pour les agents seulement si pas déjà dans /admin/
        } else {
          // Pas de redirection pour les autres cas (par exemple, si déjà dans /admin/ ou pas de rôle spécifique)
        }
      }
    }

    initAuth()
  }, []) // Dépendances vides pour exécuter une seule fois au montage

  // Afficher un indicateur de chargement pendant l'initialisation
  if (isLoading) {
    return null
  }

  return null // Ne rend rien une fois l'initialisation terminée
}
