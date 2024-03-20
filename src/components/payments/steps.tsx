import { cn } from '@/libs/cn'
import { type StepsType } from '@/types'

interface Props {
  steps: StepsType[]
  selectedIndex: number
  onClick?: (index: number) => void
}

export default function Stepper ({ steps, selectedIndex, onClick }: Props) {
  return (
    <ol className="mx-auto flex w-full max-w-3xl items-center justify-center">
      {steps.map(({ name, id, icon: Icon, isCompleted }, index) => (
        <li onClick={() => onClick?.(index)} key={id} className={cn(
          "relative flex w-full items-center transition-all duration-200 after:inline-block after:h-1 after:w-full after:border-4 after:border-b after:border-gray-100 after:content-[''] dark:after:border-gray-700",
          index === steps.length - 1 && 'after:hidden w-fit',
          isCompleted && 'after:border-blue-100 dark:after:border-blue-600'
        )}>
          <span className={cn(
            'flex size-10 shrink-0 items-center justify-center rounded-full  lg:size-12',
            selectedIndex === index ? 'bg-blue-100 dark:bg-blue-600' : 'bg-gray-100 dark:bg-gray-700',
            isCompleted && 'bg-blue-100 dark:bg-blue-600'
          )}>
            <Icon className={cn('size-4 text-gray-500 dark:text-gray-100 lg:size-5')} />
          </span>
        </li>
      ))}

    </ol>
  )
}
