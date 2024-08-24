import resetPassword from "../../assets/images/resetPassword.png";
import logo from "../../assets/images/logo_big.png";
import AuthInput from "./AuthInput";
import { HiAtSymbol } from "react-icons/hi";
import { Formik, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import MainLayout from "../common/MainLayout/MainLayout";
import { useRequestPasswordResetMutation } from "../../../app/features/auth/authAPI";
import { toast } from "react-toastify";

const PasswordReset = () => {
  const navigate = useNavigate();
  const [requestReset, { isLoading }] = useRequestPasswordResetMutation();

  const passwordResetSchema = Yup.object().shape({
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
  });

  const onRequestSubmit = async (values, { setSubmitting }) => {
    setSubmitting(true);
    try {
      const response = await requestReset(values);
      if (response?.error) {
        toast.error(response?.error?.data?.message);
      } else {
        toast.success(response?.success?.data?.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <MainLayout overflow>
      <div className="loginsignup">
        <div className="loginsignup-container">
          <div className="login-signup-image">
            <img src={resetPassword} loading="lazy" alt="Reset Password" />
          </div>
          <div className="login-signup-form">
            <div className="login-sign-text">
              <img src={logo} alt="Logo" />
              <h2>Reset Password</h2>
              <p>
                Ullamco Lorem officia voluptate incididunt consectetur id duis
                elit ex ex tempor ea mollit cillum.
              </p>
            </div>
            <Formik
              initialValues={{
                email: "",
              }}
              validationSchema={passwordResetSchema}
              onSubmit={onRequestSubmit}
            >
              {({ handleChange, values, isSubmitting }) => (
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
                      className="bg-customGreen text-white hover:bg-black flex justify-center items-center"
                      disabled={isSubmitting || isLoading}
                    >
                      {isSubmitting || isLoading ? (
                        <div className="h-6 w-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      ) : (
                        "Reset Password"
                      )}
                    </button>
                  </div>
                </Form>
              )}
            </Formik>
            <FormCancelButton navigate={navigate} />
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export const FormCancelButton = ({ navigate }) => {
  const pathTo = localStorage.getItem("redirectTo") ?? "/";

  const onCancel = (e) => {
    e.preventDefault();
    localStorage.removeItem("redirectTo");
    navigate(pathTo);
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
