import CategoryList from '@/components/category/categories-list'
import HeroSection from '@/components/hero-section'
import MainContainer from '@/components/main-container'
import ProductInfoModalServer from '@/components/products/info-modal-server'
import ProductsList from '@/components/products/product-list'
import SectionContainer from '@/components/section-container'
import { CategoryListSkeleton } from '@/components/skeletons/categories'
import { ProductsListSkeleton } from '@/components/skeletons/products'
import { type SearchParams } from '@/types'
import { Suspense } from 'react'

export default async function Home ({
  searchParams
}: {
  searchParams: SearchParams
}) {
  const { productId } = searchParams

  return (
    <MainContainer className='flex h-auto flex-col gap-y-8'>
      <HeroSection />

      <SectionContainer className='min-h-56' title='Categorías'>
        <Suspense fallback={<CategoryListSkeleton />}>
          <CategoryList />
        </Suspense>
      </SectionContainer>

      <ProductInfoModalServer productId={productId} />

      <SectionContainer title='Lo mas reciente'>
        <Suspense fallback={<ProductsListSkeleton />}>
          <ProductsList />
        </Suspense>
      </SectionContainer>

    </MainContainer>
  )
}
