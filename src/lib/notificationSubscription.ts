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

export const subscribeNotificationUser = () => {
  if ('Notification' in window && Notification.permission !== 'denied') {
    // 1. Demander la permission à l'utilisateur
    Notification.requestPermission().then(permission => {
      if (permission === 'granted') {
        // 2. Enregistrer l'abonnement via le Service Worker
        navigator.serviceWorker.ready.then(registration => {
          const applicationServerKey = 'BOPNtQe13cPlVvf5keLExt_AOOKc_ch9MpQAtQ0Knqiko4PGxLjkchVYoUOQjf63ZZMyDAWiEoz57PpoqwrcDRc' // Voir section 2

          registration.pushManager
            .subscribe({
              userVisibleOnly: true,
              applicationServerKey: urlBase64ToUint8Array(applicationServerKey)
            })
            .then(subscription => {
              // 3. ENVOYER l'objet 'subscription' au serveur (voir B.)
              //sendSubscriptionToServer(subscription);
              console.log(subscription)
            })
            .catch(error => console.error('Erreur d’abonnement push :', error))
        })
      }
    })
  }
}
