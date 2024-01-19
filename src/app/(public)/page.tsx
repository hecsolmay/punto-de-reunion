import CategoryList from '@/components/category/categories-list'
import HeroSection from '@/components/hero-section'
import SectionContainer from '@/components/section-container'
import { getCategories } from '@/services/category'

export default async function Home () {
  const categories = await getCategories()

  return (
    <main className="p-4 px-3 md:px-10">
      <HeroSection />

      <SectionContainer title="Categorías">
        <CategoryList categories={categories} />
      </SectionContainer>
    </main>
  )
}
