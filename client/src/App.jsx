import NavbarMain from "./components/common/Navbar/NavbarMain";
import Footer from "./components/common/Footer/Footer";
import Router from "./route";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./components/Auth/auth.css";
import { useDispatch, useSelector } from "react-redux";
import { useFetchUserDataQuery } from "../app/features/user/userAPI";
import Loading from "./components/common/Loading/Loading";
import { clearUser, setUser } from "../app/features/auth/authSlice";
import { useGetProductsQuery } from "../app/features/product/productAPI";
import { setProducts } from "../app/features/product/productSlice";

function App() {
  const [isAuthRoute, setIsAuthRoute] = useState(false);
  const location = useLocation();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    setIsAuthRoute(location.pathname.includes("/auth"));
  }, [location.pathname]);

  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");

  const { userData, error, isLoading } = useFetchUserDataQuery(userId, {
    skip: !token || !userId,
  });
  const { productData, productError, productLoading } = useGetProductsQuery();

  useEffect(() => {
    if (userData?.data) {
      dispatch(setUser(userData.data));
    } else if (error) {
      dispatch(clearUser());
    }
  }, [userData, error, dispatch]);


  useEffect(() => {
    if (productData?.data) {
      dispatch(setProducts(productData.data));
      console.log(productData)
    }else{
      console.log(productData)
    }
  }, [productData, dispatch,productError]);

  return (
    <>
      <ToastContainer position="top-center" />

      <NavbarMain />
      {isLoading && !user ? <Loading /> : <Router />}
      {!isAuthRoute && <Footer />}
    </>
  );
}

export default App;
