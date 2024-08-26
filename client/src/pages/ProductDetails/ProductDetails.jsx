import { useDispatch, useSelector } from "react-redux";
import {
  useAddViewedProductMutation,
  useGetProductByIdQuery,
} from "../../../app/features/product/productAPI";
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
import { setUser } from "../../../app/features/auth/authSlice";

const ProductDetails = () => {
  const { productId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);
  const {
    data: productData,
    isLoading: productLoading,
    error: productError,
  } = useGetProductByIdQuery(productId, {
    skip: !productId,
  });

  const [addView] = useAddViewedProductMutation();

  useEffect(() => {
    const handleViewedProduct = async () => {
      if (productData) {
        dispatch(setCurrentProduct(productData?.data));

        if (user) {
          const alreadyViewed = user.recentItems?.includes(productId);

          if (!alreadyViewed) {
            try {
              const response = await addView(productId);
              console.log(response?.data?.data)
              if (response?.data?.data) {
                await dispatch(setUser(response?.data?.data));
              }
            } catch (error) {
              console.error("Error adding viewed product:", error);
            }
          }
        } else {
          const storedViewedItems =
            JSON.parse(localStorage.getItem("viewedItems")) || [];
          if (!storedViewedItems.includes(productId)) {
            storedViewedItems.push(productId);
            localStorage.setItem(
              "viewedItems",
              JSON.stringify(storedViewedItems)
            );
          }
        }
      } else if (productError) {
        navigate(localStorage.getItem("currentProductUrl") ?? "/");
      }
    };

    handleViewedProduct();
  }, [
    productData,
    productError,
    dispatch,
    navigate,
    user,
    productId,
    addView,
  ]);

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
