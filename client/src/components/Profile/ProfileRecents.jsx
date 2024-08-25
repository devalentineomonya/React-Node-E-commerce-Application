import { useSelector } from "react-redux";
import ProductCard from "../common/ProductCard/ProductCard";

const ProfileRecent = () => {
  const user = useSelector(state => state.auth.user);
  const products = useSelector(state => state.product.products);
  const recentlyViewedIds = user?.recentItems || [];

  const recentlyViewedProducts = products.filter(product => recentlyViewedIds.includes(product.id));

  return (
    <div>
      <div className="profile-page-title">
        <h1>Recently Viewed</h1>
      </div>

      <div className="profile-items-grid">
        {recentlyViewedProducts.length > 0 ? (
          recentlyViewedProducts.map(product => (
            <ProductCard key={product._id} product={product} thumbnail />
          ))
        ) : (
          <p>No recently viewed products.</p>
        )}
      </div>
    </div>
  );
};

export default ProfileRecent;
