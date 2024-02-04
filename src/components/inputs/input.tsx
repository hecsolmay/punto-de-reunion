import { cn } from '@/libs/cn'
import { InputPassword } from './input-password'
import CheckboxInput from './checkbox'
import InputRadio from './radio'

interface CommonInputProps {
  placeholder?: string
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
  value?: string
  className?: string
  name?: string
  defaultValue?: string
  disabled?: boolean
  required?: boolean
  error?: string
  min?: string | number
  max?: string | number
  pattern?: string
  register?: any
}

export type PasswordProps = CommonInputProps & {
  type?: 'password'
  allowToggle?: boolean
}

type TextProps = CommonInputProps & {
  type?: 'text' | 'email' | 'number' | 'url' | 'search' | 'tel'
}

export type CheckboxProps = Omit<CommonInputProps, 'min' | 'max' | 'defaultValue'> & {
  type?: 'checkbox'
  checked?: boolean
  defaultChecked?: boolean
}

export type RadioProps = Omit<CommonInputProps, 'min' | 'max' | 'defaultValue'> & {
  type?: 'radio'
  defaultChecked?: boolean
  checked?: boolean
  label?: string
}

type Props = TextProps | PasswordProps | CheckboxProps | RadioProps

export default function Input (
  { register, ...props }: Props
) {
  const hasError = Boolean(props.error)

  if (props.type === 'password' && Boolean(props.allowToggle)) {
    return <InputPassword {...props} />
  }

  if (props.type === 'checkbox') {
    return <CheckboxInput {...props}/>
  }

  if (props.type === 'radio') {
    return <InputRadio {...props}/>
  }

  const { className, error, ...rest } = props

  return (
    <>
      <input
        className={cn(
          `h-9 w-full appearance-none rounded-md border border-contrast bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 
          file:bg-transparent file:text-sm file:font-medium 
          focus:outline-contrast focus:ring-accent focus-visible:outline-accent focus-visible:ring-1 
          disabled:cursor-not-allowed disabled:opacity-50`,
          hasError && 'animate-shake border-red-500 focus:outline-red-500 focus:ring-red-500 focus-visible:outline-red-500 focus-visible:ring-red-500',
          className
        )}
        {...rest}
        {...register}
      />
      {error !== undefined && <p className='mt-1 text-sm text-red-500'>{error}</p>}
    </>
  )
}
