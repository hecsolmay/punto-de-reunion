'use client'

import UseValueParam from '@/hooks/use-value-param'
import { useRouter } from 'next/navigation'
import XMarkIcon from '@/components/icons/xmark'
import { useAppContext } from '@/context/utils'

export default function CloseInfoButton (
  { className }: { className?: string }
) {
  const router = useRouter()
  const { removeParam, params, pathname } = UseValueParam('productId')
  const { setProductModal } = useAppContext()

  const handleClick = () => {
    setProductModal(false)
    removeParam('productId')
    router.push(`${pathname}?${params.toString()}`, {
      scroll: false
    })
  }

  return (
    <button
      className={className}
      onClick={handleClick}
    >
      <XMarkIcon />
    </button>
  )
}
