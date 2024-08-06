import SectionLayout from '../../common/SectionLayout/SectionLayout'
import ProductCard from '../../common/ProductCard/ProductCard'
import Swiper from '../../common/Swiper/Swiper'

const PopularProducts = () => {
  return (
    <SectionLayout title="Weekly Popular Products">
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

export default PopularProducts
