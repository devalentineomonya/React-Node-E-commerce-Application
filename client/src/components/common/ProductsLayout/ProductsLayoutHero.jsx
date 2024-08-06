import { useEffect } from "react";
import "./productslayout.css";
import testImage from "../../../assets/images/63e8c4e4aed3c6720e446aa1_airpod max-min.png";
import scrollReveal from "scrollreveal";
import MainLayout from "../MainLayout/MainLayout";

const ProductsLayoutHero = () => {
  useEffect(() => {
    const sr = scrollReveal({
      origin: "bottom",
      distance: "120px",
      duration: 1000,
      delay: 300,
      reset: true, 
    });
    sr.reveal(".products-layout-hero-image");
  }, []);

  return (
    <MainLayout>
      <div className="products-layout-hero-container">
        <div className="products-layout-hero-text">
          <h1>Grab upto 50% Off on selected Item</h1>
          <button     title="Buy"
                aria-label="Buy">Buy Now</button>
        </div>
        <div className="products-layout-hero-image">
          <img src={testImage} alt="product-layout-image" loading="lazy" />
        </div>
      </div>
    </MainLayout>
  );
};

export default ProductsLayoutHero;
