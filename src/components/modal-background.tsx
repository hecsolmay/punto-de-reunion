interface Props {
  isOpen: boolean
  close: () => void
}

export default function ModalBackground (
  { close, isOpen }: Props
) {
  return (
    <div
      onClick={close}
      className={`fixed inset-0 z-40 bg-black/50 transition-opacity ${
        isOpen ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'
      }`}
      aria-hidden="true"
    />
  )
}
