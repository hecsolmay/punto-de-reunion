export const DEFAULT_PAGINATION = {
  page: 1,
  limit: 10,
  skip: 0
}

export const BUTTON_VARIANTS = {
  default: 'bg-black/90 hover:opacity-95 text-white dark:bg-white dark:text-black',
  alternative: 'border border-black/15 bg-white text-black dark:border-white/15 dark:bg-background-dark dark:text-white',
  primary: 'bg-primary text-white dark:bg-primary-dark',
  warning: 'dark:bg-amber-500 bg-amber-400 text-white',
  danger: 'dark:bg-red-600 bg-red-500 text-white '
}

export type VariantKey = keyof typeof BUTTON_VARIANTS
