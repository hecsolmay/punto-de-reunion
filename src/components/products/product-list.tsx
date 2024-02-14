import Carousel from '@/components/carousel'
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
    <Carousel drag='x' className='min-h-[20.5rem] gap-8'>
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
    </Carousel>
  )
}
