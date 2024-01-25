import { getUserSession } from '@/libs/auth'

export default async function Profile () {
  const session = await getUserSession()

  console.log({ session })

  return (
    <div className='h-auto w-full flex-1 bg-zinc-100 p-4 dark:bg-zinc-900 md:px-8'>
      <h2 className='text-xl font-bold'>Información de tu cuenta</h2>
    </div>
  )
}
