import { cn } from '@/libs/cn'
import Link from 'next/link'

const VARIANTS = {
  default:
    'bg-black/90 hover:opacity-95 text-white dark:bg-white dark:text-black',
  alternative:
    'border border-black/15 bg-white text-black dark:border-white/15 dark:bg-background-dark dark:text-white',
  primary: 'bg-primary text-white dark:bg-primary-dark',
  warning: 'dark:bg-amber-500 bg-amber-400 text-white',
  danger: 'dark:bg-red-600 bg-red-500 text-white '
}

type VariantKey = keyof typeof VARIANTS

interface Props {
  className?: string
  href: string
  variant?: VariantKey
  children?: React.ReactNode
}

export default function LinkButton ({
  className,
  variant = 'default',
  children,
  href
}: Props) {
  const variantClassName = getVariantClassName(variant)

  return (
    <>
      <Link
        className={cn(
          `focus-visible:ring-ring inline-flex h-9 
        items-center justify-center whitespace-nowrap rounded-md 
        px-4 py-2 text-sm font-medium 
        shadow transition-opacity 
        hover:opacity-85
        focus-visible:outline-none focus-visible:ring-1 
        disabled:pointer-events-none disabled:opacity-50`,
          variantClassName,
          className
        )}
        href={href}
      >
        {children}
      </Link>
    </>
  )
}

function getVariantClassName (value: VariantKey) {
  const variant = VARIANTS[value]
  return variant ?? VARIANTS.default
}
