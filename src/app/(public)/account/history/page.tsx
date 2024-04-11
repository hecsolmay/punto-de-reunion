import { ListOfUserPayments } from '@/components/payments/list'
import { type ServerPageProps } from '@/types'
import { ShoppingCart } from 'lucide-react'
import { Suspense } from 'react'

export default function HistoryPaymentsPage ({ searchParams }: ServerPageProps) {
  const { page = '1', limit = '10' } = searchParams

  return (
    <div className='flex h-auto w-full flex-1 flex-col gap-4 bg-zinc-100 p-4 dark:bg-zinc-900 md:px-8'>
      <div className='flex flex-row gap-3'>
        <ShoppingCart size={28} />
        <h1 className='text-2xl font-bold'>Mis Ultimas compras</h1>
      </div>

      <Suspense key={`history-payments-${page}-${limit}`} fallback={<div>Cargando...</div>}>
        <ListOfUserPayments searchParams={searchParams}/>
      </Suspense>
    </div>
  )
}
