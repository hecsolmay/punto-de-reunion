import { cn } from '@/libs/cn'

interface Props {
  className?: string
}

export function RectangleSkeleton ({ className }: Props) {
  return (
    <div className={cn('h-40 w-full animate-pulse bg-gradient-to-b from-gray-300 to-gray-200 duration-200 dark:from-neutral-700 dark:to-neutral-900', className)}></div>
  )
}

export function LineSkeleton ({ className }: Props) {
  return (
    <div className={cn('h-3 w-6 rounded-lg bg-gray-300 dark:bg-neutral-100/10 animate-pulse duration-200', className)}></div>
  )
}
