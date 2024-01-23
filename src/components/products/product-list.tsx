import { type ProductsResponse } from '@/types/products'
import ProductCard from '@/components/products/card'

type Products = ProductsResponse['products']

export default function ProductsList (
  { products }: { products: Products }
) {
  return (
    <div className='flex h-auto justify-between gap-6 overflow-x-auto overflow-y-hidden md:overflow-x-hidden'>
      {products.map(({ id, description, price, rating, name, status, reviewCount, images, organization }) => (
        <ProductCard
          key={id}
          name={name}
          price={price.toNumber()}
          imageUrl={images[0].imageUrl}
          organization={organization}
          description={description}
          id={id}
          scroll={false}
          reviewCount={reviewCount}
          status={status}
          rating={rating.toNumber()}
        />
      ))}
    </div>
  )
}
