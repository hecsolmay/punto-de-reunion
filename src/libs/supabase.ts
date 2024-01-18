import { createServerClient, type CookieMethods } from '@supabase/ssr'
import { cookies } from 'next/headers'

export function createServerSupabaseClient (cookiesMethods?: CookieMethods) {
  const cookieStore = cookies()

  const DEFAULT_COOKIES = {
    get (name: string) {
      return cookieStore?.get(name)?.value
    }
  }

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: cookiesMethods ?? DEFAULT_COOKIES
    }
  )
}
