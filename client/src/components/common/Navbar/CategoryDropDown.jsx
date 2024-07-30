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
export const CategoryItem = ({ image, category, count }) => {
  return (
    <Link to={`/shop?category=${category.toLowerCase()}`}>
      <div className="category-card-container">
        <div className="category-card-image">
          <img src={image} alt="" />
        </div>
        <div className="category-card-text">
          <h6>{category}</h6>
          <p>{count} Items Available</p>
        </div>
      </div>
    </Link>
  );
};

CategoryItem.protoTypes = {
  image: PropTypes.string,
  category: PropTypes.string,
  count: PropTypes.number,
  toLowerCase: PropTypes.func,
};

CategoryDropDown.protoTypes = {
  showDropDown:PropTypes.bool,
  setShowDropDown:PropTypes.func

}
export default CategoryDropDown;
