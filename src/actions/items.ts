'use server'

import { generateErrorResponse } from '@/libs/utils'
import { deleteCart } from '@/services/carts'
import * as services from '@/services/items'
import { type DeleteCartItemResponse, type UpdateCartItemResponse } from '@/types/actions'
import { revalidateTag } from 'next/cache'

export async function updateCartItemQuantity (id: string, quantity: number): Promise<UpdateCartItemResponse> {
  try {
    if (quantity <= 0) {
      return generateErrorResponse(400, 'Quantity must be greater than 0')
    }

    const existedItem = await services.getItemById(id)

    if (existedItem === null) {
      return generateErrorResponse(404, 'Item not found')
    }

    if (quantity > existedItem.product.maxQuantityByCart) {
      return generateErrorResponse(400, 'Quantity must be less than or equal to the current quantity')
    }

    const updatedCartItem = await services.updateCartItem({ id }, { quantity })

    revalidateTag('cart')

    return {
      success: true,
      data: updatedCartItem,
      code: 200,
      message: 'Cart item updated successfully'
    }
  } catch (error) {
    return generateErrorResponse(500, 'Something went wrong')
  }
}

export async function deleteCartItem (id: string): Promise<DeleteCartItemResponse> {
  try {
    const existedItem = await services.getItemById(id)

    if (existedItem === null) {
      return generateErrorResponse(404, 'Item not found')
    }

    const deletedCartItem = await services.deleteCartItem(id)

    const currenCartItemsCount = await services.getItemsCountByCartId(existedItem.cartId)

    if (currenCartItemsCount === 0) {
      await deleteCart(existedItem.cartId)
    }

    revalidateTag('cart')

    return {
      success: true,
      data: deletedCartItem,
      code: 200,
      message: 'Cart item deleted successfully'
    }
  } catch (error) {
    return generateErrorResponse(500, 'Something went wrong')
  }
}
