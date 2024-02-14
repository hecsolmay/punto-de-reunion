import MainContainer from '@/components/main-container'
import ProductsGrid from '@/components/products/products-grid'
import { ProductsGridSkeleton } from '@/components/skeletons/products'
import { type SearchParams } from '@/types'
import { Suspense } from 'react'

export default function ProductsPage (
  { searchParams }: { searchParams: SearchParams }
) {
  const { page, search } = searchParams

  const pageString = page ?? '1'
  const searchString = search ?? ''

  return (
    <MainContainer className='flex h-auto min-h-[80vh] flex-col gap-y-8 pb-8'>
      <h1 className='text-pretty text-3xl font-bold'>
        Nuestros Productos
      </h1>

      {/* TODO: FILTER AND SORT */}

      <Suspense key={pageString + searchString} fallback={<ProductsGridSkeleton />}>
        <ProductsGrid searchParams={searchParams} />
      </Suspense>
    </MainContainer>
  )
}
