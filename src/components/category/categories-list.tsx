import CategoryCard from '@/components/category/category-card'
import { type CategoriesResponse } from '@/types/categories'

export default function CategoryList (
  { categories }: { categories: CategoriesResponse }
) {
  return (
    <div className='flex justify-between gap-6 overflow-x-auto md:overflow-x-hidden'>
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
