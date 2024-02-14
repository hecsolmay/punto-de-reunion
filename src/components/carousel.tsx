'use client'

import { MotionDiv } from '@/components/motion'
import { cn } from '@/libs/cn'
import { useEffect, useRef, useState } from 'react'

interface Props {
  children?: React.ReactNode
  className?: string
  containerClassName?: string
  drag?: 'x' | 'y'
}

export default function Carousel ({
  children,
  className,
  containerClassName,
  drag
}: Props) {
  const [width, setWith] = useState(0)
  const carouselRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (carouselRef?.current === null) return
    const { scrollWidth, offsetWidth } = carouselRef.current
    setWith(scrollWidth - offsetWidth)
  }, [])

  return (
    <MotionDiv
      ref={carouselRef}
      whileTap={{ cursor: 'grabbing' }}
      className={cn('cursor-grab w-full overflow-hidden', containerClassName)}
    >
      <MotionDiv
        drag={drag}
        dragConstraints={{ right: 0, left: -width }}
        className={cn('inline-flex gap-6', className)}
      >
        {children}
      </MotionDiv>
    </MotionDiv>
  )
}
