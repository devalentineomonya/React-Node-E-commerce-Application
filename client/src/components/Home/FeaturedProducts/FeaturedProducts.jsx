import ProductCard from "../../common/ProductCard/ProductCard"
import SectionLayout from "../../common/SectionLayout/SectionLayout"
import Swiper from "../../common/Swiper/Swiper"
import "./featuredproducts.css"
const FeaturedProducts = () => {
  return (
  <SectionLayout title="Todays Best Deals for you!">
    <Swiper>
    <ProductCard />
    <ProductCard />
    <ProductCard />
    <ProductCard />
    <ProductCard />
    <ProductCard />
    <ProductCard />
    <ProductCard />
    <ProductCard />
    </Swiper>
  </SectionLayout>
  )
}

export default FeaturedProducts
