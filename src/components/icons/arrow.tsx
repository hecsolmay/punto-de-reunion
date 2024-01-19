import { cn } from '@/libs/cn'

export default function Arrow (
  { className = 'size-6', rotate }: { className?: string, rotate?: boolean }
) {
  return (
    <svg className={cn(className, { 'rotate-180': rotate })} data-slot="icon" fill="none" strokeWidth="1.5" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"></path>
    </svg>
  )
}
