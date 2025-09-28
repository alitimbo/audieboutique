import { AuthSection } from '../components/Cart/AuthSection'
import { useAuthStore } from '../store/useAuthStore'
import { toast } from 'sonner'
import { useNavigate } from 'react-router-dom'

export function Login () {
  const navigate = useNavigate()
  const { user, isAuthenticated, signUp, signIn } = useAuthStore()

  const handleLogin = async (email: string, password: string) => {
    //console.log('Login:', { email, password })
    try {
      await signIn(email, password)
      navigate('/account')
      location.reload()
      toast.success('Connexion réussie !')
    } catch (error) {
      toast.error('Échec de la connexion. Vérifiez vos identifiants.')
      console.error('Login error:', error)
    }
  }

  const handleRegister = async (
    email: string,
    password: string,
    name: string
  ) => {
    try {
      await signUp(email, password, { full_name: name })
      navigate('/account')
      location.reload()
      toast.success('Inscription réussie ! Vous êtes maintenant connecté.')
    } catch (error) {
      // 1. Déterminer le message d'erreur
      let errorMessage =
        "Une erreur inconnue est survenue lors de l'inscription."

      if (error && typeof error === 'object' && 'message' in error) {
        // Si c'est une erreur Supabase ou une erreur standard avec une propriété 'message'
        errorMessage = (error as { message: string }).message // 2. Adapter le message pour l'utilisateur (optionnel mais recommandé)
        if (errorMessage.includes('at least 6 characters')) {
          errorMessage = 'Le mot de passe doit contenir au moins 6 caractères.'
        } else if (errorMessage.includes('already registered')) {
          errorMessage = 'Cette adresse e-mail est déjà enregistrée.'
        } // Ajoutez d'autres traductions si nécessaire
      } // 3. Afficher le message d'erreur spécifique
      toast.error(`Erreur: ${errorMessage}`) // 4. Afficher l'erreur complète dans la console pour le débogage
      console.error('Registration error:', error)
    }
  }

  const handleGoogleLogin = async () => {
    console.log('Google login')
  }

  const handleContinueAsGuest = () => {
    console.log('Continue as guest')
  }

  const handleSelectedAddress = () => {}
  return (
    <>
      <AuthSection
        isLoggedIn={isAuthenticated}
        user={
          user
            ? {
                id: user.id,
                name: user.user_metadata?.full_name || 'Utilisateur',
                email: user.email || ''
              }
            : undefined
        }
        onLogin={handleLogin}
        onRegister={handleRegister}
        onGoogleLogin={handleGoogleLogin}
        onContinueAsGuest={handleContinueAsGuest}
        onSelectedAddress={handleSelectedAddress}
      />
    </>
  )
}
