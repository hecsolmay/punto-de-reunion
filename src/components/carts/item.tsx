'use client'

import { CardSidebarLink } from '@/components/links'
import { cn } from '@/libs/cn'
import { type CartItem as CartItemType } from '@/types/services'
import { ChevronDown } from 'lucide-react'
import { useState } from 'react'

interface CartItemProps {
  item: CartItemType
  handleRemove?: () => void
}

export function CartItem ({ item, handleRemove }: CartItemProps) {
  const [isOpen, setIsOpen] = useState(true)

  const { organization, items } = item

  const totalQuantity = items.reduce((acc, item) => acc + item.quantity, 0)

  const handleClick = () => {
    setIsOpen(prev => !prev)
  }

  return (
    <div className='border-y border-gray-200 dark:border-white/70'>
      {/* HEADER */}
      <div onClick={handleClick} className='relative flex w-full gap-2 px-4 py-2 '>
        {/* IMAGE */}
        <div className='size-10'>
          <img src={organization.imageUrl} alt={`Imagen de la organización ${organization.name}`} className='h-full rounded-full object-cover object-center' />
        </div>

        {/* NAME */}

        <div className='flex flex-col gap-1'>
          <h1 className='text-lg font-bold'>{organization.name}</h1>
          <CardSidebarLink href={`/organizations/${organization.id}`} className='text-sm text-primary dark:text-primary-dark'>
            Volver a la tienda
          </CardSidebarLink>
        </div>

        {/* ACCORDION ACTIONS */}
        <div className='absolute right-4 top-4 flex justify-start gap-1'>
          <span className='inline-block size-5 rounded-full bg-gray-300  text-center text-sm dark:bg-white/95 dark:text-black'>
            {totalQuantity > 99 ? '99+' : totalQuantity}
          </span>
          <button><ChevronDown className={cn('size-5 transition-transform duration-200', isOpen && 'rotate-180')} /></button>
        </div>

        <div>

        </div>
      </div>

      {/* ITEMS */}

      <div className={cn('transition-all duration-200 border-t border-gray-200 dark:border-white/90', isOpen ? 'h-32' : 'h-0')}>

      </div>
    </div>
  )
}
