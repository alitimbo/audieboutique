import { supabase } from '../lib/supabase'
import { UserData } from '../types/user'

export class UserServices {
  //Fonction pour recuperer l'ensemble des utilisateur du systeme (admin, client, commercial, etc)
  static async getAllUsers (): Promise<UserData[]> {
    try {
      const { data, error } = await supabase.from('users').select('*')

      if (error) {
        throw error
      }
      return data as UserData[]
    } catch (error) {
      console.log('impossible de recuperer les utilisateur')
      throw error
    }
  }
}
