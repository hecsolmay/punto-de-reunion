import { cn } from '@/libs/cn'
import Link from 'next/link'

interface Props {
  href: string
  name: string
  imageUrl: string
  className?: string
  imageClassName?: string
}

export default function CategoryCard ({
  className,
  href,
  name,
  imageClassName,
  imageUrl
}: Props
) {
  return (
    <Link href={href}>
      <div className={cn('group min-w-72', className)}>
        <div className='group relative h-full overflow-hidden rounded-xl shadow-md'>
          <img
            src={imageUrl}
            alt={`Imagen banner de la categoría ${name}`}
            className={cn('h-full aspect-video rounded-xl bg-black/5 object-cover transition-transform duration-200 group-hover:scale-105  group-hover:opacity-90', imageClassName)}
          />
          <div className='absolute inset-0 bg-black/40 text-center'>
            <h3 className='h-full translate-y-1/2  text-2xl font-bold uppercase text-white'>
              {name}
            </h3>
          </div>
        </div>
      </div>
    </Link>
  )
}
