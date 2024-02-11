import ProductCard from '@/components/products/card'
import { getProducts } from '@/services/products'
import { type SearchParams } from '@/types'

interface Props {
  searchParams?: SearchParams
}

export default async function ProductsList (
  { searchParams }: Props
) {
  const response = await getProducts(searchParams)

  if (response?.error !== undefined) {
    // TODO: handle error
    return null
  }

  const { products } = response

  return (
    <div className='flex min-h-[20.5rem] justify-start gap-6 overflow-x-auto overflow-y-hidden md:overflow-x-hidden'>
      {products.map(({ id, description, price, rating, name, status, images, organization }) => (
        <ProductCard
          key={id}
          name={name}
          price={price}
          imageUrl={images[0].imageUrl}
          organization={organization}
          description={description}
          id={id}
          scroll={false}
          status={status}
          rating={rating}
        />
      ))}
    </div>
  )
}
