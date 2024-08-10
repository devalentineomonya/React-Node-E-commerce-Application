import  { useState, lazy, Suspense } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ProfileNav from "./ProfileNav";
import "./profile.css";
import { HiOutlineMenuAlt4 } from "react-icons/hi";
import Loading from "../common/Loading/Loading";

const ProfileUser = lazy(() => import("./ProfileUser"));
const ProfileOrder = lazy(() => import("./ProfileOrder"));
const ProfileDeliveries = lazy(() => import("./ProfileDeliveries"));
const ProfileReview = lazy(() => import("./ProfileReview"));
const ProfileVouchers = lazy(() => import("./ProfileVouchers"));
const ProfileSavedItems = lazy(() => import("./ProfileSavedItems"));
const ProfileRecent = lazy(() => import("./ProfileRecents"));
const ProfileAddress = lazy(() => import("./ProfileAddress"));

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
  const navigate = useNavigate();
  const [showProfileNav, setShowProfileNav] = useState(false);


  const ProfileComponent = profileComponents[profilePage] || navigate("/profile/me");

  return (
    <>
      <div onClick={() => setShowProfileNav((prev) => !prev)} className="inline-block lg:hidden">
        <HiOutlineMenuAlt4 size={20} />
      </div>

      <div className="profile-container">
        <ProfileNav showProfileNav={showProfileNav} />
        <div className="profile-content">
          <Suspense fallback={<Loading/>}>
            {ProfileComponent}
          </Suspense>
        </div>
      </div>
    </>
  );
};

export default ProfileMain;
