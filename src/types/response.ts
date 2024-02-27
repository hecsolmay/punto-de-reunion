import { type getCategoryById, type getCategories } from '@/services/category'
import { type getProductById, type getProducts } from '@/services/products'

export type ProductsResponse = Awaited<ReturnType <typeof getProducts>>
export type ProductByIdResponse = Awaited<ReturnType <typeof getProductById>>
export type CategoriesResponse = Awaited<ReturnType <typeof getCategories>>
export type CategoryByIdResponse = Awaited<ReturnType <typeof getCategoryById>>
export type ProductResponse = NonNullable<ProductByIdResponse>
