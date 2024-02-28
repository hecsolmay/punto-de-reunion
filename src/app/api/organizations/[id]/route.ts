import { getOrganizationById } from '@/services/organizations'
import { type ServerContext } from '@/types'
import { type NextRequest, NextResponse } from 'next/server'

export async function GET (req: NextRequest, context: ServerContext) {
  const { id } = context.params

  try {
    const organization = await getOrganizationById(id)

    if (organization === null) {
      return NextResponse.json({ success: false, message: 'Organization not found' }, { status: 404 })
    }

    return NextResponse.json({ success: true, organization }, { status: 200 })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ success: false, message: 'Something went wrong' }, { status: 500 })
  }
}
