const VARIANTS = {
  default: 'bg-black text-white hover:bg-black/90 dark:bg-white dark:text-black dark:hover:bg-white/90',
  alternative: 'border border-black/15 bg-white text-black hover:bg-black/5 dark:border-white/15 dark:bg-background-dark dark:text-white dark:hover:bg-white/5',
  primary: 'bg-primary text-white hover:bg-primary/90 dark:bg-primary-dark dark:hover:bg-primary/90',
  warning: 'dark:bg-amber-500 bg-amber-400 text-white hover:bg-amber-400/85 dark:hover:bg-amber-500/85',
  danger: 'dark:bg-red-600 bg-red-500 text-white hover:bg-red-500/90 dark:hover:bg-red-600/90'
}

type VariantKey = keyof typeof VARIANTS

interface Props {
  className?: string
  onClick?: () => void
  title?: string
  disabled?: boolean
  loading?: boolean
  type?: 'button' | 'submit'
  variant?: VariantKey
  children?: React.ReactNode
}

export default function Button (
  { className, loading, variant = 'default', children, ...props }: Props
) {
  const variantClassName = getVariantClassName(variant)

  return (
    <>
      <button className={`
      focus-visible:ring-ring inline-flex h-9 
      items-center justify-center whitespace-nowrap rounded-md 
      px-4 py-2 text-sm font-medium 
      shadow transition-colors 
      
      
      focus-visible:outline-none focus-visible:ring-1 
      disabled:pointer-events-none disabled:opacity-50 
      ${variantClassName}
      ${className}`
      }
      {...props}
      >
        {children}
      </button>
    </>

  )
}

function getVariantClassName (value: VariantKey) {
  const variant = VARIANTS[value]
  return variant ?? VARIANTS.default
}
