'use client'

import { type Link as LinkType } from '@/types'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'

export default function DropDown (
  { children, links = [] }: { children?: React.ReactNode, links?: LinkType[] }
) {
  const [showDropdown, setShowDropdown] = useState(false)
  const dropdownRef = useRef<HTMLDivElement | null>(null)

  const toggleDropdown = () => { setShowDropdown(!showDropdown) }

  const closeDropdown = (event: MouseEvent) => {
    const isContained = dropdownRef.current?.contains(event.target as Node) ?? false

    if (!isContained) {
      setShowDropdown(false)
    }
  }

  useEffect(() => {
    document.addEventListener('click', closeDropdown)

    return () => {
      document.removeEventListener('click', closeDropdown)
    }
  }, [])

  return (
    <div ref={dropdownRef} className="relative">
      <div className="cursor-pointer" onClick={toggleDropdown}>
        {children}
      </div>

      <div className={`absolute right-0 z-10 mt-2 w-44 divide-y divide-gray-100 rounded-lg bg-highlight shadow 
        transition-opacity duration-200 ease-in-out dark:bg-contrast-dark 
        ${showDropdown ? 'opacity-100' : 'opacity-0'}
      `}>
        <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefaultButton">
          {links.map(({ href, title, className, onClick }) => (
            <li key={href}>
              <Link
                onClick={() => {
                  onClick !== undefined && onClick()
                  setShowDropdown(false)
                }}
                href={href}
                className={`block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white ${className}`}>
                {title}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
