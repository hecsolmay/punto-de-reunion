import { cn } from '@/libs/cn'
import StarIcon from '@/components/icons/star'

interface Props {
  rating: number
  className?: string
  count: number
}

export default function RatingInfo ({ count, rating, className }: Props) {
  return (
    <div className={cn('flex items-center gap-1', className)}>
      {Array.from({ length: 5 }).map((_, index) => (
        <StarIcon key={index} className='size-5 text-yellow-400 dark:text-yellow-500' fill={ index < rating ? 'currentColor' : 'none' }/>
      ))}
      <span className='ml-1.5 text-sm font-bold text-gray-900 dark:text-white'>{rating}</span>
      <span className='mx-1 h-1 w-1 rounded-full bg-gray-500 dark:bg-gray-400'></span>
      <span className='text-sm'>{count} reseñas</span>
    </div>
  )
}
