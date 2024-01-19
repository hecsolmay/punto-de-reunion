export default function Footer () {
  const year = new Date().getFullYear()

  return (

    <footer className="rounded-lg bg-slate-100 shadow dark:bg-zinc-900">
      <div className="mx-auto w-full max-w-screen-xl p-4 md:py-8">
        <div className="sm:flex sm:items-center sm:justify-between">
          <div className="mb-4 flex items-center space-x-3 sm:mb-0 rtl:space-x-reverse">
            <img src="/assets/images/logo.png" className="h-8 dark:invert" alt="Logo de Punto de Reunion" />
            <span className="self-center whitespace-nowrap text-2xl font-semibold dark:text-white">Punto de reunion</span>
          </div>

        </div>
        <hr className="my-6 border-gray-200 dark:border-gray-700 sm:mx-auto lg:my-8" />
        <span className="block text-sm text-gray-500 dark:text-gray-400 sm:text-center">© {year} <a href="https://flowbite.com/" className="hover:underline">Punto de reunion</a>. Ningún derecho reservado.</span>
      </div>
    </footer>

  )
}
