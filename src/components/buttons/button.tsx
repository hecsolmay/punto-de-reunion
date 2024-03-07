import { BUTTON_VARIANTS, type VariantKey } from '@/constants'
import { cn } from '@/libs/cn'

interface Props {
  className?: string
  onClick?: () => void
  title?: string
  disabled?: boolean
  loading?: boolean
  type?: 'button' | 'submit' | 'reset'
  variant?: VariantKey
  children?: React.ReactNode
}

export default function Button (
  { className, loading, variant = 'default', children, type = 'button', ...props }: Props
) {
  const variantClassName = getVariantClassName(variant)

  return (
    <>
      <button className={cn(
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
      type={type}
      {...props}
      >
        {children}
      </button>
    </>

  )
}

function getVariantClassName (value: VariantKey) {
  const variant = BUTTON_VARIANTS[value]
  return variant ?? BUTTON_VARIANTS.default
}
