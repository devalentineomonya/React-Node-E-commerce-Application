import { BsHeart, BsStar, BsStarFill } from "react-icons/bs";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import "./productcard.css";
import testImage from "../../../assets/images/63e8c4e563db5507951bbfbe_homepad-mini-min.png";
import PropTypes from "prop-types"
import { useState } from "react";
const ProductCard = ({thumbnail, product}) => {
  const [cartValue, setCartValue] = useState(0)
  const handleCartDecrease = () => {
    if(cartValue){
      setCartValue(cartValue => cartValue-1)
      console.log(cartValue)
    }
    
  };
  const handleCartIncrease = () => {
    setCartValue(cartValue => cartValue+1)
    console.log(cartValue)
  
  };
  return (
    <div className="product-card-container">
      <div className="product-image">
        <img src={testImage} alt="" loading="lazy" />
        <div className="add-to-favorite">
          <BsHeart size={20} />
        </div>
      </div>
      {!thumbnail && (
        <div className="product-info">
          <div className="product-name">
            <span>{product?.name}</span>
            <span>
              $10 <sup>.00</sup>
            </span>
          </div>
          <p>255, 8, i5, G5</p>
          <div className="product-rating">
            <BsStarFill className="text-green-500" />
            <BsStar className="text-gray-600" />
          </div>
          <div className="cart-buttons">
            <div className="cart-action-buttons">
              <button className="decrease-items" onClick={handleCartDecrease} disabled={!cartValue}>
                <AiOutlineMinus />
              </button>
            <div className="cart-val">{cartValue}</div>
              <button className="increase-items" onClick={handleCartIncrease}>
                <AiOutlinePlus />
              </button>
            
            </div>
            <button className="add-to-cart">Add To Card</button>
          </div>
        </div>
      )}
    </div>
  );
};
ProductCard.propTypes = {
  thumbnail: PropTypes.bool,
  product: PropTypes.object
}

export default ProductCard;
