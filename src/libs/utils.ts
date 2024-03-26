import { SORT_OPTIONS } from '@/constants'
import { type BUILDING_KEY, UTM_LOCATIONS } from '@/constants/locations'
import { type SearchParams, type OrderType, type SortOptions } from '@/types'
import { type StatusResponse, type ErrorResponse, type StatusCode } from '@/types/response'
import { type Prisma } from '@prisma/client'

export function generatePagination (currentPage: number, totalPages: number) {
  // If the total number of pages is 7 or less,
  // display all pages without any ellipsis.
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1)
  }

  // If the current page is among the first 3 pages,
  // show the first 3, an ellipsis, and the last 2 pages.
  if (currentPage <= 3) {
    return [1, 2, 3, '...', totalPages - 1, totalPages]
  }

  // If the current page is among the last 3 pages,
  // show the first 2, an ellipsis, and the last 3 pages.
  if (currentPage >= totalPages - 2) {
    return [1, 2, '...', totalPages - 2, totalPages - 1, totalPages]
  }

  // If the current page is somewhere in the middle,
  // show the first page, an ellipsis, the current page and its neighbors,
  // another ellipsis, and the last page.
  return [
    1,
    '...',
    currentPage - 1,
    currentPage,
    currentPage + 1,
    '...',
    totalPages
  ]
}

export function getSortOption (sort: SortOptions = 'created') {
  return SORT_OPTIONS[sort] ?? SORT_OPTIONS.created
}

const OrderKeys = ['asc', 'desc'] as const

export function getOrderType (order: OrderType = 'asc') {
  return OrderKeys.includes(order) ? order : 'asc'
}

interface getOrderByParams {
  sort?: SortOptions
  order?: OrderType
}

type ReturnOrderByCommon =
  | {
    createdAt: OrderType
  }
  | {
    name: OrderType
  }

type ReturnOrderByProducts =
  | ReturnOrderByCommon
  | {
    price: OrderType
  }
  | {
    rating: OrderType
  }

export function getOrderBy ({
  order = 'asc',
  sort = 'created'
}: getOrderByParams): ReturnOrderByProducts {
  const sortParse = getSortOption(sort)
  const orderType = getOrderType(order)
  const { order: sortOption } = sortParse

  if (sortOption === 'price') {
    return { price: orderType }
  }

  if (sortOption === 'rating') {
    return { rating: orderType }
  }

  if (sortOption === 'name') {
    return { name: orderType }
  }

  const reverseOrder = orderType === 'asc' ? 'desc' : 'asc'
  return { createdAt: reverseOrder }
}

export function getOrderByCategory ({
  order = 'asc',
  sort = 'created'
}: getOrderByParams): ReturnOrderByCommon {
  const sortParse = getSortOption(sort)
  const orderType = getOrderType(order)
  const { order: sortOption } = sortParse

  if (sortOption === 'name') {
    return { name: orderType }
  }
  const reverseOrder = orderType === 'asc' ? 'desc' : 'asc'
  return { createdAt: reverseOrder }
}

export function getOrderByOrganization ({
  order = 'asc',
  sort = 'created'
}: getOrderByParams): ReturnOrderByCommon {
  const sortParse = getSortOption(sort)
  const orderType = getOrderType(order)
  const { order: sortOption } = sortParse

  if (sortOption === 'name') {
    return { name: orderType }
  }
  const reverseOrder = orderType === 'asc' ? 'desc' : 'asc'
  return { createdAt: reverseOrder }
}

type SearchParamsKeys = keyof SearchParams

export function parseSearchParams (urlSearch: URLSearchParams): SearchParams {
  const keyMapping: Record<string, SearchParamsKeys> = {
    page: 'page',
    search: 'search',
    order: 'order',
    sort: 'sort',
    productId: 'productId',
    organizationId: 'organizationId',
    categoryId: 'categoryId',
    userId: 'userId',
    limit: 'limit'
  }

  const query: SearchParams = {}

  urlSearch.forEach((value, key) => {
    const mappedKey = keyMapping[key]
    if (mappedKey !== undefined) {
      query[mappedKey] = value as any
    }
  })

  return query
}

const STATUS_RECORD: Record<StatusCode, StatusResponse> = {
  200: 'ok',
  201: 'created',
  204: 'noContent',
  400: 'badRequest',
  401: 'unauthorized',
  403: 'forbidden',
  404: 'notFound',
  500: 'internalServerError'
} as const

export function generateErrorResponse (code: StatusCode, error?: string): ErrorResponse {
  const status = STATUS_RECORD[code] ?? STATUS_RECORD[500]

  return {
    success: false,
    status,
    code,
    error: error ?? 'Something went wrong'
  }
}

export function getOrderByCarts ({
  order = 'asc',
  sort = 'created'
}: getOrderByParams): Prisma.CartsOrderByWithRelationInput {
  const sortParse = getSortOption(sort)
  const orderType = getOrderType(order)
  const { order: sortOption } = sortParse
  const reverseOrder = orderType === 'asc' ? 'desc' : 'asc'

  if (sortOption === 'created') {
    return { createdAt: reverseOrder }
  }

  return { createdAt: reverseOrder }
}

export function getUtmLocations (key: BUILDING_KEY) {
  return UTM_LOCATIONS[key] ?? UTM_LOCATIONS.c
}

export function getWhereProductsInputFromParams (params: SearchParams): Prisma.ProductsWhereInput {
  const where: Prisma.ProductsWhereInput = {
    organization: {
      deletedAt: null
    },
    deletedAt: null
  }

  if (params.categoryId !== undefined) {
    where.categories = { some: { id: params.categoryId } }
  }

  if (params.organizationId !== undefined) {
    where.organizationId = params.organizationId
  }

  if (params.search !== undefined) {
    where.name = { startsWith: params.search, mode: 'insensitive' }
  }

  return where
}
