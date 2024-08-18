import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import resetPasswordImage from "../../assets/images/resetPassword.png";
import logo from "../../assets/images/logo_big.png";
import AuthInput from "./AuthInput";
import { HiAtSymbol } from "react-icons/hi";
import { Formik, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import MainLayout from "../common/MainLayout/MainLayout";
import { useDispatch } from "react-redux";
import { useResetPasswordMutation } from "../../../app/features/auth/authAPI";
import { resetPassword } from "../../../app/features/auth/authSlice";
import { toast } from "react-toastify";
import { FormCancelButton } from "./PasswordReset";
import { BiLock } from "react-icons/bi";

const ResetPassword = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const [reset, { isLoading }] = useResetPasswordMutation();

  const token = searchParams.get("token");
  const userId = searchParams.get("userId");

  useEffect(() => {
    if (!token || !userId) {
      toast.error("Invalid or missing token and user ID.");
      navigate("/");
    }
  }, [token, userId, navigate]);


  const resetPasswordSchema = Yup.object().shape({
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    newPassword: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .required("New password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("newPassword")], "Passwords must match")
      .required("Please confirm your new password"),
  });

 
  const onRequestSubmit = async (values, { setSubmitting }) => {
    setSubmitting(true);
    try {
      const userDataPayload = {
        ...values,
        token,
        userId,
      };
      const response = await reset(userDataPayload);
      await dispatch(resetPassword(response));

      if (response?.error) {
        toast.error(response.error.data.message);
console.error(response.error.data.error)
      } else {
        toast.success(response?.data?.message || "Password reset successful!");
        navigate("/auth/login"); 
      }
    } catch (error) {
      toast.error(error.message);
     
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <MainLayout overflow>
      <div className="loginsignup">
        <div className="loginsignup-container">
          <div className="login-signup-image">
            <img src={resetPasswordImage} loading="lazy" alt="Reset Password" />
          </div>
          <div className="login-signup-form">
            <div className="login-sign-text">
              <img src={logo} alt="Logo" />
              <h2>Reset Password</h2>
              <p>
                Please enter your email and new password to reset your password.
              </p>
            </div>
            <Formik
              initialValues={{
                email: "",
                newPassword: "",
                confirmPassword: "",
              }}
              validationSchema={resetPasswordSchema}
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

                  <AuthInput
                    type="password"
                    label="New Password*"
                    name="newPassword"
                    icon={<BiLock/>}
                    onInputChange={handleChange}
                    value={values.newPassword}
                  />
                  <ErrorMessage
                    name="newPassword"
                    component="div"
                    className="validation-error"
                  />

                  <AuthInput
                    type="password"
                    label="Confirm Password*"
                    icon={<BiLock/>}
                    name="confirmPassword"
                    onInputChange={handleChange}
                    value={values.confirmPassword}
                  />
                  <ErrorMessage
                    name="confirmPassword"
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



export default ResetPassword;
