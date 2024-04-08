import { getPaymentDetails, savePaymentRegister } from '@/actions/payments'
import MainContainer from '@/components/main-container'
import Stepper from '@/components/payments/steps'
import SuccessPayment from '@/components/payments/success'
import { NAVIGATION_PAYMENT_STEPS_COMPLETE } from '@/constants'
import { getOneCart } from '@/services/carts'
import { type ServerPageProps } from '@/types'

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
    return null
  }

  if (!cart.isAlreadyPaid) {
    await savePaymentRegister({
      cartId: cart.id,
      transactionId: sessionId ?? '',
      transactionService: 'STRIPE'
    })
  }

  let text = 'Compra realizada con éxito'

  const now = new Date()
  const difference = now.getTime() - cart.updatedAt.getTime()
  const minutesPassed = Math.floor(difference / MINUTE)

  if (minutesPassed >= MAX_MINUTES_TO_SHOW) {
    text = 'Esta compra fue un éxito revisa tu historial para ver mas detalles'
  }

  return (
    <MainContainer className='flex h-auto min-h-[80vh] flex-col gap-y-8 overflow-x-hidden pb-8'>
      <Stepper
        steps={NAVIGATION_PAYMENT_STEPS_COMPLETE}
        selectedIndex={NAVIGATION_PAYMENT_STEPS_COMPLETE.length - 1}
      />
      <SuccessPayment text={text} />
    </MainContainer>
  )
}
