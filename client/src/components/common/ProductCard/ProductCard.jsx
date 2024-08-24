import { BsHeart, BsStar, BsStarFill } from "react-icons/bs";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import "./productcard.css";
import PropTypes from "prop-types";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const ProductCard = ({ thumbnail, product }) => {
  const navigate = useNavigate();
  const location = useLocation()

  const [cartValue, setCartValue] = useState(0);
  const randomBool = Math.random() > 1 / 2 ? true : false;
  const handleCartDecrease = () => {
    if (cartValue) {
      setCartValue((cartValue) => cartValue - 1);
    }
  };
  const handleCartIncrease = () => {
    setCartValue((cartValue) => cartValue + 1);
  };
  const handleImageClick = async (id) => {
    localStorage.setItem("currentProductUrl", location.pathname)
    return navigate(`/product/${id}`);
  };
  const handleKeyDown = (e, id) => {
    if (e.key === "Enter") {
      handleImageClick(id);
    }
  };

  return (
    <div className="product-card-container">
      <div className="product-image">
        <img
          src={product?.images}
          alt={product?.name}
          loading="lazy"
          onClick={() => handleImageClick(product?.id)}
          onKeyDown={(e) => handleKeyDown(e, product?.id)}
        />

        <div
          className="add-to-favorite"
          title="Favorite"
          aria-label="Favorite"
          onClick={() => alert("Added")}
        >
          <BsHeart size={20} />
        </div>
      </div>

      {!thumbnail && (
        <div className="product-info">
          <div className="product-name">
            <span className="truncate">{product?.name}</span>
            <span className="whitespace-nowrap">
              ${product?.price} <sup>.00</sup>
            </span>
          </div>
          <p className="truncate">{product?.shortDescription}</p>
          <div className="product-rating">
            <BsStarFill className="text-green-500" />
            <BsStar className="text-gray-600" />
          </div>
          <div className="cart-buttons">
            {randomBool ? (
              <div className="cart-action-buttons">
                <button
                  title="Remove"
                  aria-label="Remove"
                  className="decrease-items"
                  onClick={handleCartDecrease}
                  disabled={!cartValue}
                >
                  <AiOutlineMinus />
                </button>
                <div className="cart-val">{cartValue}</div>
                <button
                  title="Add"
                  aria-label="Add"
                  className="increase-items"
                  onClick={handleCartIncrease}
                >
                  <AiOutlinePlus />
                </button>
              </div>
            ) : (
              <button
                title="Add to cart"
                aria-label="Add to cart"
                className="add-to-cart"
              >
                Add To Card
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
ProductCard.propTypes = {
  thumbnail: PropTypes.bool,
  product: PropTypes.object,
};

export default ProductCard;
