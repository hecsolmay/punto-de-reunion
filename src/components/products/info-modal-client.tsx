'use client'

import ModalBackground from '@/components/modal-background'
import UseValueParam from '@/hooks/use-value-param'
import { useRouter } from 'next/navigation'

export default function ProductoInfoModal () {
  const { params, value: productId, pathname, removeParam } = UseValueParam('productId')

  if (productId === null) {
    return null
  }

  const router = useRouter()

  const handleClose = () => {
    removeParam('productId')
    router.push(`${pathname}?${params.toString()}`, {
      scroll: false
    })
  }

  return <ModalBackground close={handleClose} isOpen={productId !== null} />
}
