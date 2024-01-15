interface Props {
  htmlFor?: string
  className?: string
  label?: string
  labelClassName?: string
  children?: React.ReactNode
}

export default function FormItem (
  { htmlFor, className = '', label, children, labelClassName }: Props
) {
  return (
    <div className={`relative ${className}`}>
      <label htmlFor={htmlFor} className={`mb-2 block text-sm font-medium text-gray-900 dark:text-white ${labelClassName}`}>
        {label}
      </label>
      {children}
    </div>
  )
}
