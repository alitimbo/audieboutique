import { supabase } from '../lib/supabase'

export class AddressServices {
  static async addAddress (
    userId: string,
    addressName: string,
    address: string,
    postalCode: string,
    city: string,
    country: string
  ): Promise<any> {
    if (!userId) {
      throw new Error(
        "L'ID de l'utilisateur est requis pour ajouter une adresse."
      )
    }

    try {
      const newAddress = {
        user_id: userId,
        full_name: addressName,
        street: address,
        postal_code: postalCode,
        city: city,
        country: country
        // Les valeurs par défaut is_default_shipping et is_default_billing sont gérées par la base de données.
      }

      const { data, error } = await supabase
        .from('addresses')
        .insert([newAddress])
        .select()
        .single()

      if (error) {
        throw error
      }

      console.log('Adresse ajoutée avec succès:', data)
      return data
    } catch (error) {
      console.error("Erreur lors de l'ajout de l'adresse:", error)
      throw new Error("Impossible d'ajouter l'adresse. Veuillez réessayer.")
    }
  }

  static async getAddressByUserId (userId: string): Promise<any> {
    if (!userId) {
      throw new Error(
        "L'ID de l'utilisateur est requis pour récupérer les adresses."
      )
    }

    try {
      const { data, error } = await supabase
        .from('addresses')
        .select('*')
        .eq('user_id', userId)
        .eq('etat', 'valide')

      if (error) {
        throw error
      }

      return data
    } catch (error) {
      console.error('Erreur lors de la récupération des adresses:', error)
      throw new Error(
        'Impossible de récupérer les adresses. Veuillez réessayer.'
      )
    }
  }

  /**
   * Supprime une adresse par son ID.
   * @param {string} id L'ID de l'adresse à supprimer (UUID).
   * @returns {Promise<void>} Une promesse qui se résout une fois la suppression terminée.
   * @throws {Error} Si l'ID de l'adresse est manquant ou si la suppression échoue.
   */
  static async deleteAddress (id: string): Promise<any> {
    if (!id) {
      throw new Error("L'ID de l'adresse est requis pour la suppression.")
    }

    try {
      const { data, error } = await supabase
        .from('addresses')
        .update({ etat: 'invalide' })
        .eq('id', id)
        .select()

      if (error) {
        throw error
      }

      return data;

      console.log(`Adresse avec l'ID ${id} a été supprimée avec succès.`)
    } catch (error) {
      console.error("Erreur lors de la suppression de l'adresse:", error)
      throw new Error("Impossible de supprimer l'adresse. Veuillez réessayer.")
    }
  }

  /**
   * Met à jour une adresse existante.
   * @param {string} id L'ID de l'adresse à mettre à jour (UUID).
   * @param {object} updates Les données à mettre à jour.
   * @returns {Promise<object>} Une promesse qui se résout avec l'objet mis à jour.
   * @throws {Error} Si l'ID est manquant ou si la mise à jour échoue.
   */
  static async updateAddress (id: string, updates: any): Promise<any> {
    if (!id) {
      throw new Error("L'ID de l'adresse est requis pour la mise à jour.")
    }

    try {
      const { data, error } = await supabase
        .from('addresses')
        .update(updates)
        .eq('id', id)
        .select()
        .single()

      if (error) {
        throw error
      }

      console.log(
        `Adresse avec l'ID ${id} a été mise à jour avec succès.`,
        data
      )
      return data
    } catch (error) {
      console.error("Erreur lors de la mise à jour de l'adresse:", error)
      throw new Error(
        "Impossible de mettre à jour l'adresse. Veuillez réessayer."
      )
    }
  }
}
