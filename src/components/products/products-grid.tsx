import { ProductsGridEmptyState } from '@/components/empty-states/products'
import Pagination from '@/components/pagination'
import ProductCard from '@/components/products/card'
import { getProducts } from '@/services/products'
import { type SearchParams } from '@/types'

export default async function ProductsGrid ({
  searchParams
}: {
  searchParams: SearchParams
}) {
  const { search } = searchParams
  const response = await getProducts(searchParams)

  if (response.error !== undefined) {
    // TODO: HANDLE ERROR
    return null
  }

  const { products, info } = response

  if (products.length === 0) {
    // TODO: PRODUCTS EMPTY STATE
    return (
      <ProductsGridEmptyState
        text={`No se encontraron resultados para "${search}"`}
      />
    )
  }

  return (
    <>
      <section className='grid flex-1 grid-cols-[repeat(auto-fill,minmax(278px,1fr))] place-items-center gap-7 md:gap-4'>
        {products.map(
          ({
            id,
            description,
            price,
            rating,
            name,
            status,
            images,
            organization
          }) => (
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
          )
        )}
      </section>
      <Pagination info={info} />
    </>
  )
}
