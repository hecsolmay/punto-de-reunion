import ChatBubbleIcon from '@/components/icons/chat-bubble'
import ClockIcon from '@/components/icons/clock'
import ConfigIcon from '@/components/icons/config'
import HomeIcon from '@/components/icons/home'
import ShoppingBagIcon from '@/components/icons/shopping-bag'
import TagIcon from '@/components/icons/tag'
import UserGroupIcon from '@/components/icons/user-group'
import { type LinkDropdownItem } from '@/types'

export const userDropdownLinks: LinkDropdownItem[] = [
  {
    title: 'Mis organizaciones',
    href: '/my-organizations'
  },
  {
    title: 'Mi cuenta',
    href: '/account/profile'
  }
]

export const accountProfileLinks = [
  { href: '/account/profile', title: 'Ajustes de cuenta', icon: ConfigIcon },
  { href: '/account/history', title: 'Ultimas compras', icon: ClockIcon },
  { href: '/account/reviews', title: 'Mis reseñas', icon: ChatBubbleIcon }
]

export const SidebarLinks = [
  { href: '/', title: 'Inicio', icon: HomeIcon },
  { href: '/products', title: 'Productos', icon: ShoppingBagIcon },
  { href: '/categories', title: 'Categorías', icon: TagIcon },
  { href: 'organizations', title: 'Organizaciones', icon: UserGroupIcon }
]
