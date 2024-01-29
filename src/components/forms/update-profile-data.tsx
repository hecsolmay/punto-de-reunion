import { updateProfile } from '@/actions/user'
import SubmitButton from '@/components/buttons/submit'
import FormItem from '@/components/forms/form-item'
import LockClosedIcon from '@/components/icons/lock-closed'
import Input from '@/components/inputs/input'
import { type UserSession } from '@/libs/auth'

interface Props {
  session: NonNullable<UserSession>
}

export default function FormUpdateProfile (
  { session }: Props
) {
  const { username, email, id: userId } = session
  const updateUserWithId = updateProfile.bind(null, userId)

  return (
    <form action={updateUserWithId} className='grid grid-cols-1 gap-5'>
      <FormItem htmlFor='username' label='Nombre del usuario'>
        <Input type='text' name='username' defaultValue={username} />
      </FormItem>
      <FormItem className='' htmlFor='email' label='Correo Electrónico'>
        <Input disabled type='email' name='email' defaultValue={email ?? ''} />
        <LockClosedIcon className='absolute bottom-2 right-2 size-5 opacity-50' />
      </FormItem>

      <Input placeholder='Checkbox' type='checkbox' name='allow' />
      <SubmitButton variant='warning'>Actualizar Datos</SubmitButton>
    </form>
  )
}
