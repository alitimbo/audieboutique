import React from 'react';
import { motion } from 'framer-motion';
import { FileText } from 'lucide-react';
import { SEO } from '../components/ui/SEO';

const CGV: React.FC = () => (
  <>
    <SEO title="CGV - Audie Boutique" description="Conditions Générales de Vente d'Audie Boutique." />
    <div className="min-h-screen bg-luxury-gray-50 pb-16">
      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: 'easeOut' }} className="max-w-2xl mx-auto px-4 pt-16 text-center">
        <div className="flex justify-center mb-4">
          <FileText className="w-14 h-14 text-luxury-red" />
        </div>
        <h1 className="text-3xl md:text-4xl font-display font-bold text-luxury-black mb-4">Conditions Générales de Vente</h1>
        <p className="text-lg text-luxury-gray-700 mb-2">Retrouvez ici nos conditions générales de vente. Ce texte est un exemple, votre contenu officiel sera intégré ultérieurement.</p>
      </motion.div>
      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.7, ease: 'easeOut' }} className="max-w-2xl mx-auto px-4 mt-10 bg-luxury-white rounded-3xl shadow-luxury p-8">
        <section className="mb-8">
          <h2 className="text-xl font-bold text-luxury-black mb-2">1. Objet</h2>
          <p className="text-luxury-gray-700">Exemple de contenu. Les présentes conditions régissent les ventes de produits sur le site Audie Boutique.</p>
        </section>
        <section className="mb-8">
          <h2 className="text-xl font-bold text-luxury-black mb-2">2. Commande</h2>
          <p className="text-luxury-gray-700">Exemple de contenu. Toute commande implique l’acceptation des présentes conditions.</p>
        </section>
        <section>
          <h2 className="text-xl font-bold text-luxury-black mb-2">3. Paiement</h2>
          <p className="text-luxury-gray-700">Exemple de contenu. Le paiement s’effectue en ligne par carte bancaire ou autres moyens proposés.</p>
        </section>
      </motion.div>
    </div>
  </>
);

export default CGV; 