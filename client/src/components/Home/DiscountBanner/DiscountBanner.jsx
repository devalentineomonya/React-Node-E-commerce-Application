import "./discountbanner.css";
import cardOne from "../../../assets/images/63e8c4e768e3260571e48a0c_visa card-min.png";
import cardTwo from "../../../assets/images/63e8c4e71eb4ad08ebe75690_visa card 02-min.png";
import cardThree from "../../../assets/images/63ea1a963f08a8c3dcd7c945_visa card 03.svg";
import MainLayout from "../../common/MainLayout/MainLayout";
import { Link } from "react-router-dom";
const DiscountBanner = () => {
  return (
    <MainLayout bg="bg-[#ffe6cc]" mt="mt-24">
      <div className="discount-banner-container">
        <div className="discount-banner-text">
          <h1> Get 5% Cash Discount</h1>
          <p>
            on
            <Link to={location.href}>
              {location.origin.startsWith("http://")
                ? location.origin.substring(7)
                : location.origin.substring(8)}
            </Link>
          </p>

          <button>Learn More</button>
        </div>
        <div className="discount-card-thumbnail-wrap">
          <div className="card-one">
            <img src={cardOne} loading="lazy" alt="card-one" className="card-image" />
          </div>
          <div className="card-two">
            <img src={cardTwo} loading="lazy" alt="card-two" className="card-image" />
          </div>
          <div className="card-three">
            <img src={cardThree} loading="lazy" alt="card-three" className="card-image" />
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default DiscountBanner;
