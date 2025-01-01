import PropTypes from "prop-types";
import { useSetProductLikeMutation } from "../../../../app/features/product/productAPI";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../../../../app/features/auth/authSlice";
import { useState, useCallback } from "react";
import lodash from "lodash";

const ProductLike = ({ productId }) => {
  const [setLike] = useSetProductLikeMutation();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");
  const [liked, setLiked] = useState(user?.likedItems?.includes(productId));

  const debouncedHandleLike = useCallback(
    lodash.debounce(async (productId) => {
      if (user?.isVerified && token && userId) {
        const previousLikedState = liked;
        try {
          const response = await setLike(productId);
          if (!response?.data?.success) {
            setLiked(previousLikedState);
          } else {
            await dispatch(setUser(response?.data?.data));
          }
        } catch (error) {
          console.error("Error liking product:", error);
          setLiked(previousLikedState);
        }
      }
    }, 1000),
    [user, token, userId, dispatch, setLike, liked]
  );

  const handleLike = () => {
    const newLikedStatus = !liked;
    setLiked(newLikedStatus);
    debouncedHandleLike(productId);
  };

  return (
    <div className="heart-container" title="Like">
      <input
        type="checkbox"
        className="checkbox"
        title="Like"
        placeholder=""
        onChange={handleLike}
        checked={liked}
      />
      <div className="svg-container">
        <svg
          viewBox="0 0 24 24"
          className="svg-outline"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M17.5,1.917a6.4,6.4,0,0,0-5.5,3.3,6.4,6.4,0,0,0-5.5-3.3A6.8,6.8,0,0,0,0,8.967c0,4.547,4.786,9.513,8.8,12.88a4.974,4.974,0,0,0,6.4,0C19.214,18.48,24,13.514,24,8.967A6.8,6.8,0,0,0,17.5,1.917Zm-3.585,18.4a2.973,2.973,0,0,1-3.83,0C4.947,16.006,2,11.87,2,8.967a4.8,4.8,0,0,1,4.5-5.05A4.8,4.8,0,0,1,11,8.967a1,1,0,0,0,2,0,4.8,4.8,0,0,1,4.5-5.05A4.8,4.8,0,0,1,22,8.967C22,11.87,19.053,16.006,13.915,20.313Z" />
        </svg>
        <svg
          viewBox="0 0 24 24"
          className="svg-filled"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M17.5,1.917a6.4,6.4,0,0,0-5.5,3.3,6.4,6.4,0,0,0-5.5-3.3A6.8,6.8,0,0,0,0,8.967c0,4.547,4.786,9.513,8.8,12.88a4.974,4.974,0,0,0,6.4,0C19.214,18.48,24,13.514,24,8.967A6.8,6.8,0,0,0,17.5,1.917Z" />
        </svg>
        <svg
          className="svg-celebrate"
          width="100"
          height="100"
          xmlns="http://www.w3.org/2000/svg"
        >
          <polygon points="10,10 20,20" />
          <polygon points="10,50 20,50" />
          <polygon points="20,80 30,70" />
          <polygon points="90,10 80,20" />
          <polygon points="90,50 80,50" />
          <polygon points="80,80 70,70" />
        </svg>
      </div>
    </div>
  );
};

ProductLike.propTypes = {
  productId: PropTypes.string.isRequired,
};

export default ProductLike;
