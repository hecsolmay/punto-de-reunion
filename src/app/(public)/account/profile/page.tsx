import { ContentContainer } from '@/components/account/container'
import FormUpdateProfile from '@/components/forms/update-profile-data'
import { getUserSession } from '@/libs/auth'
import { redirect } from 'next/navigation'

export default async function Profile () {
  const session = await getUserSession()

  if (session === null) {
    redirect('/login')
  }

  return (
    <ContentContainer>
      <h2 className='text-xl font-bold'>Información de tu cuenta</h2>
      <FormUpdateProfile session={session} />
    </ContentContainer>
  )
}
