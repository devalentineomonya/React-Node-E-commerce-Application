import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { BiCreditCard } from "react-icons/bi";
import { BsStar, BsStarFill, BsTruck } from "react-icons/bs";

const ProductDescription = () => {
  return (
    <div className="product-description-container">
      <div className="description-item">
        <h1 className="title">Airpods - Max</h1>
        <p className="description">
          Esse incididunt Lorem nisi velit aute anim ipsum. Ut enim
          reprehenderit duis exercitation.
        </p>
        <div className="product-rating text-[12px]">
          <BsStarFill size={12} />
          <BsStarFill size={12} />
          <BsStarFill size={12} />
          <BsStarFill size={12} />
          <BsStar size={12} /> <span>(223)</span>{" "}
        </div>
      </div>
      <div className="description-item">
        <h3 className="pricing">Kes12000.00 or 120.00 per Month</h3>
        <p className="description">
          Suggested payments with 6 months special financing
        </p>
      </div>
      <div className="description-item">
        <p className="color">Choose a color</p>
        <div className="color-palate-container">
          <div className="color-palate">
            <div className="item bg-red-700"></div>
            <div className="item bg-red-400"></div>
          </div>
          <div className="color-palate">
            <div className="item bg-green-400"></div>
            <div className="item bg-green-700"></div>
          </div>
          <div className="color-palate">
            <div className="item bg-gray-700"></div>
            <div className="item bg-gray-400"></div>
          </div>
          <div className="color-palate">
            <div className="item bg-orange-400"></div>
            <div className="item bg-orange-700"></div>
          </div>
        </div>
      </div>
      <div className="description-item">
        <div className="flex gap-x-6">
          <div className="cart-action-buttons border-none bg-gray-200 min-w-28 flex justify-between">
            <button className="decrease-items">
              <AiOutlineMinus />
            </button>
            <div className="cart-val">1</div>
            <button className="increase-items">
              <AiOutlinePlus />
            </button>
          </div>
          <p className="text-[10px] font-semibold mt-3">
            Only <span className="text-orange-500">12 Items</span> left <br />
            Don&apos;t Miss Out
          </p>
        </div>
        <div className="flex gap-x-2 mt-2">
          <button className="add-to-cart min-w-32 bg-customGreen hover:bg-black text-white">
            Buy Now
          </button>
          <button className="add-to-cart min-w-32">Add To Card</button>
        </div>
      </div>
      <div className="delivery-options">
        <div className="delivery-option">
          <div className="option-icon">
            <BsTruck  size={18}/>
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
            <BiCreditCard  size={18}/>
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
