import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { BiCreditCard } from "react-icons/bi";
import { BsStar, BsStarFill, BsTruck } from "react-icons/bs";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";


const hexToRgba = (hex, alpha) => {
  hex = hex.replace(/^#/, '');
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

const ProductDescription = () => {
  const productInfo = useSelector((state) => state.product.currentProduct);

  return (
    <div className="product-description-container">
      <div className="description-item">
        <h1 className="title">{productInfo?.name}</h1>
        <p className="description">{productInfo?.longDescription}</p>
        <div className="product-rating text-[12px]">
          <BsStarFill size={12} />
          <BsStarFill size={12} />
          <BsStarFill size={12} />
          <BsStarFill size={12} />
          <BsStar size={12} /> <span>(223)</span>
        </div>
      </div>
      <div className="description-item">
        <h3 className="pricing">
          Kes{productInfo?.price} or {(productInfo?.price / 6).toFixed(2)} per
          Month
        </h3>
        <p className="description">
          Suggested payments with 6 months special financing
        </p>
      </div>
      <div className="description-item">
        <p className="color">Choose a color</p>
        <div className="color-palate-container">
          {productInfo?.colorVariants?.map((color, index) => {
            const baseColor = color.hexCode;
            const opacity = 0.70; 
            const transparentColor = hexToRgba(baseColor, opacity);

            const firstColor = index % 2 === 0 ? baseColor : transparentColor;
            const secondColor = index % 2 === 0 ? transparentColor : baseColor;

            return (
              <div key={index} className="color-palate">
                <div
                  className="item"
                  style={{ backgroundColor: firstColor }}
                ></div>
                <div
                  className="item"
                  style={{ backgroundColor: secondColor }}
                ></div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="description-item">
        <div className="flex gap-x-6">
          <div className="cart-action-buttons border-none bg-gray-200 min-w-28 flex justify-between">
            <button
              className="decrease-items"
              title="Remove"
              aria-label="Remove"
            >
              <AiOutlineMinus />
            </button>
            <div className="cart-val">1</div>
            <button className="increase-items" title="Add" aria-label="Add">
              <AiOutlinePlus />
            </button>
          </div>
          <p className="text-[10px] font-semibold mt-3">
            Only <span className="text-orange-500">{productInfo?.stock} Items</span> left <br />
            Don&apos;t Miss Out
          </p>
        </div>
        <div className="flex gap-x-2 mt-2">
          <button
            className="add-to-cart min-w-32 bg-customGreen hover:bg-black text-white"
            title="Buy Now"
            aria-label="Buy Now"
         
          >
            <Link to="checkout">
            
            Buy Now
            </Link>
          </button>
          <button
            className="add-to-cart min-w-32"
            title="Add to cart"
            aria-label="Add to cart"
          >
            Add To Cart
          </button>
        </div>
      </div>
      <div className="delivery-options">
        <div className="delivery-option">
          <div className="option-icon">
            <BsTruck size={18} />
          </div>
          <div className="option-info">
            <h6>Free Delivery</h6>
            <p>
              <span>Enter your postal code for Delivery Availability</span>
            </p>
          </div>
        </div>
        <div className="delivery-option">
          <div className="option-icon">
            <BiCreditCard size={18} />
          </div>
          <div className="option-info">
            <h6>Return Delivery</h6>
            <p>
              Free 30 days Delivery return. <span>Details</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDescription;
