import { parseSearchParams } from '@/libs/utils'
import { getOrganizations } from '@/services/organizations'
import { type NextRequest, NextResponse } from 'next/server'

export async function GET (req: NextRequest) {
  const urlSearch = req.nextUrl.searchParams
  const searchParams = parseSearchParams(urlSearch)

  try {
    const response = await getOrganizations(searchParams)

    if (response.error !== undefined) {
      throw new Error(response.error)
    }

    const { info, organizations } = response

    return NextResponse.json({ success: true, info, organizations }, { status: 200 })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ success: false, message: 'Something went wrong' }, { status: 500 })
  }
}
