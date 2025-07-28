import React from 'react';
import { motion } from 'framer-motion';
import { Shield } from 'lucide-react';
import { SEO } from '../components/ui/SEO';

const Confidentialite: React.FC = () => (
  <>
    <SEO title="Politique de confidentialité - Audie Boutique" description="Politique de confidentialité d'Audie Boutique." />
    <div className="min-h-screen bg-luxury-gray-50 pb-16">
      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: 'easeOut' }} className="max-w-2xl mx-auto px-4 pt-16 text-center">
        <div className="flex justify-center mb-4">
          <Shield className="w-14 h-14 text-luxury-red" />
        </div>
        <h1 className="text-3xl md:text-4xl font-display font-bold text-luxury-black mb-4">Politique de confidentialité</h1>
        <p className="text-lg text-luxury-gray-700 mb-2">Retrouvez ici notre politique de confidentialité. Ce texte est un exemple, votre contenu officiel sera intégré ultérieurement.</p>
      </motion.div>
      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.7, ease: 'easeOut' }} className="max-w-2xl mx-auto px-4 mt-10 bg-luxury-white rounded-3xl shadow-luxury p-8">
        <section className="mb-8">
          <h2 className="text-xl font-bold text-luxury-black mb-2">Collecte des données</h2>
          <p className="text-luxury-gray-700">Exemple de contenu. Nous collectons uniquement les données nécessaires à la gestion de votre commande et à l’amélioration de votre expérience.</p>
        </section>
        <section>
          <h2 className="text-xl font-bold text-luxury-black mb-2">Droits de l’utilisateur</h2>
          <p className="text-luxury-gray-700">Exemple de contenu. Vous disposez d’un droit d’accès, de rectification et de suppression de vos données personnelles.</p>
        </section>
      </motion.div>
    </div>
  </>
);

export default Confidentialite; 