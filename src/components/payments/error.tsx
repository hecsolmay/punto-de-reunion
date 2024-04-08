import Link from 'next/link'

export function ErrorContent () {
  return (
    <main className='grid min-h-[80dvh] place-items-center'>
      <div className="text-center">
        <img className='mx-auto my-4 size-48 object-cover' src="/assets/images/empty-search.webp" alt="Imagen de error" />
        <p className="mb-4 text-lg text-slate-400 dark:text-white">Oops! Algo salio mal al procesar tu pedido.</p>
        <p className="mt-4 text-balance text-slate-400 dark:text-white">Intenta recargando la pagina o vuelve a la pagina de <Link href="/" className="text-blue-500">Inicio</Link>.</p>
      </div>
    </main>
  )
}
