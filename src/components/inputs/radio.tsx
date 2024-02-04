import { type RadioProps } from '@/components/inputs/input'
import { cn } from '@/libs/cn'

export default function InputRadio (
  { className, defaultChecked, disabled, error, name, onChange, placeholder, required, value, label }: RadioProps
) {
  return (
    <div className='flex items-center'>
      <input onChange={onChange} defaultChecked={defaultChecked} placeholder={placeholder} disabled={disabled} required={required} id={value} type="radio" value={value} name={name} className={cn('h-4 w-4 rounded-full border-gray-300 bg-gray-100 text-blue-600 focus:ring-0  dark:border-gray-600 cursor-pointer dark:bg-gray-700', className)}/>
      <label htmlFor={value} className="cursor-pointer pl-1.5 text-sm font-medium text-gray-900 dark:text-gray-300">{label}</label>
    </div>
  )
}
