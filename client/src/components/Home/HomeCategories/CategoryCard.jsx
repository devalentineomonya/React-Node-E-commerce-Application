import "./homecategories.css"
import PropTypes from "prop-types";

const CategoryCard = ({image, title}) => {
  return (
    <div className='home-category-card' style={{"--home-cat-img":`url('${image}')`}}>
        <div className="home-category-title">{title}</div>
      
    </div>
  )
}
CategoryCard.propTypes = {
    image: PropTypes.string,
    title: PropTypes.string
}

export default CategoryCard
