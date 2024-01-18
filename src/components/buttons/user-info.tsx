import { type Session } from '@supabase/supabase-js'

export default function UserInfoButton (
  { session }: { session: Session }
) {
  const metadata = session.user.user_metadata

  const image = metadata?.avatar_url ?? 'https://cdn-icons-png.flaticon.com/512/149/149071.png'

  const username = metadata?.user_name ?? metadata?.full_name ?? 'Anónimo'

  return (
    <button className='flex items-center gap-2 capitalize'>
      <img src={image} alt={username} className='size-7 rounded-full' />
      <p className='capitalize'>{username.toLowerCase()}</p>
    </button>
  )
}
