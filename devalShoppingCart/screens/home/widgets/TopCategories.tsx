"use client";
import SectionLayout from "@/components/common/layouts/section/SectionLayout";
import CategoryCard from "../components/CategoryCard";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
// import "./bullets.css";
import { motion } from "framer-motion";
import { Navigation } from "swiper/modules";
const TopCategories: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 100 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <SectionLayout overflow  title="Top Categories">
        <Swiper
        modules={[Navigation]}
          spaceBetween={16}
          slidesPerView={1}
          breakpoints={{
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 4 },
            1280: { slidesPerView: 5 },
          }}
          pagination={{
            clickable: true,
            bulletClass: "swiper-pagination-bullet",
            bulletActiveClass: "swiper-pagination-bullet-active",
          }}
        >
          {[...Array(5)].map((_, index) => (
            <SwiperSlide key={index}>
              <CategoryCard />
            </SwiperSlide>
          ))}
        </Swiper>
      </SectionLayout>
    </motion.div>
  );
};

export default TopCategories;
