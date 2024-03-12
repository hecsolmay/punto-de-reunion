'use client'

import { CleanCartButton } from '@/components/carts/actions'
import { CartItem } from '@/components/carts/item'
import { cn } from '@/libs/cn'
import { type CartItem as CartItemType } from '@/types/services'
import { Trash } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

interface Props {
  carts: CartItemType[]
  className?: string
}

export default function ListOfCarts ({ carts, className }: Props) {
  const [cartsState, setCartsState] = useState(carts)
  const [isLoading, setIsLoading] = useState(false)
  const initialState = useRef(carts)

  useEffect(() => {
    setCartsState(carts)
    initialState.current = carts
  }, [carts])

  const handleRemove = (cartId: string) => async () => {
    setIsLoading(true)
    const newCarts = cartsState.filter(cart => cart.id !== cartId)

    // if (timesRemoved > 0) {
    //   setCartsState(newCarts)
    //   await new Promise(resolve => setTimeout(resolve, 2000))
    //   toast.error('No se puede borrar dos cartas a la vez')
    //   setCartsState(initialState.current)
    //   return
    // }

    setCartsState(newCarts)
    initialState.current = newCarts
    setIsLoading(false)
  }

  return (
    <>
      <div className={cn('flex flex-col gap-4', className)}>
        {cartsState.map(cart => (
          <CartItem handleRemove={handleRemove(cart.id)} key={cart.id} item={cart} />
        ))}
      </div>
      <div className='px-4'>
        <CleanCartButton disabled={isLoading} className='mt-4 w-full gap-2'>
          <Trash className='size-[1.25rem]' /> Vaciar toda la canasta
        </CleanCartButton>
      </div>
    </>
  )
}
