import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Send } from 'lucide-react';

export const Newsletter: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubmitted(true);
      setTimeout(() => {
        setIsSubmitted(false);
        setEmail('');
      }, 3000);
    }
  };

  return (
    <section className="py-20 bg-luxury-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto text-center"
        >
          <div className="bg-gradient-to-br from-luxury-red to-red-700 p-12 rounded-4xl relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 left-0 w-32 h-32 bg-luxury-white rounded-full -translate-x-16 -translate-y-16" />
              <div className="absolute bottom-0 right-0 w-24 h-24 bg-luxury-white rounded-full translate-x-12 translate-y-12" />
            </div>

            <div className="relative z-10">
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
                className="text-luxury-white mb-6 flex justify-center"
              >
                <Mail className="w-16 h-16" />
              </motion.div>

              <motion.h2
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="text-3xl md:text-4xl font-display font-bold text-luxury-white mb-4"
              >
                Recevez nos Offres Exclusives
              </motion.h2>

              <motion.p
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.6 }}
                className="text-lg text-luxury-white/90 mb-8 max-w-2xl mx-auto"
              >
                Soyez la première informée de nos nouvelles collections, 
                ventes privées et offres spéciales réservées à nos abonnées.
              </motion.p>

              <motion.form
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.6 }}
                onSubmit={handleSubmit}
                className="max-w-md mx-auto"
              >
                {!isSubmitted ? (
                  <div className="flex flex-col sm:flex-row gap-4">
                    <div className="flex-1">
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Votre adresse email"
                        required
                        className="w-full px-6 py-4 bg-luxury-white text-luxury-black placeholder-luxury-gray-600 rounded-2xl focus:outline-none focus:ring-2 focus:ring-luxury-white/50 transition-all duration-200"
                      />
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      type="submit"
                      className="px-8 py-4 bg-luxury-black text-luxury-white rounded-2xl hover:bg-luxury-gray-900 transition-colors duration-200 flex items-center justify-center space-x-2 font-medium"
                    >
                      <span>Je m'inscris</span>
                      <Send className="w-4 h-4" />
                    </motion.button>
                  </div>
                ) : (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="bg-luxury-white text-luxury-black p-4 rounded-2xl font-medium"
                  >
                    ✨ Merci ! Vous recevrez bientôt nos offres exclusives.
                  </motion.div>
                )}
              </motion.form>

              <motion.p
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.7, duration: 0.6 }}
                className="text-sm text-luxury-white/70 mt-4"
              >
                Pas de spam, désinscription possible à tout moment.
              </motion.p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};