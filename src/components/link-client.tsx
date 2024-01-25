'use client'

import { cn } from '@/libs/cn'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

interface Props {
  href: string
  activeClassName?: string
  className?: string
  children: React.ReactNode
}

export default function LinkClient (
  { children, href, activeClassName, className }: Props
) {
  const pathname = usePathname()
  const isActive = pathname === href

  return (
    <Link href={href} className={cn(className, isActive && activeClassName)}>
      {children}
    </Link>
  )
}
