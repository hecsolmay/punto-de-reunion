'use client'

import ShoppingCartIcon from '@/components/icons/cart'
import XMarkIcon from '@/components/icons/xmark'
import ModalBackground from '@/components/modal-background'
import { useAppContext } from '@/context/utils'
import { cn } from '@/libs/cn'

interface Props {
  children?: React.ReactNode
  showCount?: boolean
  count?: number
  title?: string
}

export default function CartButton ({ children, showCount = false, count = 0, title = 'Mi canasta' }: Props) {
  const { showCartSidebar: isOpen, setShowCartSidebar } = useAppContext()

  const close = () => {
    setShowCartSidebar(false)
  }

  const open = () => {
    setShowCartSidebar(true)
  }

  return (
    <>
      <button onClick={open} className='relative size-7'>
        {showCount && (
          <span className='absolute -top-1 right-0 animate-zoom-in rounded-full bg-contrast px-1 text-xs text-background animate-duration-150 dark:bg-contrast-dark'>
            {count}
          </span>
        )}
        <ShoppingCartIcon />
      </button>
      {isOpen && <ModalBackground close={close} isOpen={isOpen} />}
      <aside
        className={cn(
          'fixed right-0 top-0 flex flex-col gap-2 z-50 h-dvh w-[95vw] md:w-[50vw] lg:w-[30vw] bg-white transition-all duration-500  dark:bg-accent-dark',
          isOpen
            ? 'translate-x-0 ease-in-out'
            : 'translate-x-[100%] ease-in-out'
        )}
      >
        <header className='flex items-center justify-between border-b border-gray-300 p-4 dark:border-white'>
          <h3 className='text-xl font-bold'>{title}</h3>
          <button onClick={close}> <XMarkIcon /></button>
        </header>
        {children}
      </aside>
    </>
  )
}
