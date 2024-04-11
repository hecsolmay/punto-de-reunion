import LinkButton from '@/components/buttons/link-button'
import { CircleDollarSign } from 'lucide-react'

export function EmptyListOfPayments () {
  return (
    <div className='grid h-full place-content-center gap-3 text-center'>
      <div className='mx-auto'>
        <CircleDollarSign className='text-red-500 dark:text-red-600' size={64}/>
      </div>
      <h2 className='text-3xl font-semibold text-gray-600 dark:text-gray-300'>Whoops</h2>
      <p className='text-pretty opacity-85'>Aun no has realizado ningún pago</p>
      <LinkButton href='/products'>Explora nuestros productos</LinkButton>
    </div>
  )
}
