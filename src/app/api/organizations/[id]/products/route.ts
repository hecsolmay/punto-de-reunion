import { generateErrorResponse } from '@/libs/api'
import { mapProductEntity } from '@/libs/maps'
import { parseSearchParams } from '@/libs/utils'
import { getOrganizationById } from '@/services/organizations'
import { getProducts } from '@/services/products'
import { type ServerContext } from '@/types'
import { NextResponse, type NextRequest } from 'next/server'

export async function GET (req: NextRequest, context: ServerContext) {
  const { id } = context.params
  const urlSearch = req.nextUrl.searchParams
  const searchParams = parseSearchParams(urlSearch)

  try {
    const organization = await getOrganizationById(id)

    if (organization === null) {
      return generateErrorResponse(404, 'Organization not found')
    }

    const data = await getProducts({ ...searchParams, organizationId: organization.id })

    if (data.error !== undefined) {
      return generateErrorResponse(500, data.error)
    }

    const { products: rawProducts, info } = data

    const products = rawProducts.map(mapProductEntity)

    return NextResponse.json({ success: true, info, products }, { status: 200 })
  } catch (error) {
    return generateErrorResponse(500)
  }
}
