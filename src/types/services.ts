import type { Categories } from '@prisma/client'
import type { Info } from '@/libs/pagination'
import { type Response } from '@/types/response'
import type { getOneCart, findManyCarts } from '@/services/carts'
import { type getProductById } from '@/services/products'
import { type getOrganizationById } from '@/services/organizations'

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
export type ProductCartType = CartItem['items'][0]['product']
export type CartType = NonNullable<Awaited<ReturnType <typeof getOneCart>>>
export type GetOneProduct = NonNullable<Awaited<ReturnType<typeof getProductById>>>
export type GetOneOrganization = NonNullable<Awaited<ReturnType<typeof getOrganizationById>>>
