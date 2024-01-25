'use client'

import ModalBackground from '@/components/modal-background'
import UseValueParam from '@/hooks/use-value-param'
import { useRouter } from 'next/navigation'

export default function ProductoInfoModal () {
  const { params, value: productId, pathname, removeParam } = UseValueParam('productId')
  const router = useRouter()

  const handleClose = () => {
    removeParam('productId')
    router.push(`${pathname}?${params.toString()}`, {
      scroll: false
    })
  }

  return (productId !== null && <ModalBackground close={handleClose} isOpen={productId !== null} />)
}
