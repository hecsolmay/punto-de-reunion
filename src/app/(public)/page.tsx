import CategoryList from '@/components/category/categories-list'
import HeroSection from '@/components/hero-section'
import SectionContainer from '@/components/section-container'
import { getCategories } from '@/services/category'
import { type SearchParams } from '@/types'

export default async function Home ({
  searchParams
}: {
  searchParams: SearchParams
}) {
  const categories = await getCategories(searchParams)

  return (
    <main className='p-4 px-3 md:px-10'>
      <HeroSection />

      <SectionContainer title='Categorías'>
        <CategoryList categories={categories} />
      </SectionContainer>

    </main>
  )
}
