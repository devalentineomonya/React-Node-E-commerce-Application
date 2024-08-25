import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types"
const TrendingProductCard = ({ product }) => {
  const navigate = useNavigate()
  const handleClick = (id)=>{
    return navigate(`/product/${id}`)
  }
  const handleKeyDown = (e,id)=>{
    if(e.key === "Enter"){
      handleClick(id)
    }
  }
  return (
    <div className="trending-products-card-container">
      <div className="trending-product-image">
        <img src={product?.images} alt={product?.name} loading="lazy" />
      </div>
      <div className="trending-product-info">
        <h5>{product?.name}</h5>
        <p>Delivery with in 24 hours</p>
        <button title="Shop Now" aria-label="Shop Now" onClick={()=>handleClick(product?.id)} onKeyDown={(e)=>handleKeyDown(e,product?.id)}>
          Shop Now
        </button>
      </div>
    </div>
  );
};
TrendingProductCard.propTypes = {
  product:PropTypes.object.isRequired
}
export default TrendingProductCard;
