import { DEFAULT_PAGINATION } from '@/constants'
import { paginationSchema } from '@/schemas/search'

export function parsePagination (pagination: any = DEFAULT_PAGINATION) {
  const result = paginationSchema.safeParse(pagination ?? {})

  if (!result.success) return DEFAULT_PAGINATION

  const skip = (result.data.page - 1) * result.data.limit

  return {
    ...result.data,
    skip
  }
}
