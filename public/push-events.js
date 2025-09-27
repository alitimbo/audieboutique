// Les Service Workers utilisent 'self' pour faire référence au scope global
self.addEventListener('push', (event) => {
  // Le message (payload) est envoyé par votre serveur (Supabase Edge Function)
  const data = event.data.json() || { 
    title: 'Nouvelle notification !', 
    body: 'Vérifiez les dernières mises à jour.',
    url: '/'
  };

  const title = data.title;
  const options = {
    body: data.body,
    icon: '/web-app-manifest-192x192.png', // Utilisez l'une de vos icônes PWA
    badge: '/badge.png', // Optionnel : icône monochrome pour la barre de statut
    data: {
      url: data.url // URL à ouvrir lors du clic
    }
  };

  // Montrer la notification
  event.waitUntil(self.registration.showNotification(title, options));
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();

  const urlToOpen = event.notification.data.url || '/';

  // Ouvre la fenêtre PWA ou un nouvel onglet sur l'URL ciblée
  event.waitUntil(
    clients.matchAll({ type: 'window' }).then((windowClients) => {
      // Cherche une fenêtre existante de la PWA
      const client = windowClients.find((c) => c.url.includes(urlToOpen) || c.url === self.registration.scope);
      
      if (client) {
        return client.focus().then(c => c.navigate(urlToOpen));
      } else {
        // Ouvre une nouvelle fenêtre/onglet
        return clients.openWindow(urlToOpen);
      }
    })
  );
});