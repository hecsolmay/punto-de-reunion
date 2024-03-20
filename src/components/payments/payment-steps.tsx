'use client'

import { type OptionType } from '@/components/inputs/select'
import { MotionDiv } from '@/components/motion'
import Checkout from '@/components/payments/checkout'
import Location from '@/components/payments/location'
import Stepper from '@/components/payments/steps'
import SuccessPayment from '@/components/payments/success'
import { NAVIGATION_PAYMENT_STEPS } from '@/constants'
import { BUILDING_KEY_ARRAY } from '@/constants/locations'
import { useState } from 'react'

export default function PaymentSteps () {
  const [steps, setSteps] = useState(NAVIGATION_PAYMENT_STEPS)
  const [selectedStep, setSelectedStep] = useState(0)
  const [previousStep, setPreviousStep] = useState(0)
  const optionsKey = BUILDING_KEY_ARRAY.map(key => ({
    value: key,
    label: `Edificio ${key.toUpperCase()}`
  }))
  const [optionSelectedKey, setOptionSelectedKey] =
    useState<OptionType | undefined>(undefined)
  const [location, setLocation] = useState<string | undefined>(undefined)
  const delta = selectedStep - previousStep

  const handleChangeStep = (type: 'next' | 'back') => () => {
    const newSelectedStep =
      type === 'next' ? selectedStep + 1 : selectedStep - 1

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
      <Stepper steps={steps} selectedIndex={selectedStep} />

      {selectedStep === 0 && (
        <MotionDiv
          initial={{ x: delta >= 0 ? '50%' : '-50%', opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
        >
          <Location
            onChange={value => {
              setLocation(value)
            }}
            onContinue={handleChangeStep('next')}
            location={location}
            optionSelectedKey={optionSelectedKey}
            options={optionsKey}
            setOptionSelectedKey={(value) => {
              const foundKey = optionsKey.find((key) => key.value === value)
              if (foundKey === undefined) return
              setOptionSelectedKey(foundKey)
            }}
            disabled={optionSelectedKey === undefined || location === undefined}
          />
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
          <SuccessPayment />
        </MotionDiv>
      )}

      <div className='flex items-center justify-center gap-8'>
        {selectedStep > 0 && selectedStep < steps.length - 1 && <button onClick={handleChangeStep('back')}>Anterior</button>}
        {selectedStep !== 0 && selectedStep < steps.length - 1 && <button onClick={handleChangeStep('next')}>Siguiente</button>}
      </div>
    </>
  )
}
