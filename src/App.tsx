import React, { useEffect } from 'react'
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

        {/* Main Layout */}
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
                <Route path='/mentions-legales' element={<MentionsLegales />} />
                <Route path='/confidentialite' element={<Confidentialite />} />
                <Route path='/cookies' element={<CookiesPage />} />
                <Route path='/shop/tags/:collections' element={<Shop />} />
              </Routes>
            </motion.main>
          </AnimatePresence>

          <Footer />

          {/* Cookie Consent Banner */}
          <CookieBanner />

          {/* Toast Notifications */}
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
        </div>
      </Router>
    </HelmetProvider>
  )
}

export default App
