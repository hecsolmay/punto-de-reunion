'use client'

import { useAppContext } from '@/context/utils'
import Link from 'next/link'
import { BUTTON_VARIANTS, type VariantKey } from '@/constants/index'
import { cn } from '@/libs/cn'

interface Props {
  className?: string
  href?: string
  children?: React.ReactNode
  defaultButtonStyle?: VariantKey
}

const DEFAULT_BUTTON_CLASSNAME = `focus-visible:ring-ring inline-flex h-9 
items-center justify-center whitespace-nowrap rounded-md 
px-4 py-2 text-sm font-medium 
shadow transition-opacity 
hover:opacity-85
focus-visible:outline-none focus-visible:ring-1 
disabled:pointer-events-none disabled:opacity-50`

function getButtonClassName (variant?: VariantKey) {
  if (variant === undefined) return

  return cn(DEFAULT_BUTTON_CLASSNAME, BUTTON_VARIANTS[variant])
}

export function CardSidebarLink ({ className, href, children, defaultButtonStyle }: Props) {
  const { setShowCartSidebar } = useAppContext()

  const handleClick = () => {
    setShowCartSidebar(false)
  }

  if (href === undefined) {
    return (
      <button className={cn(getButtonClassName(defaultButtonStyle), className)} onClick={handleClick}>
        {children}
      </button>
    )
  }
  return (
    <Link href={href} className={cn(getButtonClassName(defaultButtonStyle), className)} onClick={handleClick}>
      {children}
    </Link>
  )
}
