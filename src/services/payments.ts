import { formatStripeLineProduct } from '@/libs/format'
import { getPaginationInfo } from '@/libs/pagination'
import { getStripe } from '@/libs/payments'
import prisma from '@/libs/prisma'
import { getOrderByCommon, getWherePaymentsInputFromParams } from '@/libs/utils'
import { parsePagination } from '@/libs/validations'
import type { RawProduct, SearchParams, Transaction } from '@/types'
import { type Prisma } from '@prisma/client'

export async function createPaymentIntent (cartId: string, rawItems: RawProduct[], redirectUrl?: string) {
  const stripe = getStripe()
  const url = redirectUrl ?? process.env.NEXT_PUBLIC_APP_URL

  const formattedLineItems = rawItems.map(item => formatStripeLineProduct(item, 'mxn'))
  const totalQuantity = rawItems.reduce((acc, item) => acc + item.quantity, 0)

  const session = await stripe.checkout.sessions.create({
    line_items: formattedLineItems,
    mode: 'payment',
    success_url: `${url}/checkout/${cartId}/success?sessionId={CHECKOUT_SESSION_ID}`,
    cancel_url: `${url}/checkout/${cartId}`,
    metadata: {
      cartId,
      totalQuantity
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

export async function getPayments (params: SearchParams) {
  const {
    limit = 12,
    page = 1,
    order = 'asc'
  } = params
  const pagination = parsePagination({ limit, page })

  const orderBy = getOrderByCommon({ order })

  const where: Prisma.PaymentsWhereInput = getWherePaymentsInputFromParams(params)

  const paymentsPromise = prisma.payments.findMany({
    skip: pagination.skip,
    take: pagination.limit,
    include: {
      cart: {
        include: {
          organization: true
        }
      }
    },
    orderBy,
    where
  })

  const countPromise = prisma.payments.count({
    where
  })

  const [payments, count] = await prisma.$transaction([
    paymentsPromise,
    countPromise
  ])

  const mappedPayments = payments.map(payment => {
    const { cart: { organization }, totalPaymentAmount, ...rest } = payment

    return {
      ...rest,
      organization,
      totalPaymentAmount: totalPaymentAmount.toNumber()
    }
  })

  const info = getPaginationInfo({
    limit: pagination.limit,
    page: pagination.page,
    total: count
  })

  return {
    payments: mappedPayments,
    info
  }
}
