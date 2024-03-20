'use client'

import Button from '@/components/buttons/button'
import { SelectInput, type OptionType } from '@/components/inputs/select'
import { type BUILDING_KEY } from '@/constants/locations'
import { cn } from '@/libs/cn'
import { getUtmLocations } from '@/libs/utils'

interface Props {
  onContinue?: () => void
  onChange?: (value: string | undefined) => void
  location?: string
  optionSelectedKey?: OptionType
  setOptionSelectedKey?: (value: string) => void
  disabled?: boolean
  options?: OptionType[]
}

export default function Location ({
  onChange,
  onContinue,
  location,
  optionSelectedKey,
  setOptionSelectedKey,
  disabled = false,
  options = []
}: Props) {
  const handleClick = () => {
    if (disabled) return
    onContinue?.()
  }

  const utmLocations = getUtmLocations(optionSelectedKey?.value as BUILDING_KEY)

  return (
    <section className='w-full px-3 md:px-6'>
      <header className='mb-8 text-center'>
        <h1 className='text-pretty text-3xl font-bold'>
          Elige tu punto de reunión
        </h1>
        <p className='mt-4 text-balance text-gray-500 dark:text-white/90'>
          ¡Tú decides! Explora nuestro mapa interactivo y elige el punto de
          entrega que mejor se ajuste a tu agenda y preferencias. Desde los
          espacios comunes hasta los lugares emblemáticos del campus, la
          elección es tuya.
        </p>
      </header>

      <main className='mt-6'>
        {/* TODO: ADD SEARCH */}
        {/* TODO: ADD MAP */}
        {/* TODO: ADD SELECT BUILDING KEY */}

        <SelectInput
          options={options}
          selectedOption={optionSelectedKey}
          changeSelected={option => {
            setOptionSelectedKey?.(option.value)
            onChange?.(undefined)
          }}
        />

        {/* TODO: SHOW SUGGESTIONS BASED ON KEY */}

        <div className='mt-8 grid min-h-[408px] grid-cols-2 gap-3 md:min-h-56 md:grid-cols-4 md:gap-6'>
          {optionSelectedKey !== undefined &&
            utmLocations.map(numberLocation => {
              const value = optionSelectedKey.value + '-' + numberLocation
              const isSelected = location === value
              return (
                <div
                  key={numberLocation}
                  className={cn(
                    'flex cursor-pointer items-center justify-center rounded-lg border border-gray-300 bg-white py-4 shadow-lg dark:border-contrast dark:bg-accent-dark dark:hover:bg-contrast-dark hover:bg-gray-100 transition duration-200',
                    isSelected && 'bg-gray-200 dark:bg-contrast-dark dark:hover:bg-contrast-dark hover:bg-gray-200'
                  )}
                  onClick={() => onChange?.(value)}
                >
                  <p className='text-gray-500 dark:text-white/90'>{value}</p>
                </div>
              )
            })}
        </div>
      </main>

      <footer className='mt-6 grid place-content-center'>
        <Button
          disabled={disabled}
          className='w-52'
          onClick={handleClick}
          variant='default'
        >
          Continuar
        </Button>
      </footer>
    </section>
  )
}
