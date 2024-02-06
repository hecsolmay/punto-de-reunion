import { getPaginationInfo } from '@/libs/pagination'
import prisma from '@/libs/prisma'
import { parsePagination } from '@/libs/validations'
import { type SearchParams } from '@/types'

export async function getProducts (params: SearchParams = {}) {
  const { limit = 10, page = 1 } = params
  const pagination = parsePagination({ limit, page })

  const productsPromise = prisma.products.findMany({
    skip: pagination.skip,
    take: pagination.limit,
    include: {
      images: true,
      organization: true
    }
  })

  const countPromise = prisma.products.count({})

  try {
    const [products, count] = await prisma.$transaction([
      productsPromise,
      countPromise
    ])

    const info = getPaginationInfo({
      limit: pagination.limit,
      page: pagination.page,
      total: count
    })

    return {
      products,
      info
    }
  } catch (error) {
    console.error(error)
    return {
      error: 'Something went wrong',
      status: 500
    }
  }
}

export async function getProductById (id?: string) {
  try {
    const product = await prisma.products.findFirst({
      include: {
        categories: {
          include: {
            category: true
          }
        },
        organization: true,
        images: true
      },
      where: {
        id
      }
    })

    return product
  } catch (error) {
    console.error(error)
    return null
  }
}
