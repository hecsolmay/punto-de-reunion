import { getPaginationInfo } from '@/libs/pagination'
import prisma from '@/libs/prisma'
import { getOrderBy } from '@/libs/utils'
import { parsePagination } from '@/libs/validations'
import { type SearchParams } from '@/types'

export async function getProducts (params: SearchParams = {}) {
  const { limit = 10, page = 1, search = '', sort = 'created', order = 'asc', categoryId, organizationId } = params
  const pagination = parsePagination({ limit, page })

  const orderBy = getOrderBy({ order, sort })

  const productsPromise = prisma.products.findMany({
    skip: pagination.skip,
    take: pagination.limit,
    include: {
      categories: {
        include: {
          category: true
        }
      },
      organization: true,
      images: true
    },
    orderBy,
    where: {
      name: {
        startsWith: search,
        mode: 'insensitive'
      },
      categories: {
        some: {
          categoryId
        }
      },
      organizationId,
      organization: {
        deletedAt: null
      },
      deletedAt: null
    }
  })

  const countPromise = prisma.products.count({
    where: {
      name: {
        startsWith: search,
        mode: 'insensitive'
      }
    }
  })

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

    const mappedProducts = products.map(({ price, rating, ...rest }) => {
      return {
        ...rest,
        price: price.toNumber(),
        rating: rating.toNumber()
      }
    })

    return {
      products: mappedProducts,
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
        id,
        organization: {
          deletedAt: null
        },
        deletedAt: null
      }
    })

    if (product === null) return null

    const { price, rating, ...rest } = product

    const mappedProduct = {
      ...rest,
      price: price.toNumber(),
      rating: rating.toNumber()
    }

    return mappedProduct
  } catch (error) {
    console.error(error)
    return null
  }
}
