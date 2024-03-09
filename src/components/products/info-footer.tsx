'use client'

import { addToCart } from '@/actions/cart'
import Button from '@/components/buttons/button'
import LinkButton from '@/components/buttons/link-button'
import { MAX_QUANTITY_ADD_TO_CART } from '@/constants'
import useModalProduct from '@/hooks/use-modal-product'
import { cn } from '@/libs/cn'
import { toast } from '@/libs/sonner'
import { Minus, Plus } from 'lucide-react'
import { usePathname, useSearchParams } from 'next/navigation'
import { useState } from 'react'

interface Props {
  disabled?: boolean
  productId?: string
  maxQuantity?: number
  price?: number
  userId?: string
  className?: string
}

export default function InfoFooter ({
  disabled = false,
  maxQuantity = MAX_QUANTITY_ADD_TO_CART,
  price = 0,
  productId = '',
  userId,
  className
}: Props) {
  const searchParams = useSearchParams()
  const pathName = usePathname()

  if (userId === undefined) {
    const href = `/login?next=${encodeURIComponent(`${pathName}?${searchParams.toString()}`)}`

    return (
      <footer className={cn('flex h-20 flex-row items-center justify-end gap-4', className)}>
        <div>
          <LinkButton href={href} className='h-11 w-fit py-2 font-medium'>
            Inicia Session para agregar al carrito
          </LinkButton>
        </div>
      </footer>
    )
  }

  const [count, setCount] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const { close } = useModalProduct()

  const handleAdd = () => {
    if (disabled) return

    if (count < maxQuantity) {
      setCount(count + 1)
      return
    }

    toast.error('No se puede agregar mas de ' + maxQuantity + ' productos por carrito', {
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

  const handleAddToCart = async () => {
    if (disabled || count === 0 || isLoading) return

    setIsLoading(true)
    try {
      const response = await addToCart({ productId, quantity: count })

      if (!response.success) {
        toast.error(response.error)
        return
      }

      toast.success('Agregado al carrito')
      close({ scroll: false })
    } catch (error) {
      toast.error('Error al agregar al carrito')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <footer className={cn('flex h-20 flex-row items-center justify-end gap-4', className)}>
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
        <Button loading={isLoading} onClick={handleAddToCart} disabled={count === 0} className='inline-flex h-11 w-full flex-1 justify-between py-2 font-medium md:w-fit md:flex-none'>
          <span className='inline-block'>Agregar <span className='mr-3 hidden md:inline'>al carrito</span></span>
          <span className='inline-block'>{formattedTotalToPay}</span>
        </Button>
      </div>

    </footer>
  )
}
