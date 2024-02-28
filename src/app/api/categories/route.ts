import { type NextRequest, NextResponse } from 'next/server'
import { parseSearchParams } from '@/libs/utils'
import { getCategories } from '@/services/category'

export async function GET (req: NextRequest) {
  const urlSearch = req.nextUrl.searchParams
  const searchParams = parseSearchParams(urlSearch)

  try {
    const response = await getCategories(searchParams)

    if (response.error !== undefined) {
      console.error(response.error)
      return NextResponse.json({ message: 'Something went wrong', success: false }, {
        status: 500
      })
    }

    const { categories, info } = response

    return NextResponse.json({ success: true, info, categories }, {
      status: 200
    })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ message: 'Something went wrong', success: false }, {
      status: 500
    })
  }
}
