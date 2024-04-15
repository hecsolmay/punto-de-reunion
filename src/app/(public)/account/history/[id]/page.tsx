import { ContentContainer } from '@/components/account/container'
import { DetailPaymentCard } from '@/components/payments/card'
import { ListItemsStripe } from '@/components/payments/details'
import { getOnePayment } from '@/services/payments'
import type { ServerPageProps } from '@/types'
import { ShoppingCart } from 'lucide-react'
import { redirect } from 'next/navigation'
import { Suspense } from 'react'

export default async function PaymentDetails ({ params }: ServerPageProps) {
  const { id } = params
  const details = await getOnePayment({ id })

  if (details === null) {
    // TODO: Handle not found
    redirect('/not-found')
  }

  const { transactionService } = details

  if (transactionService === 'STRIPE') {
    // TODO: Handle stripe DETAILS
    return (
      <ContentContainer>
        <div className='flex flex-row gap-3'>
          <ShoppingCart size={28} />
          <h1 className='text-2xl font-bold'>Detalles de compra</h1>
        </div>

        <DetailPaymentCard payment={details} />
        <Suspense fallback={<p>Loading...</p>}>
          <ListItemsStripe sessionId={details.transactionId} />
        </Suspense>
      </ContentContainer>
    )
  }

  return (
    <ContentContainer>
      <div className='flex flex-row gap-3'>
        <ShoppingCart size={28} />
        <h1 className='text-2xl font-bold'>Detalles de compra</h1>
      </div>

      <DetailPaymentCard payment={details} />
    </ContentContainer>
  )
}
