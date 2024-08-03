import HomeHero from '../../components/Home/HomeHero/HomeHero'
import HomeCategories from '../../components/Home/HomeCategories/HomeCategories'
import FeaturedProducts from '../../components/Home/FeaturedProducts/FeaturedProducts'
import HomeBrands from '../../components/Home/HomeBrands/HomeBrands'
import ProductOffers from '../../components/Home/ProductOffers/ProductOffers'
import PopularProducts from '../../components/Home/PopularProducts/PopularProducts'
import CashBackBanner from '../../components/Home/CashBackBanner/CashBackBanner'
import DiscountBanner from '../../components/Home/DiscountBanner/DiscountBanner'
import BestDeals from '../../components/Home/BestDeals/BestDeals'
import MostSelling from '../../components/Home/MostSelling/MostSelling'
import TrendingProducts from '../../components/Home/TrendingProducts/TrendingProducts'
import OurServices from '../../components/Home/OurServices/OurServices'
import BestStores from '../../components/Home/BestStores/BestStores'

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
      <BestDeals/>
      <DiscountBanner/>
      <MostSelling/>
      <TrendingProducts/>
      <BestStores/>
      <OurServices/>
    </>
  )
}

export default Home
