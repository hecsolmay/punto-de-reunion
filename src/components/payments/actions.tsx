import { handlePayment } from '@/actions/payments'
import Button from '@/components/buttons/button'
import { toast } from '@/libs/sonner'
import { useRouter } from 'next/navigation'

interface Props {
  cartId?: string
  children?: React.ReactNode
  className?: string
}

export function GoToPayButton ({ cartId, children, className }: Props) {
  const router = useRouter()

  const handleClick = async () => {
    try {
      const url = await handlePayment(cartId)

      if (url === undefined) {
        throw new Error('Error en el pago')
      }

      router.push(url)
    } catch (error) {
      console.error(error)
      toast.error('Error al realizar el pago')
    }
  }

  return (
    <Button onClick={handleClick} className={className}>{children}</Button>
  )
}
