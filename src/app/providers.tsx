import { ThemeProvider } from '@/components/theme-provider'
import { AppContextProvider } from '@/context/utils'
import { EdgeStoreProvider } from '@/libs/edgestore'

export default function Providers ({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <EdgeStoreProvider>
        <AppContextProvider>
          {children}
        </AppContextProvider>
      </EdgeStoreProvider>
    </ThemeProvider>
  )
}
