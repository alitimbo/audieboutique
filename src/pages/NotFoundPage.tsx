import { Link } from 'react-router-dom'

export function NotFoundPage () {
  return (
    <div className='min-h-screen w-full flex flex-col justify-center items-center bg-white text-black text-center px-4'>
      <h1 className='text-5xl font-bold mb-4'>404</h1>
      <p className='text-lg mb-6'>La page que vous recherchez n'existe pas.</p>
      <Link
        to='/'
        className='px-5 py-2 rounded-full border border-black hover:bg-black hover:text-white transition-colors'
      >
        Retourner à la page d’accueil
      </Link>
    </div>
  )
}
