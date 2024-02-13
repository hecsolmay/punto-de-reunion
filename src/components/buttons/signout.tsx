'use client'

import { closeSession } from '@/actions/user'
import { createBrowserClient } from '@supabase/ssr'
import { useRouter } from 'next/navigation'

interface Props {
  className?: string
  children?: React.ReactNode
}

export default function SignOutButton (
  { className, children }: Props
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
      await closeSession()
      router.push('/login')
    }
  }

  return (
    <button onClick={handleLogout} className={className}>
      {children}
    </button>
  )
}
