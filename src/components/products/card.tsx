import { type Product } from '@/types/products'
import ProductRedirect from './Link-redirect'
import StarIcon from '../icons/star'

type ProductProps = Pick<Product, 'description' | 'name' | 'reviewCount' | 'status'>

interface Props extends ProductProps {
  id: string
  price: number
  rating: number
  imageUrl: string
  scroll?: boolean
}

export default function ProductCard (
  { description, price, rating, name, id, scroll, status, imageUrl }: Props
) {
  return (
    <ProductRedirect productId={id} className='h-[18.5rem] w-72 cursor-pointer rounded-xl bg-white shadow-md dark:bg-accent-dark' scroll={scroll}>
      <img src={imageUrl} className="mb-2 h-32 w-full rounded-md object-cover" alt="" />
      <div className='flex flex-col gap-3 px-4 py-2'>
        <div className='flex items-center justify-between'>
          <h3 className='text-lg font-bold'>{name}</h3>
          <div className='flex gap-x-1 text-yellow-400 dark:text-yellow-500'>
            <StarIcon fill='currentColor'/>
            <span className='text-normal font-semibold'>{rating}</span>
          </div>
        </div>

        <p className='line-clamp-3 max-w-[30ch] text-pretty text-sm text-slate-600 dark:text-slate-300'>{description}</p>
        <span className='text-end font-semibold'>{price.toLocaleString('mx', { style: 'currency', currency: 'MXN' })} </span>

      </div>
    </ProductRedirect>
  )
}
