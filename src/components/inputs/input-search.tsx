import SearchIcon from '@/components/icons/search'
import XMarkIcon from '@/components/icons/xmark'
import { cn } from '@/libs/cn'

interface Props {
  onSubmit?: (event: React.FormEvent<HTMLFormElement>) => void
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
  value?: string
  defaultValue?: string
  placeholder?: string
  onClear?: () => void
  className?: string
  inputClassName?: string
  onFocus?: (event: React.FocusEvent<HTMLInputElement>) => void
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void
  children?: React.ReactNode
}

export default function InputSearch ({
  className,
  children,
  defaultValue,
  inputClassName,
  onBlur,
  onChange,
  onClear,
  onFocus,
  onSubmit,
  placeholder,
  value
}: Props) {
  return (
    <form onSubmit={onSubmit} className={cn('relative', className)}>
      <SearchIcon className='absolute left-2 top-2.5 size-4' />
      <input
        type='text'
        onChange={onChange}
        className={cn(
          'h-9 px-7 w-full rounded-lg border border-contrast bg-transparent py-1 text-sm shadow-sm',
          inputClassName
        )}
        onFocus={onFocus}
        value={value}
        placeholder={placeholder}
        defaultValue={defaultValue}
        onBlur={onBlur}
      />
      {value !== '' && (
        <button
          onClick={onClear}
          className='absolute right-2 top-2'
          type='button'
          title='Borrar búsqueda'
        >
          <XMarkIcon className='size-5' />
        </button>
      )}
      {children}
    </form>
  )
}
