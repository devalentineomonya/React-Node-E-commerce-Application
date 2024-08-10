import ProductCard from "../common/ProductCard/ProductCard"

const ProfileSavedItems = () => {
  return (
    <div>
    <div className="profile-page-title">
      <h1>Saved Items</h1>
    </div>
  
    <div className="profile-items-grid">
      <ProductCard thumbnail/>
      <ProductCard thumbnail/>
      <ProductCard thumbnail/>
      <ProductCard thumbnail/>
      <ProductCard thumbnail/>
      <ProductCard thumbnail/>
      <ProductCard thumbnail/>
      <ProductCard thumbnail/>
  
    </div>
  </div>
  )
}

export default ProfileSavedItems
