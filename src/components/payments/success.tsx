import CanvasConfetti from 'canvas-confetti'
import { useEffect } from 'react'

export default function SuccessPayment () {
  useEffect(() => {
    CanvasConfetti()
  }, [])

  return (
    <p>Success</p>
  )
}
