import { CircleSkeleton, LineSkeleton } from '@/components/skeletons/figures'

interface Props {
  length?: number
}

export function OrganizationCardSkeleton () {
  return (
    <div
      className='flex h-52 w-72 flex-col gap-4 rounded-lg bg-white p-4 shadow-md transition-colors hover:bg-gray-50 dark:bg-accent-dark dark:group-hover:bg-neutral-900'
    >
      <div className='flex flex-row items-center gap-4'>
        <CircleSkeleton className='size-10' />
        <LineSkeleton className='h-3 w-20' />
      </div>
      <LineSkeleton className='h-3 w-full' />
      <LineSkeleton className='h-3 w-1/2' />
    </div>
  )
}

export function OrganizationListSkeleton ({ length = 12 }: Props) {
  return (
    <section className='grid flex-1 grid-cols-[repeat(auto-fill,minmax(288px,1fr))] place-items-center gap-7 md:gap-4 xl:grid-cols-4'>
      {Array.from({ length }).map((_, index) => (
        <OrganizationCardSkeleton key={index} />
      ))}
    </section>
  )
}
