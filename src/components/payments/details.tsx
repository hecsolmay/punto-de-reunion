import { formatPriceNumber } from '@/libs/format'
import { getStripePayment } from '@/services/payments'

interface PaymentDetailsStripeProps {
  sessionId: string
}

export async function ListItemsStripe ({
  sessionId
}: PaymentDetailsStripeProps) {
  const items = await getStripePayment(sessionId)

  if (items === null) {
    // TODO: HANDLE NOT FOUND
    return null
  }

  return (
    <div>
      <h2 className='text-lg font-semibold'>
        Lista de los productos comprados
      </h2>

      <ul className='mt-8 flex flex-col gap-8 pb-8 md:mt-4 md:gap-6'>
        {items.map(
          ({ images, name, id, description, quantity, total, unitAmount }) => (
            <StripePaymentItem
              key={id}
              name={name}
              description={description}
              total={total}
              quantity={quantity}
              unitAmount={unitAmount}
              image={images[0]}
            />
          )
        )}
      </ul>
    </div>
  )
}

interface StripePaymentItemProps {
  name: string
  description: string
  total: number
  quantity: number
  unitAmount: number
  image: string
}

function StripePaymentItem ({
  description,
  name,
  total,
  quantity,
  unitAmount,
  image
}: StripePaymentItemProps) {
  return (
    <li className='flex flex-col justify-start gap-6 md:flex-row md:gap-4'>
      <img
        className='size-20 self-center rounded-lg object-cover md:size-12 md:self-auto'
        src={image}
        alt={`Imagen del producto ${name}`}
      />

      <div className='w-full flex-1 space-y-2'>
        <div className='flex flex-row items-start justify-between text-base font-semibold'>
          <h3 className='flex-1 text-pretty'>{name}</h3>
          <span>{formatPriceNumber(total)} MXN</span>
        </div>

        <p className='text-balance text-sm text-slate-400 dark:text-slate-200'>{description}</p>

        <div className='flex flex-row items-start justify-between text-balance text-sm text-slate-400 dark:text-slate-200'>
          <p>Cantidad: {quantity}</p>
          <span>{formatPriceNumber(unitAmount)} MXN unidad</span>
        </div>
      </div>
    </li>
  )
}
