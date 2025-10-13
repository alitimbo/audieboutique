import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabase'
import { useNavigate } from 'react-router-dom'
import { Eye, EyeOff } from 'lucide-react'

export default function AdminNewPassword () {
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const navigate = useNavigate()

  // 1️⃣ Vérifier si l'utilisateur est authentifié via le lien magique
  useEffect(() => {
    const { data: listener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (event === 'PASSWORD_RECOVERY') {
          console.log('Utilisateur authentifié pour réinitialisation.')
        }
      }
    )
    return () => listener.subscription.unsubscribe()
  }, [])

  // 2️⃣ Fonction de mise à jour du mot de passe
  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault()
    setMessage('')
    setLoading(true)

    const { error } = await supabase.auth.updateUser({ password })

    setLoading(false)
    if (error) {
      setMessage("❌ Une erreur s'est produite. Veuillez réessayer.")
      console.error(error)
    } else {
      setMessage('✅ Mot de passe mis à jour avec succès. Redirection...')
      setTimeout(() => navigate('/admin/login'), 2500)
    }
  }

  // 3️⃣ UI simple et professionnelle
  return (
    <div className='min-h-screen flex items-center justify-center bg-white'>
      <div className='max-w-md w-full bg-white shadow-lg rounded-2xl p-8 border border-gray-200'>
        <h2 className='text-2xl font-semibold text-black mb-4 text-center'>
          Nouveau mot de passe
        </h2>

        <p className='text-gray-600 text-sm mb-6 text-center'>
          Entrez votre nouveau mot de passe pour votre compte Audie Boutique.
        </p>

        <form onSubmit={handleReset} className='space-y-4'>
          <div className='relative'>
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder='Nouveau mot de passe'
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              className='w-full border border-gray-300 rounded-lg p-3 pr-10 focus:outline-none focus:ring-2 focus:ring-black'
            />
            <button
              type='button'
              onClick={() => setShowPassword(!showPassword)}
              className='absolute right-3 top-3 text-gray-500 hover:text-black focus:outline-none'
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          <button
            type='submit'
            disabled={loading}
            className='w-full bg-luxury-red text-white font-semibold py-3 rounded-lg hover:bg-gray-900 transition'
          >
            {loading ? 'Mise à jour...' : 'Mettre à jour le mot de passe'}
          </button>
        </form>

        {message && (
          <p className='text-center mt-4 text-sm text-gray-700'>{message}</p>
        )}
      </div>
    </div>
  )
}
