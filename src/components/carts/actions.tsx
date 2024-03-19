'use client'

import { deletedAllCarts } from '@/actions/cart'
import Button from '@/components/buttons/button'
import { useAppContext } from '@/context/utils'
import { toast } from 'sonner'

interface CleanCartButtonProps {
  className?: string
  children?: React.ReactNode
  disabled?: boolean
  cleanCart?: () => void
}

export function CleanCartButton ({ className, children, disabled, cleanCart }: CleanCartButtonProps) {
  const { isCartActionLoading, setIsCartActionLoading } = useAppContext()

  const handleClick = async () => {
    if (isCartActionLoading) return

    setIsCartActionLoading(true)

    try {
      const response = await deletedAllCarts()
      console.log(response)

      if (!response.success) {
        console.error('Error al vaciar el carrito')
        toast.error('Error al vaciar el carrito')
      }

      cleanCart?.()
    } catch (error) {
      toast.error('Error al vaciar el carrito')
      console.error(error)
    } finally {
      setIsCartActionLoading(false)
    }
  }

  return (
    <Button
      onClick={handleClick}
      loading={isCartActionLoading}
      variant='alternative'
      disabled={isCartActionLoading || disabled}
      className={className}
    >
      {children}
    </Button>
  )
}
