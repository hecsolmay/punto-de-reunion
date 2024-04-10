import { getStripe } from '@/libs/payments'
import { savePayment } from '@/services/payments'
import { revalidateTag } from 'next/cache'
import { headers } from 'next/headers'
import { type NextRequest } from 'next/server'

const stripe = getStripe()

export async function POST (request: NextRequest) {
  const headersList = headers()
  const sig = headersList.get('stripe-signature')

  const body = await request.text()

  let event

  try {
    event = stripe.webhooks.constructEvent(body, sig!, process.env.STRIPE_WEBHOOK_SECRET!)
  } catch (error) {
    console.error(error)
    return new Response('Invalid payload', { status: 400 })
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object

    const { id, metadata, amount_total: amountTotal } = session
    const cartId = metadata?.cartId ?? ''
    const rawTotalQuantity = metadata?.totalQuantity ?? 0
    const totalQuantity = Number(rawTotalQuantity)

    try {
      await savePayment({
        transactionId: id,
        cartId,
        transactionService: 'STRIPE',
        totalPaymentAmount: (amountTotal ?? 0) / 100,
        totalQuantity
      })
      revalidateTag('carts')
    } catch (error) {
      console.error(error)
    }
  }

  return new Response(null, {
    status: 200
  })
}
