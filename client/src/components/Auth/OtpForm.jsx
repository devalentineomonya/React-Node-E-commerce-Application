import OtpInput from "./OtpInput";
import accountVerify from "../../assets/images/accountVerify.png";
import logo from "../../assets/images/logo_big.png";
import { FormCancelButton } from "./PasswordReset";
import { useDispatch, useSelector } from "react-redux";
import { useFetchUserDataQuery } from "../../../app/features/user/userAPI";
import { toast } from "react-toastify";
import MainLayout from "../layouts/MainLayout/MainLayout";
import {
  useResendVerificationCodeMutation,
  useVerifyWithCodeMutation,
} from "../../../app/features/auth/authAPI";
import { Navigate, useNavigate, useSearchParams } from "react-router-dom";
import {
  setAuthError,
  setAuthLoading,
  setUser,
} from "../../../app/features/auth/authSlice";
import { useEffect } from "react";
import { decryptMessage } from "../../../utils/decryptionUtil";


const OtpForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [verify, { isLoading: isVerifying }] = useVerifyWithCodeMutation();
  const [resendCode, { isLoading }] = useResendVerificationCodeMutation();
  const user = useSelector((state) => state.auth.user);

  const [searchParams] = useSearchParams();
  const encryptedMessage = searchParams.get("msg_id"); 

  useEffect(() => {
    if (encryptedMessage && !user?.isVerified) {
      const message = decryptMessage(encryptedMessage); 
      if (message) {
        toast.error(message);
      }
      navigate("/auth/verify", { replace: true });
    }
  }, [encryptedMessage, user?.isVerified, navigate]);

  const fetchUserData = useFetchUserDataQuery(user?._id, {
    skip: !user?._id,
  });
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");
  if ((!token && !user && !userId) || user?.isVerified) {
    return <Navigate to="/" replace />;
  }

  const onOtpSubmit = async (verificationCode) => {
    dispatch(setAuthLoading(true));
    try {
      const result = await verify({ verificationCode }).unwrap();
      if (result.success) {
        toast.success(result?.message);

        const newUser = await fetchUserData.refetch().unwrap();
        dispatch(setUser(newUser));
        navigate("/profile");
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      dispatch(setAuthError(error));
      toast.error(error.data.message || error.message);
    } finally {
      dispatch(setAuthLoading(false));
    }
  };

  const onFormSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const otpJson = {};
    formData.forEach((value, key) => {
      otpJson[key] = value;
    });

    const otpValue = Object.values(otpJson).join("");

    if (otpValue.length === 6) {
      onOtpSubmit(otpValue);
    } else {
      toast.error("Fill all OTP fields");
    }
  };

  const resendVerificationCode = async (e) => {
    e.preventDefault();
    try {
      const response = await resendCode().unwrap();

      toast.success(response?.message);
    } catch (error) {
      toast.error(error?.data?.message);
    }
  };

  return (
    <MainLayout overflow>
      <div className="loginsignup">
        <div className="loginsignup-container">
          <div className="login-signup-image">
            <img src={accountVerify} loading="lazy" />
          </div>
          <div className="login-signup-form">
            <div className="login-sign-text">
              <img src={logo} alt="" />
              <h2>Verify Account</h2>
              <p>
                Ullamco Lorem officia voluptate incididunt consectetur id duis
                elit ex ex tempor ea mollit cillum.
              </p>
            </div>
            <form onSubmit={onFormSubmit} method="POST">
              <OtpInput onOtpSubmit={onOtpSubmit} length={6} />
              <div className="remember-section mt-5">
                <div className="remember-input"></div>
                <button onClick={resendVerificationCode} className="flex ">
                  {isLoading ? (
                    <div className="h-5 w-5 rounded-full border-2 border-gray-400 border-t-transparent animate-spin"></div>
                  ) : (
                    "Resend Code"
                  )}
                </button>
              </div>

              <div className="login-signup-button mt-4">
                <button
                  type="submit"
                  className="bg-customGreen text-white hover:bg-black flex justify-center items-center"
                  disabled={isVerifying}
                >
                  {isVerifying ? (
                    <div className="h-6 w-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  ) : (
                    "Verify"
                  )}
                </button>
              </div>
            </form>
            <FormCancelButton navigate={navigate} />
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default OtpForm;
