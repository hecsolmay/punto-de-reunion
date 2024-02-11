'use client'

import MoonIcon from '@/components/icons/moon'
import SunIcon from '@/components/icons/sun'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'

export default function ThemeButton (
  { className }: { className?: string }
) {
  const { setTheme, theme } = useTheme()
  const [isFirstRender, setIsFirstRender] = useState(false)

  useEffect(() => {
    setIsFirstRender(true)
  }, [])

  if (!isFirstRender) return null

  const handleClick = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark')
  }

  const isDarkMode = theme === 'dark'

  return (
    <button className={className} title={isDarkMode ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'} onClick={handleClick}>
      {isDarkMode ? <SunIcon className='size-7' /> : <MoonIcon className='size-7'/>}
    </button>
  )
}
