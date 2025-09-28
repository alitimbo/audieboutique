import { UserServices } from '../services/userService'

/**
 * Convertit une chaîne Base64 URL Safe en Uint8Array pour l'API Push
 * @param {string} base64String
 * @returns {Uint8Array}
 */
const urlBase64ToUint8Array = (base64String: string) => {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4)
  const base64 = (base64String + padding).replace(/\-/g, '+').replace(/_/g, '/')

  const rawData = window.atob(base64)
  const outputArray = new Uint8Array(rawData.length)

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i)
  }
  return outputArray
}

export const subscribeNotificationUser = (userId: string) => {
  if ('Notification' in window && Notification.permission !== 'denied') {
    console.log('Notifications disponibles ✅')

    Notification.requestPermission().then(permission => {
      console.log('Permission :', permission)

      if (permission === 'granted') {
        console.log('Permission accordée, attente du SW...')

        navigator.serviceWorker.ready
          .then(async registration => {
            console.log('SW prêt ✅', registration)

            const applicationServerKey = urlBase64ToUint8Array(
              'BH0A62O96dKNtLxv3XzR4PU6L7WqTHe4NXjfVNGhgqWV82kt22SmMxkYJCwRcioItw26dQC11EQ7O6KNZkPQYoY'
            )
            console.log('Clé VAPID convertie ✅', applicationServerKey)

            const subscription = await registration.pushManager.subscribe({
              userVisibleOnly: true,
              applicationServerKey
            })

            const subJson = subscription.toJSON()

            return subJson

            console.log('yes', subJson)
          })
          .then(subscription => {
            UserServices.saveNotificationToken(subscription, userId)
            console.log('Abonnement push OK ✅', subscription)
          })
          .catch(error => console.error('Erreur d’abonnement push ❌ :', error))
      }
    })
  } else {
    console.warn('Notifications non supportées ❌')
  }
}
