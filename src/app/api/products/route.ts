import { parseSearchParams } from '@/libs/utils'
import { getProducts } from '@/services/products'
import { type NextRequest, NextResponse } from 'next/server'

export async function GET (req: NextRequest) {
  const urlSearch = req.nextUrl.searchParams
  const searchParams = parseSearchParams(urlSearch)

  try {
    const response = await getProducts(searchParams)

    if (response.error !== undefined) {
      throw new Error(response.error)
    }

    const { products, info } = response

    return NextResponse.json({ success: true, info, products }, { status: 200 })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ success: false, message: 'Something went wrong' }, { status: 500 })
  }
}
