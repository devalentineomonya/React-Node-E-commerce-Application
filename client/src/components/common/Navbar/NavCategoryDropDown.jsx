import { BsChevronDown } from "react-icons/bs";
import headPhone from "../../../assets/images/63ec58077c3c77e31aff9b5d_Rectangle 1437-2.png";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const NavCategoryDropDown = ({ showDropDown, setShowDropDown }) => {
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
        tabIndex={0}
      >
        Category <BsChevronDown className={`${showDropDown ? "rotate-180" : ""}`} />
      </div>
      <div className={`category-drop-down-content-container ${showDropDown ? "show" : ""}`}>
        <div className="category-drop-down-content-title">Popular Categories</div>
        <div className="category-drop-down-content">
          <CategoryItem image={headPhone} name="Headphones" count={43} />
          <CategoryItem image={headPhone} name="Speakers" count={21} />
          <CategoryItem image={headPhone} name="Microphones" count={15} />
          <CategoryItem image={headPhone} name="Earbuds" count={32} />
          <CategoryItem image={headPhone} name="Headsets" count={18} />
          <CategoryItem image={headPhone} name="Amplifiers" count={12} />
          <CategoryItem image={headPhone} name="Turntables" count={7} />
          <CategoryItem image={headPhone} name="Mixers" count={9} />
          <CategoryItem image={headPhone} name="Accessories" count={50} />
        </div>
      </div>
    </div>
  );
};

export const CategoryItem = ({ image, name, count, brand }) => {
  return (
    <Link to={`/shop?${brand ? "brand" : "category"}=${name.toLowerCase()}`}>
      <div className={`category-card-container ${brand ? "hover:border border-customGreen" : ""}`}>
        <div className={`category-card-image ${brand ? "bg-transparent" : ""}`}>
          <img src={image} alt={name ?? "category/brand-image"} className={`${brand ? "rounded-full" : ""}`} loading="lazy" />
        </div>
        <div className="category-card-text">
          <h6>{name}</h6>
          <p>{count} Items Available</p>
        </div>
      </div>
    </Link>
  );
};

CategoryItem.propTypes = {
  image: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  count: PropTypes.number.isRequired,
  brand: PropTypes.bool,
};

NavCategoryDropDown.propTypes = {
  showDropDown: PropTypes.bool.isRequired,
  setShowDropDown: PropTypes.func.isRequired,
};

export default NavCategoryDropDown;
