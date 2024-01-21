import prisma from '@/libs/prisma'
import { parsePagination } from '@/libs/validations'
import { type SearchParams } from '@/types'

export async function getCategories (params: SearchParams = {}) {
  const { limit = 10, page = 1 } = params

  const pagination = parsePagination({ limit, page })

  const categories = await prisma.categories.findMany({
    skip: pagination.skip,
    take: pagination.limit,
    where: {
      name: {
        startsWith: params.q,
        mode: 'insensitive'
      }
    }
  })

  return categories
}
