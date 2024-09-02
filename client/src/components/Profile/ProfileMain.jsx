import { useState } from "react";
import {  useParams } from "react-router-dom";
import ProfileNav from "./ProfileNav";
import "./profile.css";
import { HiOutlineMenuAlt4 } from "react-icons/hi";
import ProfileUser from "./ProfileUser";
import ProfileOrder from "./ProfileOrder";
import ProfileDeliveries from "./ProfileDeliveries";
import ProfileReview from "./ProfileReview";
import ProfileVouchers from "./ProfileVouchers";
import ProfileSavedItems from "./ProfileSavedItems";
import ProfileRecent from "./ProfileRecents";
import ProfileAddress from "./ProfileAddress";

const ProfileMain = () => {
  const profileComponents = {
    me: <ProfileUser />,
    orders: <ProfileOrder />,
    deliveries: <ProfileDeliveries />,
    review: <ProfileReview />,
    vouchers: <ProfileVouchers />,
    saved: <ProfileSavedItems />,
    recent: <ProfileRecent />,
    address: <ProfileAddress />,
  };

  const { profilePage } = useParams();
  const [showProfileNav, setShowProfileNav] = useState(false);

  const ProfileComponent =
    profileComponents[profilePage] || <ProfileUser />;

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
        <ProfileNav showProfileNav={showProfileNav} />
        <div className="profile-content">
          {ProfileComponent}
        </div>
      </div>
    </>
  );
};

export default ProfileMain;
