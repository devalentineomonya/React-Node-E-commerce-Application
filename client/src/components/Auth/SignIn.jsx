import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import AuthInput from "./AuthInput";
import { BiLock } from "react-icons/bi";
import { HiAtSymbol } from "react-icons/hi";
import signInImage from "../../assets/images/signInImage.png";
import logo from "../../assets/images/logo_big.png";
import { Link, useNavigate } from "react-router-dom";
import { SignInWithGoogle } from "./SignUp";
import { useDispatch } from "react-redux";
import {
  setAuthLoading,
  setAuthError,
  setLoggedIn,
} from "../../../app/features/auth/authSlice";
import { useLoginWithPasswordMutation } from "../../../app/features/auth/authAPI";
import { toast } from "react-toastify";
import MainLayout from "../common/MainLayout/MainLayout";


const SignIn = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [login, { isLoading }] = useLoginWithPasswordMutation();

  const signInSchema = Yup.object().shape({
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    password: Yup.string()
      .min(8, "Password must be at least 8 characters long")
      .required("Password is required"),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    dispatch(setAuthLoading(true));
    try {
      const response = await login(values).unwrap();
      await dispatch(setLoggedIn(response));
      toast.success(response.message);


      const pathTo = localStorage.getItem("redirectTo") ?? "/";
      localStorage.removeItem("redirectTo");
      if (!response.data.isVerified) navigate("/auth/verify");
      else navigate(pathTo);

    } catch (err) {
      dispatch(setAuthError(err.data));
      toast.error(err.data.message);
      
    } finally {
      setSubmitting(false);
      dispatch(setAuthLoading(false));
    }
  };

  return (
    <MainLayout overflow>
      <div className="loginsignup">
    <div className="loginsignup-container">
     
      <div className="login-signup-form">
        <div className="login-sign-text">
          <img src={logo} alt="Logo" />
          <h2>Hello Again</h2>
          <p>
            Ullamco Lorem officia voluptate incididunt consectetur id duis elit
            ex ex tempor ea mollit cillum.
          </p>
        </div>
        <Formik
          initialValues={{
            email: "",
            password: "",
          }}
          validationSchema={signInSchema}
          onSubmit={handleSubmit}
        >
          {({ handleChange, values, isSubmitting }) => (
            <Form>
              <AuthInput
                name="email"
                type="email"
                label="Email*"
                index={0}
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
                index={1}
                icon={<BiLock />}
                onInputChange={handleChange}
                value={values.password}
              />
              <ErrorMessage
                name="password"
                component="div"
                className="validation-error"
              />

              <div className="remember-section">
                <div className="remember-input">
                  <Field type="checkbox" name="remember" id="remember" />
                  <label htmlFor="remember">Remember Me</label>
                </div>
                <Link to="/auth/reset-password">Recover Password</Link>
              </div>
              <div className="login-signup-button mt-8">
                <button
                  type="submit"
                  className="bg-customGreen text-white hover:bg-black flex justify-center items-center"
                  disabled={isSubmitting || isLoading}
                >
                  {isSubmitting || isLoading ? (
                    <div className="h-6 w-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  ) : (
                    "Sign In"
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
          Don&apos;t have an account?
          <Link
            to="/auth/register"
            className="font-semibold capitalize ml-3 text-sky-600"
          >
            Sign Up
          </Link>
        </p>
      </div>
      <div className="login-signup-image">
        <img src={signInImage} loading="lazy" alt="Sign In" />
      </div>
    </div>
    </div>
    </MainLayout>
  );
};

export default SignIn;
