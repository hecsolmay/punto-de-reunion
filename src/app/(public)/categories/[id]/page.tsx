import MainContainer from '@/components/main-container'
import ProductInfoModalServer from '@/components/products/info-modal-server'
import ProductsGrid from '@/components/products/products-grid'
import SearchRedirect from '@/components/search-redirect'
import { ProductsGridSkeleton } from '@/components/skeletons/products'
import SortFilter from '@/components/sort-filter'
import { getCategoryById } from '@/services/category'
import { type ServerPageProps } from '@/types'
import { redirect } from 'next/navigation'
import { Suspense } from 'react'

export default async function CategoryPage ({
  searchParams,
  params
}: ServerPageProps) {
  const category = await getCategoryById(params.id)

  if (category === null) {
    redirect('/not-found')
  }
  const { page = '1', search = '', order = 'desc', sort = 'created', productId } = searchParams

  return (
    <MainContainer className='flex h-auto min-h-[80vh] flex-col gap-y-8 pb-8'>

      <ProductInfoModalServer productId={productId} />

      <div className='flex flex-col gap-6'>
        <h1 className='text-pretty text-3xl font-light'>Productos de la categoría: <span className='font-bold opacity-85'>{category.name}</span></h1>
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
        key={page + search + order + sort}
        fallback={<ProductsGridSkeleton />}
      >
        <ProductsGrid searchParams={{ ...searchParams, categoryId: category.id }} />
      </Suspense>
    </MainContainer>
  )
}
