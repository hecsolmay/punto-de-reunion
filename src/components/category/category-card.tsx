import Link from 'next/link'

export default function CategoryCard (
  { href, name, imageUrl }: { href: string, name: string, imageUrl: string }
) {
  return (
    <Link href={href}>
      <div className="group w-72">
        <div className="group relative overflow-hidden rounded-xl shadow-md">
          <img
            src={imageUrl}
            alt={`Imagen banner de la categoría ${name}`}
            className="h-74 aspect-video rounded-xl bg-black/5 object-cover transition-transform duration-200 group-hover:scale-105  group-hover:opacity-90"
          />
          <div className="absolute inset-0 bg-black/40 text-center">
            <h3 className="h-full translate-y-1/2  text-2xl font-bold uppercase text-white">{name}</h3>
          </div>
        </div>
      </div>
    </Link>
  )
}
