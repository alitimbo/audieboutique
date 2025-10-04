// Exemple dans /services/notificationClientService.ts ou directement dans AdminOrders.tsx

/**
 * Envoie une requête à l'Edge Function pour déclencher les notifications Push.
 * @param userId L'ID de l'utilisateur auquel envoyer la notification.
 * @param title Le titre affiché dans la notification (ex: "Commande Expédiée").
 * @param body Le corps du message (ex: "Votre colis est en route !").
 * @param url (Optionnel) L'URL vers laquelle le client sera redirigé au clic.
 */
export const triggerPushNotification = async (
  userId: string,
  title: string,
  body: string,
  url?: string
) => {
  // ⚠️ Remplacez par votre URL d'Edge Function
  const EDGE_FUNCTION_URL =
    'https://izuogvbcskyxacjekmbh.supabase.co/functions/v1/send-notification'

  // Le payload attendu par votre Edge Function
  const requestBody = {
    userId: userId,
    message: {
      title: title,
      body: body,
      url: url
    }
  }

  try {
    const response = await fetch(EDGE_FUNCTION_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`
      },
      body: JSON.stringify(requestBody)
    })

    if (!response.ok) {
      // Gérer les erreurs HTTP (4xx, 5xx)
      const errorData = await response.json()
      throw new Error(
        `Erreur HTTP ${response.status}: ${
          errorData.error || 'Erreur inconnue'
        }`
      )
    }

    const data = await response.json()
    console.log('Edge Function Response:', data)
    return data // Contient le message de succès (ex: "Tentative d'envoi à X abonnements terminée.")
  } catch (error) {
    console.error('Erreur lors du déclenchement de la notification:', error)
    // Vous pouvez lancer une alerte ici pour l'administrateur
    //alert(`Échec de l'envoi de la notification push: ${error.message}`)
    throw error // Propager l'erreur
  }
}
