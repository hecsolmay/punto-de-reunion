import { LineSkeleton, RectangleSkeleton } from '@/components/skeletons/figures'
import { cn } from '@/libs/cn'

interface Props {
  className?: string
}

export function ProductCardSkeleton ({ className }: Props) {
  return (
    <div
      className={cn('relative z-0 max-h-[20rem] min-h-80 min-w-72 rounded-xl bg-white shadow-md dark:bg-accent-dark', className)}>
      <RectangleSkeleton
        className='mb-2 h-32 w-full rounded-md'
      />
      <div className='flex h-48 flex-col gap-3 px-4 py-2'>
        <div className='flex items-center justify-between'>
          <LineSkeleton className='h-4 w-full' />
        </div>

        <div className='mt-4 flex flex-1 flex-col gap-3'>
          <LineSkeleton className='h-3 w-full' />
          <LineSkeleton className='h-3 w-full' />
          <LineSkeleton className='h-3 w-full' />
        </div>
        <div className='flex h-8 justify-end'>
          <LineSkeleton className='h-3 w-10' />
        </div>
      </div>
    </div>
  )
}

export function ProductsListSkeleton () {
  return (
    <div className='flex min-h-[20.5rem] justify-start gap-6 overflow-x-auto overflow-y-hidden md:overflow-x-hidden'>
      <ProductCardSkeleton />
      <ProductCardSkeleton />
      <ProductCardSkeleton />
      <ProductCardSkeleton />
      <ProductCardSkeleton />
      <ProductCardSkeleton />
    </div>
  )
}
