import ProductImageMain from "../../../assets/images/63e8c4e4aed3c6720e446aa1_airpod max-min.png"
import ProductImageSmall from "../../../assets/images/63ec537ef441a709d3a83278_Rectangle 1437-4.png"
const ProductImages = () => {
  return (
    <div className="product-images">
      <div className="product-image-main">
        <img src={ProductImageMain} alt="product-image-main" loading="lazy" />
      </div>
      <div className="product-image-small">
        <img  src={ProductImageSmall} alt="product-image-small" loading="lazy" />
        <img src={ProductImageSmall} alt="product-image-small" loading="lazy" />
        <img src={ProductImageSmall} alt="product-image-small" loading="lazy" />
        <img src={ProductImageSmall} alt="product-image-small" loading="lazy" />
      </div>
    </div>
  );
};

export default ProductImages;
