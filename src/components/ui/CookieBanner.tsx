import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const COOKIE_KEY = 'cookieConsent';
const COOKIE_SESSION_KEY = 'cookieSessionContinue';
const ONE_YEAR = 365 * 24 * 60 * 60 * 1000;

const CookieBanner: React.FC = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem(COOKIE_KEY);
    const sessionContinue = sessionStorage.getItem(COOKIE_SESSION_KEY);
    if (consent && Number(consent) > Date.now()) {
      setVisible(false);
    } else if (sessionContinue) {
      setVisible(false);
    } else {
      setVisible(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem(COOKIE_KEY, String(Date.now() + ONE_YEAR));
    sessionStorage.removeItem(COOKIE_SESSION_KEY);
    setVisible(false);
  };

  const handleContinue = () => {
    sessionStorage.setItem(COOKIE_SESSION_KEY, '1');
    setVisible(false);
  };

  // Afficher à chaque visite si non accepté ou si la durée est dépassée
  useEffect(() => {
    const checkConsent = () => {
      const consent = localStorage.getItem(COOKIE_KEY);
      const sessionContinue = sessionStorage.getItem(COOKIE_SESSION_KEY);
      if (consent && Number(consent) > Date.now()) {
        setVisible(false);
      } else if (sessionContinue) {
        setVisible(false);
      } else {
        setVisible(true);
        localStorage.removeItem(COOKIE_KEY);
      }
    };
    window.addEventListener('focus', checkConsent);
    return () => window.removeEventListener('focus', checkConsent);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="fixed bottom-0 left-0 right-0 z-50 flex justify-center px-4 pb-6 pointer-events-none"
        >
          <div className="pointer-events-auto bg-luxury-white border border-luxury-gray-200 shadow-xl rounded-2xl p-6 max-w-xl w-full flex flex-col md:flex-row items-center gap-4">
            <div className="flex-1 text-center md:text-left">
              <span className="text-luxury-black font-medium text-base">
                Nous utilisons des cookies pour améliorer votre expérience et analyser le trafic. Vous pouvez accepter ou continuer sans accepter.
              </span>
            </div>
            <div className="flex gap-2 mt-4 md:mt-0">
              <button
                onClick={handleContinue}
                className="px-4 py-2 rounded-lg border border-luxury-gray-300 bg-luxury-gray-50 text-luxury-black font-medium hover:bg-luxury-gray-100 transition-colors duration-200"
              >
                Continuer sans accepter
              </button>
              <button
                onClick={handleAccept}
                className="px-4 py-2 rounded-lg bg-luxury-red text-white font-bold hover:bg-red-700 transition-colors duration-200"
              >
                Accepter
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CookieBanner; 