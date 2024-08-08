import { useState } from "react";
import AuthInput from "./AuthInput";

const SignIn = () => {
  const signedInField = [
    {
      name: "userName",
      type: "email",
      label: "User Name*",
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
  const onInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <>
      <h2>Sign In</h2>
      <form>
        {signedInField.map((field, index) => (
          <AuthInput
            key={`${field.name}-${index}`}
            type={field.type}
            label={field.label}
            name={field.name}
            value={formData[field.name]}
            onInputChange={onInputChange}
          />
        ))}
        <button className="signup-signin-button" type="submit">Sign In</button>
      </form>
    </>
  );
};

export default SignIn;
