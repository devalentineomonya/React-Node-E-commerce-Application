import { BsStar, BsStarFill } from "react-icons/bs";
import "./productcard.css";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import scrollReveal from "scrollreveal";
import { revealConfig } from "../../../../config/ScrollConfig";
import ProductLike from "./ProductLike";
import { useDispatch, useSelector } from "react-redux";
import { addItem } from "../../../../app/features/cart/cartSlice";
import { useAddToCartMutation } from "../../../../app/features/cart/cartAPI";
import CartActionButtons from "./CartActionButtons"; 
import { toast } from "react-toastify";

const ProductCard = ({ thumbnail, product, animate }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state?.cart?.items);
  const allProducts = useSelector((state) => state?.product?.products);

  const [cartValue, setCartValue] = useState(0);
  const [addToCart] = useAddToCartMutation();

  useEffect(() => {
    const item = cartItems?.find((item) => item?.product === product?.id);
    setCartValue(item ? item?.quantity : 0);
  }, [cartItems, product?.id]);

  const currentStock =
    allProducts.find((p) => p?.id === product?.id)?.stock || 0;

  const handleAddToCart = async () => {
    try {
      if (currentStock > 0) {
        if (cartValue === 0) {
          dispatch(addItem(product?.id));
          const response = await addToCart(product?.id );
          if (response?.data) {
            toast.success(response?.data?.message);
          }
        }
        setCartValue((prevValue) => prevValue + 1);
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message || "An error occurred while adding item to cart");
    }
  };

  const handleImageClick = (id) => {
    localStorage.setItem("currentProductUrl", location.pathname);
    navigate(`/product/${id}`);
  };

  const handleKeyDown = (e, id) => {
    if (e.key === "Enter") {
      handleImageClick(id);
    }
  };

  useEffect(() => {
    const sr = scrollReveal();
    if (animate) {
      sr.reveal(".product-card-container", {
        ...revealConfig,
        duration: 1000,
        origin: "bottom",
        distance: "40px",
        scale: 0.05,
      });
    }
  }, [animate]);

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
        <ProductLike productId={product?.id} />
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
            {cartValue > 0 ? (
              <CartActionButtons
                cartValue={cartValue}
                currentStock={currentStock}
                productId={product?.id}
              />
            ) : (
              <button
                title="Add to cart"
                aria-label="Add to cart"
                className="add-to-cart"
                onClick={handleAddToCart}
              >
                Add To Cart
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
  animate: PropTypes.bool,
  product: PropTypes.object.isRequired,
};

export default ProductCard;
