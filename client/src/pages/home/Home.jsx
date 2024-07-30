import HomeHero from '../../components/Home/HomeHero/HomeHero'
import HomeCategories from '../../components/Home/HomeCategories/HomeCategories'
import FeaturedProducts from '../../components/Home/FeaturedProducts/FeaturedProducts'
import HomeBrands from '../../components/Home/HomeBrands/HomeBrands'
import ProductOffers from '../../components/Home/ProductOffers/ProductOffers'
import PopularProducts from '../../components/Home/PopularProducts/PopularProducts'
import CashBackBanner from '../../components/Home/CashBackBanner/CashBackBanner'

const Home = () => {
  return (
    <>
      <HomeHero/>
      <HomeCategories/>
      <FeaturedProducts/>
      <HomeBrands/>
      <ProductOffers/>
      <PopularProducts/>
      <CashBackBanner/>
    </>
  )
}

export default Home
