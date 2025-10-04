import { supabase } from '../lib/supabase'

export interface Address {
  id: string
  user_id: string
  full_name: string
  phone: string | null
  street: string
  city: string
  postal_code: string
  country: string
  created_at: string
  // ... autres champs
}

export class adminServices {
  static async getOrders (): Promise<any> {
    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      console.log(error)
      throw new Error('Failed to fetch orders')
    }

    return data || []
  }

  static async getClientUsers (): Promise<any> {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('role', 'client')
      .order('created_at', { ascending: false })

    if (error) {
      console.log(error)
      throw new Error('Failed to fetch users')
    }
    return data || []
  }

  static async getAddressById (addressId: string): Promise<Address | null> {
    const { data, error } = await supabase
      .from('addresses')
      .select('*')
      .eq('id', addressId)
      .single() // On s'attend à un seul résultat

    if (error && error.code !== 'PGRST116') {
      // PGRST116 est l'erreur "No rows found"
      console.error("Erreur lors de la récupération de l'adresse :", error)
      throw new Error("Erreur lors de la récupération de l'adresse.")
    }

    return data as Address | null
  }

  static async updateOrderStatus (
    orderId: string,
    status: string
  ): Promise<any> {
    const { data, error } = await supabase
      .from('orders')
      .update({ status: status }) // Mettre à jour la colonne 'status' avec la nouvelle valeur
      .eq('id', orderId) // CONDITION: Appliquer la mise à jour où l'ID correspond à l'orderId
      .select() // Retourner la ligne mise à jour

    if (error) {
      console.error('Erreur Supabase lors de la mise à jour du statut:', error)
      throw new Error('Impossible de mettre à jour le statut de la commande.')
    }

    // Si vous souhaitez retourner les données mises à jour
    return data
  }
}
