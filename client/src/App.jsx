import NavbarMain from "./components/common/Navbar/NavbarMain";
import Footer from "./components/common/Footer/Footer";
import Router from "./route";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

function App() {
  const [isAuthRoute, setIsAuthRoute] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setIsAuthRoute(location.pathname.includes("/auth"));
  }, [location.pathname]);

  return (
    <>
      <NavbarMain />
      <Router />
      {!isAuthRoute && <Footer />}
    </>
  );
}

export default App;
