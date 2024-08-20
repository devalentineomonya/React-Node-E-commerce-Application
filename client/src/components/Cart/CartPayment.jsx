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
      <h2>Order Summary</h2>
      
      <div className="coupon-code">
        <input
          autoComplete="off"
          name="coupon"
          type="text"
          placeholder="Enter Coupon Code"
          maxLength={8}
          minLength={0}
        />
        <button>Apply Coupon</button>
      </div>

      <h4>Payment Details</h4>

      {paymentMethods.map((method, i) => (
        <div key={method.value} className="method-input">
          <input
            autoComplete="true"
            id={`paymentMethod-${i + 1}`}
            type="radio"
            name="paymentMethod"
            value={method.value}
            checked={method.value === paymentMethod}
            onChange={handleInputChange}
          />
          <label htmlFor={`paymentMethod-${i + 1}`}>{method.label}</label>
        </div>
      ))}

      {paymentMethod === "credit" && (
        <div className="card-method-info">
          <div className="payment-methods mt-3">
            {footerPaymentMethod.map((method) => (
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
                autoComplete="email"
                type="email"
                name="email"
                id="email"
                placeholder="Type Here...."
                required
              />
            </div>
            <div className="input-item">
              <label htmlFor="name">Card Holder Name*</label>
              <input
                autoComplete="name"
                type="text"
                name="name"
                id="name"
                placeholder="Type Here...."
                required
              />
            </div>
            <div className="input-card">
              <label htmlFor="cardNumber">Card Number*</label>
              <div className="card">
                <BiCreditCard className="text-gray-500" />
                <input
                  autoComplete="cc-number"
                  type="text"
                  id="cardNumber"
                  name="cardNumber"
                  placeholder="0000 0000 0000 0000"
                  required
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-2">
              <div className="input-item">
                <label htmlFor="expire">Expiry Date*</label>
                <input
                  type="month"
                  name="expire"
                  id="expire"
                  placeholder="MM/YY"
                  required
                />
              </div>
              <div className="input-item">
                <label htmlFor="ccc">CCC*</label>
                <input
                  autoComplete="off"
                  type="number"
                  name="ccc"
                  id="ccc"
                  placeholder="000"
                  required
                />
              </div>
            </div>
          </form>
        </div>
      )}

      <table className="w-full mt-5">
        <tbody>
          <tr className="text-slate-800 font-bold">
            <td className="text-start">Item 1</td>
            <td className="text-end">Price 1</td>
          </tr>
          <tr className="text-slate-800 font-bold">
            <td className="text-start">Item 2</td>
            <td className="text-end">Price 2</td>
          </tr>
          <tr className="text-slate-800 font-bold">
            <td className="text-start">Item 3</td>
            <td className="text-end">Price 3</td>
          </tr>
          <tr className="border-b-2 border-b-gray-200 mt-3 w-full"></tr>
          <tr className="text-slate-800 font-bold">
            <td className="text-start">Total</td>
            <td className="text-end">Total Price</td>
          </tr>
        </tbody>
      </table>

      <button className="text-white w-full py-2 px-3 rounded-full bg-customGreen mx-auto mt-5">
        Pay 6557#
      </button>

      <div className="w-full rounded-sm h-20 bg-orange-50 mt-4"></div>
    </div>
  );
};

export default CartPayment;
