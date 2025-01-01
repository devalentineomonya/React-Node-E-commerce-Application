"use client";
import React from "react";
import SectionLayout from "@/components/common/layouts/SectionLayout";
import CategoryCard from "../components/CategoryCard";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination'; // Import pagination styles
import { Pagination } from 'swiper/modules';
import { motion } from 'framer-motion';

const TopCategories: React.FC = () => {

  const variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <SectionLayout title="Top Categories">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={variants}
        transition={{ duration: 0.5 }}
        className="flex justify-between w-full gap-x-3"
      >
        <Swiper
          spaceBetween={20}
          slidesPerView={6}
          pagination={{
            // bulletActiveClass: "swiper-pagination-bullet-active",
            clickable: true,
            renderBullet: (className) => {
              return `<span class="${className} w-2 h-2 bg-gray-400 rounded-full mx-1 transition-all duration-300 ease-in-out"></span>`;
            },
          }}
          modules={[Pagination]}
          breakpoints={{
            0: {
              slidesPerView: 1,
              spaceBetween: 10,
            },
            576: {
              slidesPerView: 2,
              spaceBetween: 10,
            },
            768: {
              slidesPerView: 3,
              spaceBetween: 15,
            },
            1024: {
              slidesPerView: 4,
              spaceBetween: 20,
            },
            1280: {
              slidesPerView: 6,
              spaceBetween: 20,
            },
          }}
        >
          <SwiperSlide>
            <CategoryCard />
          </SwiperSlide>
          <SwiperSlide>
            <CategoryCard />
          </SwiperSlide>
          <SwiperSlide>
            <CategoryCard />
          </SwiperSlide>
          <SwiperSlide>
            <CategoryCard />
          </SwiperSlide>
          <SwiperSlide>
            <CategoryCard />
          </SwiperSlide>
          <SwiperSlide>
            <CategoryCard />
          </SwiperSlide>
        </Swiper>
      </motion.div>
    </SectionLayout>
  );
};

export default TopCategories;
