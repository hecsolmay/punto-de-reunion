import LinkButton from '@/components/buttons/link-button'

export default function HeroSection () {
  return (
    <section className='flex min-h-[80dvh] flex-col gap-x-4 md:flex-row'>
      <div className='order-2 w-full py-6 md:order-1 md:w-1/2'>
        <h1 className='mb-6 text-balance text-5xl font-bold text-primary-600 dark:text-primary-500'>
          <span className='dark:text-white'>¡Bienvenido a</span> punto de reunion!
        </h1>

        <p className='mb-6 text-pretty font-semibold text-gray-700 dark:text-white/90 md:mt-8'>
          ¡Bienvenidos a la plataforma de Mercado del Sabor Escolar! 🍔🥤Aquí es
          donde los antojos se vuelven realidad. 🌮🍰Explora, elige y déjanos
          llevarte las mejores delicias directo al lugar que quieras dentro de
          la universidad.
        </p>

        <p className='mb-8 text-pretty font-semibold text-gray-700 dark:text-white/90'>
          ¡Listos para saborear la diversion? ¡Vamos allá!
        </p>

        <LinkButton href='/products'>Explora nuestros productos</LinkButton>
      </div>

      <div className='order-1 h-[35dvh] max-h-[34rem] w-full md:order-2 md:h-[80dvh] md:w-1/2'>
        <img
          className='h-full w-full rounded-lg object-cover md:p-8'
          src='/assets/images/hero-image.webp'
          alt='Imagen de la sección hero'
        />
      </div>
    </section>
  )
}
