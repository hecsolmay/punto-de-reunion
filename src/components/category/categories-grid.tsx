import CategoryCard from '@/components/category/category-card'
import { getCategories } from '@/services/category'
import { type SearchParams } from '@/types'
import Pagination from '../pagination'

interface Props {
  searchParams?: SearchParams
}

const LIMIT_PER_PAGE = 12

export default async function CategoriesGrid ({ searchParams }: Props) {
  const { page = 1, limit = LIMIT_PER_PAGE } = searchParams ?? {}

  const response = await getCategories({ page, limit })

  if (response.error !== undefined) {
    // TODO: handle error
    return null
  }

  const { categories, info } = response

  return (
    <>
      <section className='grid flex-1 grid-cols-[repeat(auto-fill,minmax(288px,1fr))] gap-7 md:gap-4'>
        {categories.map(({ id, imageUrl, name }) => (
          <CategoryCard
            className='w-full'
            imageClassName='max-h-72 w-full'
            key={id}
            href={`/categories/${id}`}
            imageUrl={imageUrl}
            name={name}
          />
        ))}
      </section>
      <Pagination info={info}/>
    </>

  )
}
