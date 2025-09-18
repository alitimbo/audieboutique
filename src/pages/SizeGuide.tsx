import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp, Ruler, Info } from 'lucide-react';
import { SEO } from '../components/ui/SEO';

interface SizeChart {
  size: string;
  eu: string;
  us: string;
  uk: string;
  bust?: string;
  waist?: string;
  hips?: string;
}

const womenSizes: SizeChart[] = [
  { size: 'XS', eu: '34', us: '2', uk: '6', bust: '82-86', waist: '62-66', hips: '88-92' },
  { size: 'S', eu: '36', us: '4', uk: '8', bust: '86-90', waist: '66-70', hips: '92-96' },
  { size: 'M', eu: '38', us: '6', uk: '10', bust: '90-94', waist: '70-74', hips: '96-100' },
  { size: 'L', eu: '40', us: '8', uk: '12', bust: '94-98', waist: '74-78', hips: '100-104' },
  { size: 'XL', eu: '42', us: '10', uk: '14', bust: '98-102', waist: '78-82', hips: '104-108' },
  { size: 'XXL', eu: '44', us: '12', uk: '16', bust: '102-106', waist: '82-86', hips: '108-112' }
];

const faqData = [
  {
    question: "Comment prendre mes mesures correctement ?",
    answer: "Utilisez un mètre ruban souple et prenez vos mesures sur des sous-vêtements ajustés. Tenez-vous droite et respirez normalement. Pour le tour de poitrine, mesurez au point le plus fort. Pour la taille, mesurez au point le plus étroit. Pour les hanches, mesurez au point le plus large."
  },
  {
    question: "Entre deux tailles, laquelle choisir ?",
    answer: "Si vous hésitez entre deux tailles, nous recommandons généralement de choisir la taille supérieure pour plus de confort. Cependant, cela peut varier selon le type de vêtement et la coupe souhaitée."
  },
  {
    question: "Les tailles correspondent-elles aux standards français ?",
    answer: "Nos tailles correspondent aux standards européens. Si vous portez habituellement du 38 en France, choisissez la taille M dans notre guide."
  },
  {
    question: "Puis-je échanger si la taille ne convient pas ?",
    answer: "Oui, nous acceptons les échanges sous 30 jours. L'article doit être dans son état d'origine avec les étiquettes. Les frais de retour sont gratuits en Martinique."
  }
];

