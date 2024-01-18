'use client'

import Button from '@/components/buttons/button'
import FacebookIcon from '@/components/icons/facebook'
import GitHubIcon from '@/components/icons/github'
import GoogleIcon from '@/components/icons/google'
import MicrosoftIcon from '@/components/icons/microsoft'
import { cn } from '@/libs/cn'
import { createBrowserClient } from '@supabase/ssr'

const BUTTONS_VARIANTS = {
  google: {
    className: 'bg-white hover:bg-gray-100 text-black dark:bg-white dark:hover:bg-gray-100 dark:text-black',
    text: 'Continuar con Google',
    options: {
      queryParams: {
        access_type: 'offline',
        prompt: 'consent'
      },
      redirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/auth/callback/`
    },
    icon: GoogleIcon
  },
  github: {
    className: 'bg-black/85 hover:black/75 text-white dark:bg-black/85 dark:hover:black/75 dark:text-white',
    text: 'Continuar con Github',
    options: {
      redirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/auth/callback/`
    },
    icon: GitHubIcon
  },
  facebook: {
    className: 'bg-blue-600 hover:bg-blue-700 text-white dark:bg-blue-600 dark:hover:bg-blue-700 dark:text-white',
    text: 'Continuar con Facebook',
    options: {
      redirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/auth/callback/`
    },
    icon: FacebookIcon
  },
  azure: {
    className: 'bg-white hover:bg-gray-100 text-black dark:bg-white dark:hover:bg-gray-100 dark:text-black',
    text: 'Continuar con Microsoft',
    options: {
      scopes: 'email,profile',
      redirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/auth/callback/`
    },
    icon: MicrosoftIcon
  }
}

type ButtonType = keyof typeof BUTTONS_VARIANTS

interface Props {
  type: ButtonType
  onClick?: () => void
}

export default function SocialButton (props: Props) {
  const { type } = props

  const variant = getVariantButton(type)

  const { className, icon: Icon, text, options } = variant

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  const handleSignIn = async () => {
    await supabase.auth.signInWithOAuth({
      provider: type,
      options
    })
  }

  return (
    <Button className={cn('justify-center gap-3 rounded-lg py-5', className)} onClick={handleSignIn}>
      {<Icon />}
      {text}
    </Button>
  )
}

function getVariantButton (variant: ButtonType) {
  return BUTTONS_VARIANTS[variant] ?? BUTTONS_VARIANTS.google
}
