import { MyOrganizationsEmptyState } from '@/components/empty-states/organizations'
import MainContainer from '@/components/main-container'
import { CreateOrganizationButton } from '@/components/organizations/button'
import { MyOrganizationCard } from '@/components/organizations/card'
import { getUserSession } from '@/libs/auth'
import { getOrganizations } from '@/services/organizations'
import { type ServerPageProps } from '@/types'

export default async function MyOrganizationsPage ({
  searchParams
}: ServerPageProps) {
  const session = await getUserSession()

  const organizationsResponse = await getOrganizations({
    limit: 20,
    userId: session?.id
  })

  if (organizationsResponse.error !== undefined) {
    console.error(organizationsResponse.error)
    return null
  }

  const { organizations } = organizationsResponse

  if (organizations.length === 0) {
    return (
      <MainContainer className='grid h-full min-h-[80dvh] w-full place-content-center gap-4'>
        <MyOrganizationsEmptyState />
      </MainContainer>
    )
  }

  return (
    <MainContainer className='flex h-auto min-h-[80vh] flex-col gap-y-8 px-4 pb-8 md:px-8'>
      <div className='flex flex-col justify-between gap-6 md:flex-row'>
        <h1 className='text-pretty text-3xl font-bold text-black dark:text-white'>
          Mis Organizaciones
        </h1>
        <CreateOrganizationButton organizationsCount={organizations.length} />
      </div>

      <section className='grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-4 xl:grid-cols-4'>
        {organizations.map(({ id, name, description, imageUrl }) => (
          <MyOrganizationCard
            description={description}
            imageUrl={imageUrl}
            key={id}
            name={name}
            organizationId={id}
          />
        ))}
      </section>
    </MainContainer>
  )
}
