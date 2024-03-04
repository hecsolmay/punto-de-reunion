'use client'

import XMarkIcon from '@/components/icons/xmark'
import { cn } from '@/libs/cn'
import { ChevronDownIcon } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

export interface OptionType {
  label: string
  value: string
}

interface MultiSelectProps {
  options?: OptionType[]
  selectedOptions?: OptionType[]
  setSelected?: (selectedOptions: OptionType[]) => void
  error?: string
  className?: string
}

export function MultiSelect ({
  className,
  options = [],
  selectedOptions = [],
  setSelected,
  error
}: MultiSelectProps) {
  const hasError = Boolean(error)
  const divRef = useRef<HTMLDivElement | null>(null)
  const listRef = useRef<HTMLDivElement | null>(null)
  const [show, setShow] = useState(false)

  console.log({ options, selectedOptions })

  useEffect(() => {
    const handler = (event: MouseEvent) => {
      if (divRef.current === null || listRef.current === null) return

      if (divRef.current.contains(event.target as Node)) return

      console.log(listRef.current)
      console.log(listRef.current.contains(event.target as Node))

      if (listRef.current.contains(event.target as Node)) return

      setShow(false)
    }
    window.addEventListener('click', handler)

    return () => { window.removeEventListener('click', handler) }
  }, [listRef.current])

  const handleRemove = (value: string) => {
    setSelected?.(
      selectedOptions.filter(
        ({ value: selectedValue }) => selectedValue !== value
      )
    )
  }

  const toggleOptions = () => {
    setShow(!show)
  }

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (divRef.current === null) return

    if (divRef.current !== event.target) return

    toggleOptions()
  }

  const unselectedOptions = options.filter(option =>
    !selectedOptions.some(selectedOption => selectedOption.value === option.value)
  )

  const handleSelect = (option: OptionType) => (event: React.MouseEvent) => {
    event.stopPropagation()
    setSelected?.([...selectedOptions, option])
    setShow(true)
  }

  return (
    <div
      className={cn(
        'min-h-9 w-full appearance-none rounded-md border border-contrast bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 focus:outline-contrast focus:ring-accent focus-visible:outline-accent focus-visible:ring-1 inline-flex justify-between relative',
        hasError &&
          'animate-shake border-red-500 focus:outline-red-500 focus:ring-red-500 focus-visible:outline-red-500 focus-visible:ring-red-500',
        className
      )}
    >
      <div className='z-10 flex flex-1 flex-row flex-wrap items-center gap-2' ref={divRef} onClick={handleClick} >
        {selectedOptions.map(({ label, value }) => (
          <div
            key={value}
            className='flex items-center rounded-lg bg-gray-300 text-center text-sm dark:bg-[#2f2f2f]'
          >
            <span className='p-[2px] px-2'>{label}</span>
            <button
              onClick={() => {
                handleRemove(value)
              }}
              className='h-full pr-1'
              type='button'
            >
              {' '}
              <XMarkIcon className='size-4' />
            </button>
          </div>
        ))}
      </div>

      <div className='z-10 flex items-center divide-x divide-dotted'>
        {selectedOptions.length > 0 && (
          <button
            className='mr-1'
            type='button'
            onClick={() => {
              setSelected?.([])
            }}
          >
            <XMarkIcon />
          </button>
        )}
        <button className='pl-1' type='button' onClick={(event) => {
          event.stopPropagation()
          toggleOptions()
        }}>
          <ChevronDownIcon />
        </button>
      </div>

      <div ref={listRef} className={cn('absolute left-0 z-10  top-10 ease-in-out w-full duration-300 transition-all overflow-y-auto bg-gray-300  dark:bg-[#2f2f2f] rounded-lg scrollbar-thin scrollbar-white dark:scrollbar-dark', show ? 'h-48' : 'h-0')}>
        {unselectedOptions.map(({ label, value }) => (
          <div key={value} className='cursor-pointer p-2 hover:bg-gray-300 dark:hover:bg-[#2f2f2f]' onClick={handleSelect({ label, value })}>
            {label}
          </div>
        ))}
      </div>
    </div>
  )
}
