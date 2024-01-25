export default function ProductInfoContainer ({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <section className='fixed inset-0 z-50 m-auto flex h-dvh w-full flex-col bg-white transition-all duration-500  dark:bg-accent-dark md:h-[93vh] md:w-[85vw] lg:w-[85vw]'>
      {children}
    </section>
  )
}
