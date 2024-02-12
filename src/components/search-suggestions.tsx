'use client'

import { searchProducts } from '@/actions/products'
import InputSearch from '@/components/inputs/input-search'
import ModalBackground from '@/components/modal-background'
import SearchResults from '@/components/search-results'
import { type ProductsSearch } from '@/types/actions'
import { useRouter } from 'next/navigation'
import { useRef, useState } from 'react'
import { useDebouncedCallback } from 'use-debounce'

interface Props {
  className?: string
}

const WAIT_BETWEEN_CHANGE = 300

export default function SearchSuggestions (
  { className }: Props
) {
  const [value, setValue] = useState('')
  const [show, setShow] = useState(false)
  const isFirstSearch = useRef(true)
  const [results, setResults] = useState<ProductsSearch[]>([])
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value)
    onSearch(event.target.value)
  }

  const onSearch = useDebouncedCallback(async (term: string) => {
    const trimmedTerm = term.trim()
    if (trimmedTerm === '') {
      return
    }

    isFirstSearch.current = true
    setLoading(true)
    setResults([])
    try {
      const products = await searchProducts({ search: trimmedTerm, limit: 5 })
      setResults(products)
    } catch (error) {
      setResults([])
    } finally {
      isFirstSearch.current = false
      setLoading(false)
    }
  }, WAIT_BETWEEN_CHANGE)

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    router.push(`/products?search=${value}`)
  }

  const clearSearch = () => {
    setValue('')
  }

  const handleFocus = (event: React.FocusEvent<HTMLInputElement>) => {
    event.target.select()
    setShow(true)
  }

  return (
    <>
      <InputSearch
        placeholder={'Buscar...'}
        value={value}
        onChange={handleChange}
        onSubmit={handleSubmit}
        onClear={clearSearch}
        className={className}
        onFocus={handleFocus}
      >
      </InputSearch>
      { value.trim() !== '' && show && (
        <>
          <ModalBackground className='inset-0 top-20' close={() => { setShow(false) }} isOpen={show} />
          <SearchResults
            className='absolute left-0 top-24 z-[41] md:left-20'
            results={results}
            isLoading={loading}
            hasNoResults={results.length === 0 && value.trim() !== '' && !isFirstSearch.current}
            searchWord={value.trim()}
          />
        </>
      )}
    </>
  )
}
