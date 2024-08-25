import SectionLayout from "../../common/SectionLayout/SectionLayout";
import ProductCard from "../../common/ProductCard/ProductCard";
import "./bestdeals.css";
import { useSelector } from "react-redux";
const BestDeals = () => {
  const products = useSelector((state) => state.product.products);
  
  return (
    <SectionLayout title="Todays Best Deals for you!">
      <>
        <div className="filter-buttons">
          <button title="All Filters" aria-label="All Filters">
            All
          </button>
        </div>
        <div className="deals-grid-container">
          {products?.slice(0, 10)?.map((product) => (
            <ProductCard product={product} key={product?.id} animate />
          ))}
        </div>
      </>
    </SectionLayout>
  );
};

export default BestDeals;
