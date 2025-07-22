import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, MapPin, Users, Award, Calendar, Quote } from 'lucide-react';
import { SEO } from '../components/ui/SEO';

const timelineEvents = [
  {
    year: '2018',
    title: 'Les Débuts',
    description: 'Création d\'Audie Boutique dans un petit atelier de Fort-de-France avec une vision : célébrer la beauté caribéenne.',
    image: 'https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    year: '2019',
    title: 'Première Collection Wax',
    description: 'Lancement de notre première collection de robes wax, mêlant tradition africaine et modernité caribéenne.',
    image: 'https://images.pexels.com/photos/1926769/pexels-photo-1926769.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    year: '2020',
    title: 'Expansion Lingerie',
    description: 'Développement de notre gamme lingerie premium, pensée pour sublimer toutes les morphologies.',
    image: 'https://images.pexels.com/photos/1536619/pexels-photo-1536619.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    year: '2021',
    title: 'Partenariats Artisans',
    description: 'Collaboration avec 15 artisans locaux pour préserver et valoriser le savoir-faire martiniquais.',
    image: 'https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    year: '2022',
    title: 'Boutique en Ligne',
    description: 'Lancement de notre plateforme e-commerce pour partager notre vision au-delà des frontières.',
    image: 'https://images.pexels.com/photos/1926769/pexels-photo-1926769.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    year: '2024',
    title: 'Aujourd\'hui',
    description: 'Plus de 10 000 clientes conquises et une communauté qui grandit chaque jour autour de nos valeurs.',
    image: 'https://images.pexels.com/photos/1536619/pexels-photo-1536619.jpeg?auto=compress&cs=tinysrgb&w=400'
  }
];

const values = [
  {
    icon: <Heart className="w-8 h-8" />,
    title: 'Passion',
    description: 'Chaque pièce est créée avec amour et attention aux détails'
  },
  {
    icon: <MapPin className="w-8 h-8" />,
    title: 'Héritage Caribéen',
    description: 'Fiers de nos racines martiniquaises et de notre culture'
  },
  {
    icon: <Users className="w-8 h-8" />,
    title: 'Communauté',
    description: 'Une famille de femmes qui se soutiennent et s\'inspirent'
  },
  {
    icon: <Award className="w-8 h-8" />,
    title: 'Excellence',
    description: 'Qualité premium et service client exceptionnel'
  }
];

