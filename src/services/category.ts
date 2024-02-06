import { getPaginationInfo } from '@/libs/pagination'
import prisma from '@/libs/prisma'
import { parsePagination } from '@/libs/validations'
import { type SearchParams } from '@/types'

export async function getCategories (params: SearchParams = {}) {
  const { limit = 10, page = 1, query = '' } = params

  const pagination = parsePagination({ limit, page })

  const categoriesPromise = prisma.categories.findMany({
    skip: pagination.skip,
    take: pagination.limit,
    where: {
      name: {
        startsWith: query,
        mode: 'insensitive'
      }
    }
  })

  const countPromise = prisma.categories.count({
    where: {
      name: {
        startsWith: query,
        mode: 'insensitive'
      }
    }
  })

  try {
    const [categories, count] = await prisma.$transaction([
      categoriesPromise,
      countPromise
    ])

    const info = getPaginationInfo({
      limit: pagination.limit,
      page: pagination.page,
      total: count
    })

    return {
      categories,
      info
    }
  } catch (error) {
    console.error(error)
    return {
      error: 'Error al obtener las categorías',
      status: 500
    }
  }
}
