import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import UseRedirect from "./hooks/useRedirect";
import ResetPassword from "./components/Auth/ResetPassword";
import Search from "./pages/Search/Search";
import GoogleAuthCallback from "./components/Auth/AuthCallBack";
import ScrollToTop from "../utils/scrollToTopUtil";
import Home from "./pages/home/Home";
import Cart from "./pages/Cart/Cart";
import SignUp from "./components/Auth/SignUp";
import SignIn from "./components/Auth/SignIn";
import Profile from "./pages/Profile/Profile";
import OtpForm from "./components/Auth/OtpForm";
import MyAccount from "./pages/MyAccount/MyAccount";
import PasswordReset from "./components/Auth/PasswordReset";
import ProductDetails from "./pages/ProductDetails/ProductDetails";
import ProductsLayout from "./components/layouts/ProductsLayout/ProductsLayout";

const Router = () => {
  const user = useSelector((state) => state.auth.user);
  const redirectTo = localStorage.getItem("redirectTo") ?? "/";

  const requireAuth = (component) => {
    if (!user) {
      return <UseRedirect to="/auth/signin" />;
    } else if (!user?.isVerified) {
      return <UseRedirect to="/auth/verify" />;
    }
    return component;
  };

  const isLoggedIn = (component) => {
    if (user) {
      if (!user?.isVerified) {
        return <Navigate to="/auth/verify" />;
      }
      return <Navigate to={redirectTo} replace />;
    }
    return component;
  };

  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/shop" element={<ProductsLayout />} />
        <Route path="/deals" element={<ProductsLayout />} />
        <Route path="/search" element={<Search />} />
        <Route path="/shop/new" element={<ProductsLayout />} />
        <Route path="/profile" element={<Navigate to="me" />} />
        <Route path="/profile/:profilePage" element={requireAuth(<Profile />)} />
        <Route path="/profile/:profilePage/:pageAction" element={requireAuth(<Profile />)} />
        <Route path="/product/:productId" element={<ProductDetails />} />
        <Route path="/product/:productId/checkout" element={<Cart />} />
        <Route path="/my-account" element={requireAuth(<MyAccount />)} />
        <Route path="/my-account/:action" element={requireAuth(<MyAccount />)} />
        <Route path="/auth" element={<Navigate to="/auth/signin" />} />
        <Route path="/auth/callback" element={<GoogleAuthCallback />} />
        <Route path="/auth/signin" element={isLoggedIn(<SignIn />)} />
        <Route path="/auth/login" element={isLoggedIn(<SignIn />)} />
        <Route path="/auth/signup" element={isLoggedIn(<SignUp />)} />
        <Route path="/auth/register" element={<Navigate to="/auth/signup" />} />
        <Route path="/auth/verify" element={<OtpForm />} />
        <Route path="/auth/reset-password" element={isLoggedIn(<PasswordReset />)} />
        <Route path="/auth/new-password" element={isLoggedIn(<ResetPassword />)} />
      </Routes>
    </>
  );
};

export default Router;
