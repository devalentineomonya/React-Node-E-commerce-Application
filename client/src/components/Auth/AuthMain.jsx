import { Navigate, useParams } from "react-router-dom";
import MainLayout from "../common/MainLayout/MainLayout";
import "./auth.css";
import SignIn from "./SignIn";
import SignUp from "./SignUp";

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
      default:
        return <Navigate to="/auth/login" />;
    }
  };
  console.log(authType);
  return (
    <MainLayout>
      <div className="loginsignup">
        <div className="loginsignup-container">{checkLoginType()}</div>
      </div>
    </MainLayout>
  );
};

export default AuthMain;
