import SectionLayout from "../../common/SectionLayout/SectionLayout";
import ProductCard from "../../common/ProductCard/ProductCard";
import Swiper from "../../common/Swiper/Swiper";
import { useSelector } from "react-redux";

const MostSelling = () => {
  const products = useSelector((state) => state.product.products);
  const mostSellingProducts = products.filter(
    (product) => product.label === "MostSelling"
  );
  return (
    <SectionLayout title="Most Selling Products" overflow>
      <Swiper>
        {mostSellingProducts?.map((product) => (
          <ProductCard product={product} key={product?.id} />
        ))}
      </Swiper>
    </SectionLayout>
  );
};

export default MostSelling;
