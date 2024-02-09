import { type RadioProps } from '@/components/inputs/input'
import { cn } from '@/libs/cn'

export default function InputRadio (
  { className, error, value, label, register, ...props }: RadioProps
) {
  return (
    <div className='flex items-center'>
      <input {...props} id={value} type="radio" value={value} className={cn('h-4 w-4 rounded-full border-gray-300 bg-gray-100 text-blue-600 focus:ring-0  dark:border-gray-600 cursor-pointer dark:bg-gray-700', className)} {...register}/>
      <label htmlFor={value} className="cursor-pointer pl-1.5 text-sm font-medium text-gray-900 dark:text-gray-300">{label}</label>
    </div>
  )
}
