import testImage from "../../../assets/images/63e8c4e6eaf8537c8058cf04_store four-min.png";
import testLogo from "../../../assets/images/63e8c4e4c21faa5e03c209c5_brand (1)-min.png";
import priceTag from "../../../assets/images/63ea2eeefd8efb290e2d7d78_Icon.png"
const BestStoreCard = () => {
  return (
    <div className="best-store-card">
      <div className="best-store-images">
        <div className="best-store-product-image">
          <img src={testImage} alt="best-store-product-image" loading="lazy" />
        </div>
        <div className="best-store-logo">
          <img src={testLogo} alt="best-store-logo" loading="lazy" />
        </div>
      </div>
      <div className="best-store-info">
        <h4>Staple</h4>
        <p>Bag. Perfume</p>
        <p className="delivery"><img src={priceTag} alt="price-tag" loading="lazy" /> Delivered within 24 hours</p>
      </div>
    </div>
  );
};

export default BestStoreCard;
