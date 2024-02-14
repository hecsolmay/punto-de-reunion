import { SORT_OPTIONS } from '@/constants'
import { type OrderType, type SortOptions } from '@/types'

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
};

export function getSortOption (sort: SortOptions = 'created') {
  return SORT_OPTIONS[sort] ?? SORT_OPTIONS.created
}

const OrderKeys = ['asc', 'desc'] as const

export function getOrderType (order: OrderType = 'desc') {
  return OrderKeys.includes(order) ? order : 'desc'
}

interface getOrderByParams {
  sort?: SortOptions
  order?: OrderType
}

export function getOrderBy ({ order = 'desc', sort = 'created' }: getOrderByParams) {
  const sortParse = getSortOption(sort)
  const orderType = getOrderType(order)
  const { order: sortOption } = sortParse

  if (sortOption === 'price') {
    return { price: order }
  }

  if (sortOption === 'rating') {
    return { rating: order }
  }

  if (sortOption === 'name') {
    return { name: orderType }
  }

  return { createdAt: order }
}
