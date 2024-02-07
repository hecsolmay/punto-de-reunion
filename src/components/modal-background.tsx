'use client'

import { cn } from '@/libs/cn'
import { useEffect } from 'react'

interface Props {
  isOpen: boolean
  close: () => void
  className?: string
}

export default function ModalBackground (
  { close, isOpen, className }: Props
) {
  useEffect(() => {
    if (isOpen) {
      document.querySelector('body')?.classList.add('overflow-y-hidden')
    }

    return () => {
      document.querySelector('body')?.classList.remove('overflow-y-hidden')
    }
  }, [isOpen])

  const handleClose = () => {
    document.querySelector('body')?.classList.remove('overflow-y-hidden')
    close()
  }

  return (
    <div
      onClick={handleClose}
      className={cn(
        'fixed inset-0 z-40 bg-black/50 transition-opacity',
        isOpen ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0',
        className
      )}
      aria-hidden="true"
    />
  )
}
