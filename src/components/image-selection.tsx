'use client'

import { useState } from 'react'

interface Image {
  id: string
  imageUrl: string
}

interface Props {
  images: Image[]
}

export default function ImageSelection ({ images }: Props) {
  const [selected, setSelected] = useState(images[0].id)

  const handleHover = (id: string) => () => {
    setSelected(id)
  }

  const imageSelected = images.find(image => image.id === selected)

  return (
    <>
      <div className='mx-auto grid w-full place-items-center'>
        <img className='aspect-square h-72 object-cover' src={imageSelected?.imageUrl} alt="" />
      </div>
      <ul className='grid grid-cols-4 gap-4'>
        {images.map(image => (
          <li
            key={image.id}
            className={`cursor-pointer ${image.id === selected ? 'ring-2 ring-amber-300' : ''}` }
            onMouseEnter={handleHover(image.id)}
          >
            <img className={'h-full w-full object-cover'} src={image.imageUrl} alt="" />
          </li>
        ))}
      </ul>
    </>
  )
}
