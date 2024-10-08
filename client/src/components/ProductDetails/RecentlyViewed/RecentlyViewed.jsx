import ProductCard from "../../common/ProductCard/ProductCard";
import SectionLayout from "../../layouts/SectionLayout/SectionLayout";
import Swiper from "../../common/Swiper/Swiper";

const RecentlyViewed = () => {
  return (
    <SectionLayout title="Recently Viewed!" overflow>
        <Swiper>
   <ProductCard  />
   <ProductCard  />
   <ProductCard  />
   <ProductCard  />
   <ProductCard  />
   <ProductCard  />
   <ProductCard  />
   </Swiper>
    </SectionLayout>
  );
};

export default RecentlyViewed;
