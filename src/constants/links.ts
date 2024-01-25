import ChatBubbleIcon from '@/components/icons/chat-bubble'
import ClockIcon from '@/components/icons/clock'
import ConfigIcon from '@/components/icons/config'
import { type LinkDropdownItem } from '@/types'

export const userDropdownLinks: LinkDropdownItem[] = [
  {
    title: 'Mis organizaciones',
    href: '/organizations'
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
