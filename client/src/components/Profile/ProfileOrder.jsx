import { useSelector } from "react-redux";
import CartItemCard from "../Cart/CartItemCard";
import ProfileEmptyPage from "./ProfileEmptyPage";
import { BsCart4 } from "react-icons/bs";

const ProfileOrder = () => {
  const user = useSelector((state) => state.auth.user);
  return (
    <div>
      <div className="profile-page-title">
        <h1>Orders</h1>
      </div>
      <div className="w-full p-4 pb-0 flex items-baseline border-b gap-x-3 text-sm font-medium text-gray-600 ">
        <button className="pb-4 border-b-2 border-customGreen">
          ONGOING(0)
        </button>
        <button className="pb-4 border-b-2 border-customGreen">
          CANCELLED(0)
        </button>
      </div>
      <div className={`px-4 ${user?.orders?.length > 0 ? "": "flex justify-center items-center mt-12"}`}>
        {user?.orders?.length > 0 ? (
          user?.orders?.map((order, i) => <CartItemCard key={i} />)
        ) : (
        
            <ProfileEmptyPage
              message="You have no placed orders yet"
              description="All your orders will be saved here for you to access them anytime."
              icon={<BsCart4 size={50} className="rotate-12 text-orange-400" />}
            />
        
        )}
      </div>
    </div>
  );
};

export default ProfileOrder;
