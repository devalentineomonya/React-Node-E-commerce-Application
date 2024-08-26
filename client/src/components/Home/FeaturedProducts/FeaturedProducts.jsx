import { useSelector } from "react-redux";
import ProductCard from "../../common/ProductCard/ProductCard";
import SectionLayout from "../../common/SectionLayout/SectionLayout";
import Swiper from "../../common/Swiper/Swiper";
import "./featuredproducts.css";
const FeaturedProducts = () => {
  const products = useSelector((state) => state.product.products);
  const bestDealProducts = products.filter(product => product.label === "BestSelling")
  return (
    <SectionLayout title="Best Selling Products for you!" overflow>
      <Swiper>
        {bestDealProducts?.slice(0, 10).map((product) => (
          <ProductCard product={product} key={product.id} />
        ))}
      </Swiper>
    </SectionLayout>
  );
};

export default FeaturedProducts;
