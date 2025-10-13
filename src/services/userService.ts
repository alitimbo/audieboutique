import { supabase,  } from '../lib/supabase'
import { UserData } from '../types/user'
import { sendEmail } from '../lib/sendEmail'
import { authService } from '../lib/supabase'


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
    try {
      // Récupère l'abonnement existant pour l'utilisateur
      const { data, error } = await supabase
        .from('notification_tokens')
        .select('token_details')
        .eq('user_id', userId)
        .single()

      if (error && error.code !== 'PGRST116') {
        // PGRST116 = row not found (Supabase renvoie une erreur si row absente avec single())
        console.error('Erreur récupération token_details :', error)
        throw error
      }

      // Parser token_details si présent, sinon tableau vide
      let existingTokens: any[] = []
      if (data?.token_details) {
        try {
          existingTokens = Array.isArray(data.token_details)
            ? data.token_details
            : JSON.parse(data.token_details)
        } catch (e) {
          console.warn(
            'Impossible de parser token_details, réinitialisation',
            e
          )
          existingTokens = []
        }
      }

      // Vérifie si le token existe déjà (endpoint)
      const exists = existingTokens.some(
        (t: any) => t.endpoint === subscription.endpoint
      )
      if (!exists) {
        existingTokens.push(subscription)
      }

      // Utiliser upsert pour créer ou mettre à jour en une seule requête
      const { error: upsertError } = await supabase
        .from('notification_tokens')
        .upsert([{ user_id: userId, token_details: existingTokens }], {
          onConflict: 'user_id'
        })

      if (upsertError) {
        console.error('Erreur insertion/upsert token_details :', upsertError)
        throw upsertError
      }

      return existingTokens
    } catch (err) {
      console.error('Erreur saveNotificationToken :', err)
      return []
    }
  }

  
}
