import { getCategoryById } from '@/services/category'
import { type ServerContext } from '@/types'
import { NextResponse, type NextRequest } from 'next/server'

export async function GET (req: NextRequest, context: ServerContext) {
  const { id } = context.params
  try {
    const category = await getCategoryById(id)

    if (category === null) {
      return NextResponse.json({ success: false, message: 'Category not found' }, { status: 404 })
    }

    return NextResponse.json({ success: true, category }, { status: 200 })
  } catch (error) {
    return NextResponse.json({ success: false, message: 'Something went wrong' }, { status: 500 })
  }
}
