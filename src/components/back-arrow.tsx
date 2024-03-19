'use client'

import { useRouter } from 'next/navigation'

interface Props {
  className?: string
  children?: React.ReactNode
}

export default function RouterBackButton (
  { className, children }: Props
) {
  const router = useRouter()

  const handleClick = () => {
    router.back()
  }
  return (
    <button className={className} onClick={handleClick}>
      {children}
    </button>
  )
}
