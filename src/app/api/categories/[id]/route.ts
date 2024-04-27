import { generateErrorResponse } from '@/libs/api'
import { getCategoryById } from '@/services/category'
import { type ServerContext } from '@/types'
import { NextResponse, type NextRequest } from 'next/server'

export async function GET (req: NextRequest, context: ServerContext) {
  const { id } = context.params
  try {
    const category = await getCategoryById(id)

    if (category === null) {
      return generateErrorResponse(404, 'Category not found')
    }

    return NextResponse.json({ success: true, category }, { status: 200 })
  } catch (error) {
    return generateErrorResponse(500)
  }
}
