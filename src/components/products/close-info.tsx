'use client'

import UseValueParam from '@/hooks/use-value-param'
import { useRouter } from 'next/navigation'
import XMarkIcon from '@/components/icons/xmark'

export default function CloseInfoButton (
  { className }: { className?: string }
) {
  const router = useRouter()
  const { removeParam, params, pathname } = UseValueParam('productId')

  const handleClick = () => {
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
