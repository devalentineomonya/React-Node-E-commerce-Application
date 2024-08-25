import { BsChevronDown } from "react-icons/bs";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { revealConfig } from "../../../../config/ScrollConfig";
import scrollReveal from "scrollreveal";
import { useSelector } from "react-redux";

const NavCategoryDropDown = ({ showDropDown, setShowDropDown }) => {
  const categories = useSelector((state) => state.category.categories);
  const products = useSelector((state) => state.product.products);

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
        Category{" "}
        <BsChevronDown className={`${showDropDown ? "rotate-180" : ""}`} />
      </div>
      <div
        className={`category-drop-down-content-container ${
          showDropDown ? "show" : ""
        }`}
      >
        <div className="category-drop-down-content-title">
          Popular Categories
        </div>
        <div className="category-drop-down-content">
          {categories?.map((category) => {
            const productInCategory = products?.filter((product) => product?.category === category?.name)
            return (
              <CategoryItem
                image={category?.imageUrl}
                name={category?.name}
                count={productInCategory.length}
                key={category?._id}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export const CategoryItem = ({ image, name, count, brand, animate }) => {
  useEffect(() => {
    if (animate) {
      const sr = scrollReveal();
      sr.reveal(".brand-animation-class", {
        ...revealConfig,
        scale: 0.1,
        duration: 1000,
        distance: "30px",
        origin: "left",
        opacity: 0,
      });
    }
  }, [animate]);

  return (
    <Link
      to={`/shop?${brand ? "brand" : "category"}=${name.toLowerCase()}`}
      title="Shop Category"
      aria-label="Shop Category"
    >
      <div
        className={`category-card-container ${
          brand ? "brand-animation-class" : " "
        } ${brand ? "hover:border border-customGreen" : ""}`}
      >
        <div className={`category-card-image ${brand ? "bg-transparent" : ""}`}>
          <img
            src={image}
            alt={name ?? "category/brand-image"}
            className={`${brand ? "rounded-full" : ""}`}
            loading="lazy"
          />
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
  animate: PropTypes.bool,
};

NavCategoryDropDown.propTypes = {
  showDropDown: PropTypes.bool.isRequired,
  setShowDropDown: PropTypes.func.isRequired,
};

export default NavCategoryDropDown;
