import { generateErrorResponse } from '@/libs/api'
import { mapOrganizationEntity } from '@/libs/maps'
import { getOrganizationById } from '@/services/organizations'
import { type ServerContext } from '@/types'
import { type NextRequest, NextResponse } from 'next/server'

export async function GET (req: NextRequest, context: ServerContext) {
  const { id } = context.params

  try {
    const rawOrganization = await getOrganizationById(id)

    if (rawOrganization === null) {
      return generateErrorResponse(404, 'Organization not found')
    }

    const organization = mapOrganizationEntity(rawOrganization)

    return NextResponse.json({ success: true, organization }, { status: 200 })
  } catch (error) {
    console.error(error)
    return generateErrorResponse(500)
  }
}
