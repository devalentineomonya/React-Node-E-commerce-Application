import { useSelector } from "react-redux";
import CartItemCard from "../Cart/CartItemCard"
import ProfileEmptyPage from "./ProfileEmptyPage";
import { VscVerified } from "react-icons/vsc";
const ProfileDeliveries = () => {
  const user = useSelector((state) => state.auth.user);
  return (
    <div>
    <div className="profile-page-title">
      <h1>DELIVERED</h1>
    </div>
  
    <div
        className={`px-4 ${
          user?.orders?.length > 0
            ? ""
            : "flex justify-center items-center mt-12"
        }`}
      >
        {user?.deliveries?.length > 0 ? (
          user?.deliveries?.map((delivery, i) => <CartItemCard key={i} />)
        ) : (
          <ProfileEmptyPage
            message="You have no deliveries yet"
            description="All your deliveries will be saved here for you to access them anytime."
            icon={<VscVerified size={50} className="rotate-12 text-orange-400" />}
          />
        )}
      </div>
  </div>
  )
}

export default ProfileDeliveries
