import { useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import { motion, AnimatePresence } from 'framer-motion'
import { Toaster } from 'sonner'
import ScrollToTop from './components/ui/ScrollToTop'

// Layout Components
import { Header } from './components/Layout/Header'
import { Footer } from './components/Layout/Footer'

// Pages
import { Home } from './pages/Home'
import { Shop } from './pages/Shop'
import { About } from './pages/About'
import { ProductDetail } from './pages/ProductDetail'
import { Contact } from './pages/Contact'
import { SizeGuide } from './pages/SizeGuide'
import { Quality } from './pages/Quality'
import { OurStory } from './pages/OurStory'
import { Careers } from './pages/Careers'
import { Press } from './pages/Press'
import { Support } from './pages/Support'
import ReturnPolicy from './pages/ReturnPolicy'
import CookieBanner from './components/ui/CookieBanner'
import CGV from './pages/CGV'
import MentionsLegales from './pages/MentionsLegales'
import Confidentialite from './pages/Confidentialite'
import CookiesPage from './pages/Cookies'

// Stores
import { useAuthStore } from './store/useAuthStore'

// Loading Component
import { LoadingPage } from './components/ui/LoadingSpinner'

// Import Cart page
import { Cart } from './pages/Cart'

// Admin Pages
import AdminLogin from './pages/admin/AdminLogin'
import AdminResetPassword from './pages/admin/AdminResetPassword'
import AdminDashboard from './pages/admin/AdminDashboard'
import AdminCatalog from './pages/admin/AdminCatalog'
import AdminOrders from './pages/admin/AdminOrders'
import AdminClients from './pages/admin/AdminClients'
import AdminSettings from './pages/admin/AdminSettings'
import AdminLayout from './components/admin/AdminLayout'
import ProtectedAdminRoute from './components/admin/ProtectedAdminRoute'
function App () {
  const { initialize, isLoading } = useAuthStore()

  useEffect(() => {
    initialize()
  }, [initialize])

  if (isLoading) {
    return <LoadingPage />
  }

  return (
    <HelmetProvider>
      <Router>
        <ScrollToTop />

        <Routes>
          {/* Admin Routes - Sans layout public */}
          <Route path='/admin/login' element={<AdminLogin />} />
          <Route
            path='/admin/reset-password'
            element={<AdminResetPassword />}
          />

          {/* Protected Admin Routes - Avec layout admin uniquement */}
          <Route
            path='/admin/dashboard'
            element={
              <ProtectedAdminRoute>
                <AdminLayout
                  title='Tableau de bord'
                  subtitle='Aperçu de votre boutique'
                >
                  <AdminDashboard />
                </AdminLayout>
              </ProtectedAdminRoute>
            }
          />

          <Route
            path='/admin/catalog'
            element={
              <ProtectedAdminRoute>
                <AdminLayout
                  title='Gestion du catalogue'
                  subtitle='Gérez vos produits et votre inventaire'
                >
                  <AdminCatalog />
                </AdminLayout>
              </ProtectedAdminRoute>
            }
          />

          <Route
            path='/admin/orders'
            element={
              <ProtectedAdminRoute>
                <AdminLayout
                  title='Gestion des commandes'
                  subtitle='Suivez et gérez toutes vos commandes'
                >
                  <AdminOrders />
                </AdminLayout>
              </ProtectedAdminRoute>
            }
          />

          <Route
            path='/admin/clients'
            element={
              <ProtectedAdminRoute>
                <AdminLayout
                  title='Gestion des clients'
                  subtitle='Gérez votre base de clients et administrateurs'
                >
                  <AdminClients />
                </AdminLayout>
              </ProtectedAdminRoute>
            }
          />

          <Route
            path='/admin/settings'
            element={
              <ProtectedAdminRoute>
                <AdminLayout
                  title='Paramètres'
                  subtitle='Configurez votre boutique et vos préférences'
                >
                  <AdminSettings />
                </AdminLayout>
              </ProtectedAdminRoute>
            }
          />

          {/* Routes publiques - Avec layout public (Header/Footer) */}
          <Route
            path='/*'
            element={
              <div className='min-h-screen bg-luxury-black'>
                <Header />

                <AnimatePresence mode='wait'>
                  <motion.main
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Routes>
                      <Route path='/' element={<Home />} />
                      <Route path='/shop' element={<Shop />} />
                      <Route path='/product/:id' element={<ProductDetail />} />
                      <Route path='/cart' element={<Cart />} />
                      <Route path='/about' element={<About />} />
                      <Route path='/contact' element={<Contact />} />
                      <Route path='/size-guide' element={<SizeGuide />} />
                      <Route path='/quality' element={<Quality />} />
                      <Route path='/our-story' element={<OurStory />} />
                      <Route path='/careers' element={<Careers />} />
                      <Route path='/press' element={<Press />} />
                      <Route path='/support' element={<Support />} />
                      <Route path='/retour' element={<ReturnPolicy />} />
                      <Route path='/cgv' element={<CGV />} />
                      <Route
                        path='/mentions-legales'
                        element={<MentionsLegales />}
                      />
                      <Route
                        path='/confidentialite'
                        element={<Confidentialite />}
                      />
                      <Route path='/cookies' element={<CookiesPage />} />
                      <Route
                        path='/shop/tags/:collections'
                        element={<Shop />}
                      />
                      <Route
                        path='/shop/category/:category'
                        element={<Shop />}
                      />
                    </Routes>
                  </motion.main>
                </AnimatePresence>

                <Footer />

                {/* Cookie Consent Banner */}
                <CookieBanner />
              </div>
            }
          />
        </Routes>

        {/* Toast Notifications - Global */}
        <Toaster
          position='top-right'
          toastOptions={{
            style: {
              background: '#171717',
              color: '#F5F5F5',
              border: '1px solid #404040'
            }
          }}
        />
      </Router>
    </HelmetProvider>
  )
}

export default App
