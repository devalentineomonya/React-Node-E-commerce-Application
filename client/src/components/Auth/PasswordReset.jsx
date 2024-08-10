import resetPassword from "../../assets/images/resetPassword.png";
import logo from "../../assets/images/logo_big.png";
import AuthInput from "./AuthInput";
import { HiAtSymbol } from "react-icons/hi";
import { Formik, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { useLayoutEffect, useRef } from "react";

const PasswordReset = () => {
  const navigate = useNavigate();
  const textDisplay = useRef(null);

  useLayoutEffect(() => {
    if (textDisplay.current) {
      const textBoxDimensions = textDisplay.current.getBoundingClientRect();
      console.log(textBoxDimensions);
    }
  }, []);

  const passwordResetSchema = Yup.object().shape({
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
  });

  return (
    <div className="loginsignup-container">
      <div className="login-signup-image" ref={textDisplay}>
        <img src={resetPassword} loading="lazy" alt="Reset Password" />
      </div>
      <div className="login-signup-form">
        <div className="login-sign-text">
          <img src={logo} alt="Logo" />
          <h2>Verify Account</h2>
          <p>
            Ullamco Lorem officia voluptate incididunt consectetur id duis elit
            ex ex tempor ea mollit cillum.
          </p>
        </div>
        <Formik
          initialValues={{
            email: "",
          }}
          validationSchema={passwordResetSchema}
          onSubmit={(values) => {
            console.log(values);
            // Add your form submission logic here
          }}
        >
          {({ handleChange, values }) => (
            <Form>
              <AuthInput
                type="email"
                label="Email*"
                icon={<HiAtSymbol />}
                name="email"
                onInputChange={handleChange}
                value={values.email}
              />
              <ErrorMessage
                name="email"
                component="div"
                className="validation-error"
              />

              <div className="login-signup-button mt-8">
                <button
                  type="submit"
                  className="bg-customGreen text-white hover:bg-black "
                >
                  Reset Password
                </button>
              </div>
            </Form>
          )}
        </Formik>
        <FormCancelButton navigate={navigate} />
      </div>
    </div>
  );
};

export const FormCancelButton = ({ navigate }) => {
  const pathTo = localStorage.getItem("redirectTo") ?? "/";

  const onCancel = (e) => {
    e.preventDefault();
    navigate(pathTo);
    localStorage.removeItem("redirectTo");
  };

  return (
    <div className="login-signup-button w-full mt-4">
      <button
        className="border w-full h-11 max-w-96 rounded-md text-gray-600 hover:bg-gray-50"
        onClick={onCancel}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            onCancel();
          }
        }}
      >
        Cancel
      </button>
    </div>
  );
};

FormCancelButton.propTypes = {
  navigate: PropTypes.func,
};

export default PasswordReset;
