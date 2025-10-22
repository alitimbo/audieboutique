import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Mail,
  MessageCircle,
  Phone,
  HelpCircle,
  ChevronDown,
  ChevronUp,
  HeartHandshake
} from 'lucide-react'
import { SEO } from '../components/ui/SEO'

const faqs = [
  {
    question: 'Comment puis-je suivre ma commande ?',
    answer:
      'Dès que votre commande est expédiée, vous recevez un email avec un lien de suivi. Vous pouvez également retrouver ce lien dans votre espace client.'
  },
  {
    question: 'Quels sont les délais de livraison ?',
    answer:
      'La livraison standard en Martinique et France métropolitaine prend généralement 2 à 5 jours ouvrés. Pour les autres destinations, comptez 5 à 10 jours ouvrés.'
  },
  {
    question: 'Comment effectuer un retour ou un échange ?',
    answer:
      'Vous disposez de 14 jours après réception pour demander un retour ou un échange. Contactez-nous via le formulaire ou par email, nous vous guiderons avec bienveillance.'
  },
  {
    question: 'Comment contacter le service client ?',
    answer:
      'Notre équipe est disponible par email, WhatsApp ou via le formulaire de contact ci-dessous. Nous répondons sous 24h (hors week-end et jours fériés).'
  },
  {
    question: 'Mes données sont-elles protégées ?',
    answer:
      'Oui, la sécurité et la confidentialité de vos informations sont notre priorité. Nous ne partageons jamais vos données sans votre consentement explicite.'
  }
]

