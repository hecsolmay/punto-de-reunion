'use client'

import Link from 'next/link'
import { usePathname, useSearchParams } from 'next/navigation'

interface Props {
  className?: string
  children?: React.ReactNode
}

export default function LoginLink ({ children, className }: Props) {
  const pathName = usePathname()
  const searchParams = useSearchParams()

  const loginHref = `/login?next=${encodeURIComponent(`${pathName}?${searchParams.toString()}`)}`

  return (
    <Link href={loginHref} className={className} >
      {children}
    </Link>
  )
}
