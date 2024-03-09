'use server'

import { getUserSession } from '@/libs/auth'
import { generateErrorResponse } from '@/libs/utils'
import { createCart, createCartItem, getOneCart, updateCartItem } from '@/services/carts'
import { getProductById } from '@/services/products'
import { type AddToCartResponse } from '@/types/actions'
import { revalidateTag } from 'next/cache'

interface addToCartParams {
  productId: string
  quantity: number
}

export async function addToCart ({ productId, quantity }: addToCartParams): Promise<AddToCartResponse> {
  try {
    const session = await getUserSession()

    if (session === null) {
      return generateErrorResponse(401, 'Error de autenticación')
    }

    const existedProduct = await getProductById(productId)

    if (existedProduct === null) {
      return generateErrorResponse(404, 'Producto no encontrado')
    }

    const maxQuantityReachedMessage = `La cantidad maxima de productos por carrito es ${existedProduct.maxQuantityByCart}, por favor disminuya la cantidad o cambie el producto`

    const cart = await getOneCart({ userId: session.id, organizationId: existedProduct.organizationId })

    const payload = {
      userId: session.id,
      organizationId: existedProduct.organizationId,
      productId,
      quantity
    }

    if (cart === null) {
      // CREATE CART IF NO EXISTS
      if (getIsMaxQuantityReached(quantity, existedProduct.maxQuantityByCart)) {
        return generateErrorResponse(400, maxQuantityReachedMessage)
      }

      const createdCart = await createCart(payload)

      revalidateTag('carts')

      return {
        success: true,
        data: createdCart,
        code: 201,
        message: 'Carrito creado'
      }
    }

    const cartId = cart.id
    const productInCart = cart.items.find(i => i.productId === productId) ?? null

    if (productInCart === null) {
      if (getIsMaxQuantityReached(quantity, existedProduct.maxQuantityByCart)) {
        return generateErrorResponse(400, maxQuantityReachedMessage)
      }

      const createItem = await createCartItem({ cartId, productId, quantity, originalPrice: existedProduct.price })

      revalidateTag('carts')
      return {
        success: true,
        data: createItem,
        code: 201,
        message: 'Item agregado'
      }
    }

    if (getIsMaxQuantityReached(productInCart.quantity + quantity, existedProduct.maxQuantityByCart)) {
      return generateErrorResponse(400, maxQuantityReachedMessage)
    }

    const updatedItem = await updateCartItem({ itemId: productInCart.id, quantity: productInCart.quantity + quantity })
    console.log(updatedItem)

    revalidateTag('carts')

    return {
      success: true,
      data: null,
      code: 204
    }
  } catch (error) {
    console.error(error)
    return generateErrorResponse(500, 'Error al agregar al carrito')
  }
}

function getIsMaxQuantityReached (currentQuantity: number, maxQuantity: number) {
  return currentQuantity >= maxQuantity
}
