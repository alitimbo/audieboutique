import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useAuthStore } from '../../store/useAuthStore'
import { LoadingPage } from '../ui/LoadingSpinner'

interface ProtectedAdminRouteProps {
  children: React.ReactNode
}

export const ProtectedAdminRoute: React.FC<ProtectedAdminRouteProps> = ({
  children
}) => {
  // Récupération des nouveaux états
  const { isAuthenticated, isAdmin, isAgent, isLoading } = useAuthStore()
  const location = useLocation() // 1. Vérifie si le chargement est terminé

  if (isLoading) {
    return <LoadingPage />
  }

  // 2. Détermine si l'utilisateur a l'accès requis au tableau de bord
  // L'accès est donné si l'utilisateur est authentifié ET (admin OU agent)
  const hasDashboardAccess = isAuthenticated && (isAdmin || isAgent)

  if (!hasDashboardAccess) {
    // Rediriger vers la page de connexion admin avec l'URL de retour
    return <Navigate to='/admin/login' state={{ from: location }} replace />
  }

  return <>{children}</>
}

export default ProtectedAdminRoute
