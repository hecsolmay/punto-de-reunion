import Carousel from '@/components/carousel'
import CategoryCard from '@/components/category/category-card'
import { getCategories } from '@/services/category'
import { type SearchParams } from '@/types'

interface Props {
  searchParams?: SearchParams
}

export default async function CategoryList ({ searchParams }: Props) {
  const response = await getCategories(searchParams)

  if (!response.success) {
    // TODO: handle error
    return null
  }

  const { categories } = response.data

  return (
    <Carousel drag='x'>
      {categories.map(({ id, imageUrl, name }) => (
        <CategoryCard
          key={id}
          className='h-full'
          href={`/categories/${id}`}
          imageUrl={imageUrl}
          name={name}
        />
      ))}
    </Carousel>
  )
}
