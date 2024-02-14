import { ThemeProvider } from '@/components/theme-provider'
import { AppContextProvider } from '@/context/utils'

export default function Providers ({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <AppContextProvider>
        {children}
      </AppContextProvider>
    </ThemeProvider>
  )
}
