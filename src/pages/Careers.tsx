import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, MapPin, Clock, ChevronDown, ChevronUp, Send, Linkedin, Mail } from 'lucide-react';
import { SEO } from '../components/ui/SEO';

const openPositions = [
  {
    id: 1,
    title: 'Styliste Mode Féminine',
    location: 'Fort-de-France, Martinique',
    type: 'CDI',
    department: 'Création',
    description: 'Nous recherchons un(e) styliste passionné(e) pour rejoindre notre équipe créative et développer nos collections futures.',
    requirements: [
      'Formation en stylisme ou mode',
      '3+ années d\'expérience en mode féminine',
      'Connaissance des tendances caribéennes',
      'Maîtrise des logiciels de design (Illustrator, Photoshop)',
      'Sensibilité pour le luxe et l\'élégance'
    ],
    responsibilities: [
      'Concevoir et développer les collections saisonnières',
      'Effectuer une veille tendance constante',
      'Collaborer avec les artisans locaux',
      'Participer aux shootings et présentations'
    ]
  },
  {
    id: 2,
    title: 'Responsable E-commerce',
    location: 'Martinique / Télétravail hybride',
    type: 'CDI',
    department: 'Digital',
    description: 'Poste clé pour développer notre présence en ligne et optimiser l\'expérience client sur notre boutique digitale.',
    requirements: [
      'Expérience e-commerce 5+ ans',
      'Maîtrise des plateformes web (Shopify, WooCommerce)',
      'Connaissance du marketing digital',
      'Analyse de données et KPIs',
      'Anglais courant'
    ],
    responsibilities: [
      'Gérer et optimiser la boutique en ligne',
      'Développer les stratégies de conversion',
      'Analyser les performances et ROI',
      'Coordonner avec les équipes marketing'
    ]
  },
  {
    id: 3,
    title: 'Artisan Couture',
    location: 'Fort-de-France, Martinique',
    type: 'CDI',
    department: 'Production',
    description: 'Rejoignez notre atelier pour donner vie aux créations Audie Boutique avec votre savoir-faire artisanal.',
    requirements: [
      'CAP Couture ou équivalent',
      'Expérience en couture fine et lingerie',
      'Précision et attention aux détails',
      'Passion pour l\'artisanat de qualité',
      'Connaissance des tissus nobles'
    ],
    responsibilities: [
      'Confectionner les pièces selon les patrons',
      'Assurer la qualité et les finitions',
      'Participer aux prototypages',
      'Former les nouveaux artisans'
    ]
  },
  {
    id: 4,
    title: 'Community Manager',
    location: 'Remote / Martinique',
    type: 'Freelance',
    department: 'Marketing',
    description: 'Développez notre communauté en ligne et racontez l\'histoire d\'Audie Boutique sur les réseaux sociaux.',
    requirements: [
      'Expérience réseaux sociaux 3+ ans',
      'Excellente plume et créativité',
      'Connaissance de la mode et du luxe',
      'Maîtrise des outils de planification',
      'Sensibilité à la culture caribéenne'
    ],
    responsibilities: [
      'Créer et planifier le contenu social',
      'Animer la communauté Instagram/Facebook',
      'Collaborer avec les influenceuses',
      'Analyser les performances social media'
    ]
  }
];

const benefits = [
  'Environnement de travail inspirant en Martinique',
  'Équipe passionnée et bienveillante',
  'Formation continue et développement personnel',
  'Participation aux bénéfices',
  'Congés supplémentaires et flexibilité',
  'Réductions sur toute la collection'
];

