import { getPaginationInfo } from '@/libs/pagination'
import prisma from '@/libs/prisma'
import { generateErrorResponse, getOrderByCarts } from '@/libs/utils'
import { parsePagination } from '@/libs/validations'
import { type SearchParams } from '@/types'
import { type getCartsType } from '@/types/services'
import { type Prisma } from '@prisma/client'

interface Params extends Omit<SearchParams, 'categoryId' | 'search' | 'productId'> {
  userId?: string
  isAlreadyPaid?: boolean
  organizationId?: string
}

export async function getCarts (params: Params): Promise<getCartsType> {
  const { limit = 10, page = 1, sort = 'created', order = 'asc', userId, isAlreadyPaid, organizationId } = params
  const pagination = parsePagination({ limit, page })

  const orderBy = getOrderByCarts({ order, sort })

  try {
    const where: Prisma.CartsWhereInput = {
      userId,
      isAlreadyPaid,
      organizationId
    }

    const cartsPromise = prisma.carts.findMany({
      where,
      orderBy,
      include: {
        organization: true,
        items: true
      },
      skip: pagination.skip,
      take: pagination.limit
    })

    const [carts, count] = await prisma.$transaction([
      cartsPromise,
      prisma.carts.count({ where })
    ])

    const info = getPaginationInfo({ total: count, limit: pagination.limit, page: pagination.page })

    return {
      success: true,
      data: {
        carts,
        info
      }
    }
  } catch (error) {
    console.error(error)
    return generateErrorResponse(500, 'Error al obtener los carritos')
  }
}

export async function findManyCarts () {
  return await prisma.carts.findMany({
    include: {
      organization: true,
      items: true
    }
  })
}
