import { type UserSession } from '@/libs/auth'

export default function UserInfoButton (
  { session }: { session: UserSession }
) {
  if (session === null) {
    return null
  }

  const image = session?.avatarUrl ?? 'https://cdn-icons-png.flaticon.com/512/149/149071.png'

  const username = session?.username ?? 'Anónimo'

  return (
    <button className='flex items-center gap-2 capitalize'>
      <img src={image} alt={username} className='size-7 rounded-full' />
      <p className='hidden capitalize md:block'>{username.toLowerCase()}</p>
    </button>
  )
}
