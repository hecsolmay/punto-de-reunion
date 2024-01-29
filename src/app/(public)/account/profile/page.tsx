import FormUpdateProfile from '@/components/forms/update-profile-data'
import { getUserSession } from '@/libs/auth'
import { redirect } from 'next/navigation'

export default async function Profile () {
  const session = await getUserSession()

  if (session === null) {
    redirect('/login')
  }

  console.log({ session })

  return (
    <div className='flex h-auto w-full flex-1 flex-col gap-4 bg-zinc-100 p-4 dark:bg-zinc-900 md:px-8'>
      <h2 className='text-xl font-bold'>Información de tu cuenta</h2>
      <FormUpdateProfile session={session} />
    </div>
  )
}
