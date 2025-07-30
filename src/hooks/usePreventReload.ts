import { useEffect, useRef } from 'react';

interface UsePreventReloadOptions {
  when: boolean; // Quand empêcher le rechargement (ex: modal ouvert)
  message?: string; // Message d'avertissement
}

export const usePreventReload = ({ when, message = 'Vous avez des modifications non sauvegardées. Êtes-vous sûr de vouloir quitter ?' }: UsePreventReloadOptions) => {
  const preventedRef = useRef(false);

  useEffect(() => {
    if (!when) {
      preventedRef.current = false;
      return;
    }

    preventedRef.current = true;

    // Empêcher la fermeture de l'onglet/fenêtre
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (when) {
        e.preventDefault();
        e.returnValue = message;
        return message;
      }
    };

    // Empêcher la navigation avec le navigateur (boutons précédent/suivant)
    const handlePopState = (e: PopStateEvent) => {
      if (when) {
        e.preventDefault();
        // Remettre l'état précédent
        window.history.pushState(null, '', window.location.href);
        
        // Optionnel: afficher une confirmation
        const shouldLeave = window.confirm(message);
        if (shouldLeave) {
          // Si l'utilisateur confirme, on peut permettre la navigation
          preventedRef.current = false;
          window.history.back();
        }
      }
    };

    // Empêcher les raccourcis clavier de rechargement
    const handleKeyDown = (e: KeyboardEvent) => {
      if (when) {
        // Ctrl+R ou F5 (rechargement)
        if ((e.ctrlKey && e.key === 'r') || e.key === 'F5') {
          e.preventDefault();
          const shouldReload = window.confirm(message);
          if (shouldReload) {
            preventedRef.current = false;
            window.location.reload();
          }
        }
        
        // Ctrl+W (fermer onglet)
        if (e.ctrlKey && e.key === 'w') {
          e.preventDefault();
          const shouldClose = window.confirm(message);
          if (shouldClose) {
            preventedRef.current = false;
            window.close();
          }
        }
      }
    };

    // Empêcher la navigation programmatique
    const originalPushState = window.history.pushState;
    const originalReplaceState = window.history.replaceState;

    window.history.pushState = function(...args) {
      if (when && preventedRef.current) {
        const shouldNavigate = window.confirm(message);
        if (!shouldNavigate) {
          return;
        }
        preventedRef.current = false;
      }
      return originalPushState.apply(window.history, args);
    };

    window.history.replaceState = function(...args) {
      if (when && preventedRef.current) {
        const shouldNavigate = window.confirm(message);
        if (!shouldNavigate) {
          return;
        }
        preventedRef.current = false;
      }
      return originalReplaceState.apply(window.history, args);
    };

    // Ajouter les event listeners
    window.addEventListener('beforeunload', handleBeforeUnload);
    window.addEventListener('popstate', handlePopState);
    window.addEventListener('keydown', handleKeyDown);

    // Ajouter un état à l'historique pour détecter la navigation
    window.history.pushState(null, '', window.location.href);

    // Cleanup
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      window.removeEventListener('popstate', handlePopState);
      window.removeEventListener('keydown', handleKeyDown);
      
      // Restaurer les méthodes originales
      window.history.pushState = originalPushState;
      window.history.replaceState = originalReplaceState;
      
      preventedRef.current = false;
    };
  }, [when, message]);

  // Fonction pour désactiver manuellement la protection
  const disableProtection = () => {
    preventedRef.current = false;
  };

  return { disableProtection };
};
