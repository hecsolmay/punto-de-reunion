import { type getProducts, type getProductById } from '@/services/products'
import { type Prisma } from '@prisma/client'

type ArrElement<Arr> = Arr extends ReadonlyArray<infer T> ? T : never

export type ProductsResponse = Prisma.PromiseReturnType<typeof getProducts>
export type ProductResponse = Prisma.PromiseReturnType<typeof getProductById>

export type Product = ArrElement<ProductsResponse>
