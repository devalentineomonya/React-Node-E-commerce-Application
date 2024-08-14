import { Formik, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import AuthInput from "./AuthInput";
import { BiLock, BiUser } from "react-icons/bi";
import { HiAtSymbol } from "react-icons/hi";
import signUpImage from "../../assets/images/signUpImage.png";
import logo from "../../assets/images/logo_big.png";
import { Link, useNavigate } from "react-router-dom";
import googleIcon from "../../assets/images/google.png";
import {
  // registerUser,
  setRegisterError,
  setRegisterLoading,
} from "../../../app/features/user/userSlice";
import { useRegisterUserMutation } from "../../../app/features/user/userAPI";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { loginWithPassword } from "../../../app/features/auth/authSlice";
import MainLayout from "../common/MainLayout/MainLayout";
import { useLoginWithGoogleQuery } from "../../../app/features/auth/authAPI";

const SignUp = () => {
  const signUpSchema = Yup.object().shape({
    firstName: Yup.string()
      .min(3, "First Name must be at least 3 characters long")
      .required("First Name is required"),
    lastName: Yup.string()
      .min(3, "Last Name must be at least 3 characters long")
      .required("Last Name is required"),
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    password: Yup.string()
      .min(8, "Password must be at least 8 characters long")
      .required("Password is required"),
  });

  const [register, { isLoading }] = useRegisterUserMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (values, { setSubmitting }) => {
    dispatch(setRegisterLoading(true));
    try {
      const response = await register(values).unwrap();
      await dispatch(loginWithPassword(response));
      toast.success(response.message);        

      const pathTo = localStorage.getItem("redirectTo") ?? "/";
      localStorage.removeItem("redirectTo");
      
      if (!response.data.isVerified) {
        navigate("/auth/verify");
      } else {
        navigate(pathTo);
      }

    } catch (err) {
      // Show error toast
      toast.error(err.data.message || "An error occurred. Please try again.");
      await dispatch(setRegisterError(err.data));
    } finally {
      setSubmitting(false);
      dispatch(setRegisterLoading(false));
    }
  };

  return (
    <MainLayout overflow>
      <div className="loginsignup">
    <div className="loginsignup-container">
      <div className="login-signup-image">
        <img src={signUpImage} loading="lazy" alt="Sign Up" />
      </div>
      <div className="login-signup-form">
        <div className="login-sign-text">
          <img src={logo} alt="Logo" />
          <h2>Join Us</h2>
          <p>
            Ullamco Lorem officia voluptate incididunt consectetur id duis elit
            ex ex tempor ea mollit cillum.
          </p>
        </div>
        <Formik
          initialValues={{
            firstName: "",
            lastName: "",
            email: "",
            password: "",
          }}
          validationSchema={signUpSchema}
          onSubmit={handleSubmit}
        >
          {({ handleChange, values, isSubmitting }) => (
            <Form>
              <AuthInput
                name="firstName"
                type="text"
                label="First Name*"
                index={0}
                icon={<BiUser />}
                onInputChange={handleChange}
                value={values.firstName}
              />
              <ErrorMessage
                name="firstName"
                component="div"
                className="validation-error"
              />

              <AuthInput
                name="lastName"
                type="text"
                label="Last Name*"
                index={1}
                icon={<BiUser />}
                onInputChange={handleChange}
                value={values.lastName}
              />
              <ErrorMessage
                name="lastName"
                component="div"
                className="validation-error"
              />

              <AuthInput
                name="email"
                type="email"
                label="Email*"
                index={2}
                icon={<HiAtSymbol />}
                onInputChange={handleChange}
                value={values.email}
              />
              <ErrorMessage
                name="email"
                component="div"
                className="validation-error"
              />

              <AuthInput
                name="password"
                type="password"
                label="Password*"
                index={3}
                icon={<BiLock />}
                onInputChange={handleChange}
                value={values.password}
              />
              <ErrorMessage
                name="password"
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
                    "Sign Up"
                  )}
                </button>
              </div>
            </Form>
          )}
        </Formik>
        <div className="login-signup-button w-full mt-4">
          <SignInWithGoogle />
        </div>
        <p className="mt-8 text-xs text-gray-700">
          Already have an account?{" "}
          <Link
            to="/auth/login"
            className="font-semibold capitalize ml-3 text-sky-600"
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
    </div>
    </MainLayout>
  );
};

export const SignInWithGoogle = () => {

  return (
    <button className="border w-full h-11 max-w-96 rounded-md text-gray-600 hover:bg-gray-50" onClick={useLoginWithGoogleQuery}>
      <img src={googleIcon} alt="" />
      Sign in with Google
    </button>
  );
};

export default SignUp;
