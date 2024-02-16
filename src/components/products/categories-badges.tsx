'use client'

import Badge from '@/components/badge'
import { useAppContext } from '@/context/utils'
import Link from 'next/link'

interface Category {
  id: string
  name: string
}

interface Props {
  className?: string
  categories: Category[]
}

export default function CategoriesBadges ({ categories, className }: Props) {
  const { setProductModal } = useAppContext()

  const handleClick = () => {
    setProductModal(false)
  }

  return (
    <div className='flex flex-wrap gap-3'>
      {categories.map(({ id, name }) => (
        <Link onClick={handleClick} href={`/categories/${id}`} key={id}>
          <Badge variant='default'>{name}</Badge>
        </Link>
      ))}
    </div>
  )
}
