import testImage from "../../../assets/images/63e8c4e6eaf8537c8058cf04_store four-min.png";
import testLogo from "../../../assets/images/63e8c4e4c21faa5e03c209c5_brand (1)-min.png";

const BestStoreCard = () => {
  return (
    <div className="best-store-card">
      <div className="best-store-images">
        <div className="best-store-product-image">
          <img src={testImage} alt="" />
        </div>
        <div className="best-store-logo">
          <img src={testLogo} alt="" />
        </div>
      </div>
      <div className="best-store-info">
        <h4>Staple</h4>
        <p>Bag. Perfume</p>
        <p className="delivery"> Delivered within 24 hours</p>
      </div>
    </div>
  );
};

export default BestStoreCard;
