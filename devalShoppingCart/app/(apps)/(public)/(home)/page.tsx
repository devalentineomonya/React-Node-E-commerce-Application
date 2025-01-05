"use client"
import Hero from "@/screens/home/widgets/Hero";
import TopCategories from "@/screens/home/widgets/TopCategories";
import NewsLetter from "@/screens/home/widgets/NewsLetter";
import BestSelling from "@/screens/home/widgets/BestSelling";
import TopBrands from "@/screens/home/widgets/TopBrands";
import PopularOffers from "@/screens/home/widgets/ProductOffers";
import PopularProducts from "@/screens/home/widgets/PopularProducts";
import OfferBanner from "@/screens/home/widgets/OfferBanner";
import BestDeals from "@/screens/home/widgets/BestDeals";
import PromotionBanner from "@/screens/home/widgets/PromotionBanner";
import MostSelling from "@/screens/home/widgets/MostSelling";
import TrendingProducts from "@/screens/home/widgets/TrendingProducts";
import BestStores from "@/screens/home/widgets/BestStores";
import Services from "@/screens/home/widgets/Services";
import { useGetUsers } from "@/features/users/get-users";
export default function Home() {
    const {data:users, isError} = useGetUsers()
    console.log(users)
    console.log("Error", isError)
  return (
    <>
      <Hero />
      <TopCategories />
      <BestSelling />
      <TopBrands />
      <PopularOffers />
      <PopularProducts />
      <OfferBanner />
      <BestDeals />
      <PromotionBanner />
      <MostSelling />
      <TrendingProducts />
      <BestStores/>
      <Services/>
      <NewsLetter />
    </>
  );
}
