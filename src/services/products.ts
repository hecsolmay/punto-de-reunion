import { getPaginationInfo } from '@/libs/pagination'
import prisma from '@/libs/prisma'
import { parsePagination } from '@/libs/validations'
import { type SearchParams } from '@/types'

export async function getProducts (params: SearchParams = {}) {
  const { limit = 10, page = 1 } = params

  const pagination = parsePagination({ limit, page })

  const options = {
    skip: pagination.skip,
    take: pagination.limit,
    include: {
      images: true,
      organization: true
    }
  }

  const [products, count] = await prisma.$transaction([
    prisma.products.findMany(options),
    prisma.products.count()
  ])

  const info = getPaginationInfo({
    limit: pagination.limit,
    page: pagination.page,
    total: count
  })

  return { products, info }
}

export async function getProductById (id?: string) {
  try {
    const result = await prisma.products.findFirst({
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

    return result
  } catch (error) {
    console.error(error)
    return null
  }
}
