import LinkClient from '@/components/link-client'
import { accountProfileLinks } from '@/constants/links'
import { getUserSession } from '@/libs/auth'

export default async function AccountLayout ({
  children
}: {
  children: React.ReactNode
}) {
  const session = await getUserSession()

  const image = session?.avatarUrl ?? 'https://cdn-icons-png.flaticon.com/512/149/149071.png'

  const username = session?.username ?? 'Anónimo'

  return (
    <main className='flex min-h-[85vh] flex-col items-center p-4 px-3 md:px-10'>
      <section className='relative flex h-full w-full flex-1 flex-col gap-4 px-3 md:flex-row md:gap-8 md:px-5'>
        <div className='h-auto w-full bg-zinc-100 px-2 py-4 dark:bg-zinc-900 md:h-72 md:w-[30%] lg:w-1/4'>
          <div className='flex w-full items-center justify-end gap-4 border-b border-gray-400 pb-2 dark:border-white/90 md:justify-start md:border-none'>
            <img className='size-12 rounded-full' src={image} alt={`Foto de perfil de ${username}`} />
            <div>
              <span className='text-gray-500 dark:text-gray-400'>Mi Perfil</span>
              <h2 className='line-clamp-1 text-nowrap text-xl font-bold'>{username}</h2>
            </div>
          </div>

          <ul className='mt-2 flex flex-row flex-wrap gap-x-1 md:flex-col'>
            {accountProfileLinks.map(link => (
              <li key={link.href} className='min-w-fit flex-1'>
                <LinkClient
                  href={link.href}
                  className='flex w-full items-center gap-4 p-2 py-3 transition-colors hover:bg-slate-300 dark:border-white/90 dark:hover:bg-gray-800 md:border-t md:border-gray-400'
                  activeClassName='bg-gray-300 dark:bg-gray-800'
                >
                  <link.icon className='size-6 min-w-6'/>
                  <span className='text-gray-500 dark:text-gray-400'>{link.title}</span>
                </LinkClient>
              </li>
            ))}
          </ul>
        </div>
        {children}
      </section>
    </main>
  )
}
