import React from 'react';
import { motion } from 'framer-motion';
import { Leaf, Heart, Users, Award, Recycle, Globe } from 'lucide-react';
import { SEO } from '../components/ui/SEO';

const commitments = [
  {
    icon: <Leaf className="w-8 h-8" />,
    title: "Matières Éco-responsables",
    description: "Nous privilégions les fibres naturelles, biologiques et recyclées pour créer des vêtements respectueux de l'environnement.",
    details: [
      "Coton biologique certifié GOTS",
      "Fibres recyclées et upcyclées",
      "Teintures naturelles sans produits chimiques",
      "Emballages biodégradables"
    ]
  },
  {
    icon: <Heart className="w-8 h-8" />,
    title: "Commerce Équitable",
    description: "Nos partenaires de production respectent des conditions de travail justes et éthiques pour tous les artisans.",
    details: [
      "Salaires équitables garantis",
      "Conditions de travail sécurisées",
      "Respect des droits humains",
      "Partenariats durables"
    ]
  },
  {
    icon: <Users className="w-8 h-8" />,
    title: "Collaborations Locales",
    description: "Nous travaillons avec des artisans martiniquais pour préserver et valoriser le savoir-faire caribéen.",
    details: [
      "Artisans locaux martiniquais",
      "Techniques traditionnelles préservées",
      "Économie locale soutenue",
      "Transmission des savoir-faire"
    ]
  },
  {
    icon: <Award className="w-8 h-8" />,
    title: "Qualité Premium",
    description: "Chaque pièce est contrôlée et testée pour garantir une durabilité exceptionnelle et un confort optimal.",
    details: [
      "Contrôle qualité rigoureux",
      "Tests de résistance et durabilité",
      "Finitions artisanales soignées",
      "Garantie satisfaction client"
    ]
  }
];

const certifications = [
  { name: "GOTS", description: "Global Organic Textile Standard" },
  { name: "OEKO-TEX", description: "Standard 100 - Textiles sans substances nocives" },
  { name: "Fair Trade", description: "Commerce équitable certifié" },
  { name: "B-Corp", description: "Entreprise à impact positif" }
];

export const Quality: React.FC = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12
      }
    }
  };

  return (
    <>
      <SEO
        title="Engagement & Qualité"
        description="Découvrez l'engagement d'Audie Boutique pour une mode éthique et durable. Matières éco-responsables, commerce équitable et collaborations locales en Martinique."
        keywords="engagement, qualité, mode éthique, développement durable, commerce équitable, martinique, artisans locaux, eco-responsable"
      />
      
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-amber-50 pt-0">
        {/* Hero Section */}
        <section className="relative h-96 overflow-hidden">
          <div className="absolute inset-0">
            <img
              src="/quality-bg.png"
              alt="Engagement Qualité - Audie Boutique"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-green-900/70 via-green-800/50 to-amber-900/70" />
          </div>
          
          <div className="relative z-10 h-full flex items-center">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-center"
              >
                <h1 className="text-4xl md:text-5xl font-display font-bold text-white mb-6">
                  Engagement & Qualité
                </h1>
                <p className="text-xl text-green-100 max-w-3xl mx-auto">
                  Notre vision d'une mode éthique, durable et respectueuse de notre belle Martinique
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          {/* Introduction */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-display font-bold text-gray-800 mb-6">
              Une Mode Consciente et Responsable
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Chez Audie Boutique, nous croyons qu'il est possible d'allier élégance, qualité et respect de l'environnement. 
              Découvrez nos engagements pour une mode plus éthique et durable.
            </p>
          </motion.div>

          {/* Commitments Grid */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16"
          >
            {commitments.map((commitment, index) => (
              <motion.div
                key={commitment.title}
                variants={itemVariants}
                whileHover={{ y: -5 }}
                className="bg-white rounded-3xl p-8 shadow-lg border border-green-100"
              >
                <div className="flex items-center mb-6">
                  <div className="bg-green-100 p-3 rounded-2xl text-green-600 mr-4">
                    {commitment.icon}
                  </div>
                  <h3 className="text-xl font-display font-bold text-gray-800">
                    {commitment.title}
                  </h3>
                </div>
                
                <p className="text-gray-600 mb-6 leading-relaxed">
                  {commitment.description}
                </p>
                
                <ul className="space-y-2">
                  {commitment.details.map((detail, detailIndex) => (
                    <li key={detailIndex} className="flex items-center text-sm text-gray-600">
                      <div className="w-2 h-2 bg-green-500 rounded-full mr-3" />
                      {detail}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </motion.div>

          {/* Artisan Showcase */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="bg-white rounded-3xl p-8 md:p-12 shadow-lg mb-16"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-display font-bold text-gray-800 mb-6">
                  Nos Artisans Martiniquais
                </h2>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  Nous collaborons étroitement avec des artisans locaux pour créer des pièces uniques 
                  qui célèbrent l'héritage culturel caribéen. Chaque création raconte une histoire 
                  et perpétue un savoir-faire ancestral.
                </p>
                
                <div className="grid grid-cols-2 gap-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600 mb-1">15+</div>
                    <div className="text-sm text-gray-600">Artisans partenaires</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600 mb-1">100%</div>
                    <div className="text-sm text-gray-600">Made in Martinique</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600 mb-1">5</div>
                    <div className="text-sm text-gray-600">Générations de savoir-faire</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600 mb-1">50+</div>
                    <div className="text-sm text-gray-600">Techniques préservées</div>
                  </div>
                </div>
              </div>
              
              <div className="relative">
                <img
                  src="/bijoux.png"
                  alt="Artisans martiniquais"
                  className="w-full h-80 object-cover rounded-2xl"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-green-900/30 to-transparent rounded-2xl" />
              </div>
            </div>
          </motion.div>

          {/* Certifications */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="bg-gradient-to-r from-green-600 to-amber-600 rounded-3xl p-8 md:p-12 text-white mb-16"
          >
            <div className="text-center mb-8">
              <h2 className="text-3xl font-display font-bold mb-4">
                Nos Certifications
              </h2>
              <p className="text-green-100 max-w-2xl mx-auto">
                Nos engagements sont reconnus par des organismes internationaux 
                qui garantissent nos pratiques éthiques et durables.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {certifications.map((cert, index) => (
                <motion.div
                  key={cert.name}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                  className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center"
                >
                  <div className="bg-white/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Award className="w-8 h-8" />
                  </div>
                  <h3 className="font-bold text-lg mb-2">{cert.name}</h3>
                  <p className="text-sm text-green-100">{cert.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Call to Action */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="bg-white rounded-3xl p-8 md:p-12 shadow-lg text-center"
          >
            <div className="max-w-3xl mx-auto">
              <div className="flex justify-center mb-6">
                <div className="bg-green-100 p-4 rounded-full">
                  <Globe className="w-12 h-12 text-green-600" />
                </div>
              </div>
              
              <h2 className="text-3xl font-display font-bold text-gray-800 mb-6">
                Rejoignez Notre Mouvement
              </h2>
              
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                Chaque achat chez Audie Boutique est un vote pour une mode plus éthique et durable. 
                Ensemble, créons un avenir plus beau pour notre île et notre planète.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-green-600 text-white font-semibold rounded-2xl hover:bg-green-700 transition-colors duration-300 shadow-lg"
                >
                  Découvrir nos produits éthiques
                </motion.button>
                
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 border-2 border-green-600 text-green-600 font-semibold rounded-2xl hover:bg-green-600 hover:text-white transition-all duration-300"
                >
                  En savoir plus sur nos actions
                </motion.button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
};