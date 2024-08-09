import signUpImage from "../../assets/images/signUpImage.png";
import logo from "../../assets/images/logo_big.png";
import AuthInput from "./AuthInput";
import { HiAtSymbol } from "react-icons/hi";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const PasswordReset = () => {
  const [userEmail, setUserEmail] = useState("");

  const onEmailSubmit = (e) => {
    e.preventDefault();
  };

  const onInputChange = (e) => {
    const value = e.target.value;
    setUserEmail(value);
  };

  return (
    <div className="loginsignup-container">
      <div className="login-signup-image">
        <img src={signUpImage} loading="lazy" />
      </div>
      <div className="login-signup-form">
        <div className="login-sign-text">
          <img src={logo} alt="" />
          <h2>Verify Account</h2>
          <p>
            Ullamco Lorem officia voluptate incididunt consectetur id duis elit
            ex ex tempor ea mollit cillum.
          </p>
        </div>
        <form onSubmit={onEmailSubmit}>
          <AuthInput
            type="email"
            label="Email*"
            icon={<HiAtSymbol />}
            index={0}
            name="email"
            onInputChange={onInputChange}
            value={userEmail}
          />

          <div className="login-signup-button mt-8">
            <button
              type="submit"
              className="bg-customGreen text-white hover:bg-black "
            >
              Reset Password
            </button>
          </div>
        </form>
        <FormCancelButton />
      </div>
    </div>
  );
};

export const FormCancelButton = () => {
  const pathTo = localStorage.getItem("redirectTo") ?? "/";
  const navigate = useNavigate();
  const onCancel = (e) => {
    e.preventDefault();
    navigate(pathTo);
    console.log(pathTo);
  };
  return (
    <div className="login-signup-button w-full mt-4">
      <button
        className=" border w-full h-11 max-w-96 rounded-md text-gray-600 hover:bg-gray-50"
        onClick={onCancel}
      >
        Cancel
      </button>
    </div>
  );
};
export default PasswordReset;
