import Services from "@/screens/home/widgets/Services";
import PopularProducts from "@/screens/home/widgets/PopularProducts";
import ProductCard from "@/components/shared/ProductCard/ProductCard";
import SectionLayout from "../section/SectionLayout";
import ProductsLayoutFilter from "./ProductsLayoutFilter";
import ProductsLayoutPagination from "./ProductsLayoutPagination";

const ProductsLayoutMain = () => {
  return (
    <>
      <ProductsLayoutFilter />
      <SectionLayout title="Products For You !">
        <div className="grid sm:justify-center grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-3 gap-y-12">
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
        <Services />
      </SectionLayout>
    </>
  );
};

export default ProductsLayoutMain;
