import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/useAuthStore';

export const AuthInitializer = () => {
  const { initialize, isLoading, isAdmin, isAgent } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    const initAuth = async () => {
      await initialize(); // Appelle la fonction initialize pour charger l'utilisateur et le profil

      // Redirection après l'initialisation
      if (!isLoading) {
        if (isAdmin) {
          navigate('/admin/dashboard'); // Redirige vers le tableau de bord pour les admins
        } else if (isAgent) {
          navigate('/admin/catalogue'); // Redirige vers le catalogue pour les agents
        } else {
          //navigate('/login'); // Redirige vers la page de connexion si aucun rôle spécifique
        }
      }
    };

    initAuth();
  }, [initialize, isLoading, isAdmin, isAgent, navigate]);

  // Afficher un indicateur de chargement pendant l'initialisation
  if (isLoading) {
    return <div>Chargement...</div>;
  }

  return null; // Ne rend rien une fois l'initialisation terminée
};