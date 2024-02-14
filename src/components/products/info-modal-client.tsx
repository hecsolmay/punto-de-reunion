'use client'

import ModalBackground from '@/components/modal-background'
import { useAppContext } from '@/context/utils'
import UseValueParam from '@/hooks/use-value-param'
import { useRouter } from 'next/navigation'

interface Props {
  children?: React.ReactNode
}

export default function ProductoInfoModal ({ children }: Props) {
  const { params, value: productId, pathname, removeParam } = UseValueParam('productId')
  const router = useRouter()
  const { showProductModal, setProductModal } = useAppContext()

  const handleClose = () => {
    setProductModal(false)
    removeParam('productId')
    router.push(`${pathname}?${params.toString()}`, {
      scroll: false
    })
  }

  const show = showProductModal || productId !== null

  if (!show) return null

  return (
    show &&
    <>
      <ModalBackground close={handleClose} isOpen={show} />
      {children}
    </>
  )
}
