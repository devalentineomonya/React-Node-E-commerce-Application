import HomeHero from "../../components/Home/HomeHero/HomeHero";
import HomeCategories from "../../components/Home/HomeCategories/HomeCategories";
import FeaturedProducts from "../../components/Home/FeaturedProducts/FeaturedProducts";
import HomeBrands from "../../components/Home/HomeBrands/HomeBrands";
import ProductOffers from "../../components/Home/ProductOffers/ProductOffers";
import PopularProducts from "../../components/Home/PopularProducts/PopularProducts";
import CashBackBanner from "../../components/Home/CashBackBanner/CashBackBanner";
import DiscountBanner from "../../components/Home/DiscountBanner/DiscountBanner";
import BestDeals from "../../components/Home/BestDeals/BestDeals";
import MostSelling from "../../components/Home/MostSelling/MostSelling";
import TrendingProducts from "../../components/Home/TrendingProducts/TrendingProducts";
import OurServices from "../../components/Home/OurServices/OurServices";
import BestStores from "../../components/Home/BestStores/BestStores";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { decryptMessage } from "../../../utils/decryptionUtil";

const Home = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const encryptedMessage = searchParams.get("msg_id"); 
  const user = useSelector((state) => state.auth.user);
  
  useEffect(() => {
    if (encryptedMessage) {
      const message = decryptMessage(encryptedMessage);

      if (message && user && user?.isVerified) {
        toast.success(message);
        navigate("/", { replace: true });
      } else if (message && !user && !user?.isVerified) {
        navigate("/");
      }
    }
  }, [encryptedMessage, user?.isVerified, user, navigate]);

  return (
    <>
      <HomeHero />
      <HomeCategories />
      <FeaturedProducts />
      <HomeBrands />
      <ProductOffers />
      <PopularProducts />
      <CashBackBanner />
      <BestDeals />
      <DiscountBanner />
      <MostSelling />
      <TrendingProducts />
      <BestStores />
      <OurServices />
    </>
  );
};

export default Home;
