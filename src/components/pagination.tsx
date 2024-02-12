'use client'

import Arrow from '@/components/icons/arrow'
import { cn } from '@/libs/cn'
import { generatePagination } from '@/libs/utils'
import Link from 'next/link'
import { usePathname, useSearchParams } from 'next/navigation'

interface Info {
  currentPage: number
  total: number
  pages: number
  hasNext: boolean
  hasPrev: boolean
}

interface Props {
  info: Info
  className?: string
}

export default function Pagination ({
  className,
  info
}: Props) {
  const { hasNext, hasPrev, pages: totalPages } = info
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const page = Number(searchParams.get('page') ?? '1')
  const currentPage = !isNaN(page) && Number.isInteger(page) ? page : 1

  const createPageURL = (page: string | number) => {
    const params = new URLSearchParams(searchParams)
    params.set('page', page.toString())
    return `${pathname}?${params.toString()}`
  }

  const allPages = generatePagination(currentPage, totalPages)

  return (
    <ul className={cn('inline-flex flex-nowrap justify-center gap-x-2 md:gap-x-1', className)}>

      <PaginationArrow isDisabled={!hasPrev} href={createPageURL(currentPage - 1)} direction='right' />

      {allPages.map((page, index) => {
        let position: 'first' | 'last' | 'single' | 'middle' | undefined

        if (index === 0) position = 'first'
        if (index === allPages.length - 1) position = 'last'
        if (allPages.length === 1) position = 'single'
        if (page === '...') position = 'middle'

        return (
          <PaginationNumber
            key={page}
            href={createPageURL(page)}
            page={page}
            position={position}
            isActive={currentPage === page}
          />
        )
      })}
      <PaginationArrow isDisabled={!hasNext} href={createPageURL(currentPage + 1)} direction='left' />
    </ul>
  )
}

interface PaginationNumberProps {
  page: number | string
  href: string
  position?: 'first' | 'last' | 'middle' | 'single'
  isActive: boolean
}

function PaginationNumber ({
  page,
  href,
  isActive,
  position
}: PaginationNumberProps
) {
  const className = cn(
    'flex h-10 w-10 items-center justify-center text-sm border',
    {
      'rounded-l-md': position === 'first' || position === 'single',
      'rounded-r-md': position === 'last' || position === 'single',
      'z-10 bg-gray-600 border-gray-600 dark:border-black/90 dark:bg-white/95 dark:text-black text-white': isActive,
      'hover:bg-gray-100 dark:hover:bg-accent-dark': !isActive && position !== 'middle',
      'text-gray-300 hidden sm:flex': position === 'middle'
    }
  )

  if (isActive || position === 'middle') {
    return <div className={className}>{page}</div>
  }

  return (
    <Link href={href} className={className}>
      {page}
    </Link>
  )
}

interface PaginationArrowProps {
  direction: 'left' | 'right'
  href: string
  isDisabled?: boolean
}

function PaginationArrow ({
  href,
  direction,
  isDisabled = false
}: PaginationArrowProps) {
  const className = cn(
    'flex h-10 w-10 items-center justify-center rounded-md border',
    {
      'pointer-events-none text-gray-300 dark:text-gray-600 dark:bg-accent-dark': isDisabled,
      'hover:bg-gray-100 dark:hover:bg-accent-dark': !isDisabled,
      'mr-2 md:mr-4': direction === 'left',
      'ml-2 md:ml-4': direction === 'right'
    }
  )

  const icon = direction === 'left' ? (<Arrow className='w-4' rotate />) : (<Arrow className='w-4' />)

  if (isDisabled) {
    return <div className={className}>{icon}</div>
  }

  return (
    <Link className={className} href={href}>
      {icon}
    </Link>
  )
}
