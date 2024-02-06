import { type getCategories } from '@/services/category'
import { type getProductById, type getProducts } from '@/services/products'

export type ProductsResponse = Awaited<ReturnType <typeof getProducts>>
export type ProductByIdResponse = Awaited<ReturnType <typeof getProductById>>
export type CategoriesResponse = Awaited<ReturnType <typeof getCategories>>
