import React, { useState, useRef, useEffect } from 'react';
import PropTypes from "prop-types"
import './swiper.css';

const Swiper = ({ children }) => {
  const [viewedItems, setViewedItems] = useState(4);
  const totalItems = React.Children.count(children);
  const swiperRef = useRef(null);

  const handleScroll = () => {
    if (swiperRef.current) {
      const scrollLeft = swiperRef.current.scrollLeft;
      const clientWidth = swiperRef.current.clientWidth;
      const newIndex = Math.floor(scrollLeft / (clientWidth / 4)) + 4;
      setViewedItems(Math.min(newIndex, totalItems));
    }
  };

  useEffect(() => {
    const swiperElement = swiperRef.current;
    

    swiperElement.addEventListener('scroll', handleScroll);
    swiperElement.addEventListener('drag', handleScroll)

    return () => {
      swiperElement.removeEventListener('scroll', handleScroll);
    };
  }, [totalItems]);

  return (
    <div className="swiper-container">
      <div className="swiper" ref={swiperRef}>
        {children}
      </div>
      <div className="progress-bar">
        <div className="progress" style={{ width: `${(viewedItems / totalItems) * 100}%` }}></div>
      </div>
    </div>
  );
};

Swiper.propTypes = {
    children:PropTypes.node.isRequired
}
export default Swiper;
