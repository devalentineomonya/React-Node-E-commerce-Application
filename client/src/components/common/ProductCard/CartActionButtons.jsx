import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
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
import debounce from "lodash/debounce";

const CartActionButtons = ({ cartValue, currentStock, productId }) => {
  const dispatch = useDispatch();
  const [incrementQuantity] = useIncrementQuantityMutation();
  const [decrementQuantity] = useDecrementQuantityMutation();
  const [removeFromCart] = useRemoveFromCartMutation();
  const user = useSelector(state=>state.auth.user)


  const updateLocalStorageCart = (id, quantity) => {
    const cartItems = JSON.parse(localStorage.getItem("cartItems")) || {};
    if (quantity > 0) {
      cartItems[id] = quantity;
    } else {
      delete cartItems[id];
    }
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  };

 
  const debouncedIncrement = debounce(async () => {
    if (currentStock > cartValue) {
      if (user) {
        
        dispatch(updateQuantity({ product: productId, quantity: cartValue + 1 }));
        try {
          const response = await incrementQuantity(productId);
          if (!response.data) {
            dispatch(updateQuantity({ product: productId, quantity: cartValue }));
            throw new Error(
              response.error?.data?.message || response.error?.message || "Failed to increase quantity"
            );
          }
        } catch (error) {
          console.error("Error handling cart increase:", error);
          toast.error(error.message || "An error occurred while increasing quantity");
        }
      } else {
       
        updateLocalStorageCart(productId, cartValue + 1);
      }
    }
  }, 1000); 

  const debouncedDecrement = debounce(async () => {
    try {
      if (cartValue > 1) {
        if (user) {
          
          dispatch(updateQuantity({ product: productId, quantity: cartValue - 1 }));
          try {
            const response = await decrementQuantity(productId);
            if (!response.data) {
              dispatch(updateQuantity({ product: productId, quantity: cartValue }));
              throw new Error(
                response.error?.data?.message || response.error?.message || "Failed to decrease quantity"
              );
            }
          } catch (error) {
            console.error("Error handling cart decrease:", error);
            toast.error(error.message || "An error occurred while decreasing quantity");
          }
        } else {
         
          updateLocalStorageCart(productId, cartValue - 1);
        }
      } else if (cartValue === 1) {
        if (user) {
          
          dispatch(removeItem(productId));
          try {
            const response = await removeFromCart(productId);
            if (!response.data) {
              dispatch(addItem({ product: productId, quantity: 1 }));
              throw new Error(
                response.error?.data?.message || response.error?.message || "Failed to remove item from cart"
              );
            }
          } catch (error) {
            console.error("Error handling cart removal:", error);
            toast.error(error.message || "An error occurred while removing item from cart");
          }
        } else {
          
          updateLocalStorageCart(productId, 0);
        }
      }
    } catch (error) {
      console.error("Error handling cart decrease:", error);
      toast.error(error.message || "An error occurred while decreasing quantity");
    }
  }, 1000); 

  const handleCartDecrease = () => {
    dispatch(updateQuantity({ product: productId, quantity: cartValue - 1 }));
    debouncedDecrement();
  };

  const handleCartIncrease = () => {
    dispatch(updateQuantity({ product: productId, quantity: cartValue + 1 }));
    debouncedIncrement();
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
