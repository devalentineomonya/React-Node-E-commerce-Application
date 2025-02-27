"use client"
import { useState, ChangeEvent } from "react";
// import BreadCrumb
import CartDeliveryInfoForm from "./CartDeliveryInfoForm";
import CartItemCard from "./CartItemCard";
import "./cartmain.css";
import CartPayment from "./CartPayment";
import CartDeliveryInfoCard from "./CartDeliveryInfoCard";
const CartMain = () => {
  const [returning, setReturning] = useState(false);
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setReturning(e.target.checked);
  };

  return (
    <div className="cart-main-container">
      {/* <BreadCrumb /> */}
      <div className="cart-mini-container">
        <div className="cart-content">
          <div className="cart-items-container">
            <h5>Items Review and Shipping</h5>
            <div className="cart-items">
              <CartItemCard />
              <CartItemCard />
              <CartItemCard />
              <CartItemCard />
              <CartItemCard />
              <CartItemCard />
            </div>
          </div>
          <div className="cart-delivery-info">
            <label htmlFor="returning">Returning Customer</label>
            <input type="checkbox" name="returning"  id="returning" onChange={handleChange}  />
          </div>
          {returning ? <CartDeliveryInfoCard /> : <CartDeliveryInfoForm />}
        </div>
      <CartPayment />
      </div>
    </div>
  );
};
export default CartMain;
