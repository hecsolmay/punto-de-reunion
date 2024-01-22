import { type ProductsResponse } from '@/types/products'
import ProductCard from '@/components/products/card'

export default function ProductsList (
  { products }: { products: ProductsResponse }
) {
  return (
    <div className='flex h-auto justify-between gap-6 overflow-x-auto overflow-y-hidden md:overflow-x-hidden'>
      {products.map(({ id, description, price, rating, name, status, reviewCount }) => (
        <ProductCard
          key={id}
          name={name}
          price={price.toNumber()}
          imageUrl='https://source.unsplash.com/random'
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
