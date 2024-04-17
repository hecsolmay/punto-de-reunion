import { ContentContainer } from '@/components/account/container'
import { ListOfUserPayments } from '@/components/payments/list'
import { ListOfPaymentsFallback } from '@/components/skeletons/payments'
import { type ServerPageProps } from '@/types'
import { ShoppingCart } from 'lucide-react'
import { Suspense } from 'react'

export const dynamic = 'force-dynamic'

export default function HistoryPaymentsPage ({ searchParams }: ServerPageProps) {
  const { page = '1', limit = '10' } = searchParams

  return (
    <ContentContainer >
      <div className='flex flex-row gap-3'>
        <ShoppingCart size={28} />
        <h1 className='text-2xl font-bold'>Mis Ultimas compras</h1>
      </div>

      <Suspense key={`history-payments-${page}-${limit}`} fallback={<ListOfPaymentsFallback />}>
        <ListOfUserPayments searchParams={searchParams}/>
      </Suspense>
    </ContentContainer>
  )
}
