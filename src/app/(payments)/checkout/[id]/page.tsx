import MainContainer from '@/components/main-container'
import PaymentSteps from '@/components/payments/payment-steps'
import { getUserSession } from '@/libs/auth'
import { getOneCart } from '@/services/carts'
import { type ServerPageProps } from '@/types'
import { redirect } from 'next/navigation'

export default async function CheckoutCartPage ({ params }: ServerPageProps) {
  const session = await getUserSession()
  const { id } = params

  if (session === null) {
    redirect(`/login?next=/checkout/${id}`)
  }

  const cart = await getOneCart({ id, userId: session.id, isAlreadyPaid: false })

  console.log(cart)

  return (
    <MainContainer className='flex h-auto min-h-[80vh] flex-col gap-y-8 overflow-x-hidden pb-8'>
      <PaymentSteps />

    </MainContainer>
  )
}
