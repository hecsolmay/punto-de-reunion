'use client'

import { MotionDiv } from '@/components/motion'
import Checkout from '@/components/payments/checkout'
import Location from '@/components/payments/location'
import Stepper from '@/components/payments/steps'
import { NAVIGATION_PAYMENT_STEPS } from '@/constants'
import { useState } from 'react'

export default function PaymentSteps () {
  const [steps, setSteps] = useState(NAVIGATION_PAYMENT_STEPS)
  const [selectedStep, setSelectedStep] = useState(0)
  const [previousStep, setPreviousStep] = useState(0)
  const delta = selectedStep - previousStep

  const handleChangeStep = (type: 'next' | 'back') => () => {
    const newSelectedStep = type === 'next' ? selectedStep + 1 : selectedStep - 1

    if (newSelectedStep > steps.length - 1) {
      return
    }
    if (newSelectedStep < 0) {
      return
    }

    const selectedSteps = steps

    if (type === 'next') {
      selectedSteps[selectedStep].isCompleted = true
      setPreviousStep(selectedStep)
      setSelectedStep(newSelectedStep)
      setSteps(selectedSteps)
    } else {
      selectedSteps[newSelectedStep].isCompleted = false
      setPreviousStep(selectedStep)
      setSelectedStep(newSelectedStep)
      setSteps(selectedSteps)
    }
  }

  return (
    <>
      <Stepper
        steps={steps}
        selectedIndex={selectedStep}
      />

      {selectedStep === 0 && (
        <MotionDiv
          initial={{ x: delta >= 0 ? '50%' : '-50%', opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
        >
          <Location />
        </MotionDiv>
      )}

      {selectedStep === 1 && (
        <MotionDiv
          initial={{ x: delta >= 0 ? '50%' : '-50%', opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
        >
          <Checkout />
        </MotionDiv>
      )}

      {selectedStep === 2 && (
        <MotionDiv
          initial={{ x: delta >= 0 ? '50%' : '-50%', opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
        >
          <p>Success</p>
        </MotionDiv>
      )}

      <div className='flex items-center justify-center gap-8'>
        <button onClick={handleChangeStep('back')}>Anterior</button>
        <button onClick={handleChangeStep('next')}>Siguiente</button>
      </div>
    </>
  )
}
