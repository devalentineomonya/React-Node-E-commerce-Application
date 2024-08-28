import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { updateQuantity, removeItem } from "../../../../app/features/cart/cartSlice";
import { useIncrementQuantityMutation, useDecrementQuantityMutation, useRemoveFromCartMutation } from "../../../../app/features/cart/cartAPI";
import { toast } from "react-toastify";
// import _ from "lodash";

const CartActionButtons = ({ cartValue, currentStock, productId }) => {
  const dispatch = useDispatch();
  const [incrementQuantity] = useIncrementQuantityMutation();
  const [decrementQuantity] = useDecrementQuantityMutation();
  const [removeFromCart] = useRemoveFromCartMutation();

  const handleCartDecrease = async () => {
    try {
      if (cartValue > 1) {
        dispatch(updateQuantity({quantity:cartValue - 1, id:productId}));
        const response = await decrementQuantity(productId );
        if (response.data) {
          toast.success(response.data.message);
        }
      } else if (cartValue === 1) {
        dispatch(removeItem({quantity:0, id:productId}));
        const response = await removeFromCart(productId );
        if (response.data) {
          toast.success(response.data.message);
        }
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message || "An error occurred while decreasing quantity");
    }
  };

  const handleCartIncrease = async () => {
    try {
      if (currentStock > 0) {
        dispatch(updateQuantity({id:productId, quantity:cartValue + 1 }));
        const response = await incrementQuantity(productId);
        if (response.data) {
          toast.success(response.data.message);
        }
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message || "An error occurred while increasing quantity");
    }
  };

  return (
    <div className="cart-action-buttons">
      <button
        title="Decrease"
        aria-label="Decrease"
        className={`decrease-items ${cartValue === 0 ? "cursor-not-allowed opacity-50" : ""}`}
        onClick={handleCartDecrease}
        disabled={cartValue === 0}
      >
        <AiOutlineMinus />
      </button>
      <div className="cart-val">{cartValue}</div>
      <button
        title="Increase"
        aria-label="Increase"
        className={`increase-items ${currentStock === 0 ? "cursor-not-allowed opacity-50" : ""}`}
        onClick={handleCartIncrease}
        disabled={currentStock === 0}
      >
        <AiOutlinePlus />
      </button>
    </div>
  );
};

CartActionButtons.propTypes = {
  cartValue: PropTypes.number.isRequired,
  currentStock: PropTypes.number.isRequired,
  productId: PropTypes.string.isRequired,
};

export default CartActionButtons;
