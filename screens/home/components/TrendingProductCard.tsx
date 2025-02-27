"use client"
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

import { FaStar, FaRegStar } from "react-icons/fa";
import { GoHeart, GoHeartFill } from "react-icons/go";
import product from "@/public/images/63e8c4e563db5560c31bbfce_leptop sleeve macbook-min.png";

const TrendingProductCard = () => {
  const liked = true;

  const textAnimation = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="w-full aspect-video border border-gray-100 p-1 grid grid-cols-12">
      <div className="col-span-12 sm:col-span-5 max-sm:h-52 bg-gray-100 relative">
        <Image
          src={product}
          alt="product-image"
          fill
          className="object-cover"
        />
      </div>
      <div className="col-span-12 sm:col-span-7 flex flex-col justify-center px-4">
        <motion.h2
          variants={textAnimation}
          initial="hidden"
          whileInView="visible"
          viewport={{once:true}}
          transition={{ duration: 0.5 }}
          className="text-xl font-bold"
        >
          Leptop sleeve macbook
        </motion.h2>
        <motion.div
          variants={textAnimation}
          initial="hidden"
          whileInView="visible"
          viewport={{once:true}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex items-center gap-x-1 my-1"
        >
          <FaStar className="size-4" /> <FaStar className="size-4" />
          <FaStar className="size-4" /> <FaStar className="size-4" />
          <FaRegStar className="size-4" />
          <span className="text-xs text-gray-300">1 Review</span>
        </motion.div>
        <motion.h3
          variants={textAnimation}
          initial="hidden"
          whileInView="visible"
          viewport={{once:true}}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-primary font-bold text-3xl my-2"
        >
          $ 20.00
        </motion.h3>
        <motion.p
          variants={textAnimation}
          initial="hidden"
          whileInView="visible"
          viewport={{once:true}}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-sm text-gray-400"
        >
          Ea sunt Lorem culpa veniam elit ad cupidatat exercitation aliqua
          voluptate laborum. Aliqua cillum elit mollit ut enim. Occaecat do et
          sint commodo aute anim aliquip.
        </motion.p>
        <div className="flex items-center gap-x-2 mt-3">
          <motion.button
            variants={textAnimation}
            initial="hidden"
            whileInView="visible"
            viewport={{once:true}}
            transition={{ duration: 0.9, delay: 0.4 }}
            className="border border-primary text-black hover:text-white hover:bg-primary py-2 px-4 mt-2"
          >
            Add to Cart
          </motion.button>
          <motion.div
            variants={textAnimation}
            initial="hidden"
            whileInView="visible"
            viewport={{once:true}}
            transition={{ duration: 1, delay: 0.5 }}
            className="h-10 w-10 flex justify-center items-center"
          >
            {liked ? (
              <GoHeartFill className="size-7 text-pink-700" />
            ) : (
              <GoHeart className="size-7 text-pink-700" />
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default TrendingProductCard;
