import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/home/Home";
import ProductsLayout from "./components/common/ProductsLayout/ProductsLayout";
import Auth from "./pages/Auth/Auth";
import ProductDetails from "./pages/ProductDetails/ProductDetails";
import Cart from "./pages/Cart/Cart";
// import UseRedirect from "./hooks/useRedirect";





const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/shop" element={<ProductsLayout/>}/>
      <Route path="/new-products" element={<ProductsLayout />} />
      <Route path="/deals" element={<ProductsLayout />} />
      <Route path="/auth/:authType" element={<Auth />} />
      <Route path="/auth" element={<Navigate to="login" />} />
      <Route path="/product/:id" element={<ProductDetails />} />
      <Route path="/cart" element={<Cart/>} />
      {/* <Route path="profile" element={<Profile/>}/> <Cart />*/}
      {/* <Route path="/deliveries" element={<Deliveries/>}/> */}
    </Routes>
  );
};

export default Router;