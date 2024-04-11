import { type PaymentStatus } from '@prisma/client'
import { CheckCircle } from 'lucide-react'

interface PaymentStatusBadgeProps {
  status: PaymentStatus
}

export default function PaymentStatusBadge ({ status }: PaymentStatusBadgeProps) {
  if (status === 'CANCELLED') {
    // TODO: handle CANCELLED payment
    return null
  }

  if (status === 'PENDING') {
    // TODO: handle PENDING payment
    return null
  }

  return (
    <div className='flex w-fit items-center justify-center gap-2 pl-2 text-sm font-medium text-green-500 dark:text-green-400'>
      <span>Pedido completado</span>
      <CheckCircle size={16} />
    </div>
  )
}
