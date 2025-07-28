import React from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  Mail,
  Phone,
  MapPin,
  Instagram,
  Facebook,
  Twitter,
  Youtube,
  CreditCard,
  Shield,
  Truck
} from 'lucide-react'
import Logo from '../../images/logo_blanc.png'

export const Footer: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const footerSections = [
    {
      title: 'Boutique',
      links: [
        { name: 'Nouveautés', path: '/shop/tags/nouveautes' },
        { name: 'Soldes', path: '/shop/tags/soldes' },
        { name: 'Collections', path: '/shop/tags/collections' },
        { name: 'Exclusivités', path: '/shop/tags/exclusivites' }
      ]
    },
    {
      title: 'Service Client',
      links: [
        { name: 'Aide & Support', path: '/support' },
        { name: 'Livraison & Retours', path: '/livraison' },
        { name: 'Guide des tailles', path: '/size-guide' },
        { name: 'FAQ', path: '/support#faq' },
        { name: 'Politique de retour', path: '/retour' }
      ]
    },
    {
      title: 'À propos',
      links: [
        { name: 'Notre histoire', path: '/our-story' },
        { name: 'Engagement qualité', path: '/quality' },
        { name: 'Carrières', path: '/careers' },
        { name: 'Presse', path: '/press' }
      ]
    },
    {
      title: 'Légal',
      links: [
        { name: 'CGV', path: '/cgv' },
        { name: 'Mentions légales', path: '/mentions-legales' },
        { name: 'Politique de confidentialité', path: '/confidentialite' },
        { name: 'Cookies', path: '/cookies' }
      ]
    }
  ]

  const socialLinks = [
    {
      name: 'Instagram',
      icon: <Instagram className='w-5 h-5' />,
      url: '#',
      color: 'hover:text-pink-400'
    },
    {
      name: 'Facebook',
      icon: <Facebook className='w-5 h-5' />,
      url: '#',
      color: 'hover:text-blue-400'
    }
    /*
    {
      name: 'Twitter',
      icon: <Twitter className='w-5 h-5' />,
      url: '#',
      color: 'hover:text-blue-300'
    },
    {
      name: 'Youtube',
      icon: <Youtube className='w-5 h-5' />,
      url: '#',
      color: 'hover:text-red-400'
    }*/
  ]

  const paymentMethods = [
    'Visa',
    'Mastercard',
    'PayPal',
    'Apple Pay',
    'Google Pay'
  ]

  return (
    <footer className='bg-luxury-black border-t border-luxury-gray-800'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        {/* Main Footer Content */}
        <div className='py-16'>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8'>
            {/* Brand Section */}
            <div className='lg:col-span-2'>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className='mb-6'
              >
                <Link to='/' className='flex items-center mb-6'>
                  <img
                    src={Logo}
                    alt='Audie Boutique Logo'
                    className='h-10 w-auto mr-2'
                  />
                  {/*
                    <span className='text-luxury-white font-display font-bold text-2xl'>
                      Audie Boutique
                    </span>
                  */}
                </Link>

                <p className='text-luxury-gray-400 text-sm mb-6 leading-relaxed'>
                  Votre boutique de mode féminine premium. Découvrez des pièces
                  uniques qui révèlent votre élégance naturelle et votre
                  personnalité authentique.
                </p>

                {/* Contact Info */}
                <div className='space-y-3'>
                  <div className='flex items-center text-luxury-gray-400 text-sm'>
                    <Mail className='h-4 w-4 mr-3 text-luxury-red' />
                    contact@audieboutique.com
                  </div>
                  <div className='flex items-center text-luxury-gray-400 text-sm'>
                    <Phone className='h-4 w-4 mr-3 text-luxury-red' />
                    +596 1 23 45 67 89
                  </div>
                  <div className='flex items-center text-luxury-gray-400 text-sm'>
                    <MapPin className='h-4 w-4 mr-3 text-luxury-red' />
                    Fort-de-france, Martinique
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Footer Links */}
            {footerSections.map((section, idx) => (
              <motion.div
                key={section.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
              >
                <h3 className='text-luxury-white font-semibold mb-4'>
                  {section.title}
                </h3>
                <ul className='space-y-2'>
                  {section.links.map(link => (
                    <li key={link.name}>
                      {link.name === 'FAQ' ? (
                        <a
                          href='/support#faq'
                          onClick={e => {
                            if (location.pathname === '/support') {
                              e.preventDefault();
                              window.dispatchEvent(new CustomEvent('scrollToFaq'));
                            }
                          }}
                          className='text-luxury-gray-400 hover:text-luxury-red transition-colors duration-200 text-sm'
                        >
                          {link.name}
                        </a>
                      ) : (
                        <Link
                          to={link.path}
                          className='text-luxury-gray-400 hover:text-luxury-red transition-colors duration-200 text-sm'
                        >
                          {link.name}
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Trust Indicators */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className='border-t border-luxury-gray-800 py-8'
        >
          <div className='grid grid-cols-1 md:grid-cols-3 gap-6 text-center'>
            <div className='flex items-center justify-center space-x-3'>
              <Truck className='w-6 h-6 text-luxury-red' />
              <span className='text-luxury-gray-300 text-sm'>
                Livraison gratuite dès 80€
              </span>
            </div>
            <div className='flex items-center justify-center space-x-3'>
              <Shield className='w-6 h-6 text-luxury-red' />
              <span className='text-luxury-gray-300 text-sm'>
                Paiement 100% sécurisé
              </span>
            </div>
            <div className='flex items-center justify-center space-x-3'>
              <CreditCard className='w-6 h-6 text-luxury-red' />
              <span className='text-luxury-gray-300 text-sm'>
                Retours sous 30 jours
              </span>
            </div>
          </div>
        </motion.div>

        {/* Bottom Footer */}
        <div className='border-t border-luxury-gray-800 py-6'>
          <div className='flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0'>
            <p className='text-luxury-gray-400 text-sm'>
              © 2025 Audie Boutique. Tous droits réservés.
            </p>

            {/* Social Links */}
            <div className='flex space-x-4'>
              {socialLinks.map(social => (
                <motion.a
                  key={social.name}
                  href={social.url}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                  className={`text-luxury-gray-400 ${social.color} transition-colors duration-200`}
                  title={social.name}
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>

            {/* Payment Methods */}
            <div className='flex items-center space-x-2'>
              <span className='text-luxury-gray-400 text-sm mr-2'>
                Paiement:
              </span>
              {paymentMethods.map(method => (
                <div
                  key={method}
                  className='bg-luxury-gray-800 text-luxury-gray-300 px-2 py-1 rounded text-xs'
                >
                  {method}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
