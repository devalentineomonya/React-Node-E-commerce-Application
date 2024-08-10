import ProductCard from "../common/ProductCard/ProductCard"

const ProfileRecent = () => {
  return (
    <div>
    <div className="profile-page-title">
      <h1>Recently Viewed</h1>
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

export default ProfileRecent
