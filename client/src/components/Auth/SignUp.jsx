import { useState } from "react";
import AuthInput from "./AuthInput";
import OptInput from "./OptInput";

const SignUp = () => {
  const signedUpField = [
    {
      name: "firstName",
      label: "First Name*",
    },
    {
      name: "lastName",
      label: "Last Name*",
    },
    {
      name: "email",
      type: "email",
      label: "Email*",
    },

    {
      name: "password",
      type: "password",
      label: "Password*",
    },
  ];
  const [formData, setFormData] = useState({
    userName: "",
    password: "",
  });
  const [showOtpInput, setShowOtpInput] = useState(true);
  const [otpSubmitted, setOtpSubmitted] = useState(false);
  const onInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const onOtpSubmit = (otp) => {
    console.log(otp);
    setOtpSubmitted(true);
  };
  return (
    <>
      <h2>{showOtpInput ? "Enter OTP Code" : "Sign Up"}</h2>
      {showOtpInput ? (
        <form>
          {signedUpField.map((field, index) => (
            <AuthInput
              key={`${field.name}-${index}`}
              type={field.type}
              label={field.label}
              name={field.name}
              value={formData[field.name]}
              onInputChange={onInputChange}
            />
          ))}
          <button className="signup-signin-button" type="submit">
            Sign Up
          </button>
        </form>
      ) : (
        <div className="m-auto">
          <p className="text-center mt-5">Enter OTP code sent to your email</p>
          <div className="flex justify-center mt-4">
            <OptInput onOtpSubmit={onOtpSubmit} />
          </div>
          <button
            className="signup-signin-button "
            onClick={onOtpSubmit}
            disabled={!otpSubmitted}
          >
            {otpSubmitted ? (
              <div className="h-6 w-6 border-2 border-white border-t-transparent rounded-full"></div>
            ) : (
              "Verify Account"
            )}
          </button>
        </div>
      )}
    </>
  );
};

export default SignUp;
