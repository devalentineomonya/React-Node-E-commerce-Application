import { useEffect } from "react";
import "./productslayout.css";
import testImage from "../../../assets/images/63e8c4e4aed3c6720e446aa1_airpod max-min.png";
import scrollReveal from "scrollreveal";
import MainLayout from "../MainLayout/MainLayout";

const ProductsLayoutHero = () => {
  useEffect(() => {
    const revealImage = scrollReveal({
      origin: "bottom",
      distance: "120px",
      duration: 500,
      delay: 100,
      scale: 0.5,
      interval: 10,
      reset: true,
    });
    const revealText = scrollReveal({
      origin: "left",
      distance: "500px",
      duration: 1000,
      delay: 500,
      scale: 0.7,
      interval: 5,
      reset: true,
    });
    const revealButton = scrollReveal({
      origin: "top",
      distance: "400px",
      duration: 500,
      delay: 1500,
      scale: 0.7,
      interval: 5,
      reset: true,
    });
    revealButton.reveal(".products-hero-button");
    revealText.reveal(".layout-hero-text");
    revealImage.reveal(".products-layout-hero-image");
  }, []);

  return (
    <MainLayout>
      <div className="products-layout-hero-container">
        <div className="products-layout-hero-text">
          <h1 className="layout-hero-text">
            Grab upto 50% Off on selected Item
          </h1>
          <button title="Buy" aria-label="Buy" className="products-hero-button">
            Buy Now
          </button>
        </div>
        <div className="products-layout-hero-image">
          <img src={testImage} alt="product-layout-image" loading="lazy" />
        </div>
      </div>
    </MainLayout>
  );
};

export default ProductsLayoutHero;
