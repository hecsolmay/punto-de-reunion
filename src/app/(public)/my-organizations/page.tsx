import { MyOrganizationsEmptyState } from '@/components/empty-states/organizations'
import MainContainer from '@/components/main-container'
import { CreateOrganizationButton } from '@/components/organizations/button'
import { getUserSession } from '@/libs/auth'
import { getOrganizations } from '@/services/organizations'
import { type ServerPageProps } from '@/types'

export default async function MyOrganizationsPage ({ searchParams }: ServerPageProps) {
  const session = await getUserSession()

  const organizationsResponse = await getOrganizations({ limit: 20, userId: session?.id })

  if (organizationsResponse.error !== undefined) {
    // TODO: Handle error
    console.error(organizationsResponse.error)
    return null
  }

  const { organizations } = organizationsResponse
  console.log(organizationsResponse)

  if (organizations.length === 0) {
    return (
      <MainContainer className="grid h-full min-h-[80dvh] w-full place-content-center gap-4">
        <MyOrganizationsEmptyState />
      </MainContainer>
    )
  }

  return (
    <MainContainer className='flex h-auto min-h-[80vh] flex-col gap-y-8 px-4 pb-8 md:px-8'>
      <div className='flex flex-col justify-between gap-6 md:flex-row'>
        <h1 className='text-pretty text-3xl font-bold text-black dark:text-white'>Mis Organizaciones</h1>
        <CreateOrganizationButton organizationsCount={organizations.length}/>
      </div>
    </MainContainer>
  )
}
