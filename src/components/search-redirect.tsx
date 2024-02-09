'use client'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useState } from 'react'
import { useDebouncedCallback } from 'use-debounce'
import InputSearch from '@/components/inputs/input-search'

interface Props {
  className?: string
  placeholder?: string
  inputClassName?: string
  redirectTo?: string
  searchKey?: string
}

const WAIT_BETWEEN_CHANGE = 300

export default function SearchRedirect ({
  className,
  inputClassName,
  redirectTo = '/products',
  searchKey = 'search',
  placeholder
}: Props) {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const [value, setValue] = useState(searchParams.get(searchKey) ?? '')
  const router = useRouter()

  const handleSearch = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams)
    const value = term.trim()
    if (value !== '') {
      params.set(searchKey, value)
    } else {
      params.delete(searchKey)
    }

    router.replace(`${pathname}?${params.toString()}`, {
      scroll: false
    })
  }, WAIT_BETWEEN_CHANGE)

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target
    setValue(value)
    handleSearch(value)
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (value === '') return

    router.push(`${redirectTo}?search=${value}`)
  }

  const clearSearch = () => {
    setValue('')
    const params = new URLSearchParams(searchParams)
    params.delete(searchKey)
    router.replace(`${pathname}?${params.toString()}`, {
      scroll: false
    })
  }

  return (
    <InputSearch
      placeholder={placeholder ?? 'Buscar...'}
      value={value}
      onChange={handleChange}
      onSubmit={handleSubmit}
      onClear={clearSearch}
      className={className}
      inputClassName={inputClassName}
    />
  )
}
