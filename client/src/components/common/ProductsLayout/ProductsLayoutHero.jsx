import "./productslayout.css";
import testImage from "../../../assets/images/63e8c4e4aed3c6720e446aa1_airpod max-min.png";
import scrollReveal from "scrollreveal";
const ProductsLayoutHero = () => {
  const options = {
    delay:3,
    distance: "120px",
  };
  scrollReveal().reveal(options, ".products-layout-hero-image");
  return (
    <div className="products-layout-container">
      <div className="products-layout-hero-text">
        <h1>Grab upto 50% Off on selected Item</h1>
        <button>Buy Now</button>
      </div>
      <div className="products-layout-hero-image">
        <img src={testImage} alt="product-layout-image" />
      </div>
    </div>
  );
};

export default ProductsLayoutHero;
