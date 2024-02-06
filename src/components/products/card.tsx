import StarIcon from '@/components/icons/star'
import ProductRedirect from '@/components/products/Link-redirect'
import { type Organizations, type ProductStatus } from '@prisma/client'

interface Props {
  description: string
  id: string
  imageUrl: string
  name: string
  organization: Organizations
  price: number
  rating: number
  scroll?: boolean
  status: ProductStatus
}

export default function ProductCard ({
  description,
  id,
  imageUrl,
  name,
  price,
  rating,
  scroll,
  status
}: Props) {
  return (
    <ProductRedirect
      productId={id}
      className='relative z-0 h-80 max-h-[20rem] w-72 cursor-pointer rounded-xl bg-white shadow-md dark:bg-accent-dark'
      scroll={scroll}
    >
      <img
        src={imageUrl}
        className='mb-2 h-32 w-full rounded-md object-cover'
        alt=''
      />
      <div className='flex h-48 flex-col gap-3 px-4 py-2'>
        <div className='flex items-center justify-between'>
          <h3 className='line-clamp-2 text-lg font-bold'>{name}</h3>
          <div className='flex gap-x-1 text-yellow-400 dark:text-yellow-500'>
            <StarIcon fill='currentColor' />
            <span className='text-normal font-semibold'>{rating}</span>
          </div>
        </div>

        <div className='flex-1'>
          <p className='line-clamp-3 max-h-[4rem] max-w-[30ch] text-pretty text-sm text-slate-600 dark:text-slate-300'>
            {description}
          </p>
        </div>
        <div className='h-8'>
          <p className='text-end font-semibold'>
            {price.toLocaleString('mx', { style: 'currency', currency: 'MXN' })}{' '}
          </p>
        </div>
      </div>
    </ProductRedirect>
  )
}
