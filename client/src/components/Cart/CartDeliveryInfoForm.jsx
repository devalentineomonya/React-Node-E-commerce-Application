import { useState } from "react";
import deliveryInfoInputs from "../../assets/data/DeliveryInfo/DeliveryInfo";

const CartDeliveryInfoForm = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    address: "",
    town: "",
    zip: "",
    email: "",
    number: "",
  });
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  console.log(formData);
  return (
    <div>
      <form action="" method="post">
        <div className="form-button-container">
          <h5>Delivery Information</h5>
          <button type="submit" title="Save Information" aria-label="Save Information">Save Information</button>
        </div>
        <div className="grid grid-cols-2 gap-x-4">
          {deliveryInfoInputs?.slice(0, 2)?.map(({ name, label, type }) => (
            <div key={name} className="input-item">
              <label htmlFor={name}>{label}</label>
              <input
                value={formData[name]}
                type={type ?? "text"}
                name={name}
                placeholder="Type here... "
                required
                onChange={handleInputChange}
              />
            </div>
          ))}
        </div>
        <div className="w-full">
          {deliveryInfoInputs?.slice(2, 3)?.map(({ name, label, type }) => (
            <div key={name} className="input-item">
              <label htmlFor={name}>{label}</label>
              <input
                type={type ?? "text"}
                name={name}
                placeholder="Type here... "
                required
                onChange={handleInputChange}
              />
            </div>
          ))}
        </div>
        <div className="grid grid-cols-2 gap-x-4">
          {deliveryInfoInputs
            ?.slice(3, deliveryInfoInputs.length)
            ?.map(({ name, label, type }) => (
              <div key={name} className="input-item">
                <label htmlFor={name}>{label}</label>
                <input
                  type={type ?? "text"}
                  name={name}
                  placeholder="Type here... "
                  required
                  onChange={handleInputChange}
                />
              </div>
            ))}
        </div>
      </form>
    </div>
  );
};

export default CartDeliveryInfoForm;
