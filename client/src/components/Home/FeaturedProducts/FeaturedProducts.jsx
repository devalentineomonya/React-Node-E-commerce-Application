import ProductCard from "../../common/ProductCard/ProductCard"
import SectionLayout from "../../common/SectionLayout/SectionLayout"
import "./featuredproducts.css"
const FeaturedProducts = () => {
  return (
  <SectionLayout title="Todays Best Deals for you!">
    <ProductCard />
  </SectionLayout>
  )
}

export default FeaturedProducts
