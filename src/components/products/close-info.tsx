'use client'

import XMarkIcon from '@/components/icons/xmark'
import useModalProduct from '@/hooks/use-modal-product'

export default function CloseInfoButton (
  { className }: { className?: string }
) {
  const { close } = useModalProduct()

  const handleClick = () => {
    close({ scroll: false })
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
