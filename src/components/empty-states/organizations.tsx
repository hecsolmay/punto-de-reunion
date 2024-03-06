import { CreateOrganizationButton } from '@/components/organizations/button'

interface Props {
  userId: string
}

export function MyOrganizationsEmptyState ({ userId }: Props) {
  return (
    <>
      <div className="grid h-full w-full place-items-center">
        <img className="aspect-square size-44 drop-shadow-md" src="/assets/images/empty-organizations.webp" alt="Carpeta de organizaciones vacía" />
      </div>
      <p>Actualmente no tienes organizaciones, prueba a crear una.</p>
      <CreateOrganizationButton userId={userId} organizationsCount={0} />
    </>
  )
}
