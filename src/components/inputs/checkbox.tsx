import { type CheckboxProps } from '@/components/inputs/input'
import { cn } from '@/libs/cn'

export default function CheckboxInput (
  { value, className, defaultChecked, name, disabled, onChange, placeholder, required, error }: CheckboxProps
) {
  return (
    <div className={cn('inline-flex gap-2 items-center', className)}>
      <label className="relative flex cursor-pointer items-center rounded-full" htmlFor={name}>
        <input
          type="checkbox"
          defaultChecked={defaultChecked}
          value={value}
          disabled={disabled}
          onChange={onChange}
          required={required}
          className="before:content[''] border-blue-gray-200 before:bg-blue-gray-500 peer relative h-5 w-5 cursor-pointer appearance-none rounded-md border transition-all before:absolute before:left-2/4 before:top-2/4 before:block before:h-8 before:w-8 before:-translate-x-2/4 before:-translate-y-2/4 before:rounded-full before:opacity-0 before:transition-opacity checked:border-gray-900 checked:bg-gray-900 checked:before:bg-gray-900 hover:before:opacity-10"
          name={name}
          id={name} />
        <span
          className="pointer-events-none absolute left-2/4 top-2/4 -translate-x-2/4 -translate-y-2/4 text-white opacity-0 transition-opacity peer-checked:opacity-100">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor"
            stroke="currentColor" strokeWidth="1">
            <path fillRule="evenodd"
              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
              clipRule="evenodd"></path>
          </svg>
        </span>
      </label>
      <label className="mt-px cursor-pointer select-none text-sm font-medium text-gray-900 dark:text-white" htmlFor={name}>
        {placeholder}
      </label>
    </div>
  )
}
