import { Routes, Route, Navigate } from "react-router-dom";
import  { Suspense, lazy } from "react";
import Loading from "./components/common/Loading/Loading";
import { useSelector } from "react-redux";
const MyAccount = lazy(()=> import("./pages/MyAccount/MyAccount"))
const Home = lazy(() => import("./pages/home/Home"));
const ProductsLayout = lazy(() => import("./components/common/ProductsLayout/ProductsLayout"));
const Auth = lazy(() => import("./pages/Auth/Auth"));
const ProductDetails = lazy(() => import("./pages/ProductDetails/ProductDetails"));
const Cart = lazy(() => import("./pages/Cart/Cart"));
const Profile = lazy(() => import("./pages/Profile/Profile"));
const UserRedirect = lazy(() => import("./hooks/useRedirect"))

const Router = () => {
  const user = useSelector(state=> state.auth.user)
  console.log(user)
  return (
    <Suspense fallback={<Loading/>}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<ProductsLayout />} />
        <Route path="/auth" element={<Navigate to="login" />} />
        <Route path="/cart" element={!user ? <UserRedirect to="/auth/login"/> : !user.isActive ? <UserRedirect to="/auth/verify"/> : <Cart />} /> 
        <Route path="/deals" element={<ProductsLayout />} />
        <Route path="/search" element={<ProductsLayout />} />
        <Route path="/profile" element={<Navigate to="me" />} /> 
        <Route path="/my-account" element={!user ? <UserRedirect to="/auth/login"/> : !user.isActive ? <UserRedirect to="/auth/verify"/> : <MyAccount />} /> 
        <Route path="/new-products" element={<ProductsLayout />} />
        <Route path="/auth/:authType" element={<Auth user={user} />} />
        <Route path="/product/:productId" element={<ProductDetails />} />
        <Route path="profile/:profilePage" element={!user ? <UserRedirect to="/auth/login"/> : !user.isActive ? <UserRedirect to="/auth/verify"/> : <Profile />} /> 
        <Route path="profile/:profilePage/:pageAction" element={!user ? <UserRedirect to="/auth/login"/> : !user.isActive ? <UserRedirect to="/auth/verify"/> : <Profile />} /> 
      </Routes>
    </Suspense>
  );
};

export default Router;
