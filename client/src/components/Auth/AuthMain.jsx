import { Navigate, useParams } from "react-router-dom";
import MainLayout from "../common/MainLayout/MainLayout";
import "./auth.css";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import OtpForm from "./OtpForm";
import PasswordReset from "./PasswordReset";

const AuthMain = () => {
  const { authType } = useParams();
  const checkLoginType = () => {
    switch (authType) {
      case "login":
        return <SignIn />;
      case "signin":
        return <SignIn />;

      case "register":
        return <SignUp />;

      case "signup":
        return <SignUp />;

      case "verify":
        return <OtpForm />;

      case "reset-password":
        return <PasswordReset />;

      default:
        return <Navigate to="/auth/login" />;
    }
  };
  console.log(authType);
  return (
    <MainLayout>
      <div className="loginsignup">{checkLoginType()}</div>
    </MainLayout>
  );
};

export default AuthMain;
