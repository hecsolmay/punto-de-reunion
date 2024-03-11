'use client'

import { createContext, useContext, useState } from 'react'

interface AppContextType {
  showProductModal: boolean
  toggleProductModal: () => void
  setProductModal: (value: boolean) => void
  showCartSidebar: boolean
  setShowCartSidebar: (value: boolean) => void
}

const DEFAULT_APP_CONTEXT: AppContextType = {
  showProductModal: false,
  toggleProductModal: Function,
  setProductModal: () => {},
  showCartSidebar: false,
  setShowCartSidebar: () => {}
}

const AppContext = createContext<AppContextType>(DEFAULT_APP_CONTEXT)

interface Props {
  children?: React.ReactNode
}

export function AppContextProvider ({ children }: Props) {
  const [showProductModal, setShowProductModal] = useState(false)
  const [showCartSidebar, setShowCartSidebar] = useState(false)

  const toggleProductModal = () => {
    setShowProductModal(!showProductModal)
  }

  const changeProductModal = (value: boolean) => {
    setShowProductModal(value)
  }

  const changeCartSidebar = (value: boolean) => {
    setShowCartSidebar(value)
  }

  return (
    <AppContext.Provider
      value={{
        showProductModal,
        toggleProductModal,
        setProductModal: changeProductModal,
        showCartSidebar,
        setShowCartSidebar: changeCartSidebar
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export function useAppContext () {
  return useContext(AppContext)
}
