import { DEFAULT_PAGINATION } from '@/constants'
import { COUNTRIES } from '@/constants/phones'
import { paginationSchema } from '@/schemas/search'
import { type CountryCode } from '@/types/index'

export function parsePagination (pagination: any = DEFAULT_PAGINATION) {
  const result = paginationSchema.safeParse(pagination ?? {})

  if (!result.success) return DEFAULT_PAGINATION

  const skip = (result.data.page - 1) * result.data.limit

  return {
    ...result.data,
    skip
  }
}

export function formatPhoneNumber (input: string, code: CountryCode = 'MX') {
  // Eliminar todos los espacios existentes para que no interfieran
  const strippedInput = input.replace(/\s/g, '')
  const country = COUNTRIES.find((c) => c.code === code)

  if (country === undefined) return null

  const { formatRegex, replace, phoneCode } = country

  const isMatched = strippedInput.match(formatRegex)

  if (isMatched !== null) {
    const formattedInput = strippedInput.replace(formatRegex, replace)

    return formattedInput
  }

  const stringCode = `+${phoneCode}`

  const phoneNumber = strippedInput.split(stringCode).join('')

  let phone = ''

  for (let i = 0; i < phoneNumber.length; i++) {
    const number = phoneNumber[i]
    if (i % 3 === 0 && i <= 6 && i !== 0) {
      phone += ' '
    }

    phone += number
  }

  return `${stringCode} ${phone}`
}

export function ValidatePhoneNumber (input: string, code: CountryCode = 'MX') {
  const strippedInput = input.replace(/\s/g, '')
  const country = COUNTRIES.find((c) => c.code === code)

  if (country == null) return false

  return country.regex.test(strippedInput)
}
