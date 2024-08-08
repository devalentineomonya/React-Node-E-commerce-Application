import { useEffect } from "react";
import "./productslayout.css";
import testImage from "../../../assets/images/63e8c4e4aed3c6720e446aa1_airpod max-min.png";
import scrollReveal from "scrollreveal";
import MainLayout from "../MainLayout/MainLayout";

const ProductsLayoutHero = () => {
  useEffect(() => {
    // Image reveal
    const revealImage = scrollReveal({
      origin: "right",
      distance: "80px",
      duration: 800,
      delay: 200,
      scale: 0.9,
      interval: 20,
      reset: true,
    });

    // Text reveal
    const revealText = scrollReveal({
      origin: "left",
      distance: "80px",
      duration: 1200,
      delay: 300,
      scale: 0.9,
      interval: 10,
      reset: true,
    });

    // Button reveal
    const revealButton = scrollReveal({
      origin: "bottom",
      distance: "60px",
      duration: 1000,
      delay: 500,
      scale: 0.95,
      interval: 15,
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
            Grab up to 50% Off on Selected Items
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
