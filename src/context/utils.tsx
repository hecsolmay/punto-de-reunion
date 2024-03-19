'use client'

import { createContext, useContext, useState } from 'react'

interface AppContextType {
  showProductModal: boolean
  toggleProductModal: () => void
  setProductModal: (value: boolean) => void
  showCartSidebar: boolean
  setShowCartSidebar: (value: boolean) => void
  isCartActionLoading: boolean
  setIsCartActionLoading: (value: boolean) => void
}

const DEFAULT_APP_CONTEXT: AppContextType = {
  showProductModal: false,
  toggleProductModal: Function,
  setProductModal: () => {},
  showCartSidebar: false,
  setShowCartSidebar: () => {},
  isCartActionLoading: false,
  setIsCartActionLoading: () => {}
}

const AppContext = createContext<AppContextType>(DEFAULT_APP_CONTEXT)

interface Props {
  children?: React.ReactNode
}

export function AppContextProvider ({ children }: Props) {
  const [showProductModal, setShowProductModal] = useState(false)
  const [showCartSidebar, setShowCartSidebar] = useState(false)
  const [isCartActionLoading, setIsCartActionLoading] = useState(false)

  const toggleProductModal = () => {
    setShowProductModal(!showProductModal)
  }

  const changeProductModal = (value: boolean) => {
    setShowProductModal(value)
  }

  const changeCartSidebar = (value: boolean) => {
    setShowCartSidebar(value)
  }

  const changeCartActionLoading = (value: boolean) => {
    setIsCartActionLoading(value)
  }

  return (
    <AppContext.Provider
      value={{
        showProductModal,
        toggleProductModal,
        setProductModal: changeProductModal,
        showCartSidebar,
        setShowCartSidebar: changeCartSidebar,
        isCartActionLoading,
        setIsCartActionLoading: changeCartActionLoading
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export function useAppContext () {
  return useContext(AppContext)
}
