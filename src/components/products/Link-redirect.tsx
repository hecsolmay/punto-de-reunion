'use client'

import { useAppContext } from '@/context/utils'
import useModalProduct from '@/hooks/use-modal-product'
import { cn } from '@/libs/cn'
import Link from 'next/link'

interface Props {
  productId: string
  className?: string
  children?: React.ReactNode
  scroll?: boolean
  disabled?: boolean
}

export default function ProductRedirect (
  { children, className, productId, scroll, disabled = false }: Props
) {
  const { open } = useModalProduct()

  const handleClick = () => {
    if (disabled) return
    open(productId, { scroll })
  }

  return (
    <div className={cn(className, disabled && 'pointer-events-none')} onClick={handleClick}>
      {children}
    </div>
  )
}

interface OrganizationLinkProps {
  organizationId: string
  imageUrl: string
  name: string
}

export function OrganizationLink ({ imageUrl, name, organizationId }: OrganizationLinkProps) {
  const { setProductModal } = useAppContext()

  const handleClick = () => {
    setProductModal(false)
  }

  return (
    <Link onClick={handleClick} href={`/organizations/${organizationId}`}>
      <img
        className='size-10 rounded-full object-cover'
        src={imageUrl}
        alt={`Logo de la organización ${name}`}
      />
    </Link>
  )
}
