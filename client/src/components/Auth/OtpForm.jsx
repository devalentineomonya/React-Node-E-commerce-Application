import OtpInput from "./OtpInput";
import accountVerify from "../../assets/images/accountVerify.png";
import logo from "../../assets/images/logo_big.png";
import { FormCancelButton } from "./PasswordReset";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useVerifyWithCodeMutation } from "../../../app/features/auth/authAPI";
import { setAuthError, setAuthLoading, setUser } from "../../../app/features/auth/authSlice";
import { useFetchUserDataQuery } from "../../../app/features/user/userAPI";
import { toast } from "react-toastify";
import MainLayout from "../common/MainLayout/MainLayout";

const OtpForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [verify, { isLoading: isVerifying }] = useVerifyWithCodeMutation();
  const user= useSelector((state) => state.auth.user); // Adjust if needed

  const fetchUserData = useFetchUserDataQuery(user?._id, {
    skip: !user?._id,
  });

  const onOtpSubmit = async (verificationCode) => {
    console.log(verificationCode)
    dispatch(setAuthLoading(true));
    try {
      const result = await verify({ verificationCode }).unwrap();
      if (result.success) {
      
        const newUser = await fetchUserData.refetch().unwrap();
        dispatch(setUser(newUser));
        toast.success(result.message);
        navigate("/profile");
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      dispatch(setAuthError(error));
      console.log(error)
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
  
 
    const otpValue = Object.values(otpJson).join('');
   
  
    if (otpValue.length === 6) {
      onOtpSubmit(otpValue);
    } else {
      toast.error("Fill all OTP fields");
    }
  };
  return (
    <MainLayout>
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
            Ullamco Lorem officia voluptate incididunt consectetur id duis elit
            ex ex tempor ea mollit cillum.
          </p>
        </div>
        <form onSubmit={onFormSubmit} method="POST">
          <OtpInput onOtpSubmit={onOtpSubmit} length={6} />
          <div className="remember-section mt-5">
            <div className="remember-input"></div>
            <Link to="/auth/reset-password">Resend Code</Link>
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
