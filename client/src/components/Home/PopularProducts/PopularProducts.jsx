import SectionLayout from "../../common/SectionLayout/SectionLayout";
import ProductCard from "../../common/ProductCard/ProductCard";
import Swiper from "../../common/Swiper/Swiper";
import { useSelector } from "react-redux";

const PopularProducts = () => {
  const products = useSelector((state) => state.product.products);
  const popularProducts = products.filter(
    (product) => product.label === "Popular"
  );
  return (
    <SectionLayout title="Weekly Popular Products" overflow>
      <Swiper>
        {popularProducts?.slice(0, 10).map((product) => (
          <ProductCard product={product} key={product?.id} animate />
        ))}
      </Swiper>
    </SectionLayout>
  );
};

export default PopularProducts;
