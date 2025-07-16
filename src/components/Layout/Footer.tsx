import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  EnvelopeIcon, 
  PhoneIcon, 
  MapPinIcon 
} from '@heroicons/react/24/outline';

export const Footer: React.FC = () => {
  const footerSections = [
    {
      title: 'Boutique',
      links: [
        { name: 'Nouveautés', path: '/shop?filter=new' },
        { name: 'Collections', path: '/collections' },
        { name: 'Promotions', path: '/shop?filter=sale' },
        { name: 'Exclusivités', path: '/shop?filter=exclusive' }
      ]
    },
    {
      title: 'Service Client',
      links: [
        { name: 'Aide & Support', path: '/support' },
        { name: 'Livraison', path: '/shipping' },
        { name: 'Retours', path: '/returns' },
        { name: 'Taille & Fit', path: '/size-guide' }
      ]
    },
    {
      title: 'Entreprise',
      links: [
        { name: 'À propos', path: '/about' },
        { name: 'Carrières', path: '/careers' },
        { name: 'Presse', path: '/press' },
        { name: 'Partenaires', path: '/partners' }
      ]
    }
  ];

  const socialLinks = [
    { name: 'Instagram', icon: '📷', url: '#' },
    { name: 'Facebook', icon: '👍', url: '#' },
    { name: 'Twitter', icon: '🐦', url: '#' },
    { name: 'Pinterest', icon: '📌', url: '#' }
  ];

  return (
    <footer className="bg-luxury-black border-t border-luxury-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Brand Section */}
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="mb-6"
              >
                <Link to="/" className="flex items-center mb-4">
                  <div className="bg-luxury-red w-8 h-8 rounded-lg flex items-center justify-center mr-3">
                    <span className="text-luxury-white font-bold text-lg">L</span>
                  </div>
                  <span className="text-luxury-white font-display font-bold text-xl">
                    LuxStore
                  </span>
                </Link>
                <p className="text-luxury-gray-400 text-sm mb-6">
                  Découvrez notre collection exclusive de produits premium, 
                  conçus pour les connaisseurs exigeants.
                </p>
                
                {/* Contact Info */}
                <div className="space-y-2">
                  <div className="flex items-center text-luxury-gray-400 text-sm">
                    <EnvelopeIcon className="h-4 w-4 mr-2" />
                    contact@luxstore.com
                  </div>
                  <div className="flex items-center text-luxury-gray-400 text-sm">
                    <PhoneIcon className="h-4 w-4 mr-2" />
                    +33 1 23 45 67 89
                  </div>
                  <div className="flex items-center text-luxury-gray-400 text-sm">
                    <MapPinIcon className="h-4 w-4 mr-2" />
                    Paris, France
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Footer Links */}
            {footerSections.map((section, index) => (
              <motion.div
                key={section.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <h3 className="text-luxury-white font-semibold mb-4">
                  {section.title}
                </h3>
                <ul className="space-y-2">
                  {section.links.map((link) => (
                    <li key={link.name}>
                      <Link
                        to={link.path}
                        className="text-luxury-gray-400 hover:text-luxury-red transition-colors duration-200 text-sm"
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Newsletter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="border-t border-luxury-gray-800 py-8"
        >
          <div className="max-w-md mx-auto text-center">
            <h3 className="text-luxury-white font-semibold mb-2">
              Restez informé
            </h3>
            <p className="text-luxury-gray-400 text-sm mb-4">
              Recevez nos dernières collections et offres exclusives
            </p>
            <div className="flex">
              <input
                type="email"
                placeholder="Votre email"
                className="flex-1 px-4 py-2 bg-luxury-gray-800 border border-luxury-gray-700 rounded-l-lg text-luxury-white placeholder-luxury-gray-400 focus:outline-none focus:border-luxury-red"
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-2 bg-luxury-red text-luxury-white rounded-r-lg hover:bg-red-700 transition-colors duration-200"
              >
                S'abonner
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Bottom Footer */}
        <div className="border-t border-luxury-gray-800 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-luxury-gray-400 text-sm mb-4 md:mb-0">
              © 2024 LuxStore. Tous droits réservés.
            </p>
            
            {/* Social Links */}
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.name}
                  href={social.url}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                  className="text-luxury-gray-400 hover:text-luxury-red transition-colors duration-200"
                  title={social.name}
                >
                  <span className="text-xl">{social.icon}</span>
                </motion.a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};