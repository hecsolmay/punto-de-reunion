export default function HamburgerIcon ({ className = 'size-6' }: { className?: string }) {
  return (
    <svg className={className} data-slot="icon" fill="none" strokeWidth="1.5" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"></path>
    </svg>
  )
}
