import { getProductById } from '@/services/products'
import { type ServerContext } from '@/types'
import { type NextRequest, NextResponse } from 'next/server'

export async function GET (req: NextRequest, context: ServerContext) {
  const { id } = context.params
  try {
    const product = await getProductById(id)

    if (product === null) {
      return NextResponse.json({ success: false, message: 'Product not found' }, { status: 404 })
    }

    return NextResponse.json({ success: true, product }, { status: 200 })
  } catch (error) {
    return NextResponse.json({ success: false, message: 'Something went wrong' }, { status: 500 })
  }
}
