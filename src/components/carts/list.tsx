'use client'

import { CleanCartButton } from '@/components/carts/actions'
import { CartItem } from '@/components/carts/item'
import { useAppContext } from '@/context/utils'
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
  const { isCartActionLoading, setIsCartActionLoading } = useAppContext()
  const initialState = useRef(carts)

  useEffect(() => {
    setCartsState(carts)
    initialState.current = carts
  }, [carts])

  const handleRemove = (cartId: string) => async () => {
    if (isCartActionLoading) return

    setIsCartActionLoading(true)
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
    setIsCartActionLoading(false)
  }

  const changeQuantityItem = ({
    cartId,
    quantity,
    itemId
  }: {
    cartId: string
    quantity: number
    itemId: string
  }) => {
    const newCarts = cartsState.map(cart => {
      if (cart.id === cartId) {
        return {
          ...cart,
          items: cart.items.map(item => {
            if (item.id === itemId) {
              return {
                ...item,
                quantity
              }
            }
            return item
          })
        }
      }
      return cart
    })
    setCartsState(newCarts)
  }

  const resetInitialState = () => {
    setCartsState(initialState.current)
  }

  const removeCartItem = (cartId: string, itemId: string) => {
    const cart = cartsState.find(cart => cart.id === cartId)

    if (cart === undefined) return

    const item = cart.items.find(item => item.id === itemId)

    if (item === undefined) return

    const newCarts = cartsState.map(cart => {
      if (cart.id === cartId) {
        const newItems = cart.items.filter(item => item.id !== itemId)

        if (newItems.length === 0) {
          return null
        }

        return {
          ...cart,
          items: cart.items.filter(item => item.id !== itemId)
        }
      }
      return cart
    })

    setCartsState(newCarts.filter(Boolean) as CartItemType[])
  }

  const cleanCart = () => {
    setCartsState([])
  }

  return (
    <>
      <div className={cn('flex flex-col gap-4', className)}>
        {cartsState.map(cart => (
          <CartItem
            disabled={isCartActionLoading}
            handleRemove={handleRemove(cart.id)}
            key={cart.id}
            item={cart}
            changeCartQuantity={changeQuantityItem}
            resetInitialState={resetInitialState}
            removeCartItem={removeCartItem}
          />
        ))}
      </div>
      <div className='px-4'>
        <CleanCartButton
          disabled={isCartActionLoading}
          cleanCart={cleanCart}
          className='mt-4 w-full gap-2'
        >
          <Trash className='size-[1.25rem]' /> Vaciar toda la canasta
        </CleanCartButton>
      </div>
    </>
  )
}
