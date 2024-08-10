import { Routes, Route, Navigate } from "react-router-dom";
import  { Suspense, lazy } from "react";
import Loading from "./components/common/Loading/Loading";
const MyAccount = lazy(()=> import("./pages/MyAccount/MyAccount"))
const Home = lazy(() => import("./pages/home/Home"));
const ProductsLayout = lazy(() => import("./components/common/ProductsLayout/ProductsLayout"));
const Auth = lazy(() => import("./pages/Auth/Auth"));
const ProductDetails = lazy(() => import("./pages/ProductDetails/ProductDetails"));
const Cart = lazy(() => import("./pages/Cart/Cart"));
const Profile = lazy(() => import("./pages/Profile/Profile"));

const Router = () => {
  return (
    <Suspense fallback={<Loading/>}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<ProductsLayout />} />
        <Route path="/new-products" element={<ProductsLayout />} />
        <Route path="/deals" element={<ProductsLayout />} />
        <Route path="/auth/:authType" element={<Auth />} />
        <Route path="/auth" element={<Navigate to="login" />} />
        <Route path="/product/:productId" element={<ProductDetails />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/search" element={<ProductsLayout />} />
        <Route path="/profile" element={<Navigate to="me" />} />
        <Route path="profile/:profilePage" element={<Profile />} />
        <Route path="profile/:profilePage/:pageAction" element={<Profile />} />
        <Route path="/my-account" element={<MyAccount/>}/>
      </Routes>
    </Suspense>
  );
};

export default Router;
