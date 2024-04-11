'use client'

import { savePaymentRegister } from '@/actions/payments'
import LinkButton from '@/components/buttons/link-button'
import { type Transaction } from '@/types'
import CanvasConfetti from 'canvas-confetti'
import { useEffect } from 'react'

interface Props {
  text?: string
  transaction: Transaction
  executeAction?: boolean
}

export default function SuccessPayment ({ text = 'Compra realizada con éxito', transaction, executeAction = false }: Props) {
  useEffect(() => {
    CanvasConfetti()

    if (executeAction) {
      savePaymentRegister(transaction)
    }
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