export const SizeGuide: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<'women' | 'lingerie'>('women');
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setExpandedFaq(expandedFaq === index ? null : index);
  };

  return (
    <>
      <SEO
        title="Guide des Tailles"
        description="Guide des tailles Audie Boutique pour choisir la taille parfaite. Tableaux de correspondance EU, US, UK et conseils de mesure pour la mode féminine."
        keywords="guide des tailles, correspondance tailles, mesures, audie boutique, mode féminine, lingerie, martinique"
      />
      
      <div className="min-h-screen bg-gradient-to-br from-luxury-gray-50 to-luxury-white pt-0">
        {/* Hero Banner */}
        <section className="relative h-96 overflow-hidden">
          <div className="absolute inset-0">
            <img
              src="/size-bg.png"
              alt="Guide des tailles - Audie Boutique"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-luxury-black/60 via-luxury-black/40 to-luxury-black/60" />
          </div>
          
          <div className="relative z-10 h-full flex items-center">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-center"
              >
                <h1 className="text-4xl md:text-5xl font-display font-bold text-luxury-white mb-6">
                  Guide des Tailles
                </h1>
                <p className="text-xl text-luxury-gray-300 max-w-2xl mx-auto">
                  Trouvez votre taille parfaite avec nos tableaux de correspondance et conseils personnalisés
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          {/* Category Selector */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex justify-center mb-12"
          >
            <div className="bg-luxury-white rounded-2xl p-2 shadow-luxury">
              <div className="flex space-x-2">
                {[
                  { key: 'women', label: 'Prêt-à-porter' },
                  { key: 'lingerie', label: 'Lingerie' }
                ].map((category) => (
                  <button
                    key={category.key}
                    onClick={() => setActiveCategory(category.key as 'women' | 'lingerie')}
                    className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                      activeCategory === category.key
                        ? 'bg-luxury-red text-luxury-white shadow-luxury-red'
                        : 'text-luxury-gray-600 hover:text-luxury-black'
                    }`}
                  >
                    {category.label}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Size Charts */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-luxury-white rounded-3xl p-8 shadow-luxury mb-12"
          >
            <h2 className="text-2xl font-display font-bold text-luxury-black mb-6 text-center">
              Tableau des Correspondances
            </h2>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b-2 border-luxury-gray-200">
                    <th className="text-left py-4 px-4 font-semibold text-luxury-black">Taille</th>
                    <th className="text-center py-4 px-4 font-semibold text-luxury-black">EU</th>
                    <th className="text-center py-4 px-4 font-semibold text-luxury-black">US</th>
                    <th className="text-center py-4 px-4 font-semibold text-luxury-black">UK</th>
                    <th className="text-center py-4 px-4 font-semibold text-luxury-black">Poitrine (cm)</th>
                    <th className="text-center py-4 px-4 font-semibold text-luxury-black">Taille (cm)</th>
                    <th className="text-center py-4 px-4 font-semibold text-luxury-black">Hanches (cm)</th>
                  </tr>
                </thead>
                <tbody>
                  {womenSizes.map((size, index) => (
                    <motion.tr
                      key={size.size}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="border-b border-luxury-gray-100 hover:bg-luxury-gray-50 transition-colors duration-200"
                    >
                      <td className="py-4 px-4 font-semibold text-luxury-red">{size.size}</td>
                      <td className="py-4 px-4 text-center text-luxury-black">{size.eu}</td>
                      <td className="py-4 px-4 text-center text-luxury-black">{size.us}</td>
                      <td className="py-4 px-4 text-center text-luxury-black">{size.uk}</td>
                      <td className="py-4 px-4 text-center text-luxury-black">{size.bust}</td>
                      <td className="py-4 px-4 text-center text-luxury-black">{size.waist}</td>
                      <td className="py-4 px-4 text-center text-luxury-black">{size.hips}</td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>

          {/* Measurement Guide */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-luxury-white rounded-3xl p-8 shadow-luxury"
            >
              <h2 className="text-2xl font-display font-bold text-luxury-black mb-6">
                Comment prendre vos mesures
              </h2>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="bg-luxury-red/10 p-2 rounded-full">
                    <Ruler className="w-5 h-5 text-luxury-red" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-luxury-black mb-2">Tour de poitrine</h3>
                    <p className="text-luxury-gray-600 text-sm">
                      Mesurez horizontalement au niveau le plus fort de la poitrine, 
                      en gardant le mètre bien droit dans le dos.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="bg-luxury-red/10 p-2 rounded-full">
                    <Ruler className="w-5 h-5 text-luxury-red" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-luxury-black mb-2">Tour de taille</h3>
                    <p className="text-luxury-gray-600 text-sm">
                      Mesurez au niveau le plus étroit de la taille, généralement 
                      au-dessus du nombril et sous la poitrine.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="bg-luxury-red/10 p-2 rounded-full">
                    <Ruler className="w-5 h-5 text-luxury-red" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-luxury-black mb-2">Tour de hanches</h3>
                    <p className="text-luxury-gray-600 text-sm">
                      Mesurez au niveau le plus large des hanches, 
                      en gardant les pieds joints.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="bg-luxury-white rounded-3xl p-8 shadow-luxury"
            >
              <h2 className="text-2xl font-display font-bold text-luxury-black mb-6">
                Conseils par catégorie
              </h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold text-luxury-black mb-2">Robes & Tops</h3>
                  <p className="text-luxury-gray-600 text-sm mb-2">
                    Nos coupes sont ajustées mais confortables. Si vous aimez porter plus ample, 
                    choisissez la taille au-dessus.
                  </p>
                </div>
                
                <div>
                  <h3 className="font-semibold text-luxury-black mb-2">Lingerie</h3>
                  <p className="text-luxury-gray-600 text-sm mb-2">
                    Pour un maintien optimal, respectez exactement vos mesures. 
                    N'hésitez pas à nous contacter pour des conseils personnalisés.
                  </p>
                </div>
                
                <div>
                  <h3 className="font-semibold text-luxury-black mb-2">Corsets & Gaines</h3>
                  <p className="text-luxury-gray-600 text-sm mb-2">
                    Ces articles sont conçus pour sculpter la silhouette. 
                    Choisissez votre taille habituelle pour un effet optimal.
                  </p>
                </div>
                
                <div className="bg-luxury-gray-50 p-4 rounded-xl">
                  <div className="flex items-start space-x-2">
                    <Info className="w-5 h-5 text-luxury-red mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-luxury-black text-sm">Conseil d'experte</h4>
                      <p className="text-luxury-gray-600 text-xs">
                        En cas de doute, contactez notre service client. 
                        Nous sommes là pour vous aider à choisir la taille parfaite !
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* FAQ Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="bg-luxury-white rounded-3xl p-8 shadow-luxury"
          >
            <h2 className="text-2xl font-display font-bold text-luxury-black mb-6 text-center">
              Questions Fréquentes
            </h2>
            
            <div className="space-y-4">
              {faqData.map((faq, index) => (
                <div key={index} className="border border-luxury-gray-200 rounded-xl overflow-hidden">
                  <button
                    onClick={() => toggleFaq(index)}
                    className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-luxury-gray-50 transition-colors duration-200"
                  >
                    <span className="font-semibold text-luxury-black">{faq.question}</span>
                    {expandedFaq === index ? (
                      <ChevronUp className="w-5 h-5 text-luxury-red" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-luxury-red" />
                    )}
                  </button>
                  
                  <AnimatePresence>
                    {expandedFaq === index && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="px-6 pb-4"
                      >
                        <p className="text-luxury-gray-600">{faq.answer}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
};