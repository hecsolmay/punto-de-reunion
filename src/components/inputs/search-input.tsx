export default function SearchInput () {
  return (
    <input
      type="text"
      className={`
        h-9 w-full rounded-md border border-contrast bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 
        file:bg-transparent file:text-sm file:font-medium focus:outline-contrast focus:ring-accent focus-visible:outline-accent focus-visible:ring-1 disabled:cursor-not-allowed disabled:opacity-50
      `}
      placeholder="Buscador"
    />

  )
}
