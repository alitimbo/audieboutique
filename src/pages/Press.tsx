import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Download, ExternalLink, Mail, Phone, ChevronLeft, ChevronRight, Star } from 'lucide-react';
import { SEO } from '../components/ui/SEO';

const pressArticles = [
  {
    id: 1,
    publication: 'Elle Magazine',
    logo: 'https://images.pexels.com/photos/1926769/pexels-photo-1926769.jpeg?auto=compress&cs=tinysrgb&w=100',
    title: 'Audie Boutique : La révolution mode en Martinique',
    excerpt: 'Une marque qui célèbre l\'élégance caribéenne avec un savoir-faire exceptionnel...',
    date: 'Mars 2024',
    link: '#',
    featured: true
  },
  {
    id: 2,
    publication: 'Vogue Paris',
    logo: 'https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg?auto=compress&cs=tinysrgb&w=100',
    title: 'Les créateurs caribéens à suivre',
    excerpt: 'Audie Boutique figure parmi les marques émergentes qui redéfinissent la mode tropicale...',
    date: 'Février 2024',
    link: '#',
    featured: true
  },
  {
    id: 3,
    publication: 'Marie Claire',
    logo: 'https://images.pexels.com/photos/1536619/pexels-photo-1536619.jpeg?auto=compress&cs=tinysrgb&w=100',
    title: 'Mode éthique : les marques qui comptent',
    excerpt: 'Focus sur Audie Boutique et son engagement pour une mode responsable...',
    date: 'Janvier 2024',
    link: '#',
    featured: false
  },
  {
    id: 4,
    publication: 'Grazia',
    logo: 'https://images.pexels.com/photos/1926769/pexels-photo-1926769.jpeg?auto=compress&cs=tinysrgb&w=100',
    title: 'Lingerie de luxe : nos coups de cœur',
    excerpt: 'La collection lingerie d\'Audie Boutique séduit par sa finesse et son élégance...',
    date: 'Décembre 2023',
    link: '#',
    featured: false
  }
];

const mediaKit = [
  {
    name: 'Logo Audie Boutique',
    description: 'Logos en haute résolution (PNG, SVG, EPS)',
    size: '2.5 MB',
    type: 'Logos'
  },
  {
    name: 'Photos Produits',
    description: 'Sélection de photos produits HD',
    size: '15.2 MB',
    type: 'Photos'
  },
  {
    name: 'Photos Équipe',
    description: 'Photos officielles de l\'équipe et fondatrice',
    size: '8.7 MB',
    type: 'Photos'
  },
  {
    name: 'Communiqué de Presse',
    description: 'Derniers communiqués et informations officielles',
    size: '1.1 MB',
    type: 'Documents'
  }
];

const socialBuzz = [
  {
    platform: 'Instagram',
    author: '@fashionista_mq',
    content: 'Absolument fan de ma nouvelle robe @audieboutique ! La qualité est exceptionnelle 😍 #AudieBoutique #ModeMartinique',
    likes: 1247,
    image: 'https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg?auto=compress&cs=tinysrgb&w=300'
  },
  {
    platform: 'Instagram',
    author: '@caribbean_style',
    content: 'Cette collection wax d\'Audie Boutique est juste parfaite ! Fière de porter nos créateurs locaux 🌺',
    likes: 892,
    image: 'https://images.pexels.com/photos/1926769/pexels-photo-1926769.jpeg?auto=compress&cs=tinysrgb&w=300'
  },
  {
    platform: 'Instagram',
    author: '@luxury_lover',
    content: 'Service client au top et produits de qualité premium. Audie Boutique mérite sa réputation ! ⭐⭐⭐⭐⭐',
    likes: 634,
    image: 'https://images.pexels.com/photos/1536619/pexels-photo-1536619.jpeg?auto=compress&cs=tinysrgb&w=300'
  }
];