export const Support: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const faqRef = useRef<HTMLDivElement | null>(null)

  // Scroll automatique si hash #faq
  useEffect(() => {
    const scrollToFaq = () => {
      if (faqRef.current) {
        const yOffset = -80 // Décalage pour le header sticky
        const y =
          faqRef.current.getBoundingClientRect().top +
          window.pageYOffset +
          yOffset
        window.scrollTo({ top: y, behavior: 'smooth' })
      }
    }
    // Hash scroll fiable même après navigation
    if (window.location.hash === '#faq') {
      setTimeout(scrollToFaq, 100) // Laisse le temps au DOM de rendre
    }
    window.addEventListener('hashchange', scrollToFaq)
    window.addEventListener('scrollToFaq', scrollToFaq)
    return () => {
      window.removeEventListener('hashchange', scrollToFaq)
      window.removeEventListener('scrollToFaq', scrollToFaq)
    }
  }, [])

  return (
    <>
      <SEO
        title='Aide & Support'
        description="Besoin d'aide ? Notre équipe est là pour vous accompagner avec bienveillance. FAQ, contact rapide, engagements service client."
      />
      <div className='min-h-screen bg-luxury-gray-50 pb-16'>
        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className='max-w-3xl mx-auto px-4 pt-16 text-center'
        >
          <div className='flex justify-center mb-4'>
            <HelpCircle className='w-16 h-16 text-luxury-red' />
          </div>
          <h1 className='text-3xl md:text-4xl font-display font-bold text-luxury-black mb-4'>
            Aide & Support
          </h1>
          <p className='text-lg text-luxury-gray-700 mb-2'>
            Une question, un doute, un souci ? Notre équipe vous répond avec le
            sourire et la bienveillance qui fait la différence.
          </p>
          <p className='text-luxury-gray-600 mb-6'>
            Nous sommes là pour vous accompagner à chaque étape de votre
            expérience sur Audie Boutique.
          </p>
        </motion.div>

        {/* Contact rapide */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.7, ease: 'easeOut' }}
          className='max-w-2xl mx-auto px-4 mt-8 mb-12'
        >
          <div className='bg-luxury-white rounded-3xl shadow-luxury p-8 flex flex-col md:flex-row items-center md:items-start gap-6 md:gap-12'>
            <div className='flex-1 space-y-3'>
              <h2 className='text-xl font-bold text-luxury-black mb-2 flex items-center gap-2'>
                <HeartHandshake className='w-6 h-6 text-luxury-red' /> Notre
                équipe à votre écoute
              </h2>
              <p className='text-luxury-gray-700'>
                Contactez-nous par le moyen qui vous convient le mieux :
              </p>
              <div className='flex flex-col gap-2 mt-4'>
                <a
                  href='mailto:support@audieboutique.com'
                  className='flex items-center gap-2 text-luxury-red hover:underline font-medium'
                >
                  <Mail className='w-5 h-5' /> contact@audieboutique.com
                </a>
                {/*
                  <a
                    href='https://wa.me/596696000000'
                    target='_blank'
                    rel='noopener noreferrer'
                    className='flex items-center gap-2 text-luxury-red hover:underline font-medium'
                  >
                    <MessageCircle className='w-5 h-5' /> WhatsApp (réponse
                    rapide)
                  </a>
                */}
                <a
                  href='tel:069610111'
                  className='flex items-center gap-2 text-luxury-red hover:underline font-medium'
                >
                  <Phone className='w-5 h-5' /> 0696 01 01 11
                </a>
              </div>
            </div>
            <form className='flex-1 w-full max-w-md space-y-4 mt-6 md:mt-0'>
              <input
                type='text'
                placeholder='Votre nom'
                className='w-full px-4 py-3 border border-luxury-gray-200 rounded-xl focus:ring-2 focus:ring-luxury-red'
              />
              <input
                type='email'
                placeholder='Votre email'
                className='w-full px-4 py-3 border border-luxury-gray-200 rounded-xl focus:ring-2 focus:ring-luxury-red'
              />
              <textarea
                placeholder='Votre message'
                rows={4}
                className='w-full px-4 py-3 border border-luxury-gray-200 rounded-xl focus:ring-2 focus:ring-luxury-red'
              />
              <button
                type='submit'
                className='w-full py-3 bg-luxury-red text-white rounded-xl font-bold hover:bg-red-700 transition-colors duration-200'
              >
                Envoyer
              </button>
            </form>
          </div>
        </motion.div>

        {/* FAQ */}
        <motion.div
          id='faq'
          ref={faqRef}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.7, ease: 'easeOut' }}
          className='max-w-2xl mx-auto px-4 mt-8'
        >
          <h2 className='text-2xl font-bold text-luxury-black mb-6 text-center'>
            Questions fréquentes
          </h2>
          <div className='space-y-4'>
            {faqs.map((faq, idx) => (
              <div key={idx} className='bg-luxury-white rounded-xl shadow p-4'>
                <button
                  className='flex items-center justify-between w-full text-left text-lg font-medium text-luxury-black focus:outline-none'
                  onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                >
                  <span>{faq.question}</span>
                  {openIndex === idx ? (
                    <ChevronUp className='w-5 h-5 text-luxury-red' />
                  ) : (
                    <ChevronDown className='w-5 h-5 text-luxury-gray-400' />
                  )}
                </button>
                <AnimatePresence initial={false}>
                  {openIndex === idx && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className='overflow-hidden text-luxury-gray-700 mt-2'
                    >
                      {faq.answer}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Engagements */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.7, ease: 'easeOut' }}
          className='max-w-2xl mx-auto px-4 mt-16'
        >
          <div className='bg-luxury-white rounded-3xl shadow-luxury p-8 text-center'>
            <h2 className='text-xl font-bold text-luxury-black mb-4 flex items-center justify-center gap-2'>
              <HeartHandshake className='w-6 h-6 text-luxury-red' /> Notre
              engagement client
            </h2>
            <p className='text-luxury-gray-700 mb-2'>
              Chez Audie Boutique, chaque client compte. Nous nous engageons à
              vous offrir un accompagnement personnalisé, une écoute attentive
              et des solutions rapides à toutes vos demandes.
            </p>
            <p className='text-luxury-gray-600'>
              Votre satisfaction et votre confiance sont notre priorité. Merci
              de faire partie de la famille Audie !
            </p>
          </div>
        </motion.div>
      </div>
    </>
  )
}

export default Support
