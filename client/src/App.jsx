/* eslint-disable react-hooks/rules-of-hooks */
import NavbarMain from "./components/common/Navbar/NavbarMain";
import Footer from "./components/common/Footer/Footer";
import Router from "./route";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./components/Auth/auth.css";
import { useSelector } from "react-redux";
import { useFetchUserDataQuery } from "../app/features/user/userAPI";
import Loading from "./components/common/Loading/Loading";

function App() {
  const [isAuthRoute, setIsAuthRoute] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setIsAuthRoute(location.pathname.includes("/auth"));
  }, [location.pathname]);

  const token = localStorage.getItem("token") ?? null;
  const userId = localStorage.getItem("userId") ?? null;
  // const user = useSelector(state => state.auth.user)

  const { data, error, isLoading } = useFetchUserDataQuery(1);
  
  console.log(data, error,isLoading);

  return (
    <>
      <ToastContainer position="top-center" />

      <NavbarMain />
      {isLoading ? <Loading /> : <Router />}
      {!isAuthRoute && <Footer />}
    </>
  );
}

export default App;
