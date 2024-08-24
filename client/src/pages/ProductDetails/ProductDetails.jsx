import { useDispatch } from "react-redux";
import { useGetProductByIdQuery } from "../../../app/features/product/productAPI";
import MainLayout from "../../components/common/MainLayout/MainLayout";
import BreadCrumb from "../../components/ProductDetails/BreadCrumb/BreadCrumb";
import MoreAboutProduct from "../../components/ProductDetails/MoreAboutProduct/MoreAboutProduct";
import ProductInfo from "../../components/ProductDetails/ProductInfo/ProductInfo";
import RecentlyViewed from "../../components/ProductDetails/RecentlyViewed/RecentlyViewed";
import RecommendedProducts from "../../components/ProductDetails/RecommendedProducts/RecommendedProducts";
import SimilarProducts from "../../components/ProductDetails/SimilarProducts/SimilarProducts";
import { useNavigate, useParams } from "react-router-dom";
import Loading from "../../components/common/Loading/Loading";
import { useEffect } from "react";
import { setCurrentProduct } from "../../../app/features/product/productSlice";

const ProductDetails = () => {
  const { productId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  console.log(productId);
  const {
    data: productData,
    isLoading: productLoading,
    error: productError,
  } = useGetProductByIdQuery(productId, {
    skip: !productId,
  });
  useEffect(() => {
    console.log(productData)
    if (productData) {
      dispatch(setCurrentProduct(productData?.data));
    } else if (productError || productData?.error) {
      return navigate(localStorage.getItem("currentProductUrl") ?? "/");
    }
  }, [productData, productLoading, productError, dispatch, navigate]);
  return (
    <>
      <MainLayout>
        <BreadCrumb />
        {productLoading ? (
          <Loading />
        ) : (
          <>
            <ProductInfo />
            <MoreAboutProduct />
          </>
        )}
      </MainLayout>
      {!productLoading && (
        <>
          <SimilarProducts />
          <RecommendedProducts />
        </>
      )}
      <RecentlyViewed />
    </>
  );
};

export default ProductDetails;
