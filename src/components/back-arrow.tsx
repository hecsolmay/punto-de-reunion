'use client'

import Arrow from '@/components/icons/arrow'
import { useRouter } from 'next/navigation'

export default function BackArrowButton (
  { className }: { className?: string }
) {
  const router = useRouter()

  const handleClick = () => {
    router.replace('/')
  }
  return (
    <button className={className} onClick={handleClick}>
      <Arrow />
    </button>
  )
}
