import { cn } from '@/libs/cn'

const VARIANTS = {
  default: 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-400 border border-gray-500',
  primary: 'bg-primary text-white dark:bg-primary-dark dark:text-white',
  warning: 'dark:bg-amber-500 bg-amber-400 text-white',
  danger: 'dark:bg-red-600 bg-red-500 text-white'
}

type Variant = keyof typeof VARIANTS

interface Props {
  className?: string
  variant?: Variant
  children?: React.ReactNode
}

export default function Badge ({ children, className, variant = 'default' }: Props) {
  const variantClassName = getVariantClassName(variant)

  return (
    <span className={cn(
      'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium',
      variantClassName,
      className
    )}>
      {children}
    </span>
  )
}

function getVariantClassName (variant: Variant) {
  return VARIANTS[variant] ?? VARIANTS.default
}