export const Careers: React.FC = () => {
  const [expandedPosition, setExpandedPosition] = useState<number | null>(null);

  const togglePosition = (id: number) => {
    setExpandedPosition(expandedPosition === id ? null : id);
  };

  return (
    <>
      <SEO
        title="Carrières"
        description="Rejoignez l'équipe Audie Boutique ! Découvrez nos offres d'emploi en Martinique dans la mode, le e-commerce, l'artisanat et le marketing digital."
        keywords="emploi martinique, carrières mode, jobs audie boutique, recrutement fashion, styliste martinique, e-commerce jobs"
      />
      
      <div className="min-h-screen bg-gradient-to-br from-luxury-gray-50 to-luxury-white pt-0">
        {/* Hero Section */}
        <section className="relative h-96 overflow-hidden">
          <div className="absolute inset-0">
            <img
              src="https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg?auto=compress&cs=tinysrgb&w=1200"
              alt="Équipe Audie Boutique"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-luxury-black/70 via-luxury-black/50 to-luxury-red/30" />
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
                  Rejoignez Notre Équipe
                </h1>
                <p className="text-xl text-luxury-white/90 max-w-3xl mx-auto">
                  Participez à l'aventure Audie Boutique et contribuez à célébrer 
                  la beauté caribéenne à travers la mode de luxe
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          {/* Company Culture */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-16"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-display font-bold text-luxury-black mb-6">
                  La Vie chez Audie Boutique
                </h2>
                <div className="space-y-4 text-lg text-luxury-gray-700 leading-relaxed">
                  <p>
                    Chez Audie Boutique, nous croyons que le talent s'épanouit dans 
                    un environnement bienveillant et inspirant. Notre équipe multiculturelle 
                    partage une passion commune : créer une mode qui célèbre la femme caribéenne.
                  </p>
                  <p>
                    Basés au cœur de la Martinique, nous offrons un cadre de travail unique 
                    où créativité, innovation et respect des traditions se rencontrent 
                    pour donner naissance à des créations exceptionnelles.
                  </p>
                </div>
                
                <div className="mt-8 grid grid-cols-2 gap-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-luxury-red mb-1">25+</div>
                    <div className="text-sm text-luxury-gray-600">Collaborateurs</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-luxury-red mb-1">6</div>
                    <div className="text-sm text-luxury-gray-600">Années d'existence</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-luxury-red mb-1">15+</div>
                    <div className="text-sm text-luxury-gray-600">Nationalités</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-luxury-red mb-1">100%</div>
                    <div className="text-sm text-luxury-gray-600">Passion</div>
                  </div>
                </div>
              </div>
              
              <div className="relative">
                <img
                  src="https://images.pexels.com/photos/1926769/pexels-photo-1926769.jpeg?auto=compress&cs=tinysrgb&w=600"
                  alt="Équipe au travail"
                  className="w-full h-80 object-cover rounded-3xl shadow-luxury"
                />
                <div className="absolute -bottom-6 -right-6 bg-luxury-red/10 p-6 rounded-2xl backdrop-blur-sm">
                  <Users className="w-8 h-8 text-luxury-red" />
                </div>
              </div>
            </div>
          </motion.div>

          {/* Benefits */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="bg-luxury-white rounded-3xl p-8 shadow-luxury mb-16"
          >
            <h2 className="text-3xl font-display font-bold text-luxury-black mb-8 text-center">
              Nos Avantages
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={benefit}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center space-x-3 p-4 bg-luxury-gray-50 rounded-xl"
                >
                  <div className="w-2 h-2 bg-luxury-red rounded-full flex-shrink-0" />
                  <span className="text-luxury-gray-700">{benefit}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Open Positions */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-16"
          >
            <h2 className="text-3xl font-display font-bold text-luxury-black mb-8 text-center">
              Postes Ouverts
            </h2>
            
            <div className="space-y-4">
              {openPositions.map((position) => (
                <motion.div
                  key={position.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  className="bg-luxury-white rounded-2xl shadow-luxury overflow-hidden"
                >
                  <button
                    onClick={() => togglePosition(position.id)}
                    className="w-full p-6 text-left hover:bg-luxury-gray-50 transition-colors duration-200"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-4 mb-2">
                          <h3 className="text-xl font-semibold text-luxury-black">
                            {position.title}
                          </h3>
                          <span className="bg-luxury-red/10 text-luxury-red px-3 py-1 rounded-full text-sm font-medium">
                            {position.department}
                          </span>
                        </div>
                        
                        <div className="flex items-center space-x-6 text-sm text-luxury-gray-600">
                          <div className="flex items-center space-x-1">
                            <MapPin className="w-4 h-4" />
                            <span>{position.location}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Clock className="w-4 h-4" />
                            <span>{position.type}</span>
                          </div>
                        </div>
                      </div>
                      
                      {expandedPosition === position.id ? (
                        <ChevronUp className="w-5 h-5 text-luxury-red" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-luxury-red" />
                      )}
                    </div>
                  </button>
                  
                  <AnimatePresence>
                    {expandedPosition === position.id && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="border-t border-luxury-gray-200"
                      >
                        <div className="p-6 space-y-6">
                          <p className="text-luxury-gray-700 leading-relaxed">
                            {position.description}
                          </p>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                              <h4 className="font-semibold text-luxury-black mb-3">
                                Profil recherché
                              </h4>
                              <ul className="space-y-2">
                                {position.requirements.map((req, index) => (
                                  <li key={index} className="flex items-start space-x-2 text-sm text-luxury-gray-600">
                                    <div className="w-1.5 h-1.5 bg-luxury-red rounded-full mt-2 flex-shrink-0" />
                                    <span>{req}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                            
                            <div>
                              <h4 className="font-semibold text-luxury-black mb-3">
                                Responsabilités
                              </h4>
                              <ul className="space-y-2">
                                {position.responsibilities.map((resp, index) => (
                                  <li key={index} className="flex items-start space-x-2 text-sm text-luxury-gray-600">
                                    <div className="w-1.5 h-1.5 bg-luxury-red rounded-full mt-2 flex-shrink-0" />
                                    <span>{resp}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                          
                          <div className="flex flex-col sm:flex-row gap-4 pt-4 border-t border-luxury-gray-200">
                            <motion.button
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                              className="flex items-center justify-center space-x-2 px-6 py-3 bg-luxury-red text-luxury-white rounded-xl font-medium hover:bg-red-700 transition-colors duration-200"
                            >
                              <Send className="w-4 h-4" />
                              <span>Postuler par email</span>
                            </motion.button>
                            
                            <motion.button
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                              className="flex items-center justify-center space-x-2 px-6 py-3 border-2 border-luxury-gray-300 text-luxury-gray-700 rounded-xl font-medium hover:border-luxury-red hover:text-luxury-red transition-all duration-200"
                            >
                              <Linkedin className="w-4 h-4" />
                              <span>Postuler via LinkedIn</span>
                            </motion.button>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="bg-gradient-to-r from-luxury-red to-red-700 rounded-3xl p-12 text-center text-luxury-white"
          >
            <h2 className="text-3xl font-display font-bold mb-6">
              Vous ne trouvez pas le poste idéal ?
            </h2>
            <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
              Nous sommes toujours à la recherche de talents exceptionnels. 
              N'hésitez pas à nous envoyer votre candidature spontanée !
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center justify-center space-x-2 px-8 py-4 bg-luxury-white text-luxury-red font-semibold rounded-2xl hover:bg-luxury-gray-100 transition-colors duration-300"
              >
                <Mail className="w-5 h-5" />
                <span>Candidature spontanée</span>
              </motion.button>
            </div>
            
            <div className="mt-8 text-sm opacity-75">
              <p>Email : careers@audieboutique.com</p>
              <p>Objet : [Candidature Spontanée] - Votre Nom</p>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
};