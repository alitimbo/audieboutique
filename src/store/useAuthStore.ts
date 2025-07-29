import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User as SupabaseUser } from '@supabase/supabase-js';
import { supabase, authService } from '../lib/supabase';

interface AuthState {
  user: SupabaseUser | null;
  profile: any | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  isAdmin: boolean;
  
  // Actions
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, userData: { full_name: string }) => Promise<void>;
  adminSignIn: (email: string, password: string) => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  updatePassword: (password: string) => Promise<void>;
  signOut: () => Promise<void>;
  initialize: () => Promise<void>;
  setUser: (user: SupabaseUser | null) => void;
  setProfile: (profile: any | null) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      profile: null,
      isLoading: false,
      isAuthenticated: false,
      isAdmin: false,

      signIn: async (email: string, password: string) => {
        try {
          set({ isLoading: true });
          const { user } = await authService.signIn(email, password);
          
          if (user) {
            // Récupérer le profil utilisateur
            const profile = await authService.getUserProfile(user.id);
            
            set({ 
              user, 
              profile,
              isAuthenticated: true,
              isAdmin: profile?.is_admin || false,
              isLoading: false 
            });
          }
        } catch (error) {
          set({ isLoading: false });
          throw error;
        }
      },

      signUp: async (email: string, password: string, userData: { full_name: string }) => {
        try {
          set({ isLoading: true });
          const { user } = await authService.signUp(email, password, userData);
          
          if (user) {
            // Récupérer le profil utilisateur créé
            const profile = await authService.getUserProfile(user.id);
            
            set({ 
              user, 
              profile,
              isAuthenticated: true,
              isAdmin: false,
              isLoading: false 
            });
          }
        } catch (error) {
          set({ isLoading: false });
          throw error;
        }
      },

      adminSignIn: async (email: string, password: string) => {
        try {
          set({ isLoading: true });
          const { user } = await authService.adminSignIn(email, password);
          
          if (user) {
            // Récupérer le profil utilisateur
            const profile = await authService.getUserProfile(user.id);
            
            set({ 
              user, 
              profile,
              isAuthenticated: true,
              isAdmin: true,
              isLoading: false 
            });
          }
        } catch (error) {
          set({ isLoading: false });
          throw error;
        }
      },

      resetPassword: async (email: string) => {
        try {
          set({ isLoading: true });
          await authService.resetPassword(email);
          set({ isLoading: false });
        } catch (error) {
          set({ isLoading: false });
          throw error;
        }
      },

      updatePassword: async (password: string) => {
        try {
          set({ isLoading: true });
          await authService.updatePassword(password);
          set({ isLoading: false });
        } catch (error) {
          set({ isLoading: false });
          throw error;
        }
      },

      signOut: async () => {
        try {
          set({ isLoading: true });
          await authService.signOut();
          set({ 
            user: null, 
            profile: null,
            isAuthenticated: false,
            isAdmin: false,
            isLoading: false 
          });
        } catch (error) {
          set({ isLoading: false });
          throw error;
        }
      },

      initialize: async () => {
        try {
          set({ isLoading: true });
          const user = await authService.getCurrentUser();
          
          if (user) {
            const profile = await authService.getUserProfile(user.id);
            
            set({ 
              user, 
              profile,
              isAuthenticated: true,
              isAdmin: profile?.is_admin || false,
              isLoading: false 
            });
          } else {
            set({ 
              user: null, 
              profile: null,
              isAuthenticated: false,
              isAdmin: false,
              isLoading: false 
            });
          }
        } catch (error) {
          set({ 
            user: null, 
            profile: null,
            isAuthenticated: false,
            isAdmin: false,
            isLoading: false 
          });
        }
      },

      setUser: (user: SupabaseUser | null) => {
        set({ user, isAuthenticated: !!user });
      },

      setProfile: (profile: any | null) => {
        set({ profile });
      }
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        user: state.user,
        profile: state.profile,
        isAuthenticated: state.isAuthenticated,
        isAdmin: state.isAdmin
      })
    }
  )
);

// Écouter les changements d'authentification
supabase.auth.onAuthStateChange((event, session) => {
  const { setUser, initialize } = useAuthStore.getState();
  
  if (event === 'SIGNED_IN' && session?.user) {
    setUser(session.user);
    initialize();
  } else if (event === 'SIGNED_OUT') {
    setUser(null);
  }
});