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

  static async saveNotificationToken (
    subscription: any,
    userId: string
  ): Promise<any> {
    const { data, error } = await supabase
      .from('notification_tokens')
      .select('token_details')
      .eq('user_id', userId)
      .single()

    let newTokenDetails = [subscription]

    if (data) {
      // concaténer au tableau existant
      newTokenDetails = [...data.token_details, subscription]
      // mettre à jour la ligne
      await supabase
        .from('notification_tokens')
        .update({ token_details: newTokenDetails })
        .eq('user_id', userId)
    } else {
      // créer une nouvelle ligne
      await supabase
        .from('notification_tokens')
        .insert({ user_id: userId, token_details: newTokenDetails })
    }
  }
}
