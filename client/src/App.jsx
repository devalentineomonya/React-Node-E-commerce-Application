import NavbarMain from "./components/common/Navbar/NavbarMain";
import Footer from "./components/common/Footer/Footer";
import Router from "./route";
import { useEffect, useState } from "react";

function App() {
  const [isAuthRoute, setIsAuthRoute] = useState(false);
  useEffect(() => {
    setIsAuthRoute(location.pathname.includes("auth"));
  },[]);

  return (
    <>
      <NavbarMain />
      <Router />
      {!isAuthRoute && <Footer />}
    </>
  );
}

export default App;
