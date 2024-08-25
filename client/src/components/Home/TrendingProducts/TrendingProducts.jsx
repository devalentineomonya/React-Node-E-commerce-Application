import { useSelector } from "react-redux";
import SectionLayout from "../../common/SectionLayout/SectionLayout";
import TrendingProductCard from "./TrendingProductCard";
import "./trendingproducts.css";

const TrendingProducts = () => {
  const products = useSelector((state) => state.product.products);
  const trendingProducts = products.filter(
    (product) => product.label === "Trending"
  );
  return (
    <SectionLayout title="Trending Products For You!">
      <div className="tending-products-container">
        {trendingProducts?.slice(1, 2)?.map((product) => (
          <TrendingProductCard product={product} key={product?.id} />
        ))}
        <TrendingProductCard />
      </div>
    </SectionLayout>
  );
};

export default TrendingProducts;
