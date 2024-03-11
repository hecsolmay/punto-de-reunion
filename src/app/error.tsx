'use client'

import Button from '@/components/buttons/button'
import InternalServerErrorIcon from '@/components/icons/server-error'
import { useEffect } from 'react'

interface Props {
  error: Error & { digest?: string }
  reset: () => void
}

export default function InternalServerErrorPage ({
  error,
  reset
}: Props
) {
  useEffect(() => {
    console.error(error)
  }, [error])

  const handleClick = () => {
    reset()
  }

  return (
    <div className='flex h-screen w-full flex-col items-center justify-center'>
      <InternalServerErrorIcon />

      <div className='flex flex-col items-center justify-center'>
        <h1 className='mt-8 text-5xl font-bold tracking-wider text-gray-600 md:text-6xl lg:text-7xl'>
          500
        </h1>
        <h2 className='mt-2 text-pretty text-2xl font-bold text-gray-600 md:text-3xl lg:text-4xl'>
          Error del Servidor
        </h2>
        <p className='my-4 text-balance text-center text-gray-500 md:text-lg xl:text-xl'>
          Whoops, algo salio mal en nuestros servidores.
        </p>
        <Button onClick={handleClick}>
          Inténtalo de nuevo
        </Button>
      </div>
    </div>
  )
}
