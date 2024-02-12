import CategoriesGrid from '@/components/category/categories-grid'
import MainContainer from '@/components/main-container'
import { CategoriesGridSkeleton } from '@/components/skeletons/categories'
import { type SearchParams } from '@/types'
import { Suspense } from 'react'

export default async function CategoriesPage ({
  searchParams
}: {
  searchParams: SearchParams
}) {
  const { page = 1 } = searchParams

  return (
    <MainContainer className='flex h-auto min-h-[80vh] flex-col gap-y-8 pb-8'>
      <h1 className='text-pretty text-3xl font-bold'>
        Conoce Nuestras Categorías
      </h1>
      <Suspense fallback={<CategoriesGridSkeleton length={12} />}>
        <CategoriesGrid searchParams={{ page }}/>
      </Suspense>
    </MainContainer>
  )
}
