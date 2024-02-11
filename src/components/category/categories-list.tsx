import CategoryCard from '@/components/category/category-card'
import { getCategories } from '@/services/category'
import { type SearchParams } from '@/types'

interface Props {
  searchParams?: SearchParams
}

export default async function CategoryList (
  { searchParams }: Props
) {
  const response = await getCategories(searchParams)

  if (response.error !== undefined) {
    // TODO: handle error
    return null
  }

  const { categories } = response

  return (
    <div className='flex justify-start gap-6 overflow-x-auto md:overflow-x-hidden'>
      {categories.map(({ id, imageUrl, name }) => (
        <CategoryCard
          key={id}
          href={`/categories/${id}`}
          imageUrl={imageUrl}
          name={name}
        />
      ))}
    </div>
  )
}
