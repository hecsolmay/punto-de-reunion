import SocialButton from '@/components/buttons/social-button'
import { createServerSupabaseClient } from '@/libs/supabase'
import Link from 'next/link'
import { redirect } from 'next/navigation'

export default async function Login () {
  const supabase = createServerSupabaseClient()
  const { data: { session } } = await supabase.auth.getSession()

  if (session !== null) {
    redirect('/')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0F2027] via-[#203A43] to-[#2C5364] p-4 py-16">

      <div className="mx-auto flex max-w-sm overflow-hidden rounded-lg bg-white shadow-lg lg:max-w-4xl">

        <div className="min-h-[70vh] w-full px-4 lg:w-1/2">
          <div className='flex items-center gap-x-3 p-6 '>
            <Link href="/">
              <img className="h-14 object-cover" src="/assets/images/logo.png" alt="" />
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

            <SocialButton type='google'/>
            <SocialButton type='github'/>
            <SocialButton type='facebook'/>
            <SocialButton type='azure'/>

          </div>
        </div>

        <div className="hidden bg-cover bg-no-repeat lg:block lg:w-1/2"
          style={{ backgroundImage: 'url(/assets/images/background-login.webp)' }}>
        </div>
      </div>
    </div>
  )
}
