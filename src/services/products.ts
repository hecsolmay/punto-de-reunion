import { getPaginationInfo } from '@/libs/pagination'
import prisma from '@/libs/prisma'
import { getOrderBy, getWhereProductsInputFromParams } from '@/libs/utils'
import { parsePagination } from '@/libs/validations'
import { type SearchParams } from '@/types'
import { type Prisma } from '@prisma/client'

export async function getProducts (params: SearchParams = {}) {
  const {
    limit = 10,
    page = 1,
    sort = 'created',
    order = 'asc'
  } = params
  const pagination = parsePagination({ limit, page })

  const orderBy = getOrderBy({ order, sort })

  const where: Prisma.ProductsWhereInput = getWhereProductsInputFromParams(params)

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
    where
  })

  const countPromise = prisma.products.count({
    where
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
