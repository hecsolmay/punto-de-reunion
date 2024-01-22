'use client'

import UseProductParams from '@/hooks/use-value-param'
import { useRouter } from 'next/navigation'

interface Props {
  productId: string
  className?: string
  children?: React.ReactNode
  scroll?: boolean
}

export default function ProductRedirect (
  { children, className, productId, scroll }: Props
) {
  const router = useRouter()
  const { params, addParam, pathname } = UseProductParams('productId')

  const handleClick = () => {
    addParam('productId', productId)
    router.push(`${pathname}?${params.toString()}`, {
      scroll
    })
  }

  return (
    <div className={className} onClick={handleClick}>
      {children}
    </div>
  )
}
