"use client"
import React, { useState, useRef, useEffect, ReactNode } from "react";
import styles from "./scrollcarousel.module.css";
interface ScrollCarouselProps {
  children: ReactNode;
}

const ScrollCarousel: React.FC<ScrollCarouselProps> = ({ children }) => {
  const [viewedItems, setViewedItems] = useState<number>(4);
  const totalItems = React.Children.count(children);
  const carouselRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (carouselRef.current) {
        const scrollLeft = carouselRef.current.scrollLeft;
        const clientWidth = carouselRef.current.clientWidth;
        const newIndex = Math.floor(scrollLeft / (clientWidth / 4)) + 4;
        setViewedItems(Math.min(newIndex, totalItems));
      }
    };

    const carouselElement = carouselRef.current;
    if (carouselElement) {
      carouselElement.addEventListener("scroll", handleScroll);
      carouselElement.addEventListener("drag", handleScroll);
    }

    return () => {
      if (carouselElement) {
        carouselElement.removeEventListener("scroll", handleScroll);
      }
    };
  }, [totalItems]);

  return (
    <div className={`${styles.scrollCarouselContainer} hide-scrollbar`}>
      <div className={`${styles.scrollCarousel} hide-scrollbar`} ref={carouselRef}>
        {children}
      </div>
      <div className={`${styles.scrollCarouselProgressBar} hide-scrollbar`}>
        <div
          className={`${styles.scrollCarouselProgress} hide-scrollbar`}
          style={{ width: `${(viewedItems / totalItems) * 100}%` }}
        ></div>
      </div>
    </div>
  );
};

export default ScrollCarousel;
