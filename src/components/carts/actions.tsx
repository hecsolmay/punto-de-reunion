'use client'

import Button from '@/components/buttons/button'
import { useState } from 'react'

interface CleanCartButtonProps {
  className?: string
  children?: React.ReactNode
  disabled?: boolean
}

export function CleanCartButton ({ className, children, disabled }: CleanCartButtonProps) {
  const [isLoading, setIsLoading] = useState(false)

  const handleClick = async () => {
    if (isLoading) return

    setIsLoading(true)

    // TODO: Implement CLEAN CART ACTION
    await new Promise(resolve => setTimeout(resolve, 2000))
    setIsLoading(false)
  }

  return (
    <Button
      onClick={handleClick}
      loading={isLoading}
      variant='alternative'
      disabled={disabled}
      className={className}
    >
      {children}
    </Button>
  )
}
