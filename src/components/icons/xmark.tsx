export default function XMarkIcon (
  { className = 'size-6' }: { className?: string }
) {
  return (
    <svg className={className} data-slot="icon" fill="none" strokeWidth="1.5" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12"></path>
    </svg>
  )
}
