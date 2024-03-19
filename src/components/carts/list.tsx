'use client'

import { CleanCartButton } from '@/components/carts/actions'
import { CartItem } from '@/components/carts/item'
import { EmptySidebarCart } from '@/components/empty-states/carts'
import { CardSidebarLink } from '@/components/links'
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
  const { isCartActionLoading } = useAppContext()
  const initialState = useRef(carts)

  useEffect(() => {
    setCartsState(carts)
    initialState.current = carts
  }, [carts])

  const handleRemove = (cartId: string) => () => {
    const newCarts = cartsState.filter(cart => cart.id !== cartId)
    setCartsState(newCarts)
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

  if (cartsState.length === 0) {
    return (
      <EmptySidebarCart text='Aún no tienes productos en tu canasta'>
        <CardSidebarLink
          className='w-52 text-center'
          defaultButtonStyle='alternative'
        >
            Comenzar a comprar
        </CardSidebarLink>
      </EmptySidebarCart>
    )
  }

  return (
    <main className='flex-1 flex-col justify-between overflow-y-auto overflow-x-clip py-4 scrollbar-thin scrollbar-white dark:scrollbar-dark'>
      <div className={cn('flex flex-col gap-4', className)}>
        {cartsState.map(cart => (
          <CartItem
            disabled={isCartActionLoading}
            handleRemove={handleRemove(cart.id)}
            key={cart.id}
            cartId={cart.id}
            item={cart}
            changeCartQuantity={changeQuantityItem}
            resetInitialState={resetInitialState}
            removeCartItem={removeCartItem}
          />
        ))}
      </div>
      <div className='mt-2 px-4'>
        <CleanCartButton
          disabled={isCartActionLoading}
          cleanCart={cleanCart}
          className='mt-4 w-full gap-2'
        >
          <Trash className='size-[1.25rem]' /> Vaciar toda la canasta
        </CleanCartButton>
      </div>
    </main>
  )
}
