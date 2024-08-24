import { Routes, Route, Navigate } from "react-router-dom";
import { Suspense, lazy } from "react";
import Loading from "./components/common/Loading/Loading";
import { useSelector } from "react-redux";
import UseRedirect from "./hooks/useRedirect"
import ResetPassword from "./components/Auth/ResetPassword";
import Search from "./pages/Search/Search";

const Home = lazy(() => import("./pages/home/Home"));
const Cart = lazy(() => import("./pages/Cart/Cart"));
const SignUp = lazy(() => import("./components/Auth/SignUp"));
const SignIn = lazy(() => import("./components/Auth/SignIn"));
const Profile = lazy(() => import("./pages/Profile/Profile"));
const OtpForm = lazy(() => import("./components/Auth/OtpForm"));
const MyAccount = lazy(() => import("./pages/MyAccount/MyAccount"));
const PasswordReset = lazy(() => import("./components/Auth/PasswordReset"));
const ProductDetails = lazy(() => import("./pages/ProductDetails/ProductDetails"));
const ProductsLayout = lazy(() => import("./components/common/ProductsLayout/ProductsLayout"));

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
    <Suspense fallback={<Loading />}>
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
        <Route path="/auth/signin" element={isLoggedIn(<SignIn />)} />
        <Route path="/auth/login" element={isLoggedIn(<SignIn />)} />
        <Route path="/auth/signup" element={isLoggedIn(<SignUp />)} />
        <Route path="/auth/register" element={<Navigate to="/auth/signup" />} />
        <Route path="/auth/verify" element={<OtpForm />} />
        <Route path="/auth/reset-password" element={isLoggedIn(<PasswordReset />)} />
        <Route path="/auth/new-password" element={isLoggedIn(<ResetPassword />)} />
      </Routes>
    </Suspense>
  );
};

export default Router;
