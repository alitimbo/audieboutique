import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || ''
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || ''

export const supabase = createClient(supabaseUrl, supabaseKey)

// Types pour la base de données
export interface Product {
  id: string
  name: string
  description: string
  price: number
  category: string
  images: string[]
  stock: number
  featured: boolean
  created_at: string
  updated_at: string
}

export interface User {
  id: string
  email: string
  full_name: string
  provider: string
  role: 'admin' | 'client' | 'agent' // 👈 Changement de la colonne et du type
  created_at: string
  is_active: boolean
}

export interface Order {
  id: string
  user_id: string
  total: number
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled'
  items: OrderItem[]
  shipping_address: Address
  created_at: string
  updated_at: string
}

export interface OrderItem {
  id: string
  product_id: string
  quantity: number
  price: number
  product: Product
}

export interface Address {
  street: string
  city: string
  postal_code: string
  country: string
}

// Services API
export const productService = {
  async getAll (): Promise<Product[]> {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) throw error
    return data || []
  },

  async getById (id: string): Promise<Product | null> {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('id', id)
      .single()

    if (error) throw error
    return data
  },

  async getFeatured (): Promise<Product[]> {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('featured', true)
      .order('created_at', { ascending: false })

    if (error) throw error
    return data || []
  },

  async create (
    product: Omit<Product, 'id' | 'created_at' | 'updated_at'>
  ): Promise<Product> {
    const { data, error } = await supabase
      .from('products')
      .insert([product])
      .select()
      .single()

    if (error) throw error
    return data
  },

  async update (id: string, product: Partial<Product>): Promise<Product> {
    const { data, error } = await supabase
      .from('products')
      .update(product)
      .eq('id', id)
      .select()
      .single()

    if (error) throw error
    return data
  },

  async delete (id: string): Promise<void> {
    const { error } = await supabase.from('products').delete().eq('id', id)

    if (error) throw error
  }
}

export const orderService = {
  async create (
    order: Omit<Order, 'id' | 'created_at' | 'updated_at'>
  ): Promise<Order> {
    const { data, error } = await supabase
      .from('orders')
      .insert([order])
      .select()
      .single()

    if (error) throw error
    return data
  },

  async getByUserId (userId: string): Promise<Order[]> {
    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })

    if (error) throw error
    return data || []
  },

  async getAll (): Promise<Order[]> {
    const { data, error } = await supabase
      .from('orders')
      .select(
        `
        *,
        items:order_items(
          *,
          product:products(*)
        )
      `
      )
      .order('created_at', { ascending: false })

    if (error) throw error
    return data || []
  }
}

export const authService = {
  async signUp (
    email: string,
    password: string,
    userData: { full_name: string }
  ) {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: userData
      }
    })

    if (error) throw error

    // Créer l'utilisateur dans la table users

    if (data.user) {
      const { error: userError } = await supabase.from('users').insert({
        id: data.user.id,
        email: data.user.email,
        full_name: userData.full_name,
        provider: 'email',
        role: 'client' // 👈 Changement de la colonne et de la valeur
      })

      if (userError) throw userError
    }

    return data
  },

  async signUpAgent (
    email: string,
    password: string,
    userData: { full_name: string }
  ) {
    try {
      // 1️⃣ Création de l'utilisateur dans Supabase Auth
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: userData
        }
      })

      if (error) throw error

      // 2️⃣ Insertion dans la table 'users' avec le rôle 'agent'
      if (data.user) {
        const { error: userError } = await supabase.from('users').insert({
          id: data.user.id,
          email: data.user.email,
          full_name: userData.full_name,
          provider: 'email',
          role: 'agent' // 👈 rôle spécifique
        })

        if (userError) throw userError
      }

      // 3️⃣ Retourne les données de l'utilisateur créé
      return data
    } catch (err) {
      // Gestion d'erreur centralisée
      console.error("Erreur lors de l'inscription de l'agent:", err)
      throw err
    }
  },
  async signIn (email: string, password: string) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    })

    if (error) throw error
    return data
  },

  // Dans authService
  async adminSignIn (email: string, password: string) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    })

    if (error) throw error

    // Vérifier si l'utilisateur est admin ou agent
    if (data.user) {
      try {
        const { data: userData, error: userError } = await supabase
          .from('users')
          .select('role')
          .eq('id', data.user.id)
          .single()

        if (userError) {
          // Si erreur RLS, vérifier si c'est l'admin par défaut
          if (data.user.email === 'admin@audieboutique.com') {
            console.log('Admin par défaut détecté, connexion autorisée')
            return data
          }
          console.error(
            'Erreur lors de la vérification des permissions:',
            userError
          )
          await supabase.auth.signOut()
          throw new Error('Erreur de vérification des permissions.')
        }

        // --- MODIFICATION CLÉ ICI ---
        // Vérifier si le rôle est ni 'admin' NI 'agent'
        const isAuthorized =
          userData?.role === 'admin' || userData?.role === 'agent'

        if (!isAuthorized) {
          await supabase.auth.signOut()
          throw new Error(
            // Mise à jour du message d'erreur pour refléter les deux rôles autorisés
            'Accès non autorisé. Seuls les administrateurs et les agents peuvent se connecter.'
          )
        }
        // --- FIN DE LA MODIFICATION CLÉ ---
      } catch (err) {
        console.error('Erreur dans adminSignIn:', err)
        await supabase.auth.signOut()
        throw new Error('Erreur lors de la vérification des permissions.')
      }
    }

    return data
  },

  async resetPassword (email: string) {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/admin/new-password`
    })

    if (error) throw error
  },

  async resetPasswordUser (email: string) {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`
    })

    if (error) throw error
  },

  async updatePassword (password: string) {
    const { error } = await supabase.auth.updateUser({
      password
    })

    if (error) throw error
  },

  async updateFullName (userId: string, newFullName: string) {
    // 1. Mettre à jour les métadonnées de l'utilisateur Auth (pour la cohérence avec Supabase)
    const { error: authError } = await supabase.auth.updateUser({
      data: {
        full_name: newFullName
      }
    })
    if (authError) throw authError // 2. Mettre à jour la table de profil (public.users)

    const { data, error: profileError } = await supabase
      .from('users')
      .update({ full_name: newFullName })
      .eq('id', userId)
      .select()
      .single() // Récupère le profil mis à jour pour le store

    if (profileError) throw profileError
    return data // Retourne le profil complet mis à jour
  },

  async signOut () {
    const { error } = await supabase.auth.signOut()
    if (error) throw error
  },

  async getCurrentUser () {
    const {
      data: { user }
    } = await supabase.auth.getUser()
    return user
  },

  async getUserProfile (userId: string) {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', userId)
      .single()

    if (error) throw error
    return data
  }
}
