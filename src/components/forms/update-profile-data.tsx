'use client'

import { updateProfile } from '@/actions/user'
import SubmitButton from '@/components/buttons/submit'
import FormItem from '@/components/forms/form-item'
import LockClosedIcon from '@/components/icons/lock-closed'
import Input from '@/components/inputs/input'
import { type UserSession } from '@/libs/auth'
import { userSchema, type UserSchema } from '@/schemas/user'
import { zodResolver } from '@hookform/resolvers/zod'
import { Gender } from '@prisma/client'
import { useForm } from 'react-hook-form'

interface Props {
  session: NonNullable<UserSession>
}

export default function FormUpdateProfile (
  { session }: Props
) {
  const { username, email, id: userId, gender } = session
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<UserSchema>({
    defaultValues: { username, gender },
    resolver: zodResolver(userSchema)
  })

  const onSubmit = async (data: UserSchema) => {
    try {
      await updateProfile(userId, data)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='grid grid-cols-1 gap-5'>
      <FormItem htmlFor='username' label='Nombre del usuario'>
        <Input type='text' register={register('username')} error={errors.username?.message} />
      </FormItem>
      <FormItem className='' htmlFor='email' label='Correo Electrónico'>
        <Input disabled type='email' name='email' defaultValue={email ?? ''} />
        <LockClosedIcon className='absolute bottom-2 right-2 size-5 opacity-50' />
      </FormItem>

      <FormItem htmlFor='gender' label='Genero'>
        <div className='flex grow items-center gap-3'>
          <Input defaultChecked={gender === Gender.MALE} type='radio' label='Hombre' value={Gender.MALE} register={register('gender')} />
          <Input defaultChecked={gender === Gender.FEMALE} type='radio' label='Mujer' value={Gender.FEMALE} register={register('gender')} />
        </div>
      </FormItem>

      <SubmitButton loading={isSubmitting} variant='warning'>Actualizar Datos</SubmitButton>
    </form>
  )
}
