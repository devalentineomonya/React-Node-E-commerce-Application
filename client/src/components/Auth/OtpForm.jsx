import OtpInput from "./OtpInput";
import accountVerify from "../../assets/images/accountVerify.png";
import logo from "../../assets/images/logo_big.png";
import { FormCancelButton } from "./PasswordReset";


const OtpForm = () => {

  const onOtpSubmit = () => {


  };

  return (
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
        <form onSubmit={(e)=>e.preventDefault()}>
        <OtpInput onOtpSubmit={onOtpSubmit}/>
       
          <div className="login-signup-button mt-8">
            <button type="submit" className="bg-customGreen text-white hover:bg-black ">
              Verify
            </button>
          </div>
        </form>
       <FormCancelButton/>
      </div>
    </div>
  );
};

export default OtpForm;
