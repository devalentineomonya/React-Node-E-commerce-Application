import NavbarMain from "./components/common/Navbar/NavbarMain";
import Footer from "./components/common/Footer/Footer";
import Home from "./pages/home/Home";
import ProductsLayout from "./components/common/ProductsLayout/ProductsLayout";
import ProductDetails from "./pages/ProductDetails/ProductDetails";

function App() {
  return (
    <>
      <NavbarMain />
      {/* <Home /> */}
      {/* <ProductsLayout/> */}
      <ProductDetails/>
      <Footer/>
    </>
  );
}

export default App;
