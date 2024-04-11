import { getPaymentDetails } from '@/actions/payments'
import MainContainer from '@/components/main-container'
import { ErrorContent } from '@/components/payments/error'
import Stepper from '@/components/payments/steps'
import SuccessPayment from '@/components/payments/success'
import { NAVIGATION_PAYMENT_STEPS_COMPLETE } from '@/constants'
import { getOneCart } from '@/services/carts'
import type { ServerPageProps, Transaction } from '@/types'

const MAX_MINUTES_TO_SHOW = 5
const MINUTE = 60000

export default async function SuccessPage ({
  searchParams,
  params
}: ServerPageProps) {
  const { sessionId } = searchParams
  const { id } = params

  const cart = await getOneCart({ id })
  const paymentDetailsProducts = await getPaymentDetails(sessionId)

  if (cart === null || paymentDetailsProducts === null) {
    return <ErrorContent />
  }

  const now = new Date()
  const difference = now.getTime() - cart.updatedAt.getTime()
  const minutesPassed = Math.floor(difference / MINUTE)

  const hasPassedMaxTime = minutesPassed >= MAX_MINUTES_TO_SHOW

  const text = !hasPassedMaxTime ? 'Compra realizada con éxito' : 'Esta compra fue un éxito revisa tu historial para ver mas detalles'

  const totalPaymentAmount = paymentDetailsProducts.reduce((acc, item) => {
    const total = item.quantity * item.unitAmount
    return acc + total
  }, 0)

  const totalQuantity = paymentDetailsProducts.reduce((acc, item) => acc + (item.quantity), 0)

  const transaction: Transaction = {
    cartId: cart.id,
    transactionId: sessionId ?? '',
    transactionService: 'STRIPE',
    totalPaymentAmount,
    totalQuantity
  }

  return (
    <MainContainer className='flex h-auto min-h-[80vh] flex-col gap-y-8 overflow-x-hidden pb-8'>
      <Stepper
        steps={NAVIGATION_PAYMENT_STEPS_COMPLETE}
        selectedIndex={NAVIGATION_PAYMENT_STEPS_COMPLETE.length - 1}
      />
      <SuccessPayment text={text} transaction={transaction} executeAction={!hasPassedMaxTime} />
    </MainContainer>
  )
}
