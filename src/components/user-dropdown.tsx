import SignOutButton from '@/components/buttons/signout'
import UserInfoButton from '@/components/buttons/user-info'
import DropDown, { DropDownItem } from '@/components/dropdown'
import UserCircleIcon from '@/components/icons/user-circle'
import LoginLink from '@/components/login-link'
import { userDropdownLinks } from '@/constants/links'
import { type UserSession } from '@/libs/auth'
import Link from 'next/link'

export default function UserDropDown (
  { session }: { session: UserSession }
) {
  if (session === null) {
    return (
      <LoginLink className='flex items-center gap-2 hover:opacity-80' >
        <UserCircleIcon className='size-7'/>
        <span className='hidden md:block'>Iniciar Sesión</span>
      </LoginLink>
    )
  }

  return (
    <DropDown dropdownTrigger={<UserInfoButton session={session} />}>
      {userDropdownLinks.map(({ href, title, className, onClick }) => (
        <DropDownItem key={href} className={className}>
          <Link
            className='block w-full'
            onClick={onClick}
            href={href}
          >
            {title}
          </Link>
        </DropDownItem>
      ))}

      <DropDownItem className='p-0 text-red-500' >
        <SignOutButton className='h-full w-full px-4 py-2 text-start'>
          Cerrar Sesión
        </SignOutButton>
      </DropDownItem>
    </DropDown>
  )
}
