import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { motion, AnimatePresence } from 'framer-motion';
import { Toaster } from 'sonner';

// Layout Components
import { Header } from './components/Layout/Header';
import { Footer } from './components/Layout/Footer';

// Pages
import { Home } from './pages/Home';
import { Shop } from './pages/Shop';
import { About } from './pages/About';
import { ProductDetail } from './pages/ProductDetail';

// Stores
import { useAuthStore } from './store/useAuthStore';

// Loading Component
import { LoadingPage } from './components/ui/LoadingSpinner';

function App() {
  const { initialize, isLoading } = useAuthStore();

  useEffect(() => {
    initialize();
  }, [initialize]);

  if (isLoading) {
    return <LoadingPage />;
  }

  return (
    <HelmetProvider>
      <Router>
        <div className="min-h-screen bg-luxury-black">
          <Header />
          
          <AnimatePresence mode="wait">
            <motion.main
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/shop" element={<Shop />} />
                <Route path="/product/:id" element={<ProductDetail />} />
                <Route path="/about" element={<About />} />
                <Route path="/collections" element={<Shop />} />
              </Routes>
            </motion.main>
          </AnimatePresence>
          
          <Footer />
          
          {/* Toast Notifications */}
          <Toaster
            position="top-right"
            toastOptions={{
              style: {
                background: '#171717',
                color: '#F5F5F5',
                border: '1px solid #404040',
              },
            }}
          />
        </div>
      </Router>
    </HelmetProvider>
  );
}

export default App;