import { HiOutlineMenuAlt4 } from "react-icons/hi";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import "../Profile/profile.css";
import AccountNav from "./AccountNav";
import AccountForm from "./AccountForm";
import AccountChangePassword from "./AccountChangePassword";

const AccountMain = () => {
  const [showProfileNav, setShowProfileNav] = useState(false);
  const location = useLocation();


  const renderContent = () => {
    if (location.pathname === "/my-account/change-password") {
      return <AccountChangePassword />;
    }
    return <AccountForm />;
  };

  return (
    <>
      <div
        onClick={() => setShowProfileNav((prev) => !prev)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            setShowProfileNav((prev) => !prev);
          }
        }}
        className="inline-block lg:hidden"
      >
        <HiOutlineMenuAlt4 size={20} />
      </div>

      <div className="profile-container">
        <AccountNav showProfileNav={showProfileNav} />
        {renderContent()} {/* Conditionally render the content */}
      </div>
    </>
  );
};

export default AccountMain;
