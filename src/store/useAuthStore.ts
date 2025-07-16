import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User as SupabaseUser } from '@supabase/supabase-js';
import { supabase, authService } from '../lib/supabase';

interface AuthState {
  user: SupabaseUser | null;
  profile: any | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  
  // Actions
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, userData: { first_name: string; last_name: string }) => Promise<void>;
  signOut: () => Promise<void>;
  initialize: () => Promise<void>;
  setUser: (user: SupabaseUser | null) => void;
  setProfile: (profile: any | null) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      profile: null,
      isLoading: false,
      isAuthenticated: false,

      signIn: async (email: string, password: string) => {
        try {
          set({ isLoading: true });
          const { user } = await authService.signIn(email, password);
          
          if (user) {
            // Récupérer le profil utilisateur
            const { data: profile } = await supabase
              .from('profiles')
              .select('*')
              .eq('id', user.id)
              .single();
            
            set({ 
              user, 
              profile,
              isAuthenticated: true,
              isLoading: false 
            });
          }
        } catch (error) {
          set({ isLoading: false });
          throw error;
        }
      },

      signUp: async (email: string, password: string, userData: { first_name: string; last_name: string }) => {
        try {
          set({ isLoading: true });
          const { user } = await authService.signUp(email, password, userData);
          
          if (user) {
            // Créer le profil utilisateur
            const { data: profile } = await supabase
              .from('profiles')
              .insert([{
                id: user.id,
                email: user.email,
                first_name: userData.first_name,
                last_name: userData.last_name,
                role: 'user'
              }])
              .select()
              .single();
            
            set({ 
              user, 
              profile,
              isAuthenticated: true,
              isLoading: false 
            });
          }
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
            const { data: profile } = await supabase
              .from('profiles')
              .select('*')
              .eq('id', user.id)
              .single();
            
            set({ 
              user, 
              profile,
              isAuthenticated: true,
              isLoading: false 
            });
          } else {
            set({ 
              user: null, 
              profile: null,
              isAuthenticated: false,
              isLoading: false 
            });
          }
        } catch (error) {
          set({ 
            user: null, 
            profile: null,
            isAuthenticated: false,
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
        isAuthenticated: state.isAuthenticated
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