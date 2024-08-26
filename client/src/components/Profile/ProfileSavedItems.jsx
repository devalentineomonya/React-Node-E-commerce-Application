import ProductCard from "../common/ProductCard/ProductCard";
import { useSelector } from "react-redux";

const ProfileSavedItems = () => {
  const user = useSelector((state) => state.auth.user);
  const products = useSelector((state) => state.product.products);
  const likedItemsIds = user?.likedItems || [];

  const likedProductsList = products.filter((product) =>
    likedItemsIds.includes(product.id)
  );

  return (
    <div>
      <div className="profile-page-title">
        <h1>Saved Items</h1>
      </div>

      <div className="profile-items-grid">
        {likedProductsList.length > 0 ? (
          likedProductsList.map((product) => (
            <ProductCard key={product._id} product={product} thumbnail />
          ))
        ) : (
          <p>No recently viewed products.</p>
        )}
      </div>
    </div>
  );
};

export default ProfileSavedItems;
