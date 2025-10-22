import React from 'react';
import { motion } from 'framer-motion';
import { Info } from 'lucide-react'; // Icône Info (Justice) utilisée pour les Mentions Légales
import { SEO } from '../components/ui/SEO';

const MentionsLegales: React.FC = () => (
  <>
    <SEO title="Mentions Légales - Audie Boutique" description="Informations légales et mentions obligatoires d'Audie Boutique." />
    <div className="min-h-screen bg-luxury-gray-50 pb-16">
      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: 'easeOut' }} className="max-w-xl mx-auto px-4 pt-16 text-center">
        <div className="flex justify-center mb-4">
          <Info className="w-14 h-14 text-luxury-red" />
        </div>
        <h1 className="text-3xl md:text-4xl font-display font-bold text-luxury-black mb-4">MENTIONS LÉGALES</h1>
        <p className="text-lg text-luxury-gray-700 mb-2">Informations obligatoires concernant la société AUDIE BOUTIQUE et l'hébergeur du site.</p>
      </motion.div>
      
      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.7, ease: 'easeOut' }} className="max-w-xl mx-auto px-4 mt-10 bg-luxury-white rounded-3xl shadow-luxury p-8 space-y-8">
        
        {/* Section Éditeur du site : AUDIE BOUTIQUE */}
        <section className="border-b pb-4 border-luxury-gray-200">
          <h2 className="text-xl font-bold text-luxury-black mb-4">AUDIE BOUTIQUE</h2>
          <ul className="text-luxury-gray-700 space-y-1">
            <li><strong className="font-semibold">Adresse du siège social :</strong> 25 Zone La Laugier, 97215 Rivière salée</li>
            <li><strong className="font-semibold">Téléphone :</strong> 0696 01 01 11</li>
            <li><strong className="font-semibold">Email :</strong> <a href="mailto:contact@audieboutique.com" className="text-luxury-red hover:underline">contact@audieboutique.com</a></li>
            <li><strong className="font-semibold">SIRET :</strong> 85122704100015</li>
            <li><strong className="font-semibold">Numéro TVA :</strong> 0</li>
            <li><strong className="font-semibold">Numéro RCS :</strong> FORT DE FRANCE SIREN 851227041</li>
            <li><strong className="font-semibold">Code NAF :</strong> 4771Z</li>
            <li><strong className="font-semibold">Capital Social :</strong> 500 €</li>
            <li><strong className="font-semibold">Directeur de publication :</strong> AUDE PLESDIN</li>
          </ul>
        </section>

        {/* Section Hébergeur */}
        <section className="border-b pb-4 border-luxury-gray-200">
          <h2 className="text-xl font-bold text-luxury-black mb-4">Hébergeur</h2>
          <ul className="text-luxury-gray-700 space-y-1">
            <li><strong className="font-semibold">Société :</strong> Wix.com Inc.</li>
            <li><strong className="font-semibold">Adresse :</strong> 500 Terry A François Blvd San Francisco, CA 94158, États-Unis</li>
            <li><strong className="font-semibold">Téléphone :</strong> +1 415-639-9034</li>
          </ul>
        </section>
        
        {/* Section Règlement des litiges */}
        <section>
          <h2 className="text-xl font-bold text-luxury-black mb-4">Règlement des litiges en ligne</h2>
          <p className="text-luxury-gray-700">
            La Commission européenne fournit une plateforme de règlement des litiges en ligne (OS). Cette plateforme est disponible à l'adresse <a href="http://ec.europa.eu/consumers/odr/" target="_blank" rel="noopener noreferrer" className="text-luxury-red hover:underline font-semibold">http://ec.europa.eu/consumers/odr/</a>. 
            En tant que client, vous avez toujours la possibilité de contacter le conseil d'arbitrage de la Commission européenne. Nous ne sommes ni disposés à, ni obligés de, participer à une procédure de règlement des litiges devant un conseil d'arbitrage de la consommation.
          </p>
        </section>

      </motion.div>
    </div>
  </>
);

export default MentionsLegales;