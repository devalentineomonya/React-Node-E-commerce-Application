import { useState } from "react";
import footerPaymentMethod from "../../assets/data/FooterData/FooterPaymentMenthods";
import { BiCreditCard } from "react-icons/bi";

const CartPayment = () => {
  const paymentMethods = [
    { value: "cash", label: "Cash on Delivery", checked: true },
    { value: "SCard", label: "Shopping cart Card" },
    { value: "paypal", label: "Paypal" },
    { value: "credit", label: "Credit or Debit card" },
  ];
  const [paymentMethod, setPaymentMethod] = useState("cash");
  const handleInputChange = (e) => {
    setPaymentMethod(e.target.value);
  };

  return (
    <div className="cart-payment-container">
      <h2>Order Summery</h2>
      <div className="coupon-code">
        <input
          autoComplete="false"
          name="coupon"
          type="text"
          placeholder="Enter Coupon Code"
          maxLength={8}
          minLength={0}
        />
        <button>Apply coupon</button>
      </div>

      <h4>Payments Details</h4>

      {paymentMethods?.map((method, i) => (
        <div key={method.value} className="method-input">
          <input
            autoComplete="true"
            id={`paymentMethod-${i + 1}`}
            type="radio"
            name="paymentMethod"
            value={method?.value}
            checked={method?.value === paymentMethod}
            onChange={handleInputChange}
          />
          <label htmlFor={`paymentMethod-${i + 1}`}>{method.label}</label>
        </div>
      ))}
      {paymentMethod === "credit" && (
        <div className="card-method-info">
          <div className="payment-methods mt-3">
            {footerPaymentMethod?.map((method) => (
              <img
                src={method.image}
                alt={method.name ?? "payment-method-image"}
                key={method.name}
                loading="lazy"
              />
            ))}
          </div>
          <form>
            <div className="input-item">
              <label htmlFor="email">Email*</label>
              <input
                autoComplete="true"
                type="email"
                name="email"
                id="email"
                placeholder="Type Here...."
              />
            </div>
            <div className="input-item">
              <label htmlFor="name">Card Holder Name*</label>
              <input
                autoComplete="true"
                type="text"
                name="name"
                id="name"
                placeholder="Type Here...."
              />
            </div>
            <div className="input-card ">
              <label htmlFor="cardNumber">Card Number*</label>
              <div className="card">
                <BiCreditCard className="text-gray-500" />
                <input
                  autoComplete="true"
                  type="text"
                  id="cardNumber"
                  name="cardNumber"
                  placeholder="000*****1245"
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2  gap-x-2">
              <div className="input-item">
                <label htmlFor="expire">Expire*</label>
                <input
                  type="date"
                  name="expire"
                  id="expire"
                  placeholder="MM/YY"
                />
              </div>
              <div className="input-item">
                <label htmlFor="ccc">CCC*</label>
                <input
                  autoComplete="false"
                  type="number"
                  name="ccc"
                  id="ccc"
                  placeholder="000"
                />
              </div>
            </div>
          </form>
        </div>
      )}

      <table className="w-full mt-5">
        <tbody className="">
          <tr className="text-slate-800 font-bold">
            <td className="text-start">hssjsjs</td>
            <td className="text-end">hssjsjs</td>
          </tr>
          <tr className="text-slate-800 font-bold">
            <td className="text-start">hssjsjs</td>
            <td className="text-end">hssjsjs</td>
          </tr>
          <tr className="text-slate-800 font-bold">
            <td className="text-start">hssjsjs</td>
            <td className="text-end">hssjsjs</td>
          </tr>
          <div className="border-b-2 border-b-gray-200 mt-3 w-full "></div>
          <tr className="text-slate-800 font-bold">
            <td className="text-start">hssjsjs</td>
            <td className="text-end">hssjsjs</td>
          </tr>
          <button className="text-white w-full py-2 px-3 rounded-full bg-customGreen mx-auto mt-5">
            Pay 6557#
          </button>
        </tbody>
      </table>
      <div className="w-full rounded-sm h-20 bg-orange-50 mt-4"></div>
    </div>
  );
};

export default CartPayment;
