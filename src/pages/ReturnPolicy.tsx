import React from 'react';
import { motion } from 'framer-motion';
import { Undo2 } from 'lucide-react';
import { SEO } from '../components/ui/SEO';

export const ReturnPolicy: React.FC = () => {
  return (
    <>
      <SEO
        title="Politique de retour - Audie Boutique"
        description="Découvrez notre politique de retour conforme aux normes européennes. Droit de rétractation, conditions, procédure, remboursement, exceptions."
      />
      <div className="min-h-screen bg-luxury-gray-50 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="max-w-2xl mx-auto px-4 pt-16 text-center"
        >
          <div className="flex justify-center mb-4">
            <Undo2 className="w-14 h-14 text-luxury-red" />
          </div>
          <h1 className="text-3xl md:text-4xl font-display font-bold text-luxury-black mb-4">Politique de retour</h1>
          <p className="text-lg text-luxury-gray-700 mb-2">
            Chez Audie Boutique, votre satisfaction est notre priorité. Notre politique de retour respecte les normes européennes pour vous garantir une expérience sereine.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.7, ease: 'easeOut' }}
          className="max-w-2xl mx-auto px-4 mt-10 bg-luxury-white rounded-3xl shadow-luxury p-8"
        >
          <section className="mb-8">
            <h2 className="text-xl font-bold text-luxury-black mb-2">Délai de rétractation</h2>
            <p className="text-luxury-gray-700">
              Conformément à la réglementation européenne, vous disposez d’un délai de 14 jours à compter de la réception de votre commande pour exercer votre droit de rétractation, sans avoir à justifier de motif.
            </p>
          </section>
          <section className="mb-8">
            <h2 className="text-xl font-bold text-luxury-black mb-2">Conditions de retour</h2>
            <p className="text-luxury-gray-700">
              Les articles doivent être retournés dans leur état d’origine, non portés, non lavés, avec leurs étiquettes et dans leur emballage d’origine. Les retours incomplets, endommagés ou salis ne seront pas acceptés.
            </p>
          </section>
          <section className="mb-8">
            <h2 className="text-xl font-bold text-luxury-black mb-2">Procédure de retour</h2>
            <p className="text-luxury-gray-700">
              Pour effectuer un retour, contactez notre service client via le formulaire de contact ou par email. Nous vous indiquerons la marche à suivre et l’adresse de retour.
            </p>
          </section>
          <section className="mb-8">
            <h2 className="text-xl font-bold text-luxury-black mb-2">Remboursement</h2>
            <p className="text-luxury-gray-700">
              Après réception et vérification des articles retournés, le remboursement sera effectué sous 14 jours, selon le mode de paiement initial. Les frais de retour restent à la charge du client, sauf erreur de notre part.
            </p>
          </section>
          <section className="mb-8">
            <h2 className="text-xl font-bold text-luxury-black mb-2">Exceptions</h2>
            <p className="text-luxury-gray-700">
              Certains articles ne peuvent être retournés pour des raisons d’hygiène (ex : sous-vêtements, maillots de bain descellés). Les produits personnalisés ne sont pas éligibles au droit de rétractation.
            </p>
          </section>
          <section>
            <h2 className="text-xl font-bold text-luxury-black mb-2">Contact</h2>
            <p className="text-luxury-gray-700">
              Pour toute question ou demande d’assistance, notre équipe est à votre écoute à l’adresse <a href="mailto:support@audieboutique.com" className="text-luxury-red hover:underline">support@audieboutique.com</a>.
            </p>
          </section>
        </motion.div>
      </div>
    </>
  );
};

export default ReturnPolicy; 