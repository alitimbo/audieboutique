import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { X } from 'lucide-react'

interface NotificationModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (
    e: React.FormEvent,
    data: { title: string; message: string }
  ) => void
}

const NotificationModal = ({
  isOpen,
  onClose,
  onSubmit
}: NotificationModalProps) => {
  const [formData, setFormData] = useState({
    title: '',
    message: ''
  })

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className='fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 sm:p-6'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className='bg-white w-full max-w-md p-8 rounded-xl shadow-2xl relative max-h-full overflow-y-auto'
            initial={{ scale: 0.9, y: 50 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 50 }}
            transition={{ type: 'spring', damping: 20, stiffness: 300 }}
            onClick={e => e.stopPropagation()}
          >
            <button
              onClick={onClose}
              className='absolute top-3 right-3 text-gray-700 hover:text-gray-900 bg-gray-200 hover:bg-gray-300 rounded-full w-8 h-8 flex items-center justify-center transition-colors duration-150'
              title='Fermer'
            >
              <X className='w-4 h-4' />
            </button>

            <h2 className='text-2xl font-bold text-gray-900 mb-6 border-b pb-2'>
              Créer une notification
            </h2>

            <form onSubmit={(e)=>onSubmit(e, formData)} className='space-y-4'>
              <div>
                <label
                  htmlFor='title'
                  className='block text-sm font-medium text-gray-700 mb-1'
                >
                  Titre
                </label>
                <input
                  name='title'
                  value={formData.title}
                  onChange={handleChange}
                  className='w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all bg-white'
                />
                <div>
                  <label
                    htmlFor='message'
                    className='block text-sm font-medium text-gray-700 mb-1'
                  >
                    Message
                  </label>
                  <textarea
                    name='message'
                    value={formData.message}
                    onChange={handleChange}
                    className='w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all bg-white'
                  />
                </div>

                <button
                  type='submit'
                  className='w-full bg-blue-600 text-white font-semibold py-3 rounded-lg hover:bg-blue-700 transition-all'
                >
                  Envoyer la notification
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default NotificationModal
