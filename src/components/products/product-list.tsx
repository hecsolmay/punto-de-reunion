import ProductCard from '@/components/products/card'
import { type ProductsResponse } from '@/types/response'

export default function ProductsList (
  { response }: { response: ProductsResponse }
) {
  if (response?.error !== undefined) {
    // TODO: handle error
    return null
  }

  const { products } = response

  return (
    <div className='flex h-auto justify-between gap-6 overflow-x-auto overflow-y-hidden md:overflow-x-hidden'>
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
