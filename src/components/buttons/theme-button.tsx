'use client'

import MoonIcon from '@/components/icons/moon'
import SunIcon from '@/components/icons/sun'
import { useTheme } from 'next-themes'

export default function ThemeButton (
  { className }: { className?: string }
) {
  const { setTheme, theme } = useTheme()

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
