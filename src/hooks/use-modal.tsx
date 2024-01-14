'use client'

import { useState } from 'react'

export default function useModal (initialState = false) {
  const [isOpen, setIsOpen] = useState(initialState)

  const close = () => {
    setIsOpen(false)
  }

  const open = () => {
    setIsOpen(true)
  }

  const toggle = () => {
    setIsOpen(!isOpen)
  }
  return { isOpen, close, open, toggle }
}
