import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import {
  updateQuantity,
  removeItem,
  addItem,
} from "../../../../app/features/cart/cartSlice";
import {
  useIncrementQuantityMutation,
  useDecrementQuantityMutation,
  useRemoveFromCartMutation,
} from "../../../../app/features/cart/cartAPI";
import { toast } from "react-toastify";

const CartActionButtons = ({ cartValue, currentStock, productId }) => {
  const dispatch = useDispatch();
  const [incrementQuantity] = useIncrementQuantityMutation();
  const [decrementQuantity] = useDecrementQuantityMutation();
  const [removeFromCart] = useRemoveFromCartMutation();

  const handleCartDecrease = async () => {
    try {
      if (cartValue > 1) {
        // Update quantity in Redux state
        dispatch(updateQuantity({ product: productId, quantity: cartValue - 1 }));

        // Call API to update quantity
        const response = await decrementQuantity(productId);

        if (!response.data) {
          // Rollback in case of failure
          dispatch(updateQuantity({ product: productId, quantity: cartValue }));
          throw new Error(
            response.error?.data?.message || response.error?.message || "Failed to decrease quantity"
          );
        }
      } else if (cartValue === 1) {
        // Remove item from Redux state and API
        dispatch(removeItem(productId));
        const response = await removeFromCart(productId);

        if (!response.data) {
          // Rollback in case of failure
          dispatch(addItem({ product: productId, quantity: 1 }));
          throw new Error(
            response.error?.data?.message || response.error?.message || "Failed to remove item from cart"
          );
        }
      }
    } catch (error) {
      console.error("Error handling cart decrease:", error);
      toast.error(error.message || "An error occurred while decreasing quantity");
    }
  };

  const handleCartIncrease = async () => {
    try {
      if (currentStock > cartValue) {
        // Update quantity in Redux state
        dispatch(updateQuantity({ product: productId, quantity: cartValue + 1 }));

        // Call API to update quantity
        const response = await incrementQuantity(productId);

        if (!response.data) {
          // Rollback in case of failure
          dispatch(updateQuantity({ product: productId, quantity: cartValue }));
          throw new Error(
            response.error?.data?.message || response.error?.message || "Failed to increase quantity"
          );
        }
      }
    } catch (error) {
      console.error("Error handling cart increase:", error);
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
