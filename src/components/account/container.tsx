import { cn } from '@/libs/cn'

interface ContentContainerProps {
  children?: React.ReactNode
  className?: string
}

export function ContentContainer ({
  children,
  className
}: ContentContainerProps) {
  return (
    <div
      className={cn(
        'flex h-auto w-full flex-1 flex-col gap-4 bg-zinc-100 p-4 dark:bg-zinc-900 md:px-8',
        className
      )}
    >
      {children}
    </div>
  )
}
