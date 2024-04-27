import { generateErrorResponse } from '@/libs/api'
import { mapOrganizationEntity } from '@/libs/maps'
import { parseSearchParams } from '@/libs/utils'
import { getOrganizations } from '@/services/organizations'
import { NextResponse, type NextRequest } from 'next/server'

export async function GET (req: NextRequest) {
  const urlSearch = req.nextUrl.searchParams
  const searchParams = parseSearchParams(urlSearch)

  try {
    const response = await getOrganizations(searchParams)

    if (response.error !== undefined) {
      return generateErrorResponse(500, response.error)
    }

    const { info, organizations: rawOrganizations } = response

    const organizations = rawOrganizations.map((organization) => mapOrganizationEntity(organization))

    return NextResponse.json({ success: true, info, organizations }, { status: 200 })
  } catch (error) {
    console.error(error)
    return generateErrorResponse(500)
  }
}
