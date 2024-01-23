import CategoryList from '@/components/category/categories-list'
import HeroSection from '@/components/hero-section'
import ProductInfoModalServer from '@/components/products/info-modal-server'
import ProductsList from '@/components/products/product-list'
import SectionContainer from '@/components/section-container'
import { getCategories } from '@/services/category'
import { getProducts } from '@/services/products'
import { type SearchParams } from '@/types'

export default async function Home ({
  searchParams
}: {
  searchParams: SearchParams
}) {
  const categories = await getCategories(searchParams)
  const { products } = await getProducts(searchParams)
  const { productId } = searchParams

  return (
    <main className='flex h-auto flex-col gap-y-8 p-4 px-3 md:px-10'>
      <HeroSection />

      <SectionContainer title='Categorías'>
        <CategoryList categories={categories} />
      </SectionContainer>

      <ProductInfoModalServer productId={productId} />

      <SectionContainer title='Lo mas reciente'>
        <ProductsList products={products}/>
      </SectionContainer>

    </main>
  )
}
