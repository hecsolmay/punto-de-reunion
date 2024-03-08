import type { Categories } from '@prisma/client'
import type { Info } from '@/libs/pagination'
import { type Response } from '@/types/response'

interface CategoriesResponse {
  categories: Categories[]
  info: Info
}

export type getCategoriesType = Response<CategoriesResponse>
