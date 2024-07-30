import { BsChevronDown } from "react-icons/bs";
import headPhone from "../../../assets/images/63ec58077c3c77e31aff9b5d_Rectangle 1437-2.png";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const CategoryDropDown = ({showDropDown, setShowDropDown}) => {
  
  return (
    <div className="category-drop-down-container">
      <div
        className="category-drop-down-label"
        onClick={() => setShowDropDown((prev) => !prev)}
        onKeyDown={(event) => {
          if (event.key === "Enter") {
            setShowDropDown((prev) => !prev);
          }
        }}
      >
        Category <BsChevronDown className={`${showDropDown ? "rotate-180" : ""}`} />
        
      </div>
      <div className={`category-drop-down-content-container ${showDropDown ? "show" : ""}`}>
        <div className="category-drop-down-content-title">
          Popular Categories
        </div>

        <div className="category-drop-down-content">
          <CategoryItem image={headPhone} category="headPhone" count={43} />
          <CategoryItem image={headPhone} category="headPhone" count={43} />
          <CategoryItem image={headPhone} category="headPhone" count={43} />
          <CategoryItem image={headPhone} category="headPhone" count={43} />
          <CategoryItem image={headPhone} category="headPhone" count={43} />
          <CategoryItem image={headPhone} category="headPhone" count={43} />
          <CategoryItem image={headPhone} category="headPhone" count={43} />
          <CategoryItem image={headPhone} category="headPhone" count={43} />
          <CategoryItem image={headPhone} category="headPhone" count={43} />
        </div>
      </div>
    </div>
  );
};
export const CategoryItem = ({ image, name, count, brand }) => {
  return (
    <Link to={`/shop?${brand ? "brand" : "category"}=${name?.toLowerCase()}`}>
      <div className={`category-card-container ${brand ? "hover:border border-customGreen " : ""}`}>
        <div className={`category-card-image ${brand ?  "bg-transparent": ""}`}>
          <img src={image} alt="" className={`${brand ? "rounded-full" : ""}`} />
        </div>
        <div className="category-card-text">
          <h6>{name}</h6>
          <p>{count} Items Available</p>
        </div>
      </div>
    </Link>
  );
};

CategoryItem.protoTypes = {
  image: PropTypes.string,
  name: PropTypes.string,
  count: PropTypes.number,
  rounded:PropTypes.bool,
  brand:PropTypes.bool,
  toLowerCase: PropTypes.func,
};

CategoryDropDown.protoTypes = {
  showDropDown:PropTypes.bool,
  setShowDropDown:PropTypes.func

}
export default CategoryDropDown;
