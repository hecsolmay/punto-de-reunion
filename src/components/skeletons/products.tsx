import { CircleSkeleton, LineSkeleton, RectangleSkeleton } from '@/components/skeletons/figures'
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

export function ProductInfoSkeleton () {
  return (
    <div className='flex flex-1 flex-col gap-6 overflow-y-scroll px-3 py-4 md:flex-row md:px-6 md:scrollbar-thin md:scrollbar-track-transparent md:scrollbar-thumb-slate-300 md:dark:scrollbar-thumb-contrast-dark'>

      <div className='flex flex-1 flex-col items-center justify-start gap-6 md:sticky md:inset-0'>
        <div className='mx-auto grid min-w-full place-items-center'>
          <RectangleSkeleton className='size-72 rounded-lg' />
        </div>
        <ul className='grid grid-cols-4 gap-4'>
          {Array.from({ length: 4 }).map((_, index) => (
            <li key={index} className={'cursor-pointer' }>
              <RectangleSkeleton className='h-14 w-20 rounded-lg' />
            </li>
          ))}

        </ul>
      </div>
      <div className='flex-1'>
        <div className='flex flex-col gap-6 px-2 md:gap-4 md:p-0'>

          <div className='flex items-center gap-x-2'>
            <CircleSkeleton className='size-10'/>
            <LineSkeleton className='h-3 w-48' />
          </div>

          <LineSkeleton className='mb-4 h-3 w-24' />

          <div className='flex flex-wrap gap-3'>
            <LineSkeleton className='h-3 w-16' />
            <LineSkeleton className='h-3 w-16' />
            <LineSkeleton className='h-3 w-16' />
            <LineSkeleton className='h-3 w-16' />
          </div>

          <LineSkeleton className='h-3 w-full' />
          <LineSkeleton className='h-3 w-full' />
          <LineSkeleton className='h-3 w-3/4' />

          <LineSkeleton className='mt-4 h-3 w-1/2' />

        </div>
      </div>
    </div>
  )
}
