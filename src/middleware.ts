import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function middleware (request: NextRequest) {
  let response = NextResponse.next({
    request: {
      headers: request.headers
    }
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get (name: string) {
          return request.cookies.get(name)?.value
        },
        set (name: string, value: string, options: CookieOptions) {
          request.cookies.set({
            name,
            value,
            ...options
          })
          response = NextResponse.next({
            request: {
              headers: request.headers
            }
          })
          response.cookies.set({
            name,
            value,
            ...options
          })
        },
        remove (name: string, options: CookieOptions) {
          request.cookies.set({
            name,
            value: '',
            ...options
          })
          response = NextResponse.next({
            request: {
              headers: request.headers
            }
          })
          response.cookies.set({
            name,
            value: '',
            ...options
          })
        }
      }
    }
  )

  const session = await supabase.auth.getUser()

  console.log('--------------------- Getting Session On Middleware ---------------------')
  console.log({ session })
  console.log(request.nextUrl.pathname)
  console.log('-------------------------------------------------------------------------')

  const { pathname } = request.nextUrl

  if (session.data.user === null) {
    return NextResponse.redirect(new URL(`/login?next=${pathname}`, request.url))
  }

  return response
}

export const config = {
  matcher: [
    // I need a matchers for all the account routes and subsequent also for my-organizations route
    '/account/:path*',
    '/my-organizations/:path*'
  ]
}
