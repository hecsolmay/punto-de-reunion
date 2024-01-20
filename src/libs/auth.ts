import { createServerSupabaseClient } from '@/libs/supabase'
import prisma from '@/libs/prisma'
import { type Prisma } from '@prisma/client'

export async function getUserSession () {
  const supabase = createServerSupabaseClient()
  const { data: { session } } = await supabase.auth.getSession()

  if (session === null) {
    return null
  }

  const user = await prisma.users.findFirst({
    include: {
      organizations: true
    },
    where: {
      id: session.user.id
    }
  })

  return user
}

export type UserSession = Prisma.PromiseReturnType<typeof getUserSession>
