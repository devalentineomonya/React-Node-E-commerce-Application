import MainLayout from "../../components/common/MainLayout/MainLayout";
import BreadCrumb from "../../components/ProductDetails/BreadCrumb/BreadCrumb";
import MoreAboutProduct from "../../components/ProductDetails/MoreAboutProduct/MoreAboutProduct";
import ProductInfo from "../../components/ProductDetails/ProductInfo/ProductInfo";
import RecentlyViewed from "../../components/ProductDetails/RecentlyViewed/RecentlyViewed";
import RecommendedProducts from "../../components/ProductDetails/RecommendedProducts/RecommendedProducts";
import SimilarProducts from "../../components/ProductDetails/SimilarProducts/SimilarProducts";

const ProductDetails = () => {
  return (
    <>
      <MainLayout>
        <BreadCrumb />
        <ProductInfo />
        <MoreAboutProduct />
      </MainLayout>
      <SimilarProducts />
      <RecommendedProducts />
      <RecentlyViewed/>
    </>
  );
};

export default ProductDetails;
