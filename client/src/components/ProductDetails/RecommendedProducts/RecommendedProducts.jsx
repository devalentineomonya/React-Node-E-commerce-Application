import ProductCard from "../../common/ProductCard/ProductCard"
import SectionLayout from "../../common/SectionLayout/SectionLayout"
import Swiper from "../../common/Swiper/Swiper"

const RecommendedProducts = () => {
  return (
    <SectionLayout title="Products recommended for you!" overflow>
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
  )
}

export default RecommendedProducts
