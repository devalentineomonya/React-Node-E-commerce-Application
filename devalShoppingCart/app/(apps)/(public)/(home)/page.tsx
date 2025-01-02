import Hero from "@/screens/home/widgets/Hero";
import TopCategories from "@/screens/home/widgets/TopCategories";
import NewsLetter from "@/screens/home/widgets/NewsLetter";
import BestSelling from "@/screens/home/widgets/BestSelling";
import TopBrands from "@/screens/home/widgets/TopBrands";
import PopularOffers from "@/screens/home/widgets/ProductOffers";
import PopularProducts from "@/screens/home/widgets/PopularProducts";
import OfferBanner from "@/screens/home/widgets/OfferBanner";
import BestDeals from "@/screens/home/widgets/BestDeals";
export default function Home() {
  return (
    <>
      <Hero />
      <TopCategories />
      <BestSelling />
      <TopBrands/>
      <PopularOffers/>
      <PopularProducts/>
      <OfferBanner/>
      <BestDeals/>
      <NewsLetter />
    </>
  );
}
