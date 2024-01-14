import Providers from '@/app/providers'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Punto de Reunion',
  description: 'Somos la plataforma para entregar y mejorar la interacción entre los estudiantes para realizar un pedido de una manera sencilla y rápida'
}

export default function RootLayout ({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body className={`${inter.className} relative bg-white dark:bg-background-dark`}>
        <Providers >
          {children}
        </Providers>
      </body>
    </html>
  )
}
