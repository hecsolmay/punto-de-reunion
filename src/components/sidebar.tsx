'use client'

import SignOutButton from '@/components/buttons/signout'
import ExitDoorIcon from '@/components/icons/exit-door'
import XMarkIcon from '@/components/icons/xmark'
import LoginLink from '@/components/login-link'
import ToggleTheme from '@/components/toggle-theme'
import { SidebarLinks } from '@/constants/links'
import { type UserSession } from '@/libs/auth'
import { cn } from '@/libs/cn'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

interface Props {
  isOpen?: boolean
  onClose?: () => void
  session?: UserSession | null
}

const DEFAULT_ITEM_CLASSNAME =
  'flex w-full cursor-pointer items-center gap-3 rounded-md px-3 py-2 transition-colors duration-100 hover:bg-gray-100 dark:hover:bg-white/15'

export default function Sidebar ({ isOpen = false, onClose, session }: Props) {
  const pathname = usePathname()

  return (
    <aside
      className={cn(
        'fixed left-0 top-0 flex flex-col z-50 h-dvh w-[95vw] md:w-[50vw] lg:w-[30vw] bg-white transition-all duration-500  dark:bg-accent-dark',
        isOpen ? 'translate-x-0 ease-in-out' : 'translate-x-[-100%] ease-in-out'
      )}
    >
      <header className='flex h-16 flex-row justify-between border-b border-gray-300 pl-2 pr-4 dark:border-white'>
        <div className='flex flex-1 flex-row items-center gap-4'>
          <Link href='/'>
            <img
              className='size-12 object-contain dark:invert'
              src='/assets/images/logo.png'
              alt='Logo de Punto de Reunion'
            />
          </Link>
          <p className='text-pretty text-2xl font-semibold dark:text-white'>
            Punto de Reunion
          </p>
        </div>
        <div className='grid place-items-center'>
          <button onClick={onClose}>
            <XMarkIcon />
          </button>
        </div>
      </header>

      <main className='flex-1 overflow-y-auto scrollbar-thin scrollbar-white dark:scrollbar-dark'>
        <ul className='flex flex-col gap-2 px-2 py-4'>

          {SidebarLinks.map(({ href, icon: Icon, title }) => (
            <li key={href}>
              <LinkItem href={href} onClick={onClose} isActive={pathname === href}>
                <Icon />
                {title}
              </LinkItem>
            </li>
          ))}

        </ul>

      </main>

      <footer className='flex h-auto flex-col gap-3 border-t border-gray-300 px-2 py-3 dark:border-white'>
        {session == null
          ? (<LoginLink className={DEFAULT_ITEM_CLASSNAME}>
            <ExitDoorIcon className='size-6 rotate-180'/>
            Iniciar Session
          </LoginLink>)
          : (<SignOutButton className={DEFAULT_ITEM_CLASSNAME}>
            <ExitDoorIcon />
            Cerrar Sesión
          </SignOutButton>)
        }
        <ToggleTheme />
      </footer>
    </aside>
  )
}

interface LinkItemProps {
  href: string
  children?: React.ReactNode
  isActive?: boolean
  onClick?: () => void
}

function LinkItem ({ href, children, isActive = false, onClick }: LinkItemProps) {
  const className = cn(
    DEFAULT_ITEM_CLASSNAME,
    isActive && 'bg-gray-200 hover:bg-gray-200 dark:bg-white/20 dark:hover:bg-white/20'
  )

  return (
    <Link href={href} className={className} onClick={onClick}>
      {children}
    </Link>
  )
}
