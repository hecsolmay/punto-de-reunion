'use client'

import { createContext, useContext, useState } from 'react'

interface AppContextType {
  showProductModal: boolean
  toggleProductModal: () => void
  setProductModal: (value: boolean) => void
}

const AppContext = createContext<AppContextType>({
  showProductModal: false,
  toggleProductModal: Function,
  setProductModal: () => {}
})

interface Props {
  children?: React.ReactNode
}

export function AppContextProvider ({
  children
}: Props
) {
  const [showProductModal, setShowProductModal] = useState(false)

  const toggleProductModal = () => {
    setShowProductModal(!showProductModal)
  }

  const changeProductModal = (value: boolean) => {
    setShowProductModal(value)
  }

  return (
    <AppContext.Provider value={{ showProductModal, toggleProductModal, setProductModal: changeProductModal }}>
      {children}
    </AppContext.Provider>
  )
}

export function useAppContext () {
  return useContext(AppContext)
}
