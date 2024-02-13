import MoonIcon from '@/components/icons/moon'
import { useTheme } from 'next-themes'
import { useEffect, useRef, useState } from 'react'

export default function ToggleTheme () {
  const { theme, setTheme } = useTheme()
  const [isFirstRender, setIsFirstRender] = useState(true)
  const divRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    setIsFirstRender(false)
  }, [])

  if (isFirstRender) return null

  const toggle = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark')
  }

  const handleClick = (event: React.MouseEvent) => {
    const { target } = event
    if (target !== divRef?.current) return
    toggle()
  }

  const text = theme === 'dark' ? 'Modo Claro' : 'Modo Oscuro'

  return (
    <div ref={divRef} onClick={handleClick} className="flex w-full cursor-pointer items-center justify-between gap-3 rounded-md py-2 transition-colors duration-100 hover:bg-gray-100 dark:hover:bg-white/15">
      <label htmlFor='theme' className="ms-3 flex cursor-pointer items-center gap-3 text-sm font-medium text-gray-900 dark:text-gray-300">
        <MoonIcon />
        {text}
      </label>
      <div className="relative me-5 inline-flex cursor-pointer items-center">
        <input onChange={toggle} checked={theme === 'dark'} id='theme' type="checkbox" value="" className="peer sr-only" />
        <div className="peer h-5 w-[2.3rem] rounded-full bg-gray-200 transition-colors duration-200 after:absolute after:start-[2px] after:top-0.5 after:size-4 after:rounded-full after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-white/90 peer-checked:after:translate-x-full peer-checked:after:border-white peer-checked:after:bg-black peer-focus:ring-1 peer-focus:ring-red-300 dark:border-gray-600 dark:bg-gray-700 dark:peer-focus:ring-red-800 rtl:peer-checked:after:-translate-x-full"></div>
      </div>
    </div>
  )
}
