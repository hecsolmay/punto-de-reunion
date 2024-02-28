import { parseSearchParams } from '@/libs/utils'
import { getOrganizationById } from '@/services/organizations'
import { getProducts } from '@/services/products'
import { type ServerContext } from '@/types'
import { type NextRequest, NextResponse } from 'next/server'

export async function GET (req: NextRequest, context: ServerContext) {
  const { id } = context.params
  const urlSearch = req.nextUrl.searchParams
  const searchParams = parseSearchParams(urlSearch)

  try {
    const organization = await getOrganizationById(id)

    if (organization === null) {
      return NextResponse.json({ success: false, message: 'Organization not found' }, { status: 404 })
    }

    const data = await getProducts({ ...searchParams, organizationId: organization.id })

    return NextResponse.json({ success: true, organization, data }, { status: 200 })
  } catch (error) {
    return NextResponse.json({ success: false, message: 'Something went wrong' }, { status: 500 })
  }
}