export const OurStory: React.FC = () => {
  const [activeTimeline, setActiveTimeline] = useState(0);

  return (
    <>
      <SEO
        title="Notre Histoire"
        description="Découvrez l'histoire d'Audie Boutique, née en Martinique d'une passion pour la mode féminine caribéenne. De nos débuts artisanaux à notre succès actuel."
        keywords="histoire audie boutique, fondation, martinique, mode caribéenne, artisans locaux, passion mode féminine"
      />
      
      <div className="min-h-screen bg-luxury-white">
        {/* Hero Section */}
        <section className="relative h-screen overflow-hidden">
          <div className="absolute inset-0">
            <img
              src="https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg?auto=compress&cs=tinysrgb&w=1600"
              alt="Notre Histoire - Audie Boutique"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-luxury-black/60 via-luxury-black/40 to-luxury-red/30" />
          </div>
          
          {/* Floating Elements */}
          <div className="absolute inset-0 overflow-hidden">
            <motion.div
              animate={{ 
                y: [0, -20, 0],
                rotate: [0, 5, 0]
              }}
              transition={{ 
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="absolute top-20 right-20 w-32 h-32 border border-luxury-white/20 rounded-full"
            />
            <motion.div
              animate={{ 
                y: [0, 15, 0],
                rotate: [0, -3, 0]
              }}
              transition={{ 
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 2
              }}
              className="absolute bottom-32 left-16 w-24 h-24 border border-luxury-red/30 rounded-full"
            />
          </div>
          
          <div className="relative z-10 h-full flex items-center">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.5 }}
                className="max-w-4xl"
              >
                <motion.h1
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.7 }}
                  className="text-5xl md:text-7xl font-display font-bold text-luxury-white mb-8 leading-tight"
                >
                  Notre Histoire
                </motion.h1>
                
                <motion.p
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.9 }}
                  className="text-xl md:text-2xl text-luxury-white/90 mb-8 leading-relaxed max-w-3xl"
                >
                  Une aventure née sous le soleil des Antilles, portée par la passion 
                  de révéler la beauté authentique de chaque femme caribéenne.
                </motion.p>
                
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 1.1 }}
                  className="flex items-center space-x-6"
                >
                  <div className="flex items-center space-x-2">
                    <MapPin className="w-5 h-5 text-luxury-red" />
                    <span className="text-luxury-white/80">Fort-de-France, Martinique</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-5 h-5 text-luxury-red" />
                    <span className="text-luxury-white/80">Depuis 2018</span>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Story Content */}
        <section className="py-20 bg-luxury-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
              >
                <h2 className="text-4xl font-display font-bold text-luxury-black mb-8">
                  L'Inspiration Caribéenne
                </h2>
                <div className="space-y-6 text-lg text-luxury-gray-700 leading-relaxed">
                  <p>
                    Tout a commencé par un rêve simple : créer une mode qui célèbre 
                    la femme caribéenne dans toute sa splendeur. Inspirée par les couleurs 
                    vibrantes de nos couchers de soleil, la richesse de nos traditions 
                    et l'élégance naturelle de nos femmes.
                  </p>
                  <p>
                    Audie Boutique est née de cette vision, dans un petit atelier 
                    de Fort-de-France où chaque pièce était confectionnée à la main 
                    avec passion et dévouement.
                  </p>
                </div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="relative"
              >
                <img
                  src="https://images.pexels.com/photos/1926769/pexels-photo-1926769.jpeg?auto=compress&cs=tinysrgb&w=600"
                  alt="Inspiration caribéenne"
                  className="w-full h-96 object-cover rounded-3xl shadow-luxury"
                />
                <div className="absolute -bottom-6 -right-6 bg-luxury-red/10 p-6 rounded-2xl backdrop-blur-sm">
                  <Quote className="w-8 h-8 text-luxury-red" />
                </div>
              </motion.div>
            </div>

            {/* Founder Section */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="bg-gradient-to-r from-luxury-red/5 to-luxury-red/10 rounded-4xl p-12 mb-20"
            >
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div className="order-2 lg:order-1">
                  <h3 className="text-3xl font-display font-bold text-luxury-black mb-6">
                    Rencontrez Audie
                  </h3>
                  <div className="space-y-4 text-luxury-gray-700 leading-relaxed">
                    <p>
                      "Créer Audie Boutique, c'était réaliser un rêve d'enfance. 
                      Grandir en Martinique m'a appris que la beauté se trouve dans 
                      l'authenticité, dans cette façon unique qu'ont les femmes 
                      caribéennes de porter leurs vêtements avec fierté et élégance."
                    </p>
                    <p>
                      "Chaque pièce que nous créons raconte une histoire, celle de 
                      nos racines, de notre héritage, mais aussi de notre modernité 
                      et de notre ouverture sur le monde."
                    </p>
                  </div>
                  <div className="mt-8">
                    <div className="text-luxury-black font-semibold text-lg">Audie Martineau</div>
                    <div className="text-luxury-red">Fondatrice & Directrice Créative</div>
                  </div>
                </div>
                
                <div className="order-1 lg:order-2">
                  <img
                    src="https://images.pexels.com/photos/1536619/pexels-photo-1536619.jpeg?auto=compress&cs=tinysrgb&w=500"
                    alt="Audie Martineau, Fondatrice"
                    className="w-full h-80 object-cover rounded-3xl shadow-luxury"
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-20 bg-luxury-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-display font-bold text-luxury-black mb-6">
                Nos Valeurs
              </h2>
              <p className="text-xl text-luxury-gray-600 max-w-3xl mx-auto">
                Les principes qui guident chacune de nos actions et créations
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, index) => (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ y: -10 }}
                  className="bg-luxury-white p-8 rounded-3xl shadow-luxury text-center"
                >
                  <div className="bg-luxury-red/10 p-4 rounded-2xl inline-block mb-6 text-luxury-red">
                    {value.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-luxury-black mb-4">
                    {value.title}
                  </h3>
                  <p className="text-luxury-gray-600">
                    {value.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Timeline Section */}
        <section className="py-20 bg-luxury-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-display font-bold text-luxury-black mb-6">
                Notre Parcours
              </h2>
              <p className="text-xl text-luxury-gray-600 max-w-3xl mx-auto">
                Les moments clés qui ont façonné l'histoire d'Audie Boutique
              </p>
            </motion.div>

            <div className="relative">
              {/* Timeline Line */}
              <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-luxury-red/20 hidden lg:block" />
              
              <div className="space-y-12">
                {timelineEvents.map((event, index) => (
                  <motion.div
                    key={event.year}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: index * 0.1 }}
                    className={`flex flex-col lg:flex-row items-center gap-8 ${
                      index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
                    }`}
                  >
                    <div className="flex-1 lg:text-right lg:pr-8">
                      <div className="bg-luxury-white p-8 rounded-3xl shadow-luxury">
                        <div className="text-luxury-red font-bold text-2xl mb-2">
                          {event.year}
                        </div>
                        <h3 className="text-xl font-semibold text-luxury-black mb-4">
                          {event.title}
                        </h3>
                        <p className="text-luxury-gray-600 leading-relaxed">
                          {event.description}
                        </p>
                      </div>
                    </div>
                    
                    {/* Timeline Dot */}
                    <div className="relative z-10 w-4 h-4 bg-luxury-red rounded-full border-4 border-luxury-white shadow-lg hidden lg:block" />
                    
                    <div className="flex-1 lg:pl-8">
                      <img
                        src={event.image}
                        alt={event.title}
                        className="w-full h-64 object-cover rounded-3xl shadow-luxury"
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Signature Section */}
        <section className="py-20 bg-luxury-black">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <Quote className="w-16 h-16 text-luxury-red mx-auto mb-8" />
              
              <blockquote className="text-2xl md:text-3xl font-display text-luxury-white mb-8 italic leading-relaxed">
                "Audie Boutique, c'est plus qu'une marque. C'est une célébration 
                de la femme caribéenne, de sa force, de sa beauté et de son élégance naturelle."
              </blockquote>
              
              <div className="border-t border-luxury-red/30 pt-8 mt-8">
                <div className="text-luxury-white font-display text-3xl mb-2">
                  Audie Martineau
                </div>
                <div className="text-luxury-red">
                  Fondatrice & Âme d'Audie Boutique
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
};