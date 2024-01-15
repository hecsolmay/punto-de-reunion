import Button from '@/components/buttons/button'
import FormItem from '@/components/forms/form-item'
import Input from '@/components/inputs/input'

export default function ComponentList () {
  return (
    <main className='m-auto max-w-3xl p-6'>
      <h2 className='text-3xl uppercase'>Inputs</h2>
      <section className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] place-content-center gap-6 py-6">
        <FormItem label='Input texto'>
          <Input type='text'/>
        </FormItem>
        <FormItem label='Input contraseña sin toggle'>
          <Input type='password'/>
        </FormItem>
        <FormItem label='Input contraseña con toggle'>
          <Input type='password' allowToggle/>
        </FormItem>
      </section>

      <h2 className='text-3xl uppercase'>Buttons</h2>
      <section className="grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] place-content-center gap-6 py-6">
        <Button className='capitalize' variant='default'>default</Button>
        <Button className='capitalize' variant='alternative'>alternative</Button>
        <Button className='capitalize' variant='primary'>primary</Button>
        <Button className='capitalize' variant='warning'>warning</Button>
        <Button className='capitalize' variant='danger'>danger</Button>
      </section>

    </main>
  )
}
