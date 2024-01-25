'use client'

import { useEffect } from 'react'

interface Props {
  isOpen: boolean
  close: () => void
}

export default function ModalBackground (
  { close, isOpen }: Props
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
      className={`fixed inset-0 z-40 bg-black/50 transition-opacity ${
        isOpen ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'
      }`}
      aria-hidden="true"
    />
  )
}
