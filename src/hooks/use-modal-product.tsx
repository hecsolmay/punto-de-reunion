import { useRouter } from 'next/navigation'
import UseValueParam from '@/hooks/use-value-param'
import { useAppContext } from '@/context/utils'

interface CloseOptions {
  scroll?: boolean
}

export default function useModalProduct () {
  const router = useRouter()
  const { removeParam, params, addParam, pathname } = UseValueParam('productId')
  const { setProductModal } = useAppContext()

  const close = (options: CloseOptions = { scroll: true }) => {
    const { scroll } = options

    setProductModal(false)
    removeParam('productId')
    router.push(`${pathname}?${params.toString()}`, {
      scroll
    })
  }

  const open = (productId: string, options: CloseOptions = { scroll: true }) => {
    const { scroll } = options

    setProductModal(true)
    addParam('productId', productId)
    router.push(`${pathname}?${params.toString()}`, {
      scroll
    })
  }

  return {
    close,
    open
  }
}
