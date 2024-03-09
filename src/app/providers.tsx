import { ThemeProvider } from '@/components/theme-provider'
import { AppContextProvider } from '@/context/utils'
import { EdgeStoreProvider } from '@/libs/edgestore'
import { Toaster } from '@/libs/sonner'

export default function Providers ({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      attribute='class'
      defaultTheme='system'
      enableSystem
      disableTransitionOnChange
    >
      <EdgeStoreProvider>
        <AppContextProvider>
          <Toaster
            position='bottom-right'
            expand
            visibleToasts={2}
            closeButton
          />
          {children}
        </AppContextProvider>
      </EdgeStoreProvider>
    </ThemeProvider>
  )
}
