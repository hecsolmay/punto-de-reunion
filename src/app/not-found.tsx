import Link from 'next/link'
import PublicLayout from './(public)/layout'

export default function NotFoundPage () {
  return (
    <PublicLayout>
      <main className='grid min-h-[80dvh] place-items-center'>
        <div className="text-center">
          <h1 className="mb-4 text-6xl font-semibold text-red-500 md:text-9xl">404</h1>
          <p className="mb-4 text-lg text-gray-600">Oops! Parece que estas perdido.</p>
          <div className="animate-bounce">
            <svg className="mx-auto h-16 w-16 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path>
            </svg>
          </div>
          <p className="mt-4 text-gray-600">Volvamos a la pagina de <Link href="/" className="text-blue-500">Inicio</Link>.</p>
        </div>
      </main>
    </PublicLayout>
  )
}
