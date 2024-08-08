import { useEffect } from "react";
import "./productslayout.css";
import testImage from "../../../assets/images/63e8c4e4aed3c6720e446aa1_airpod max-min.png";
import scrollReveal from "scrollreveal";
import MainLayout from "../MainLayout/MainLayout";
import { revealConfig } from "../../../../config/ScrollConfig";


const ProductsLayoutHero = () => {
  useEffect(() => {
 

    const revealImage = scrollReveal({
      ...revealConfig,
      origin: "right",
      delay: 200,
    });

    const revealText = scrollReveal({
      ...revealConfig,
      origin: "left",
      duration: 1200,
      delay: 300,
    });

    const revealButton = scrollReveal({
      ...revealConfig,
      origin: "bottom",
      duration: 1000,
      delay: 500,
    });

    revealImage.reveal(".products-layout-hero-image");
    revealText.reveal(".layout-hero-text");
    revealButton.reveal(".products-hero-button");

    
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
