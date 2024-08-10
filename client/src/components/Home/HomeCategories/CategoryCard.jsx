import { Link } from "react-router-dom";
import "./homecategories.css";
import PropTypes from "prop-types";

const CategoryCard = ({ image, title }) => {
  return (
    <div
        className="home-category-card"
        style={{ "--home-cat-img": `url('${image}')` }}
      >
    <Link to={`/shop?category=${title.replaceAll(" ","").toLowerCase()}`}>
        <div className="home-category-title">{title}</div>
    </Link>
      </div>
  );
};
CategoryCard.propTypes = {
  image: PropTypes.string,
  title: PropTypes.string,
};

export default CategoryCard;
