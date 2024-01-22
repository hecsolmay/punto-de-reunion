export default function ProductInfoContainer ({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <div className='fixed inset-0 z-50 m-auto flex h-screen w-full flex-col bg-white transition-all duration-500  dark:bg-accent-dark md:h-[93vh] md:w-[70vw] lg:w-[50vw]'>
      {children}
    </div>
  )
}
