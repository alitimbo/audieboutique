import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { User as SupabaseUser } from '@supabase/supabase-js'
import { supabase, authService } from '../lib/supabase'
import { User } from '../lib/supabase' // 👈 Importez l'interface User mise à jour

interface AuthState {
  user: SupabaseUser | null
  profile: User | null // 👈 Mettez à jour le type de profile
  isLoading: boolean
  isAuthenticated: boolean
  isAdmin: boolean
  isAgent: boolean
  // Actions
  signIn: (email: string, password: string) => Promise<void>
  signUp: (
    email: string,
    password: string,
    userData: { full_name: string }
  ) => Promise<void>

  signUpAgent: (
    email: string,
    password: string,
    userData: { full_name: string }
  ) => Promise<void>
  adminSignIn: (email: string, password: string) => Promise<void>
  resetPassword: (email: string) => Promise<void>
  updatePassword: (password: string) => Promise<void>
  signOut: () => Promise<void>
  updateFullName: (userId: string, newFullName: string) => Promise<void>
  initialize: () => Promise<void>
  setUser: (user: SupabaseUser | null) => void
  setProfile: (profile: User | null) => void // 👈 Mettez à jour le type de setProfile
}

export const useAuthStore = create<AuthState>()(
  persist(
    set => ({
      user: null,
      profile: null,
      isLoading: false,
      isAuthenticated: false,
      isAdmin: false,
      isAgent: false,

      signIn: async (email: string, password: string) => {
        try {
          set({ isLoading: true })
          const { user } = await authService.signIn(email, password)

          if (user) {
            const profile = await authService.getUserProfile(user.id)
            if (profile.is_active === true) {
              set({
                user,
                profile,
                isAuthenticated: true,
                isAdmin: profile?.role === 'admin', // 👈 Mise à jour
                isAgent: profile?.role === 'agent',
                isLoading: false
              })
            } else {
              await authService.signOut()
            }
          }
        } catch (error) {
          set({ isLoading: false })
          throw error
        }
      },

      signUp: async (
        email: string,
        password: string,
        userData: { full_name: string }
      ) => {
        try {
          set({ isLoading: true })
          const { user } = await authService.signUp(email, password, userData)

          if (user) {
            const profile = await authService.getUserProfile(user.id)
            set({
              user,
              profile,
              isAuthenticated: true,
              isAdmin: false, // Les nouveaux utilisateurs ne sont pas admin
              isAgent: false,
              isLoading: false
            })
          }
        } catch (error) {
          set({ isLoading: false })
          console.error('Signup error:', error)
          throw error
        }
      },

      signUpAgent: async (
        email: string,
        password: string,
        userData: { full_name: string }
      ) => {
        try {
          set({ isLoading: true })
          // Utilisation du nouveau service pour l'inscription d'un agent
          const { user } = await authService.signUpAgent(
            email,
            password,
            userData
          )

          if (user) {
            // Récupérer le profile (qui devrait avoir le rôle 'agent')
            const profile = await authService.getUserProfile(user.id)

            /*
            set({
              user,
              profile,
              isAuthenticated: true,
              isAdmin: profile?.role === 'admin',
              isAgent: profile?.role === 'agent', // Doit être TRUE ici
              isLoading: false
            })
              */
          }
        } catch (error) {
          set({ isLoading: false })
          console.error('Agent Signup error:', error)
          throw error
        }
      },

      adminSignIn: async (email: string, password: string) => {
        try {
          set({ isLoading: true })
          const { user } = await authService.adminSignIn(email, password)

          if (user) {
            const profile = await authService.getUserProfile(user.id)

            if (profile.is_active === true) {
              set({
                user,
                profile,
                isAuthenticated: true,
                isAdmin: profile?.role === 'admin', // 👈 Mise à jour
                isAgent: profile?.role === 'agent',
                isLoading: false
              })

              return profile
            } else {
              set({ isLoading: false })
              await authService.signOut()
            }
          }
        } catch (error) {
          set({ isLoading: false })
          throw new Error('Identifiant ou mot de passe invalide')
        }
      },

      resetPassword: async (email: string) => {
        try {
          set({ isLoading: true })
          await authService.resetPassword(email)
          set({ isLoading: false })
        } catch (error) {
          set({ isLoading: false })
          throw error
        }
      },

      updatePassword: async (password: string) => {
        try {
          set({ isLoading: true })
          await authService.updatePassword(password)
          set({ isLoading: false })
        } catch (error) {
          set({ isLoading: false })
          throw error
        }
      },

      signOut: async () => {
        try {
          set({ isLoading: true })
          await authService.signOut()
          set({
            user: null,
            profile: null,
            isAuthenticated: false,
            isAdmin: false,
            isAgent: false,
            isLoading: false
          })
        } catch (error) {
          set({ isLoading: false })
          throw error
        }
      },

      updateFullName: async (userId: string, newFullName: string) => {
        try {
          set({ isLoading: true })
          // 1. Appel du service pour la mise à jour BDD (auth.users + public.users)
          const updatedProfile = await authService.updateFullName(
            userId,
            newFullName
          )

          // 2. Mise à jour de l'état local du store
          set(state => ({
            profile: updatedProfile, // Mise à jour du profile complet depuis la BDD
            isLoading: false,
            // Mise à jour de l'objet 'user' (Supabase) pour le 'full_name' dans les métadonnées
            user: state.user
              ? {
                  ...state.user,
                  user_metadata: {
                    ...state.user.user_metadata,
                    full_name: newFullName
                  }
                }
              : null
          }))
        } catch (error) {
          set({ isLoading: false })
          console.error('Erreur lors de la mise à jour du nom:', error)
          throw error
        }
      },

      initialize: async () => {
        try {
          set({ isLoading: true })
          const user = await authService.getCurrentUser()

          if (user) {
            const profile = await authService.getUserProfile(user.id)

            set({
              user,
              profile,
              isAuthenticated: true,
              isAdmin: profile?.role === 'admin', // 👈 Mise à jour
              isAgent: profile?.role === 'agent',
              isLoading: false
            })
          } else {
            set({
              user: null,
              profile: null,
              isAuthenticated: false,
              isAdmin: false,
              isAgent: false,
              isLoading: false
            })
          }
        } catch (error) {
          set({
            user: null,
            profile: null,
            isAuthenticated: false,
            isAdmin: false,
            isAgent: false,
            isLoading: false
          })
        }
      },

      setUser: (user: SupabaseUser | null) => {
        set({ user, isAuthenticated: !!user })
      },

      setProfile: (profile: User | null) => {
        // 👈 Mise à jour du type
        set({ profile })
      }
    }),
    {
      name: 'auth-storage',
      partialize: state => ({
        user: state.user,
        profile: state.profile,
        isAuthenticated: state.isAuthenticated,
        isAdmin: state.isAdmin,
        isAgent: state.isAgent
      })
    }
  )
)

// Écouter les changements d'authentification
supabase.auth.onAuthStateChange((event, session) => {
  const { setUser, initialize } = useAuthStore.getState()

  if (event === 'SIGNED_IN' && session?.user) {
    setUser(session.user)
    initialize()
  } else if (event === 'SIGNED_OUT') {
    setUser(null)
  }
})
