'use client'

import { toast } from '@/libs/sonner'
import { type ProductCartType } from '@/types/services'
import { Minus, Plus, Trash } from 'lucide-react'
import { useEffect, useState } from 'react'

interface Props {
  product: ProductCartType
  quantity: number
  itemId: string
}

export function ProductCartItem ({ product, quantity, itemId }: Props) {
  const { name, price, images } = product
  const [currentQuantity, setCurrentQuantity] = useState(quantity)

  useEffect(() => {
    setCurrentQuantity(quantity)
  }, [quantity])

  const handleClick = (type: 'increase' | 'decrease') => () => {
    const newQuantity = type === 'increase' ? currentQuantity + 1 : currentQuantity - 1

    if (newQuantity > product.maxQuantityByCart) {
      toast.error(`No se puede agregar más de ${product.maxQuantityByCart} unidades a la vez`)
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
  }

  const handleDelete = () => {
    // TODO: delete product from cart
    // itemId
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
              <button onClick={handleClick('decrease')}>
                <Minus className='size-5' />
              </button>
            )}

            {currentQuantity === 1 && (
              <button onClick={handleDelete} >
                <Trash className='size-5' />
              </button>
            )}
            <span className='min-w-[4ch] text-center text-base font-medium'>
              {quantityText}
            </span>
            <button onClick={handleClick('increase')}>
              <Plus className='size-5' />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
