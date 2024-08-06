import testImage from "../../../assets/images/63e8c4e6cd367817e964f756_sofa-min.png"
const TrendingProductCard = () => {
  return (
    <div className="trending-products-card-container">
        <div className="trending-product-image">
            <img src={testImage} alt="trending-product-image" loading="lazy" />
        </div>
        <div className="trending-product-info">
            <h5>Furniture Village</h5>
            <p>Delivery with in 24 hours</p>
            <button>Shop Now</button>
        </div>

      
    </div>
  )
}

export default TrendingProductCard
