import CategoryCard from '@/components/category/category-card'

export default function CategoryList (
  { categories }: { categories: Array<{ categoryId: string, imageUrl: string, name: string }> }
) {
  return (
    <div className='flex justify-between gap-6 overflow-x-auto md:overflow-x-hidden'>
      {categories.map(({ categoryId, imageUrl, name }) => (
        <CategoryCard
          key={categoryId}
          href={`/category/${categoryId}`}
          imageUrl={imageUrl}
          name={name}
        />
      ))}
    </div>
  )
}
