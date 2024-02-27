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
      },
      organization: {
        deletedAt: null
      },
      deletedAt: null
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

export async function deleteProduct (productId: string) {
  try {
    // TODO: HANDLE DELETE
    const productUpdated = await prisma.products.update({
      data: {
        deletedAt: new Date()
      },
      where: {
        id: productId
      }
    })

    return {
      data: productUpdated,
      success: true
    }
  } catch (error) {
    console.error(error)
    return {
      error: 'Error al eliminar el producto',
      status: 500
    }
  }
}
