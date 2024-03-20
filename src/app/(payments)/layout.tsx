import { NavbarPayments } from '@/components/navbar'

export default function Layout ({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <NavbarPayments />
      {children}
    </>
  )
}
