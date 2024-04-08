'use server'

import { getOneCart, updateCart } from '@/services/carts'
import { createPaymentIntent, getPayment, savePayment } from '@/services/payments'
import { type Transaction, type RawProduct } from '@/types'

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
