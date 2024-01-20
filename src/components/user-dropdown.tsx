import SignOutButton from '@/components/buttons/signout'
import DropDown, { DropDownItem } from '@/components/dropdown'
import UserCircleIcon from '@/components/icons/user-circle'
import { type UserSession } from '@/libs/auth'
import { type LinkDropdownItem } from '@/types'
import Link from 'next/link'
import UserInfoButton from './buttons/user-info'

export default function UserDropDown (
  { session }: { session: UserSession }
) {
  const links: LinkDropdownItem[] = [
    {
      title: 'Mis organizaciones',
      href: '/organizations'
    },
    {
      title: 'Perfil',
      href: '/profile'
    }
  ]

  if (session === null) {
    return (
      <Link className='flex items-center gap-2 hover:opacity-80' href="/login" >
        <UserCircleIcon className='size-7'/>
        <span className='hidden md:block'>Iniciar Sesión</span>
      </Link>
    )
  }

  return (
    <DropDown dropdownTrigger={<UserInfoButton session={session} />}>
      {links.map(({ href, title, className, onClick }) => (
        <DropDownItem key={href} className={className}>
          <Link
            onClick={onClick}
            href={href}
          >
            {title}
          </Link>
        </DropDownItem>
      ))}

      <DropDownItem className='p-0 text-red-500' >
        <SignOutButton className='h-full w-full px-4 py-2 text-start' />
      </DropDownItem>
    </DropDown>
  )
}
