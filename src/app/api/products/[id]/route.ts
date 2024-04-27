import { generateErrorResponse } from '@/libs/api'
import { mapProductEntity } from '@/libs/maps'
import { getProductById } from '@/services/products'
import { type ServerContext } from '@/types'
import { type NextRequest, NextResponse } from 'next/server'

export async function GET (req: NextRequest, context: ServerContext) {
  const { id } = context.params
  try {
    const rawProduct = await getProductById(id)

    if (rawProduct === null) {
      return generateErrorResponse(404, 'Product not found')
    }

    const product = mapProductEntity(rawProduct)

    return NextResponse.json({ success: true, product }, { status: 200 })
  } catch (error) {
    return generateErrorResponse(500)
  }
}
