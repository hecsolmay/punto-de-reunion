'use client'

import { type VariantKey } from '@/constants'
import { useFormStatus } from 'react-dom'
import Button from './button'
import LoadingSpinner from '../loading-spinner'
import { cn } from '@/libs/cn'

interface Props {
  children?: React.ReactNode
  className?: string
  onClick?: () => void
  disabled?: boolean
  loading?: boolean
  variant?: VariantKey
  title?: string
}

export default function SubmitButton (
  { children, className, disabled = false, loading = false, onClick, variant = 'default', title }: Props
) {
  const { pending } = useFormStatus()

  const isLoading = loading || pending

  return (
    <Button
      type='submit'
      disabled={disabled}
      onClick={onClick}
      className={cn(className, { 'cursor-progress opacity-70 hover:opacity-70': isLoading })}
      variant={variant}
      loading={isLoading}
      title={title}
    >
      { isLoading && <LoadingSpinner />}
      {children}
    </Button>
  )
}
