import type { Categories } from '@prisma/client'
import type { Info } from '@/libs/pagination'
import { type Response } from '@/types/response'
import { type findManyCarts } from '@/services/carts'

type ElementType<T extends Iterable<any>> = T extends Iterable<infer E> ? E : never

export interface CategoriesResponse {
  categories: Categories[]
  info: Info
}

export type getCategoriesType = Response<CategoriesResponse>
export type FindManyCarts = Awaited<ReturnType<typeof findManyCarts>>

export interface CartsResponse {
  carts: FindManyCarts
  info: Info
}

export type getCartsType = Response<CartsResponse>
export type CartItem = ElementType<FindManyCarts>
