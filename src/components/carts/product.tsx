'use client'

import { deleteCartItem, updateCartItemQuantity } from '@/actions/items'
import { useAppContext } from '@/context/utils'
import { cn } from '@/libs/cn'
import { toast } from '@/libs/sonner'
import { type ProductCartType } from '@/types/services'
import { Minus, Plus, Trash } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useDebouncedCallback } from 'use-debounce'

interface Props {
  product: ProductCartType
  quantity: number
  itemId: string
  disabled?: boolean
  onQuantityChange?: (quantity: number) => void
  onError?: () => void
  onDelete?: (itemId: string) => void
}

const WAIT_DELAY_TIME = 500

export function ProductCartItem ({
  product,
  quantity,
  itemId,
  disabled = false,
  onQuantityChange,
  onError,
  onDelete
}: Props) {
  const { name, price, images } = product
  const [currentQuantity, setCurrentQuantity] = useState(quantity)
  const { isCartActionLoading, setIsCartActionLoading } = useAppContext()

  useEffect(() => {
    setCurrentQuantity(quantity)
  }, [quantity])

  const handleClick = (type: 'increase' | 'decrease' | 'delete') => () => {
    if (isCartActionLoading) return

    if (type === 'delete') {
      handleDelete()
      handleUpdate(0)
      return
    }

    const newQuantity =
      type === 'increase' ? currentQuantity + 1 : currentQuantity - 1

    if (newQuantity > product.maxQuantityByCart) {
      toast.error(
        `No se puede agregar más de ${product.maxQuantityByCart} unidades a la vez`
      )
      return
    }

    if (newQuantity < 1) {
      return
    }

    if (type === 'increase') {
      setCurrentQuantity(prev => prev + 1)
    } else if (type === 'decrease') {
      setCurrentQuantity(prev => prev - 1)
    }

    handleUpdate(newQuantity)
    onQuantityChange?.(newQuantity)
  }

  const handleUpdate = useDebouncedCallback(async (newQuantity: number) => {
    if (isCartActionLoading) return

    if (newQuantity < 1) {
      return
    }

    setIsCartActionLoading(true)
    onQuantityChange?.(newQuantity)
    await new Promise(resolve => setTimeout(resolve, 2000))
    try {
      const response = await updateCartItemQuantity(itemId, newQuantity)

      if (!response.success) {
        toast.error('Error al actualizar la cantidad')
        onError?.()
      }
    } catch (error) {
      toast.error('Error al actualizar la cantidad')
      onError?.()
    } finally {
      setIsCartActionLoading(false)
    }
  }, WAIT_DELAY_TIME)

  const handleDelete = async () => {
    if (isCartActionLoading) return
    setIsCartActionLoading(true)
    onDelete?.(itemId)

    try {
      const response = await deleteCartItem(itemId)

      if (!response.success) {
        toast.error('Error al actualizar la cantidad')
        onError?.()
      }
    } catch (error) {
      toast.error('Error al actualizar la cantidad')
      onError?.()
    } finally {
      setIsCartActionLoading(false)
    }
  }

  const quantityText = currentQuantity > 99 ? '+99 U' : `${currentQuantity} U`

  const imageUrl = images[0].imageUrl
  return (
    <div className='flex h-auto w-full gap-2 p-4'>
      <div className='self-center'>
        <img
          className='size-14 object-cover'
          src={imageUrl}
          alt={`Imagen del producto ${name}`}
        />
      </div>

      <div className='flex flex-1 flex-col justify-center gap-2'>
        {/* HEADER AND INFO */}
        <div>
          <h1 className='text-pretty text-base capitalize'>{name}</h1>
          {/* TODO: ADD EXTRA ITEMS DESCRIPTION */}
        </div>

        {/* PRICE AND ACTIONS */}

        <div className='flex w-full justify-between py-3'>
          <div className='flex justify-start'>
            {/* TO LOCAL PESOS mexicanos PRICE */}
            <h1 className='text-base font-semibold'>
              {price.toLocaleString('es-MX', {
                style: 'currency',
                currency: 'MXN'
              })}
            </h1>
          </div>

          <div className='flex h-full items-center gap-1.5 rounded-xl border border-gray-200 px-2 py-1 dark:border-white/90'>
            {currentQuantity > 1 && (
              <button
                disabled={disabled}
                className={'disabled:pointer-events-none disabled:opacity-50'}
                onClick={handleClick('decrease')}
              >
                <Minus className='size-5' />
              </button>
            )}

            {currentQuantity === 1 && (
              <button
                disabled={disabled}
                className={'disabled:pointer-events-none disabled:opacity-50'}
                onClick={handleClick('delete')}
              >
                <Trash className='size-5' />
              </button>
            )}
            <span
              className={cn(
                'min-w-[4ch] text-center text-base font-medium',
                disabled && 'opacity-50 select-none'
              )}
            >
              {quantityText}
            </span>
            <button
              disabled={disabled}
              className={'disabled:pointer-events-none disabled:opacity-50'}
              onClick={handleClick('increase')}
            >
              <Plus className='size-5' />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
