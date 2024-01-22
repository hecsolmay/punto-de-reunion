'use client'

import { usePathname, useSearchParams } from 'next/navigation'

export default function UseValueParam (defaultKey: string) {
  const params = useSearchParams()
  const value = params.get(defaultKey)
  let newParams = new URLSearchParams(params.toString())

  const pathname = usePathname()

  const removeParam = (key: string) => {
    newParams.delete(key)
    newParams = new URLSearchParams(params.toString())
  }

  const addParam = (key: string, value: string) => {
    newParams.set(key, value)
    newParams = new URLSearchParams(params.toString())
  }

  const getParam = (key: string) => {
    return newParams.get(key)
  }

  return {
    value,
    removeParam,
    addParam,
    pathname,
    params: newParams,
    getParam
  }
}
