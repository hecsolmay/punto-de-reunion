import PaymentStatusBadge from '@/components/payments/badge'
import { formatDate, formatPriceNumber } from '@/libs/format'
import { type PaymentElement } from '@/types/actions'
import Link from 'next/link'
import LinkButton from '../buttons/link-button'

interface PaymentDetailCardProps {
  payment: PaymentElement
}

export function PaymentDetailCard ({ payment }: PaymentDetailCardProps) {
  const { organization, createdAt, status, totalPaymentAmount, totalQuantity } =
    payment
  const { name, imageUrl, id: organizationId } = organization
  createdAt.toLocaleDateString('es-ES')
  return (
    <li
      className='shadow-b-lg flex min-h-16 w-full flex-col justify-start gap-3 border-b border-gray-400 pb-4 dark:border-white md:flex-row'
      key={payment.id}
    >
      <img
        className='size-12 rounded-full object-cover drop-shadow-lg'
        src={imageUrl}
        alt={`Imagen de la organización ${name}`}
      />

      <div className='flex w-full flex-1 flex-col'>
        <Link
          href={`/organizations/${organizationId}`}
          title={`Ir a la organización ${name}`}
        >
          <h3 className='text-lg font-semibold'>{name}</h3>
        </Link>

        <p className='text-sm text-slate-600 dark:text-slate-200'>
          <span className='font-semibold text-black dark:text-white'>
            Fecha:{' '}
          </span>{' '}
          {formatDate(createdAt)}
        </p>

        <div className='mt-4 inline-flex justify-between text-sm text-slate-600 dark:text-slate-200'>
          <p>
            <span className='font-semibold text-black dark:text-white'>
              Cantidad:{' '}
            </span>
            {totalQuantity}
          </p>
          <p>
            <span className='font-semibold text-black dark:text-white'>
              Total:{' '}
            </span>
            {formatPriceNumber(totalPaymentAmount)}
          </p>
        </div>

        <div className='mt-4'>
          <LinkButton
            className='px-6'
            variant='default'
            href={`/account/history/${payment.id}`}
          >
            Ver detalles
          </LinkButton>
        </div>
      </div>

      <PaymentStatusBadge status={status} />
    </li>
  )
}
