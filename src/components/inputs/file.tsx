'use client'

import { IMAGE_MAX_SIZE } from '@/constants'
import { cn } from '@/libs/cn'
import { useRef, useState } from 'react'

interface InputImageFileProps {
  url?: string
  onChange?: (file?: File) => Promise<void> | void
  className?: string
  imageClassName?: string
}

export default function InputImageFile ({
  onChange,
  url,
  className,
  imageClassName
}: InputImageFileProps) {
  const inputRef = useRef<HTMLInputElement | null>(null)
  const [error, setError] = useState<string | undefined>(undefined)

  const handleClick = () => {
    inputRef.current?.click()
  }

  const handleChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file === undefined) {
      return
    }

    if (file.size > IMAGE_MAX_SIZE) {
      setError('El archivo es demasiado grande')
      return
    }

    setError(undefined)
    await onChange?.(file)
  }

  return (
    <div className={className}>
      {url !== undefined && (
        <img
          onClick={handleClick}
          className={cn(
            'h-40 w-full cursor-pointer object-cover',
            imageClassName
          )}
          src={url}
          alt='Image'
        />
      )}

      {error !== undefined && (
        <p className='mt-1.5 text-center text-sm text-red-500'>{error}</p>
      )}
      <input
        type='file'
        accept='image/*'
        ref={inputRef}
        onChange={handleChange}
        className='hidden'
      />
    </div>
  )
}
