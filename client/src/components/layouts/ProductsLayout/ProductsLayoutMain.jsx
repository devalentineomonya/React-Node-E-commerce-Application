import OurServices from "../../Home/OurServices/OurServices";
import PopularProducts from "../../Home/PopularProducts/PopularProducts";
import ProductCard from "../../common/ProductCard/ProductCard";
import SectionLayout from "../SectionLayout/SectionLayout";
import ProductsLayoutFilter from "./ProductsLayoutFilter";
import ProductsLayoutPagination from "./ProductsLayoutPagination";

const ProductsLayoutMain = () => {
  return (
    <>
      <ProductsLayoutFilter />
      
      <SectionLayout title="Products For You !">
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
          <ProductCard />
        </div>
        <ProductsLayoutPagination />
        <PopularProducts />
        <OurServices />
      </SectionLayout>
    </>
  );
};

export default ProductsLayoutMain;
