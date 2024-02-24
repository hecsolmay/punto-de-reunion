import { cn } from '@/libs/cn'

interface Props extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  register?: any
  error?: string
}

export default function TextArea ({ register, className, error, ...props }: Props) {
  const hasError = Boolean(error)

  return (
    <>
      <textarea className={cn(
        `h-32 max-h-40 min-h-32 w-full appearance-none rounded-md border border-contrast bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 resize-y
      file:bg-transparent file:text-sm file:font-medium 
      focus:outline-contrast focus:ring-accent focus-visible:outline-accent focus-visible:ring-1 
      disabled:cursor-not-allowed disabled:opacity-50`,
        hasError && 'animate-shake border-red-500 focus:outline-red-500 focus:ring-red-500 focus-visible:outline-red-500 focus-visible:ring-red-500',
        className
      )} {...props} {...register} />
      {error !== undefined && <p className='mt-1 text-sm text-red-500'>{error}</p>}
    </>
  )
}
