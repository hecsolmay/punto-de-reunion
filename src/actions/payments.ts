'use server'

import { getOneCart } from '@/services/carts'
import { createPaymentIntent } from '@/services/payments'
import { type RawProduct } from '@/types'

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
