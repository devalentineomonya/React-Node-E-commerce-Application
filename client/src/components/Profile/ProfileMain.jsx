import { useNavigate, useParams } from "react-router-dom";
import ProfileNav from "./ProfileNav";
import "./profile.css";
import ProfileUser from "./ProfileUser";
import ProfileOrder from "./ProfileOrder";
import ProfileReview from "./ProfileReview";
import ProfileVouchers from "./ProfileVouchers";
import ProfileSavedItems from "./ProfileSavedItems";
import ProfileRecent from "./ProfileRecents";
import ProfileDeliveries from "./ProfileDeliveries";
import { HiOutlineMenuAlt4 } from "react-icons/hi";
import { useState } from "react";
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
    address:<ProfileAddress/>
  };
  const { profilePage } = useParams();
  const navigate = useNavigate();
  const [showProfileNav, setShowProfileNav] = useState(false);
  const getProfilePage = () => {
    const profileComponent = profileComponents[profilePage] || null;
    if (!profileComponent) return navigate("/profile/me");
    else {
      return profileComponent;
    }
  };

  return (
    <>
      <div onClick={() => setShowProfileNav((prev) => !prev)} className="inline-block lg:hidden">
        <HiOutlineMenuAlt4 size={20} />
      </div>

      <div
        className="profile-container"
      >
        <ProfileNav showProfileNav={showProfileNav}/>
        <div className="profile-content">{getProfilePage()}</div>
      </div>
    </>
  );
};

export default ProfileMain;
