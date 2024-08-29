import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useFetchUserDataQuery } from "../../app/features/user/userAPI";
import { useGetProductsQuery } from "../../app/features/product/productAPI";
import { clearUser, setUser } from "../../app/features/auth/authSlice";
import { setProducts } from "../../app/features/product/productSlice";
import { useGetCategoriesQuery } from "../../app/features/category/categoryAPI";
import { setCategories } from "../../app/features/category/categorySlice";
import { useGetAllBrandsQuery } from "../../app/features/brand/brandAPI";
import { setBrands } from "../../app/features/brand/brandSlice";
import { useGetCartQuery } from "../../app/features/cart/cartAPI";
import { setCartContent } from "../../app/features/cart/cartSlice";

const useAppData = () => {
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");

  const { data: userData, error: userError, isLoading: userLoading } = useFetchUserDataQuery(userId, {
    skip: !token || !userId,
  });

  const { data: cartData, error: cartError, isLoading: cartLoading } = useGetCartQuery({
    skip: !token || !userId,
  });

  const { data: productData, error: productError, isLoading: productLoading } = useGetProductsQuery();
  const { data: categoryData, error: categoryError, isLoading: categoryLoading } = useGetCategoriesQuery();
  const { data: brandData, error: brandError, isLoading: brandLoading } = useGetAllBrandsQuery();



  useEffect(() => {
    if (userData?.data) {
      dispatch(setUser(userData.data));
    } else if (userError) {
      dispatch(clearUser());
    }
  }, [userData, userError, dispatch]);




  useEffect(() => {
    if (productData?.data) {
      dispatch(setProducts(productData.data));
    }
  }, [productData, dispatch, productError]);




  useEffect(() => {
    if (categoryData?.data) {
      dispatch(setCategories(categoryData.data));
    }
  }, [categoryData, dispatch, categoryError]);



  useEffect(() => {
    if (brandData?.data) {
      dispatch(setBrands(brandData.data));
    }
  }, [brandData, dispatch, brandError]);


  useEffect(() => {
    console.log("Log from data fetching", cartData?.data)
    if (cartData?.data) {
      dispatch(setCartContent(cartData?.data?.items));
    }
  }, [cartData, dispatch, cartError]);




  return { userLoading, productLoading, categoryLoading, brandLoading, cartLoading };
};

export default useAppData;
