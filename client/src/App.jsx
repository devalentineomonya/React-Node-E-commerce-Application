import NavbarMain from "./components/common/Navbar/NavbarMain";
import Footer from "./components/common/Footer/Footer";
import Home from "./pages/home/Home";
import ProductsLayout from "./components/common/ProductsLayout/ProductsLayout";

function App() {
  return (
    <>
      <NavbarMain />
      {/* <Home /> */}
      <ProductsLayout/>
      <Footer/>
    </>
  );
}

export default App;
