'use server'

import prisma from '@/libs/prisma'

interface FilterProducts {
  search?: string
  limit?: number
  page?: number
}

export async function searchProducts ({ limit = 10, search = '' }: FilterProducts) {
  const products = await prisma.products.findMany({
    take: limit,
    include: {
      categories: true,
      images: true,
      organization: true
    },
    where: {
      name: {
        contains: search,
        mode: 'insensitive'
      }
    }
  })

  const mappedProducts = products.map(({ rating, price, ...rest }) => {
    return {
      ...rest,
      rating: rating.toNumber(),
      price: price.toNumber()
    }
  })

  return mappedProducts
}