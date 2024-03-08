import BackArrowButton from '@/components/back-arrow'
import SocialButton from '@/components/buttons/social-button'
import { createServerSupabaseClient } from '@/libs/supabase'
import Link from 'next/link'
import { redirect } from 'next/navigation'

interface LoginServerProps {
  searchParams: {
    next?: string
  }
}

export default async function Login ({ searchParams }: LoginServerProps) {
  const supabase = createServerSupabaseClient()
  const { data: { session } } = await supabase.auth.getSession()

  if (session !== null) {
    redirect('/')
  }

  const { next = '/' } = searchParams

  return (
    <div className="relative min-h-[100dvh] bg-gradient-to-br from-[#0F2027] via-[#203A43] to-[#2C5364] p-7">
      <div className='absolute left-6 top-6 text-white md:left-10 md:top-8'>
        <BackArrowButton />
      </div>
      <div className="mx-auto mt-10 flex max-w-sm overflow-auto rounded-lg bg-white shadow-lg lg:max-w-4xl">

        <div className="w-full px-4 pb-8 lg:w-1/2">
          <div className='flex flex-col items-center gap-4 p-6 '>
            <Link href="/">
              <img className="h-24 object-cover" src="/assets/images/logo.png" alt="" />
            </Link>
            <h2 className="ml-4 flex-1 text-balance text-3xl font-semibold capitalize text-gray-700">Bienvenido</h2>
          </div>
          <p className="mb-4 text-pretty text-center text-base font-medium text-gray-700">Inicia sesión con tu cuenta</p>
          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="border-strong w-full border-t"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-white px-2 text-sm text-gray-600">selecciona una</span>
            </div>
          </div>

          <div className='flex flex-col gap-4 px-6'>

            <SocialButton redirectTo={encodeURIComponent(next)} type='google'/>
            <SocialButton redirectTo={encodeURIComponent(next)} type='github'/>
            <SocialButton redirectTo={encodeURIComponent(next)} type='facebook'/>
            <SocialButton redirectTo={encodeURIComponent(next)} type='azure'/>

          </div>
        </div>

        <div className="hidden bg-cover bg-no-repeat lg:block lg:w-1/2"
          style={{ backgroundImage: 'url(/assets/images/background-login.webp)' }}>
        </div>
      </div>
    </div>
  )
}
