import { RectangleSkeleton } from '@/components/skeletons/figures'
import { cn } from '@/libs/cn'

interface Props {
  className?: string
}

export function CategoryCardSkeleton ({ className }: Props) {
  return (
    <div className={cn('min-w-72', className)}>
      <RectangleSkeleton className='h-[162px] w-full rounded-xl' />
    </div>
  )
}

export function CategoryListSkeleton () {
  return (
    <div className='flex justify-start gap-6 overflow-x-auto md:overflow-x-hidden'>
      <CategoryCardSkeleton />
      <CategoryCardSkeleton />
      <CategoryCardSkeleton />
      <CategoryCardSkeleton />
      <CategoryCardSkeleton />
      <CategoryCardSkeleton />
    </div>
  )
}

export function CategoriesGridSkeleton ({ length = 12 }: { length?: number }) {
  return (
    <section className='grid grid-cols-[repeat(auto-fill,minmax(288px,1fr))] gap-4'>
      {Array.from({ length }).map((_, index) => (
        <CategoryCardSkeleton key={index} />
      ))}
    </section>
  )
}
