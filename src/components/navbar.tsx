import RouterBackButton from '@/components/back-arrow'
import SideBarButton from '@/components/buttons/sidebar-button'
import ThemeButton from '@/components/buttons/theme-button'
import CartSideBar from '@/components/carts/cart'
import CartButtonFallback from '@/components/fallbacks/cart-button'
import SearchRedirect from '@/components/search-suggestions'
import UserDropDown from '@/components/user-dropdown'
import { getUserSession } from '@/libs/auth'
import Link from 'next/link'
import { Suspense } from 'react'
import Arrow from '@/components/icons/arrow'

export default async function Navbar () {
  const session = await getUserSession()

  return (
    <header className="sticky left-0 top-0 z-10 flex h-20 w-full items-center justify-between gap-4 bg-white p-6 px-4 shadow-sm dark:bg-background-dark md:gap-6 md:px-8">
      <div className='flex items-center gap-6'>
        <SideBarButton session={session} />
        <Link className='hidden md:block' href='/'>
          <img className='h-10 object-cover dark:invert' src="/assets/images/logo.png" alt="Logo de Punto de Reunion" />
        </Link>
      </div>

      <SearchRedirect className='flex flex-1 md:max-w-[40vw]' />

      <div className="flex items-center justify-end gap-4">

        <ThemeButton className='hidden md:block'/>

        <UserDropDown session={session} />

        <div className="md:border-l md:border-contrast md:pl-4">
          <Suspense fallback={<CartButtonFallback />}>
            <CartSideBar />
          </Suspense>
        </div>

      </div>

    </header>
  )
}

export function NavbarPayments () {
  return (
    <header className="sticky left-0 top-0 z-10 h-20 w-full border-b border-gray-200 bg-white p-6 px-4 shadow-sm dark:border-neutral-500 dark:bg-background-dark md:px-8">
      <div className='relative flex h-full w-full items-center'>

        <RouterBackButton className='absolute left-0 flex items-center gap-2'>
          <Arrow />
          <span className='hidden sm:block'>Volver</span>
        </RouterBackButton>

        <div className='grid flex-1 place-items-center'>
          <Link className='' href='/'>
            <img className='h-10 object-cover dark:invert' src="/assets/images/logo.png" alt="Logo de Punto de Reunion" />
          </Link>
        </div>
      </div>
    </header>
  )
}
