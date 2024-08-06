import SectionLayout from "../../common/SectionLayout/SectionLayout";
import ProductCard from "../../common/ProductCard/ProductCard";
import "./bestdeals.css";
const BestDeals = () => {
  return (
    <SectionLayout title="Todays Best Deals for you!">
      <>
        <div className="filter-buttons">
          <button     title="All Filters"
                aria-label="All Filters">All</button>
        </div>
        <div className="deals-grid-container">
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
        </div>
      </>
    </SectionLayout>
  );
};

export default BestDeals;
