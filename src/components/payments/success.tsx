'use client'

import LinkButton from '@/components/buttons/link-button'
import CanvasConfetti from 'canvas-confetti'
import { useEffect } from 'react'

interface Props {
  text?: string
}

export default function SuccessPayment ({ text = 'Compra realizada con éxito' }: Props) {
  useEffect(() => {
    CanvasConfetti()
  }, [])

  return (
    <div className="flex h-full flex-1 flex-col items-center justify-center gap-6">
      <span className="text-9xl">
        🎉
      </span>
      <h1 className="text-pretty text-2xl font-bold">{text}</h1>
      <LinkButton href="/">Volver a la tienda</LinkButton>
    </div>
  )
}
