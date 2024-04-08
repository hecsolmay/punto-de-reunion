import { formatStripeLineProduct } from '@/libs/format'
import { getStripe } from '@/libs/payments'
import prisma from '@/libs/prisma'
import type { RawProduct, Transaction } from '@/types'

export async function createPaymentIntent (cartId: string, rawItems: RawProduct[], redirectUrl?: string) {
  const stripe = getStripe()
  const url = redirectUrl ?? process.env.NEXT_PUBLIC_APP_URL

  const formattedLineItems = rawItems.map(item => formatStripeLineProduct(item, 'mxn'))

  const session = await stripe.checkout.sessions.create({
    line_items: formattedLineItems,
    mode: 'payment',
    success_url: `${url}/checkout/${cartId}/success?sessionId={CHECKOUT_SESSION_ID}`,
    cancel_url: `${url}/checkout/${cartId}`,
    metadata: {
      cartId
    }
  })

  return {
    id: session.id,
    url: session.url
  }
}

export async function getPayment (sessionId?: string) {
  const stripe = getStripe()

  const foundPayment = await stripe.checkout.sessions.listLineItems(sessionId ?? '', {
    expand: ['data.price.product']
  })

  const data = foundPayment.data

  if (data.length === 0) {
    return null
  }

  const mappedData = data.map(item => {
    const { id, amount_total: amountTotal, quantity = 0, description, price } = item

    const unitAmount = price?.unit_amount ?? amountTotal % (quantity ?? 0)
    const priceData = price?.product as any
    const images = priceData?.images as string[] ?? ['https://wiki.dave.eu/images/thumb/4/47/Placeholder.png/600px-Placeholder.png']
    const name = priceData?.name as string ?? description
    const productDescription = priceData?.description as string ?? ''

    return {
      id,
      total: amountTotal / 100,
      quantity: quantity ?? 0,
      name,
      unitAmount: unitAmount / 100,
      images,
      description: productDescription
    }
  })

  return mappedData
}

export async function savePayment (data: Transaction) {
  const createdPayment = await prisma.payments.create({
    data
  })

  return createdPayment
}
