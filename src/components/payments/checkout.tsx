import StarIcon from '@/components/icons/star'
import { GoToPayButton } from '@/components/payments/actions'
import { formatPriceNumber } from '@/libs/format'
import type { CartType } from '@/types/services'

interface Props {
  cart: CartType
}

export default function Checkout ({ cart }: Props) {
  const { totalToPay, items, id: cartId } = cart

  return (
    <section className='flex h-full w-full flex-col items-start gap-4 md:flex-row'>
      {/* SHOW PRODUCTS SECTION */}

      <div className='min-h-60 w-full flex-1 rounded-lg border border-gray-300 bg-white p-4 shadow-sm dark:border-contrast dark:bg-accent-dark'>
        <h1 className='mb-8 text-2xl font-semibold'>Artículos en el carrito</h1>

        <ul>
          {items.map(item => {
            const { id, product, quantity } = item
            const { name, price, images, rating, reviewCount } = product
            const { imageUrl } = images[0]

            return (
              <li key={id} className='mb-6 flex flex-row items-start gap-4'>
                <img
                  src={imageUrl}
                  alt={`Imagen del producto ${name}`}
                  className='size-24 rounded-md object-cover'
                />
                <div className='w-full flex-1 space-y-2'>
                  <h2 className='text-lg font-semibold'>{name}</h2>

                  <div className='flex gap-x-2'>
                    <StarIcon className='text-yellow-400 dark:text-yellow-500' fill='currentColor' />
                    <span className='text-normal font-medium'>{rating.toFixed(1)}</span>
                    <span className='text-normal font-medium text-gray-400 dark:text-slate-400'>{reviewCount} reseñas</span>
                  </div>

                  <p className='text-normal text-end font-medium'>
                    <span className='text-gray-400 dark:text-slate-400'>
                      {quantity}
                    </span>{' '}
                    x {formatPriceNumber(price)}
                  </p>
                </div>
              </li>
            )
          })}
        </ul>
      </div>

      {/* PAYMENT INFO SECTION */}

      <div className='h-fit w-full md:top-0 md:min-h-32 md:w-1/3'>
        <div className='w-full rounded-lg border border-gray-300 bg-white py-4 shadow-sm dark:border-contrast dark:bg-accent-dark'>
          <h2 className='px-4 text-2xl font-semibold'>Detalles de la orden</h2>

          <hr className='mb-4 mt-2' />

          <CheckoutPaymentCard
            discount={0}
            subtotal={totalToPay}
            total={totalToPay}
          />
        </div>
        <GoToPayButton cartId={cartId} className='mt-4 w-full'>
          Ir a pagar
        </GoToPayButton>
      </div>
    </section>
  )
}

function CheckoutPaymentCard ({
  discount,
  subtotal,
  total
}: {
  total: number
  discount: number
  subtotal: number
}) {
  return (
    <ul className='space-y-2 px-4'>
      <li className='flex items-start justify-between'>
        <span className='text-base text-gray-400 dark:text-slate-400'>
          Subtotal
        </span>
        <span className='text-base font-medium text-black/90 dark:text-white'>
          {formatPriceNumber(subtotal)}
        </span>
      </li>
      <li className='flex items-start justify-between'>
        <span className='text-base text-gray-400 dark:text-slate-400'>
          Descuento
        </span>
        <span className='text-base font-medium text-black/90 dark:text-white'>
          {formatPriceNumber(discount)}
        </span>
      </li>
      <li className='mt-4 flex items-start justify-between'>
        <span className='text-lg font-bold text-black/90 dark:text-white'>
          Total
        </span>
        <span className='text-base font-bold text-black/90 dark:text-white'>
          {formatPriceNumber(total)}
        </span>
      </li>
    </ul>
  )
}
