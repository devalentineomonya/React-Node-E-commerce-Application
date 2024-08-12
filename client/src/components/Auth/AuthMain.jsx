import { Suspense, lazy } from "react";
import { Navigate, useNavigation, useParams } from "react-router-dom";
import MainLayout from "../common/MainLayout/MainLayout";
import "./auth.css";
import Loading from "../common/Loading/Loading";
import { useSelector } from "react-redux";

const SignIn = lazy(() => import("./SignIn"));
const SignUp = lazy(() => import("./SignUp"));
const OtpForm = lazy(() => import("./OtpForm"));
const PasswordReset = lazy(() => import("./PasswordReset"));

const AuthMain = () => {
  let Component;
  const { authType } = useParams();
  const authComponents = {
    login: SignIn,
    signin: SignIn,
    register: SignUp,
    signup: SignUp,
    verify: OtpForm,
    "reset-password": PasswordReset,
  };
  // const navigate = useNavigation();

  const user = useSelector((state) => state.auth.user);

  const AuthComponent =
    authComponents[authType] || (() => <Navigate to="/auth/login" />);
  if (user) {
    if (user.isActive) {
      Component = () => (() => <Navigate to="/" />);
    } else {
      Component = () => (() => <Navigate to="/auth/verify" />);
    }
  } else {
    Component = AuthComponent;
  }

  return (
    <MainLayout>
      <div className="loginsignup">
        <Suspense fallback={<Loading />}>
          <Component />
        </Suspense>
      </div>
    </MainLayout>
  );
};

export default AuthMain;
