'use client'

import { cn } from '@/libs/cn'
import { useEffect, useRef, useState } from 'react'

export default function DropDown (
  { children, dropdownTrigger }: { children?: React.ReactNode, dropdownTrigger?: React.ReactNode }
) {
  const [showDropdown, setShowDropdown] = useState(false)
  const dropdownRef = useRef<HTMLDivElement | null>(null)

  const toggleDropdown = () => { setShowDropdown(!showDropdown) }

  useEffect(() => {
    const closeDropdown = (event: MouseEvent) => {
      const isContained = dropdownRef?.current?.contains(event.target as Node) ?? false

      if (!isContained) {
        setShowDropdown(false)
      }
    }
    document.addEventListener('click', closeDropdown)

    return () => {
      document.removeEventListener('click', closeDropdown)
    }
  }, [])

  return (
    <div className="relative">
      <div ref={dropdownRef} className="cursor-pointer" onClick={toggleDropdown}>
        {dropdownTrigger}
      </div>

      <div className={`absolute right-0 z-10 mt-2 w-44 divide-y divide-gray-100 rounded-lg bg-highlight shadow 
        transition-opacity duration-200 ease-in-out dark:bg-contrast-dark 
        ${showDropdown ? 'opacity-100' : 'opacity-0'}
      `}>
        <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefaultButton">
          {children}
        </ul>
      </div>
    </div>
  )
}

export function DropDownItem (
  { onClick, children, className }: { children?: React.ReactNode, onClick?: () => void, className?: string }
) {
  return (
    <li className={cn('block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white', className)}>
      {children}
    </li>
  )
}
