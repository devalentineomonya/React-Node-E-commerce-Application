import CartItemCard from "../Cart/CartItemCard"

const ProfileDeliveries = () => {
  return (
    <div>
    <div className="profile-page-title">
      <h1>DELIVERED</h1>
    </div>
  
    <div className="cart-items px-4">
      <CartItemCard/>
      <CartItemCard/>
      <CartItemCard/>
      <CartItemCard/>
    </div>
  </div>
  )
}

export default ProfileDeliveries
