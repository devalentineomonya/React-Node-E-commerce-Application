import testImage from "../../assets/images/63e8c4e4aed3c6720e446aa1_airpod max-min.png"
const CartItemCard = () => {
  return (
    <div className="cart-item-card">
      <div className="item-image">
        <img src={testImage} alt="" loading="lazy" />
      </div>
      <div className="item-info">
        <div className="item-description">
          <h2>AirPods Max</h2>
          <p>color: Pink</p>
        </div>
        <div className="item-pricing">
          <p className="price">Kes 123.00</p>
          <p>quantity: 1</p>
        </div>
      </div>
    </div>
  );
}
export default CartItemCard;
