import { type getCategoryById, type getCategories } from '@/services/category'
import { type getProductById, type getProducts } from '@/services/products'

export type ProductsResponse = Awaited<ReturnType <typeof getProducts>>
export type ProductByIdResponse = Awaited<ReturnType <typeof getProductById>>
export type CategoriesResponse = Awaited<ReturnType <typeof getCategories>>
export type CategoryByIdResponse = Awaited<ReturnType <typeof getCategoryById>>
export type ProductResponse = NonNullable<ProductByIdResponse>

export interface SuccessResponse<T = undefined> {
  success: true
  code?: StatusCode
  message?: string
  data: T
}

export type StatusResponse = 'badRequest' | 'unauthorized' | 'forbidden' | 'notFound' | 'internalServerError' | 'ok' | 'created' | 'noContent'
export type StatusCode = 200 | 201 | 204 | 400 | 401 | 403 | 404 | 500

export interface ErrorResponse {
  success: false
  error: string
  status?: StatusResponse
  code?: StatusCode
}

export type Response<T = any> = SuccessResponse<T> | ErrorResponse
