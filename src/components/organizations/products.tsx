import StarIcon from '@/components/icons/star'
import {
  DeleteProductButton,
  EditProductButton
} from '@/components/organizations/button'
import { getProducts } from '@/services/products'
import { type SearchParams } from '@/types'
import { type ProductResponse } from '@/types/response'
import Link from 'next/link'

interface Props {
  className?: string
  organizationId: string
  searchParams?: SearchParams
}

export default async function ProductList ({
  organizationId,
  className,
  searchParams
}: Props) {
  const response = await getProducts({ ...searchParams, organizationId })

  if (response.error !== undefined) {
    // TODO: handle error
    return null
  }

  const { products } = response

  return (
    <section className='grid grid-cols-[repeat(auto-fill,minmax(280px,1fr))] place-items-center gap-4 xl:grid-cols-4'>
      {products.map(product => (
        <ProductCard product={product} key={product.id} />
      ))}
    </section>
  )
}

interface CardProps {
  product: ProductResponse
}

function ProductCard ({ product }: CardProps) {
  const { description, id, images, name, price, rating } = product

  return (
    <div className='group relative h-80 max-h-[20rem] w-72 cursor-pointer rounded-xl bg-white shadow-md dark:bg-accent-dark'>
      <div className='absolute right-0 top-0.5 flex w-fit flex-col justify-end gap-1 pr-2.5'>
        <EditProductButton
          className='p-3 opacity-100 transition-opacity duration-200 hover:opacity-95 group-hover:opacity-100 md:opacity-0'
          defaultProduct={product}
          productId={id}
        />
        <DeleteProductButton
          productId={id}
          name={name}
          className='p-3 opacity-100 transition-opacity duration-200 hover:opacity-95 group-hover:opacity-100 md:opacity-0'
        />
      </div>

      <Link
        href={`/products/${id}`}
        className='h-80 max-h-[20rem] w-72 cursor-pointer rounded-xl bg-white shadow-md dark:bg-accent-dark'
      >
        <img
          src={images[0].imageUrl}
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
              {price.toLocaleString('mx', {
                style: 'currency',
                currency: 'MXN'
              })}{' '}
            </p>
          </div>
        </div>
      </Link>
    </div>
  )
}
