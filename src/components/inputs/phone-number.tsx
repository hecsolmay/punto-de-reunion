'use client'

import DropDown, { DropDownItem } from '@/components/dropdown'
import Input from '@/components/inputs/input'
import { COUNTRIES } from '@/constants/phones'
import { ValidatePhoneNumber, formatPhoneNumber } from '@/libs/validations'
import { type Country } from '@/types'
import { useState } from 'react'

interface Props {
  register?: any
}

export default function InputPhoneNumber (
  { register }: Props
) {
  const [selectedCountry, setSelectedCountry] = useState<Country>(COUNTRIES[0])
  const [isValidPhoneNumber, setIsValidPhoneNumber] = useState(true)
  const [value, setValue] = useState(selectedCountry?.phoneCode !== undefined ? `+${selectedCountry.phoneCode} ` : '')
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target
    const formattedNumber = formatPhoneNumber(value, selectedCountry.code)

    if (formattedNumber === null) {
      setIsValidPhoneNumber(false)
      return
    }

    setIsValidPhoneNumber(ValidatePhoneNumber(formattedNumber, selectedCountry.code))
    setValue(formattedNumber)
  }

  const handleSelect = (country: Country) => () => {
    setSelectedCountry(country)
    setValue(`+${country.phoneCode} `)
    setIsValidPhoneNumber(true)
  }

  return (
    <>
      <div className="flex items-start gap-x-1">
        <DropDown className='-right-20 w-52' dropdownTrigger={
          <div className='inline-flex h-9 w-max items-center justify-center gap-x-2 whitespace-nowrap rounded-md border border-contrast bg-transparent px-4 py-2 text-sm font-medium shadow dark:border-contrast dark:bg-transparent'>
            <img className='aspect-video w-10 object-contain' src={selectedCountry.flag} alt={`Flag of ${selectedCountry.name}`} />
            +{selectedCountry.phoneCode}
          </div>
        }>
          {COUNTRIES.map(country => (
            <DropDownItem
              className='flex cursor-pointer gap-x-2 capitalize'
              key={country.code}
              onClick={handleSelect(country)}
            >
              <img src={country.flag} alt={`Flag of ${country.name}`} className='aspect-video w-8 object-contain' />
              {country.name} {`(${selectedCountry.phoneCode})`}
            </DropDownItem>
          ))}
        </DropDown>
        <div className="relative w-full">
          <Input register={register} name='phoneNumber' error={isValidPhoneNumber ? undefined : 'Invalid phone number'} type='tel' value={value} onChange={handleChange} placeholder={selectedCountry?.placeholder}/>
          {!isValidPhoneNumber && <span className='mt-3 text-sm text-red-500'>Numero de teléfono invalido</span>}
        </div>
      </div>
    </>
  )
}
