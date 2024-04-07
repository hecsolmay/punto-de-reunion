import { formatStripeLineProduct } from '@/libs/format'
import { getStripe } from '@/libs/payments'
import type { RawProduct } from '@/types'

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
