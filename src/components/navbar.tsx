import CartButton from '@/components/buttons/cart-button'
import SideBarButton from '@/components/buttons/sidebar-button'
import ThemeButton from '@/components/buttons/theme-button'
import SearchInput from '@/components/inputs/search-input'
import UserDropDown from '@/components/user-dropdown'

export default function Navbar () {
  return (
    <header className="sticky left-0 top-0 flex h-20 w-full items-center justify-between gap-6 p-6 px-8 shadow-sm dark:bg-background-dark">
      <div className='flex items-center gap-4'>
        <SideBarButton />
        <h1>Logo</h1>
      </div>

      <div className='flex flex-1 md:max-w-[40vw]'>
        <SearchInput />
      </div>

      <div className="flex items-center justify-end gap-4">

        <ThemeButton />

        <UserDropDown />

        <div className="border-l border-contrast pl-4">
          <CartButton />
        </div>

      </div>

    </header>
  )
}
