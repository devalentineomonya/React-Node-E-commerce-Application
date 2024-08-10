import CartItemCard from "../Cart/CartItemCard";

const ProfileOrder = () => {
  return (
    <div>
      <div className="profile-page-title">
        <h1>Orders</h1>
      </div>
      <div className="w-full p-4 pb-0 flex items-baseline border-b gap-x-3 text-sm font-medium text-gray-600 ">
        <button className="pb-4 border-b-2 border-customGreen">ONGOING(0)</button>
        <button className="pb-4 border-b-2 border-customGreen">CANCELLED(0)</button>
      </div>
      <div className="cart-items px-4">
        <CartItemCard/>
        <CartItemCard/>
        <CartItemCard/>
        <CartItemCard/>
      </div>
    </div>
  );
};

export default ProfileOrder;
