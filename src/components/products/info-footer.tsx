'use client'

import Button from '@/components/buttons/button'
import { MAX_QUANTITY_ADD_TO_CART } from '@/constants'
import useModalProduct from '@/hooks/use-modal-product'
import { toast } from '@/libs/sonner'
import { Minus, Plus } from 'lucide-react'
import { useState } from 'react'

interface Props {
  disabled?: boolean
  productId?: string
  maxQuantity?: number
  price?: number
}

export default function InfoFooter ({
  disabled = false,
  maxQuantity = MAX_QUANTITY_ADD_TO_CART,
  price = 0,
  productId = ''
}: Props) {
  const [count, setCount] = useState(0)
  const { close } = useModalProduct()

  const handleAdd = () => {
    if (disabled) return

    if (count < maxQuantity) {
      setCount(count + 1)
      return
    }

    toast.error('No se puede agregar mas de ' + maxQuantity + ' productos', {
      duration: 1500
    })
  }

  const handleRemove = () => {
    if (disabled) return

    if (count > 0) {
      setCount(count - 1)
    }
  }

  const totalToPay = price * count

  // Formatear como precio mx
  const formattedTotalToPay = totalToPay.toLocaleString('es-MX', {
    style: 'currency',
    currency: 'MXN'
  })

  // TODO: ADD HANDLE ADD TO CART

  const handleAddToCart = () => {
    if (disabled || count === 0) return

    close({ scroll: false })
  }

  const handleAddAndPay = () => {
    if (disabled || count === 0) return

    close({ scroll: false })
  }

  return (
    <footer className='flex h-20 flex-row items-center justify-between gap-4 border-t border-slate-300 p-5 px-4 dark:border-slate-700'>
      {/* COUNTER */}
      <div className='flex items-center gap-2 rounded-lg border border-neutral-400 p-2 text-accent-dark dark:border-white dark:text-white '>
        <button onClick={handleRemove} className='px-0.5 md:px-1' type='button'>
          <Minus />
        </button>
        <span className='inline-block w-8 select-none text-center text-xl md:w-12'>{count}</span>
        <button onClick={handleAdd} className='px-0.5 md:px-1' type='button'>
          <Plus />
        </button>
      </div>

      <div className='flex flex-1 flex-row items-center justify-end gap-4'>
        <Button onClick={handleAddToCart} disabled={count === 0} className='hidden h-11 py-2 font-medium md:block'>
          Agregar y seguir comprando
        </Button>
        <Button onClick={handleAddAndPay} disabled={count === 0} className='hidden h-11 py-2 font-medium md:block'>
          Agregar e ir a pagar <span className='inline-block min-w-14'>{formattedTotalToPay}</span>
        </Button>

        <Button onClick={handleAddToCart} disabled={count === 0} className='inline-flex h-11 w-full flex-1 justify-between py-2 font-medium md:hidden'>
          <span className='inline-block'>Agregar</span>
          <span className='inline-block'>{formattedTotalToPay}</span>
        </Button>
      </div>

    </footer>
  )
}
