'use client'

import { useAppContext } from '@/context/utils'
import UseProductParams from '@/hooks/use-value-param'
import Link from 'next/link'
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
  const { setProductModal } = useAppContext()

  const handleClick = () => {
    setProductModal(true)
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
