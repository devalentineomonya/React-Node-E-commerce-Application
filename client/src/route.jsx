import { Routes, Route, Navigate } from "react-router-dom";
import { Suspense, lazy } from "react";
import Loading from "./components/common/Loading/Loading";
import { useSelector } from "react-redux";

const Home = lazy(() => import("./pages/home/Home"));
const Cart = lazy(() => import("./pages/Cart/Cart"));
const SignUp = lazy(()=> import("./components/Auth/SignUp"))
const SignIn = lazy(()=> import("./components/Auth/SignIn"))
const Profile = lazy(() => import("./pages/Profile/Profile"));
const OtpForm = lazy(()=> import("./components/Auth/OtpForm"))
const UserRedirect = lazy(() => import("./hooks/useRedirect"));
const MyAccount = lazy(() => import("./pages/MyAccount/MyAccount"));
const PasswordReset = lazy(()=> import("./components/Auth/PasswordReset"))
const ProductDetails = lazy(() => import("./pages/ProductDetails/ProductDetails"));
const ProductsLayout = lazy(() => import("./components/common/ProductsLayout/ProductsLayout"));

const Router = () => {
  const user = useSelector((state) => state.auth.user);
  
const redirectTo = localStorage.getItem("redirectTo") ?? "/"
  const requireAuth = (component) => {
    if (!user) {
      return <UserRedirect to="/auth/login" />;
    } else if (!user.isActive) {
      return <UserRedirect to="/auth/verify" />;
    }
    return component;
  };

  const isLoggedIn = (component)=>{
    if(user){
      if(!user.isActive){
        return <UserRedirect to="/auth/verify"/>
      }
      return <Navigate to={redirectTo}/>
    }else{
      return component
    }
  }

  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<ProductsLayout />} />
        <Route path="/auth" element={<Navigate to="/auth/login" />} />
        <Route path="/cart" element={requireAuth(<Cart />)} />
        <Route path="/deals" element={<ProductsLayout />} />
        <Route path="/search" element={<ProductsLayout />} />
        <Route path="/profile" element={<Navigate to="me" />} />
        <Route path="/auth/login" element={<SignIn />} />
        <Route path="/my-account" element={requireAuth(<MyAccount />)} />
        <Route path="/auth/verify" element={isLoggedIn(<OtpForm />)} />
        <Route path="/auth/signup" element={isLoggedIn(<SignUp />)} />
        <Route path="/auth/signin" element={isLoggedIn(<SignIn />)} />
        <Route path="/new-products" element={<ProductsLayout />} />
        <Route path="/auth/register" element={isLoggedIn(<SignUp />)} />
        <Route path="/auth/resetpassword" element={isLoggedIn(<PasswordReset />)} />
        <Route path="/product/:productId" element={<ProductDetails />} />
        <Route path="profile/:profilePage" element={requireAuth(<Profile />)} />
        <Route path="profile/:profilePage/:pageAction" element={requireAuth(<Profile />)} />
      </Routes>
    </Suspense>
  );
};

export default Router;
