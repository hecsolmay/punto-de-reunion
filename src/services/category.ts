import { getPaginationInfo } from '@/libs/pagination'
import prisma from '@/libs/prisma'
import { getOrderByCategory } from '@/libs/utils'
import { parsePagination } from '@/libs/validations'
import { type SearchParams } from '@/types'
import { type Prisma } from '@prisma/client'

export async function getCategories (params: SearchParams = {}) {
  const { limit = 10, page = 1, search = '', sort = 'created', order = 'asc' } = params

  const pagination = parsePagination({ limit, page })

  const orderBy = getOrderByCategory({ order, sort })

  const where: Prisma.CategoriesWhereInput = {
    name: {
      startsWith: search,
      mode: 'insensitive'
    }
  }

  const categoriesPromise = prisma.categories.findMany({
    skip: pagination.skip,
    take: pagination.limit,
    orderBy,
    where
  })

  const countPromise = prisma.categories.count({
    where
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

export async function getCategoryById (categoryId: string) {
  try {
    const category = await prisma.categories.findUnique({
      where: {
        id: categoryId
      }
    })

    return category
  } catch (error) {
    console.error(error)
    return null
  }
}
