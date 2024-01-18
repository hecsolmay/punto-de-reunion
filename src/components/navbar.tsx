import CartButton from '@/components/buttons/cart-button'
import SideBarButton from '@/components/buttons/sidebar-button'
import ThemeButton from '@/components/buttons/theme-button'
import SearchInput from '@/components/inputs/search-input'
import UserDropDown from '@/components/user-dropdown'
import { createServerSupabaseClient } from '@/libs/supabase'
import Link from 'next/link'

export default async function Navbar () {
  const supabase = createServerSupabaseClient()
  const { data: { session } } = await supabase.auth.getSession()

  return (
    <header className="sticky left-0 top-0 z-10 flex h-20 w-full items-center justify-between gap-4 bg-white p-6 px-8 shadow-sm dark:bg-background-dark md:gap-6">
      <div className='flex items-center gap-6'>
        <SideBarButton />
        <Link className='hidden md:block' href='/'>
          <img className='h-10 object-cover dark:invert' src="assets/images/logo.png" alt="Logo de Punto de Reunion" />
        </Link>
      </div>

      <div className='flex flex-1 md:max-w-[40vw]'>
        <SearchInput />
      </div>

      <div className="flex items-center justify-end gap-4">

        <ThemeButton className='hidden md:block'/>

        <div className='hidden md:block'>
          <UserDropDown session={session} />
        </div>

        <div className="md:border-l md:border-contrast md:pl-4">
          <CartButton />
        </div>

      </div>

    </header>
  )
}
