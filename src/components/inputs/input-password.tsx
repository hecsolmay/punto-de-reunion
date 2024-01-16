'use client'

import { useState } from 'react'
import { type PasswordProps } from './input'
import EyeIcon from '@/components/icons/eye'
import EyeSlashIcon from '@/components/icons/eye-slash'
import { cn } from '@/libs/cn'

export function InputPassword (
  props: PasswordProps
) {
  const { className, error, type, allowToggle, ...rest } = props
  const hasError = Boolean(error)

  const [showPassword, setShowPassword] = useState(false)

  const toggle = () => { setShowPassword(!showPassword) }

  return (
    <div className='relative'>
      <input
        className={cn(
          `h-9 w-full rounded-md border border-contrast bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 
          file:bg-transparent file:text-sm file:font-medium 
          focus:outline-contrast focus:ring-accent focus-visible:outline-accent focus-visible:ring-1 
          disabled:cursor-not-allowed disabled:opacity-50`,
          hasError && 'animate-shake border-red-500',
          className
        )}
        type={showPassword ? 'text' : 'password'}
        {...rest}
      />
      <button title={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'} className='absolute right-3 top-1/2 -translate-y-1/2' onClick={toggle} tabIndex={-1}>
        {showPassword ? <EyeSlashIcon /> : <EyeIcon /> }
      </button>
    </div>
  )
}
