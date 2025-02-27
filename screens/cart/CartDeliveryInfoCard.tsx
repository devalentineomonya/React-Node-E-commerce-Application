const CartDeliveryInfoCard = () => {
  return (
    
    <div className="cart-delivery-card">
      <div className="form-button-container py-0">
        <h5>Delivery Information</h5>
        <button
          type="submit"
          title="Edit Information"
          aria-label="Edit Information"
        >
          Edit
        </button>
      </div>
      <div className="delivery-info">
        <h5 className="name">Valentine Omonya</h5>
        <p className="address">4443 Parker Rd, Allentown, New Mexico 31134</p>
        <p className="phone">+254768133220</p>
        <p className="email">valomosh254@gmail.com</p>
      </div>
    </div>
  );
};

export default CartDeliveryInfoCard;
