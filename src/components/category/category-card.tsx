import Link from 'next/link'

export default function CategoryCard (
  { href, name, imageUrl }: { href: string, name: string, imageUrl: string }
) {
  return (
  // <div className="relative h-20 w-36 rounded-lg bg-black/50 ">
  //   <img className="inset-0 h-full w-full object-cover" src={imageUrl} alt={`picture of category ${name}`} />
  //   <h3 className="text-2xl font-semibold text-white">{name}</h3>
  // </div>

    <Link href={href}>
      <div className="group w-72">
        <div className="group relative overflow-hidden rounded-xl shadow-md">
          <img
            src={imageUrl}
            alt={`Imagen banner de la categoría ${name}`}
            className="h-74 aspect-video rounded-xl bg-black/5 object-cover transition-transform duration-200 group-hover:scale-105  group-hover:opacity-90"
          />
          <div className="absolute inset-0 z-10 bg-black/40 text-center">
            <h3 className="h-full translate-y-1/2  text-2xl font-bold uppercase text-white">{name}</h3>
          </div>
        </div>
      </div>
    </Link>
  )
}
