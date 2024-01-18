'use client'

import { createBrowserClient } from '@supabase/ssr'
import { useRouter } from 'next/navigation'

export default function SignOutButton (
  { className }: { className?: string }
) {
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
  const router = useRouter()

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut()
    console.error(error)

    if (error === null) {
      router.replace('/login')
    }
  }

  return (
    <button onClick={handleLogout} className={className}>
      Cerrar Sesión
    </button>
  )
}
