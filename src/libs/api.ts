import { generateErrorResponse as getError } from '@/libs/utils'
import type { ErrorStatusCode } from '@/types/response'
import { NextResponse } from 'next/server'

export function generateErrorResponse (code: ErrorStatusCode, error?: string) {
  return NextResponse.json(getError(code, error), {
    status: code
  })
}

export function generateResponse (body: unknown, status = 200) {
  return NextResponse.json(body, { status })
}
