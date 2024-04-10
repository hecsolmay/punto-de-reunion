'use server'

import { getUserSession } from '@/libs/auth'
import { generateErrorResponse } from '@/libs/utils'
import { getOneCart, updateCart } from '@/services/carts'
import { createPaymentIntent, getPayment, getPayments, savePayment } from '@/services/payments'
import { type RawProduct, type SearchParams, type Transaction } from '@/types'
import { type GetPaymentsResponse } from '@/types/actions'

export async function handlePayment (cartId?: string) {
  try {
    const cart = await getOneCart({ id: cartId, isAlreadyPaid: false })

    if (cart === null) {
      return
    }

    const rawProducts: RawProduct[] = cart.items.map(item => {
      const { product } = item

      return {
        quantity: item.quantity,
        description: product.description,
        images: product.images.map(image => image.imageUrl),
        name: product.name,
        price: product.price
      }
    })

    const result = await createPaymentIntent(cart.id, rawProducts)

    if (result.url === null) {
      throw new Error('Error al procesar el pago')
    }

    return result.url
  } catch (error) {
    console.error(error)
    throw new Error('Error al procesar el pago')
  }
}

export async function getPaymentDetails (sessionId?: string) {
  try {
    const data = await getPayment(sessionId)
    return data
  } catch (error) {
    console.error(error)
    return null
  }
}

export async function savePaymentRegister (data: Transaction) {
  try {
    await Promise.allSettled([
      savePayment(data),
      updateCart(data.cartId, { isAlreadyPaid: true })
    ])
  } catch (error) {
    console.error(error)
  }
}

export async function getUserPayments (searchParams?: SearchParams): Promise<GetPaymentsResponse> {
  try {
    const session = await getUserSession()

    if (session === null) {
      return generateErrorResponse(401, 'Error de autenticación')
    }

    const userPayments = await getPayments({ ...searchParams, userId: session?.id })

    return {
      success: true,
      data: userPayments,
      code: 200,
      message: 'Operación exitosa'
    }
  } catch (error) {
    console.error(error)
    return generateErrorResponse(500, 'Something went wrong')
  }
}
