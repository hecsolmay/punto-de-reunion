import EmptyCartIcon from '@/components/icons/empty-cart'
import { cn } from '@/libs/cn'

interface Props {
  text?: string
  className?: string
  children?: React.ReactNode
}

export function EmptySidebarCart ({ className, text = 'No hay resultados', children }: Props) {
  return (
    <main className={cn('flex p-4 flex-1 flex-col items-center justify-center gap-4', className)}>
      <div className='rounded-full bg-gray-200 p-4 text-gray-600 dark:bg-[#242424] dark:text-white'>
        <EmptyCartIcon />
      </div>
      <p className='text-gray-500 dark:text-white/90'>{text}</p>
      {children}
    </main>
  )
}
