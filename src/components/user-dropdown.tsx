import DropDown from '@/components/dropdown'
import UserCircleIcon from '@/components/icons/user-circle'
import { type Link as LinkType } from '@/types'
import Link from 'next/link'

export default function UserDropDown () {
  const session = null

  const links: LinkType[] = [
    {
      title: 'Mis organizaciones',
      href: '/organizations'
    },
    {
      title: 'Perfil',
      href: '/profile'
    },
    {
      title: 'Cerrar Sesión',
      href: '/logout',
      className: 'text-red-500'
    }
  ]

  if (session == null) {
    return (
      <Link className='flex items-center gap-2 hover:opacity-80' href="/login" >
        <UserCircleIcon className='size-7'/>
        <span>Iniciar Sesión</span>
      </Link>
    )
  }

  return (
    <DropDown links={links}>
      <UserCircleIcon className='size-7'/>
    </DropDown>
  )
}
