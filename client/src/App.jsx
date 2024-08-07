import NavbarMain from "./components/common/Navbar/NavbarMain";
import Footer from "./components/common/Footer/Footer";
import Home from "./pages/home/Home";
import ProductsLayout from "./components/common/ProductsLayout/ProductsLayout";
import ProductDetails from "./pages/ProductDetails/ProductDetails";
import Cart from "./pages/Cart/Cart";
import Auth from "./pages/Auth/Auth";

function App() {
  return (
    <>
      <NavbarMain />
      {/* <Home /> */}
      {/* <ProductsLayout/> */}
      {/* <ProductDetails/> */}
      {/* <Cart/> */}
      <Auth/>
      <Footer/>

    </>
  );
}

export default App;
