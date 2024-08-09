import { useState } from "react";
import AuthInput from "./AuthInput";
import { BiLock } from "react-icons/bi";
import { HiAtSymbol } from "react-icons/hi";
import signInImage from "../../assets/images/signInImage.png";
import logo from "../../assets/images/logo_big.png";
import { Link } from "react-router-dom";
import { BsGoogle } from "react-icons/bs";

const SignIn = () => {
  const signInField = [

    {
      name: "email",
      type: "email",
      label: "Email*",
      icon: <HiAtSymbol />,
    },

    {
      name: "password",
      type: "password",
      label: "Password*",
      icon: <BiLock />,
    },
  ];
  const [formData, setFormData] = useState({
    userName: "",
    password: "",
  });

  const onInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <div className="loginsignup-container">
        <div className="login-signup-form">
        <div className="login-sign-text">
          <img src={logo} alt="" />
          <h2>Hello Again</h2>
          <p>
            Ullamco Lorem officia voluptate incididunt consectetur id duis elit
            ex ex tempor ea mollit cillum.
          </p>
        </div>
        <form action="">
          {signInField.map(({ name, type, label, icon }, index) => (
            <AuthInput
              key={name + "-" + index}
              name={name}
              type={type}
              label={label}
              icon={icon}
              onInputChange={onInputChange}
              value={formData[name]}
            />
          ))}
          <div className="remember-section">
            <div className="remember-input">
              <input type="checkbox" name="remember" id="remember" />
              <label htmlFor="remember">Remember Me</label>
            </div>
            <Link to="/auth/reset-password">Recover Password</Link>
          </div>
          <div className="login-signup-button mt-8">
            <button type="submit" className="bg-customGreen text-white hover:bg-black ">
              Sign In
            </button>
          </div>
        </form>
        <div className="login-signup-button w-full mt-4">
          <button className=" border w-full h-11 max-w-96 rounded-md text-gray-600 hover:bg-gray-50">
            <BsGoogle />
            Sign in with Google
          </button>
        </div>
        <p className="mt-8 text-xs text-gray-700">Don&apos;t have an account? <Link to="/auth/register" className="font-semibold capitalize ml-3 text-sky-600">Sign Up</Link></p>
      </div>
      <div className="login-signup-image">
        <img src={signInImage} loading="lazy" />
      </div>
    
    </div>
  );
};

export default SignIn;
