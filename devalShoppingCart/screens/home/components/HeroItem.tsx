import React from 'react'
import Image from 'next/image'

interface HeroItemProps {
    image: string;
    name: string;
    category: string;
    offer: string;
    description: string;
}
const HeroItem = ({image name, category, offer, description}) => {
  return (
    <div className="w-full h-full relative">
<Image src={image} alt={name} fill priority quality={100} loading="lazy" className='object-cover absolute'  />
<div className='h-full w-full px-11 flex justify-center items-center bg-green-400'>

</div>

    </div>
  )
}

export default HeroItem