export const Press: React.FC = () => {
  const [currentBuzz, setCurrentBuzz] = useState(0);

  const nextBuzz = () => {
    setCurrentBuzz((prev) => (prev + 1) % socialBuzz.length);
  };

  const prevBuzz = () => {
    setCurrentBuzz((prev) => (prev - 1 + socialBuzz.length) % socialBuzz.length);
  };

  return (
    <>
      <SEO
        title="Presse"
        description="Espace presse Audie Boutique. Retrouvez nos communiqués, kit média, articles de presse et contacts pour les journalistes et influenceurs."
        keywords="presse audie boutique, communiqué presse, kit média, articles presse, contact journalistes, mode martinique presse"
      />
      
      <div className="min-h-screen bg-gradient-to-br from-luxury-gray-50 to-luxury-white pt-0">
        {/* Hero Section */}
        <section className="relative h-96 overflow-hidden">
          <div className="absolute inset-0">
            <img
              src="https://images.pexels.com/photos/1926769/pexels-photo-1926769.jpeg?auto=compress&cs=tinysrgb&w=1200"
              alt="Espace Presse - Audie Boutique"
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
                  Espace Presse
                </h1>
                <p className="text-xl text-luxury-white/90 max-w-3xl mx-auto">
                  Découvrez l'univers Audie Boutique à travers les médias et 
                  accédez à nos ressources presse
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          {/* Featured Articles */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-16"
          >
            <h2 className="text-3xl font-display font-bold text-luxury-black mb-8 text-center">
              Ils parlent de nous
            </h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
              {pressArticles.filter(article => article.featured).map((article) => (
                <motion.div
                  key={article.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  whileHover={{ y: -5 }}
                  className="bg-luxury-white rounded-3xl p-8 shadow-luxury"
                >
                  <div className="flex items-center space-x-4 mb-6">
                    <img
                      src={article.logo}
                      alt={article.publication}
                      className="w-16 h-16 object-cover rounded-2xl"
                    />
                    <div>
                      <h3 className="font-semibold text-luxury-black text-lg">
                        {article.publication}
                      </h3>
                      <p className="text-luxury-gray-500 text-sm">{article.date}</p>
                    </div>
                  </div>
                  
                  <h4 className="text-xl font-semibold text-luxury-black mb-4">
                    {article.title}
                  </h4>
                  
                  <p className="text-luxury-gray-600 mb-6 leading-relaxed">
                    {article.excerpt}
                  </p>
                  
                  <motion.a
                    href={article.link}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="inline-flex items-center space-x-2 text-luxury-red hover:text-red-700 font-medium transition-colors duration-200"
                  >
                    <span>Lire l'article</span>
                    <ExternalLink className="w-4 h-4" />
                  </motion.a>
                </motion.div>
              ))}
            </div>
            
            {/* Other Articles */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {pressArticles.filter(article => !article.featured).map((article) => (
                <motion.div
                  key={article.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  className="bg-luxury-white rounded-2xl p-6 shadow-luxury border border-luxury-gray-100"
                >
                  <div className="flex items-center space-x-3 mb-4">
                    <img
                      src={article.logo}
                      alt={article.publication}
                      className="w-12 h-12 object-cover rounded-xl"
                    />
                    <div>
                      <h3 className="font-semibold text-luxury-black">
                        {article.publication}
                      </h3>
                      <p className="text-luxury-gray-500 text-sm">{article.date}</p>
                    </div>
                  </div>
                  
                  <h4 className="font-semibold text-luxury-black mb-3">
                    {article.title}
                  </h4>
                  
                  <p className="text-luxury-gray-600 text-sm mb-4">
                    {article.excerpt}
                  </p>
                  
                  <a
                    href={article.link}
                    className="inline-flex items-center space-x-1 text-luxury-red hover:text-red-700 text-sm font-medium transition-colors duration-200"
                  >
                    <span>Lire</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Media Kit */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-16"
          >
            <div className="bg-luxury-white rounded-3xl p-8 shadow-luxury">
              <h2 className="text-3xl font-display font-bold text-luxury-black mb-8 text-center">
                Kit Média
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {mediaKit.map((item, index) => (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center justify-between p-6 bg-luxury-gray-50 rounded-2xl"
                  >
                    <div className="flex-1">
                      <h3 className="font-semibold text-luxury-black mb-1">
                        {item.name}
                      </h3>
                      <p className="text-luxury-gray-600 text-sm mb-2">
                        {item.description}
                      </p>
                      <div className="flex items-center space-x-4 text-xs text-luxury-gray-500">
                        <span>{item.type}</span>
                        <span>•</span>
                        <span>{item.size}</span>
                      </div>
                    </div>
                    
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="ml-4 p-3 bg-luxury-red text-luxury-white rounded-xl hover:bg-red-700 transition-colors duration-200"
                    >
                      <Download className="w-5 h-5" />
                    </motion.button>
                  </motion.div>
                ))}
              </div>
              
              <div className="mt-8 text-center">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-8 py-4 bg-luxury-black text-luxury-white font-semibold rounded-2xl hover:bg-luxury-gray-900 transition-colors duration-300"
                >
                  Télécharger le kit complet
                </motion.button>
              </div>
            </div>
          </motion.div>

          {/* Social Buzz */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-16"
          >
            <h2 className="text-3xl font-display font-bold text-luxury-black mb-8 text-center">
              Buzz Social Media
            </h2>
            
            <div className="relative bg-luxury-white rounded-3xl p-8 shadow-luxury">
              <div className="flex items-center justify-between mb-6">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={prevBuzz}
                  className="p-3 bg-luxury-gray-100 rounded-full hover:bg-luxury-gray-200 transition-colors duration-200"
                >
                  <ChevronLeft className="w-5 h-5 text-luxury-gray-600" />
                </motion.button>
                
                <div className="flex space-x-2">
                  {socialBuzz.map((_, index) => (
                    <div
                      key={index}
                      className={`w-2 h-2 rounded-full transition-colors duration-200 ${
                        index === currentBuzz ? 'bg-luxury-red' : 'bg-luxury-gray-300'
                      }`}
                    />
                  ))}
                </div>
                
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={nextBuzz}
                  className="p-3 bg-luxury-gray-100 rounded-full hover:bg-luxury-gray-200 transition-colors duration-200"
                >
                  <ChevronRight className="w-5 h-5 text-luxury-gray-600" />
                </motion.button>
              </div>
              
              <motion.div
                key={currentBuzz}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center"
              >
                <div>
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold">
                      {socialBuzz[currentBuzz].author.charAt(1).toUpperCase()}
                    </div>
                    <div>
                      <h3 className="font-semibold text-luxury-black">
                        {socialBuzz[currentBuzz].author}
                      </h3>
                      <p className="text-luxury-gray-500 text-sm">
                        {socialBuzz[currentBuzz].platform}
                      </p>
                    </div>
                  </div>
                  
                  <p className="text-luxury-gray-700 mb-4 leading-relaxed">
                    {socialBuzz[currentBuzz].content}
                  </p>
                  
                  <div className="flex items-center space-x-2 text-luxury-gray-500">
                    <Star className="w-4 h-4 fill-current text-yellow-400" />
                    <span className="text-sm">{socialBuzz[currentBuzz].likes} likes</span>
                  </div>
                </div>
                
                <div>
                  <img
                    src={socialBuzz[currentBuzz].image}
                    alt="Social media post"
                    className="w-full h-64 object-cover rounded-2xl shadow-lg"
                  />
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Press Contact */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="bg-gradient-to-r from-luxury-red to-red-700 rounded-3xl p-12 text-center text-luxury-white"
          >
            <h2 className="text-3xl font-display font-bold mb-6">
              Contact Presse
            </h2>
            <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
              Pour toute demande d'information, interview ou collaboration, 
              notre équipe presse est à votre disposition.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-2xl mx-auto">
              <div className="flex items-center justify-center space-x-3">
                <Mail className="w-6 h-6" />
                <div className="text-left">
                  <div className="font-semibold">Email Presse</div>
                  <div className="opacity-90">presse@audieboutique.com</div>
                </div>
              </div>
              
              <div className="flex items-center justify-center space-x-3">
                <Phone className="w-6 h-6" />
                <div className="text-left">
                  <div className="font-semibold">Téléphone</div>
                  <div className="opacity-90">+596 696 12 34 56</div>
                </div>
              </div>
            </div>
            
            <div className="mt-8 text-sm opacity-75">
              <p>Réponse sous 24h • Disponible du lundi au vendredi</p>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
};