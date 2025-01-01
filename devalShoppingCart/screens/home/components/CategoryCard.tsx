import React from "react";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { IoCartOutline } from "react-icons/io5";
const CategoryCard = () => {
  return (
    <div className="w-full aspect-[1/1.3] bg-white flex flex-col justify-end items-center pb-4 group/category cursor-pointer shadow-[3px_3px_16.5px_-7.5px_#ccc6c6]">
      <button
        className="relative overflow-hidden cursor-pointer rounded-[50px]
      border-[solid] border-[hsl(50deg_100%_50%)] outline-none "
      >
        <div
          className="flex items-center gap-3 text-sm font-semibold
         uppercase transition-all duration-300 ease
        rounded-[50px] group-hover/category:translate-x-[0%] group-hover/category:-translate-y-full"
        >
          <MdOutlineRemoveRedEye />
          <span className="text-gray-800">Quick View</span>
        </div>
        <div
          className=" flex items-center gap-3 text-sm font-medium uppercase transition-all
         duration-300 ease rounded-[50px] absolute
         translate-x-[0%] translate-y-full inset-0 group-hover/category:translate-x-[0%]
          group-hover/category:translate-y-[0%]"
        >
          <IoCartOutline />
          <span className="text-[hsl(50deg_100%_50%)]">Shop Now</span>
        </div>
      </button>
    </div>
  );
};

export default CategoryCard;
