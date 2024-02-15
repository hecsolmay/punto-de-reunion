import MainContainer from '@/components/main-container'
import ProductsGrid from '@/components/products/products-grid'
import SearchRedirect from '@/components/search-redirect'
import { ProductsGridSkeleton } from '@/components/skeletons/products'
import SortFilter from '@/components/sort-filter'
import { type ServerPageProps } from '@/types'
import { Suspense } from 'react'

export default function ProductsPage ({ searchParams }: ServerPageProps) {
  const { page, search, order, sort } = searchParams

  const pageString = page ?? '1'
  const searchString = search ?? ''
  const orderString = order ?? ''
  const sortString = sort ?? ''

  return (
    <MainContainer className='flex h-auto min-h-[80vh] flex-col gap-y-8 pb-8'>
      <div className='flex flex-col gap-6'>
        <h1 className='text-pretty text-3xl font-bold'>Nuestros Productos</h1>
        <div className='flex flex-col flex-wrap justify-between gap-4 md:flex-row'>
          <SearchRedirect
            className='w-full flex-1 md:w-1/2'
            redirectTo='/products'
            placeholder='Brownies, Caramelos, Pizzas...'
            searchKey='search'
          />

          <div className='flex flex-1 justify-end'>
            <SortFilter />
          </div>
        </div>
      </div>

      <Suspense
        key={pageString + searchString + orderString + sortString}
        fallback={<ProductsGridSkeleton />}
      >
        <ProductsGrid searchParams={searchParams} />
      </Suspense>
    </MainContainer>
  )
}
