import ProductCard from "../../common/ProductCard/ProductCard"
import SectionLayout from "../../common/SectionLayout/SectionLayout"
import Swiper from "../../common/Swiper/Swiper"

const SimilarProducts = () => {
  return (
    <SectionLayout title="Similar Items You May Like!" overflow>
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

export default SimilarProducts
