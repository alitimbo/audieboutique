import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Clock, Send, Instagram, Facebook, Twitter } from 'lucide-react';
import { SEO } from '../components/ui/SEO';

export const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
    
    // Reset form after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 3000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <>
      <SEO
        title="Contact"
        description="Contactez Audie Boutique pour toute question sur nos produits de mode féminine premium. Service client disponible 6j/7 en Martinique."
        keywords="contact, audie boutique, service client, martinique, mode féminine, aide, support"
      />
      
      <div className="min-h-screen bg-gradient-to-br from-luxury-gray-50 to-luxury-white pt-0">
        {/* Hero Banner */}
        <section className="relative h-96 overflow-hidden">
          <div className="absolute inset-0">
            <img
              src="https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg?auto=compress&cs=tinysrgb&w=1200"
              alt="Audie Boutique - Contactez-nous"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-luxury-black/70 via-luxury-black/50 to-luxury-black/70" />
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
                  Contactez-nous
                </h1>
                <p className="text-xl text-luxury-gray-300 max-w-2xl mx-auto">
                  Notre équipe est à votre écoute pour vous accompagner dans votre expérience Audie Boutique
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-luxury-white rounded-3xl p-8 shadow-luxury"
            >
              <h2 className="text-2xl font-display font-bold text-luxury-black mb-6">
                Envoyez-nous un message
              </h2>
              
              {!isSubmitted ? (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-luxury-gray-700 mb-2">
                        Nom complet *
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-luxury-gray-300 rounded-xl focus:ring-2 focus:ring-luxury-red focus:border-transparent transition-all duration-200"
                        placeholder="Votre nom"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-luxury-gray-700 mb-2">
                        Email *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-luxury-gray-300 rounded-xl focus:ring-2 focus:ring-luxury-red focus:border-transparent transition-all duration-200"
                        placeholder="votre@email.com"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-luxury-gray-700 mb-2">
                      Sujet *
                    </label>
                    <select
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-luxury-gray-300 rounded-xl focus:ring-2 focus:ring-luxury-red focus:border-transparent transition-all duration-200"
                    >
                      <option value="">Sélectionnez un sujet</option>
                      <option value="commande">Question sur une commande</option>
                      <option value="produit">Information produit</option>
                      <option value="livraison">Livraison & Retours</option>
                      <option value="partenariat">Partenariat</option>
                      <option value="autre">Autre</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-luxury-gray-700 mb-2">
                      Message *
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      className="w-full px-4 py-3 border border-luxury-gray-300 rounded-xl focus:ring-2 focus:ring-luxury-red focus:border-transparent transition-all duration-200 resize-none"
                      placeholder="Décrivez votre demande..."
                    />
                  </div>
                  
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full flex items-center justify-center space-x-2 py-4 rounded-2xl font-semibold transition-all duration-300 ${
                      isSubmitting
                        ? 'bg-luxury-gray-300 text-luxury-gray-500 cursor-not-allowed'
                        : 'bg-luxury-red text-luxury-white hover:bg-red-700 shadow-luxury-red'
                    }`}
                  >
                    <Send className="w-5 h-5" />
                    <span>{isSubmitting ? 'Envoi en cours...' : 'Envoyer le message'}</span>
                  </motion.button>
                </form>
              ) : (
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="text-center py-8"
                >
                  <div className="bg-green-100 text-green-800 p-6 rounded-2xl">
                    <h3 className="text-xl font-semibold mb-2">Message envoyé !</h3>
                    <p>Nous vous répondrons dans les plus brefs délais.</p>
                  </div>
                </motion.div>
              )}
            </motion.div>

            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="space-y-8"
            >
              {/* Store Information */}
              <div className="bg-luxury-white rounded-3xl p-8 shadow-luxury">
                <h2 className="text-2xl font-display font-bold text-luxury-black mb-6">
                  Informations boutique
                </h2>
                
                <div className="space-y-4">
                  <div className="flex items-start space-x-4">
                    <MapPin className="w-6 h-6 text-luxury-red mt-1" />
                    <div>
                      <h3 className="font-semibold text-luxury-black">Adresse</h3>
                      <p className="text-luxury-gray-600">
                        123 Rue de la République<br />
                        97200 Fort-de-France<br />
                        Martinique
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <Mail className="w-6 h-6 text-luxury-red mt-1" />
                    <div>
                      <h3 className="font-semibold text-luxury-black">Email</h3>
                      <p className="text-luxury-gray-600">contact@audieboutique.com</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <Phone className="w-6 h-6 text-luxury-red mt-1" />
                    <div>
                      <h3 className="font-semibold text-luxury-black">Téléphone</h3>
                      <p className="text-luxury-gray-600">+596 696 12 34 56</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Customer Service */}
              <div className="bg-luxury-white rounded-3xl p-8 shadow-luxury">
                <h2 className="text-2xl font-display font-bold text-luxury-black mb-6">
                  Service client
                </h2>
                
                <div className="space-y-4">
                  <div className="flex items-start space-x-4">
                    <Clock className="w-6 h-6 text-luxury-red mt-1" />
                    <div>
                      <h3 className="font-semibold text-luxury-black">Horaires d'ouverture</h3>
                      <div className="text-luxury-gray-600 space-y-1">
                        <p>Lundi - Vendredi : 9h00 - 18h00</p>
                        <p>Samedi : 9h00 - 17h00</p>
                        <p>Dimanche : Fermé</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-luxury-gray-50 p-4 rounded-xl">
                    <h4 className="font-semibold text-luxury-black mb-2">Temps de réponse</h4>
                    <p className="text-luxury-gray-600 text-sm">
                      Nous nous engageons à répondre à vos messages dans les 24h ouvrées.
                      Pour les demandes urgentes, n'hésitez pas à nous appeler.
                    </p>
                  </div>
                </div>
              </div>

              {/* Social Links */}
              <div className="bg-luxury-white rounded-3xl p-8 shadow-luxury">
                <h2 className="text-2xl font-display font-bold text-luxury-black mb-6">
                  Suivez-nous
                </h2>
                
                <div className="flex space-x-4">
                  {[
                    { icon: Instagram, name: 'Instagram', color: 'hover:text-pink-500' },
                    { icon: Facebook, name: 'Facebook', color: 'hover:text-blue-600' },
                    /*{ icon: Twitter, name: 'Twitter', color: 'hover:text-blue-400' }*/
                  ].map((social) => (
                    <motion.a
                      key={social.name}
                      href="#"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className={`p-3 bg-luxury-gray-100 rounded-full text-luxury-gray-600 ${social.color} transition-colors duration-200`}
                      title={social.name}
                    >
                      <social.icon className="w-6 h-6" />
                    </motion.a>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </>
  );
};