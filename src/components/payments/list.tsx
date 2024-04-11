import { getUserPayments } from '@/actions/payments'
import { EmptyListOfPayments } from '@/components/empty-states/payments'
import Pagination from '@/components/pagination'
import { PaymentDetailCard } from '@/components/payments/card'
import type { SearchParams } from '@/types'

interface Props {
  searchParams: SearchParams
}

export async function ListOfUserPayments ({ searchParams }: Props) {
  const response = await getUserPayments(searchParams)

  if (!response.success) {
    // TODO: handle error
    return null
  }

  const { payments, info } = response.data

  if (payments.length === 0) {
    return <EmptyListOfPayments />
  }

  return (
    <section className='flex flex-1 flex-col gap-4'>
      {/* FILTER HEADER AND SORT OPTIONS */}

      <h2 className='text-lg font-semibold'>Pedidos recientes</h2>

      {/* LIST OF PAYMENTS */}
      <ul className='flex-1 space-y-7'>
        {payments.map(payment => <PaymentDetailCard key={payment.id} payment={payment} />)}
      </ul>

      {/* PAGINATION AND INFO */}
      <Pagination className='w-full py-4' info={info} />
    </section>
  )
}
