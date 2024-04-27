import { generateErrorResponse } from '@/libs/api'
import { parseSearchParams } from '@/libs/utils'
import { getCategories } from '@/services/category'
import { NextResponse, type NextRequest } from 'next/server'

export async function GET (req: NextRequest) {
  const urlSearch = req.nextUrl.searchParams
  const searchParams = parseSearchParams(urlSearch)

  try {
    const response = await getCategories(searchParams)

    if (!response.success) {
      const { error, code = 500 } = response
      return generateErrorResponse(code, error)
    }

    const { categories, info } = response.data

    return NextResponse.json({ success: true, info, categories }, { status: 200 })
  } catch (error) {
    console.error(error)
    return generateErrorResponse(500)
  }
}
