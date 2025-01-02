import Image from "next/image";
import React from "react";
import { StaticImport } from "next/dist/shared/lib/get-img-props";

interface PopularOfferCardProps {
  offer: {
    value: number;
    description: string;
    image: string | StaticImport;
    name: string;
  };
  bg: string;
  text: string;
}

const PopularOfferCard: React.FC<PopularOfferCardProps> = ({
  offer,
  bg,
  text,
}) => {
  return (
    <div className={` w-full  h-fit  sm:min-h-[400px] rounded-lg overflow-hidden  grid grid-rows-2 ${text}`}>
      <div className={`px-3 py-5 ${bg} `}>
        <p className="text-slate-900 font-bold">Save</p>
        <h2 className=" font-bold text-5xl my-2">
          <sup className=" text-3xl">$</sup>
          {offer.value}
        </h2>
        <p className="text-slate-900 pb-1 text-xl sm:text-base">{offer.description}</p>
      </div>
      <div className="overflow-hidden">
        <Image className="h-full rounded-b-lg w-full hover:scale-[1.15]" src={offer.image} alt={offer.name} loading="lazy" />
      </div>
    </div>
  );
};

export default PopularOfferCard;
