'use client'

import { deleteCartById } from '@/actions/cart'
import { ProductCartItem } from '@/components/carts/product'
import { CardSidebarLink } from '@/components/links'
import { useAppContext } from '@/context/utils'
import { cn } from '@/libs/cn'
import { toast } from '@/libs/sonner'
import { type CartItem as CartItemType } from '@/types/services'
import { ChevronDown, Trash } from 'lucide-react'
import { useState } from 'react'

interface CartItemProps {
  item: CartItemType
  handleRemove?: () => void
  cartId: string
  disabled?: boolean
  changeCartQuantity: ({
    cartId,
    quantity,
    itemId
  }: {
    cartId: string
    quantity: number
    itemId: string
  }) => void
  resetInitialState: () => void
  removeCartItem: (cartId: string, itemId: string) => void
}

export function CartItem ({
  item,
  handleRemove,
  disabled = false,
  changeCartQuantity,
  resetInitialState,
  removeCartItem,
  cartId
}: CartItemProps) {
  const [isOpen, setIsOpen] = useState(true)
  const { isCartActionLoading, setIsCartActionLoading } = useAppContext()

  const { organization, items } = item

  const totalQuantity = items.reduce((acc, item) => acc + item.quantity, 0)

  const handleClick = () => {
    setIsOpen(prev => !prev)
  }

  const removeCart = async () => {
    if (isCartActionLoading) return

    setIsCartActionLoading(true)

    try {
      const response = await deleteCartById(cartId)

      if (!response.success) {
        toast.error('Error al borrar el carrito')
        return
      }

      handleRemove?.()
    } catch (error) {
      resetInitialState()
    } finally {
      setIsCartActionLoading(false)
    }
  }

  const totalToPay = items.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  )
  return (
    <div className='border-y border-gray-200 dark:border-white/70'>
      {/* HEADER */}
      <div
        onClick={handleClick}
        className='relative flex w-full gap-3 px-4 py-2 '
      >
        {/* IMAGE */}
        <div className='size-10'>
          <img
            src={organization.imageUrl}
            alt={`Imagen de la organización ${organization.name}`}
            className='h-full rounded-full object-cover object-center'
          />
        </div>

        {/* NAME */}

        <div className='flex flex-col gap-1 pl-4'>
          <h1 className='text-lg font-bold'>{organization.name}</h1>
          <CardSidebarLink
            href={`/organizations/${organization.id}`}
            className='text-sm text-primary dark:text-primary-dark'
          >
            Volver a la tienda
          </CardSidebarLink>
        </div>

        {/* ACCORDION ACTIONS */}
        <div className='absolute right-4 top-4 flex justify-start gap-1'>
          <span className='inline-block size-5 rounded-full bg-gray-300  text-center text-sm dark:bg-white/95 dark:text-black'>
            {totalQuantity > 99 ? '99+' : totalQuantity}
          </span>
          <button>
            <ChevronDown
              className={cn(
                'size-5 transition-transform duration-200',
                isOpen && 'rotate-180'
              )}
            />
          </button>
        </div>

        <div></div>
      </div>

      {/* ITEMS */}

      <div
        className={cn(
          'transition-all mb-4 divide-y overflow-y-hidden duration-200 border-t border-gray-200 dark:border-white/90',
          isOpen ? 'h-auto' : 'h-0'
        )}
      >
        {item.items.map(item => (
          <ProductCartItem
            key={item.id}
            product={item.product}
            quantity={item.quantity}
            itemId={item.id}
            disabled={disabled}
            onQuantityChange={quantity => {
              changeCartQuantity({
                cartId: item.cartId,
                quantity,
                itemId: item.id
              })
            }}
            onError={() => {
              resetInitialState()
            }}
            onDelete={() => {
              removeCartItem(item.cartId, item.id)
            }}
          />
        ))}
      </div>

      <div className='sticky -bottom-4 flex gap-1 border-t-2 border-gray-200 bg-white p-4 dark:border-white/70 dark:bg-accent-dark'>
        <button disabled={disabled} onClick={removeCart} className='flex size-10 items-center justify-center  rounded-full transition hover:bg-gray-200 hover:opacity-90 disabled:cursor-default disabled:opacity-50 dark:hover:bg-contrast-dark'>
          <Trash className='size-5' />
        </button>
        <CardSidebarLink
          disabled={disabled}
          className='w-full flex-1 gap-2'
          href={`/checkout/${cartId}`}
          defaultButtonStyle='default'
        >
          <span className='inline-block font-bold'>Ir a pagar:</span>{' '}
          <p>
            Subtotal:{' '}
            <span className='inline-block font-bold'>
              {totalToPay.toLocaleString('es-MX', {
                style: 'currency',
                currency: 'MXN'
              })}
            </span>{' '}
          </p>
        </CardSidebarLink>
      </div>
    </div>
  )
}
