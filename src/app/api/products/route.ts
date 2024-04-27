import { generateErrorResponse } from '@/libs/api'
import { mapProductEntity } from '@/libs/maps'
import { parseSearchParams } from '@/libs/utils'
import { getProducts } from '@/services/products'
import { NextResponse, type NextRequest } from 'next/server'

export async function GET (req: NextRequest) {
  const urlSearch = req.nextUrl.searchParams
  const searchParams = parseSearchParams(urlSearch)

  try {
    const response = await getProducts(searchParams)

    if (response.error !== undefined) {
      const { error } = response
      return generateErrorResponse(500, error)
    }

    const { products, info } = response

    const mappedProducts = products.map(mapProductEntity)

    return NextResponse.json({ success: true, info, products: mappedProducts }, { status: 200 })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ success: false, message: 'Something went wrong' }, { status: 500 })
  }
}
