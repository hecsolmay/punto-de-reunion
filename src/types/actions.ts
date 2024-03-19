import { type getAllCategories } from '@/actions/categories'
import { type searchProducts } from '@/actions/products'
import { type deleteCart } from '@/services/carts'
import { type updateCartItem, type deleteCartItem } from '@/services/items'
import { type Response } from '@/types/response'
import { type Carts, type CartItems } from '@prisma/client'

type ElementType<T extends Iterable<any>> = T extends Iterable<infer E> ? E : never
export type ProductsSearchArray = Awaited<ReturnType<typeof searchProducts>>
export type ProductsSearch = ElementType<ProductsSearchArray>
export type AllCategoriesResponse = Awaited<ReturnType<typeof getAllCategories>>
export type Category = ElementType<AllCategoriesResponse>

type CartResponseType = CartItems | Carts | null

export type AddToCartResponse = Response<CartResponseType>

type UpdateCartItem = Awaited<ReturnType<typeof updateCartItem>>
export type UpdateCartItemResponse = Response<UpdateCartItem>
type DeleteCartItem = Awaited<ReturnType<typeof deleteCartItem>>
export type DeleteCartItemResponse = Response<DeleteCartItem>
export type DeleteManyCartItemResponse = Response<number>
type DeleteCart = Awaited<ReturnType<typeof deleteCart>>
export type DeleteOneCartResponse = Response<DeleteCart>
