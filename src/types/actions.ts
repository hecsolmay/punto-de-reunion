import { type searchProducts } from '@/actions/products'

type ElementType<T extends Iterable<any>> = T extends Iterable<infer E> ? E : never
export type ProductsSearchArray = Awaited<ReturnType<typeof searchProducts>>
export type ProductsSearch = ElementType<ProductsSearchArray>
