import NavbarMain from "./components/common/Navbar/NavbarMain";
import Footer from "./components/common/Footer/Footer";
import Router from "./route";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./components/Auth/auth.css";
import Loading from "./components/common/Loading/Loading";
import useAppData from "./hooks/useAppData";


function App() {
  const [isAuthRoute, setIsAuthRoute] = useState(false);
  const location = useLocation();

  const { userLoading, productLoading, categoryLoading } = useAppData();

  useEffect(() => {
    setIsAuthRoute(location.pathname.includes("/auth"));
  }, [location.pathname]);

  return (
    <>
      <ToastContainer position="top-center" />

      <NavbarMain />
      {(userLoading || productLoading || categoryLoading) ? <Loading /> : <Router />}
      {!isAuthRoute && <Footer />}
    </>
  );
}

export default App;
