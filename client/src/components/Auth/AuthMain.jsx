import { Suspense, lazy } from "react";
import { Navigate, useParams } from "react-router-dom";
import MainLayout from "../common/MainLayout/MainLayout";
import "./auth.css";
import Loading from "../common/Loading/Loading";


const SignIn = lazy(() => import("./SignIn"));
const SignUp = lazy(() => import("./SignUp"));
const OtpForm = lazy(() => import("./OtpForm"));
const PasswordReset = lazy(() => import("./PasswordReset"));

const AuthMain = () => {
  const { authType } = useParams();
  const authComponents = {
    login: SignIn,
    signin: SignIn,
    register: SignUp,
    signup: SignUp,
    verify: OtpForm,
    "reset-password": PasswordReset,
  };

  const Component = authComponents[authType] || (() => <Navigate to="/auth/login" />);

  return (
    <MainLayout>
      <div className="loginsignup">
        <Suspense fallback={<Loading/>}>
          <Component />
        </Suspense>
      </div>
    </MainLayout>
  );
};

export default AuthMain;
