import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa' // 👈 1. Importer VitePWA

export default defineConfig({
  plugins: [
    react(),
    // 👈 2. Ajouter la configuration PWA
    VitePWA({
      registerType: 'autoUpdate', // Mettre à jour automatiquement le Service Worker
      includeAssets: [
        'favicon.ico',
        'apple-touch-icon.png',
        'web-app-manifest-192x192.png',
        'web-app-manifest-512x512.png'
      ],
      manifest: {
        name: 'Audie Boutique',
        short_name: 'Audie Boutique',
        description: 'Description de votre application React PWA.',
        theme_color: '#3498db', // Couleur de la barre d'adresse
        background_color: '#ffffff', // Couleur d'arrière-plan de l'écran de démarrage
        display: 'standalone', // Affichage sans barre de navigation du navigateur
        scope: '/',
        start_url: '/',
        icons: [
          {
            src: '/web-app-manifest-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: '/web-app-manifest-512x512.png',
            sizes: '512x512',
            type: 'image/png'
          },
          {
            src: '/web-app-manifest-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable' // Icône pour les appareils Android récents
          }
        ]
      },
      workbox: {
        // Optionnel: Personnalisation de la mise en cache
        globPatterns: ['**/*.{js,css,html,ico,png,svg,woff2}'],

        // 🚨 AJOUTER CECI : Injecter votre script de gestion des événements push
        importScripts: ['/push-events.js']
        // Exemples de routes ou d'assets à exclure du cache
        // exclude: ['**/node_modules/**']
      }
    })
  ],
  optimizeDeps: {
    exclude: ['lucide-react']
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          router: ['react-router-dom'],
          ui: ['framer-motion', '@heroicons/react'],
          store: ['zustand'],
          supabase: ['@supabase/supabase-js']
        }
      }
    }
  }
})
