import {  useState } from "react";
import OptInput from "./OptInput";
import MainLayout from "../common/MainLayout/MainLayout";

const AuthMain = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [showOtp, setShowOtp] = useState(false);
 
  const handlePhoneChange = (e) => {
    const { value } = e.target;
    setPhoneNumber(value);
  };

  const handlePhoneSubmit = (e) => {
    e.preventDefault();
    setShowOtp(true);
  };
const onOtpSubmit= (otp) =>{
    console.log("Login Successfull with " + otp);
}
  return (
    <MainLayout>

    <div>
      {!showOtp ? (
        <form action="" onSubmit={handlePhoneSubmit}>
            <label htmlFor="">Enter Phone Nummber</label>
          <input type="tel" value={phoneNumber} onChange={handlePhoneChange} />
        </form>
      ) : (
        <>
        Enter OTP sent to {phoneNumber}
        <OptInput onOtpSubmit={onOtpSubmit} length={6}/>
        </>
      )}
    </div>
    </MainLayout>
  );
};

export default AuthMain;
