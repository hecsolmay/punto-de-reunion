import prisma from '@/libs/prisma'
import { parsePagination } from '@/libs/validations'
import { type SearchParams } from '@/types'
import { Prisma } from '@prisma/client'

// <ProductCard
//           name='Product 1'
//           price={100}
//           imageUrl='https://source.unsplash.com/random'
//           description='Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus possimus voluptate ad consectetur voluptatem, iste nemo facere quos reiciendis expedita, veniam soluta, ea repellendus! Itaque officiis a tenetur ex! Ipsum.'
//           id={'1'}
//           scroll={false}
//           reviewCount={10}
//           status='AVAILABLE'
//           rating={4.5}
//         />

const MOOK_PRODUCT = [
  {
    id: '1',
    name: 'Product 1',
    price: new Prisma.Decimal(100),
    imageUrl: 'https://source.unsplash.com/random',
    description: 'lorem ipsum dolor sit amet consectetur adipisicing elit. Minus possimus voluptate ad consectetur voluptatem, iste nemo facere quos reiciendis expedita, veniam soluta, ea repellendus! Itaque officiis a tenetur ex! Ipsum.',
    reviewCount: 10,
    rating: new Prisma.Decimal(4.5),
    status: 'AVAILABLE'
  }
]

export async function getProducts (params: SearchParams = {}) {
  const { limit = 10, page = 1 } = params

  const pagination = parsePagination({ limit, page })

  const products = await prisma.products.findMany({
    skip: pagination.skip,
    take: pagination.limit
  })

  if (products.length === 0) {
    return MOOK_PRODUCT
  }

  return products
}

export async function getProductById (id?: string) {
  try {
    const result = await prisma.products.findFirst({
      where: {
        id
      }
    })

    return result
  } catch (error) {
    console.error(error)
    return null
  }
}
