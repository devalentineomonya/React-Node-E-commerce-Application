import ProductDescription from "./ProductDescription"
import ProductImages from "./ProductImages"
import "./productinfo.css"
const ProductInfo = () => {
  return (
    <div className="product-info-container">
        <ProductImages/>
        <ProductDescription/>
      
    </div>
  )
}

export default ProductInfo
