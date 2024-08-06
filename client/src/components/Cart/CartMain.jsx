import { useState } from "react";
import BreadCrumb from "../ProductDetails/BreadCrumb/BreadCrumb";
import CartDeliveryInfoForm from "./CartDeliveryInfoForm";
import CartItemCard from "./CartItemCard";
import "./cartmain.css";
import CartPayment from "./CartPayment";
import CartDeliveryInfoCard from "./CartDeliveryInfoCard";
const CartMain = () => {
  const [returning, setReturning] = useState(false);
  const handleChange = (e) => {
    setReturning(e.target.checked);
  };

  return (
    <div className="cart-main-container">
      <BreadCrumb />
      <div className="cart-mini-container">
        <div className="cart-content">
          <div className="cart-items-container">
            <h5>Items Review and Shipping</h5>
            <CartItemCard />
            <CartItemCard />
            <CartItemCard />
            <CartItemCard />
            <CartItemCard />
            <CartItemCard />
          </div>
        <div className="cart-delivery-info">
          <label htmlFor="returning">Returning Customer</label>
          <input type="checkbox" name="returning" onChange={handleChange} />
        </div>
        {returning ? <CartDeliveryInfoCard /> : <CartDeliveryInfoForm />}
        </div>
      </div>
      <CartPayment />
    </div>
  );
};
export default CartMain;
