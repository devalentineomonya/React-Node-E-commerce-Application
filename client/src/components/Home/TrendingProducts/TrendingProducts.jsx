import SectionLayout from "../../common/SectionLayout/SectionLayout";
import TrendingProductCard from "./TrendingProductCard";
import "./trendingproducts.css"

const TrendingProducts = () => {
  return (
    <SectionLayout title="Trending Products For You!">
      <div className="tending-products-container">
        <TrendingProductCard />
        <TrendingProductCard />
      </div>
    </SectionLayout>
  );
};

export default TrendingProducts;
