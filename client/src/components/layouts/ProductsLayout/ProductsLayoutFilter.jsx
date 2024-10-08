import { BsFilter } from "react-icons/bs";
import SectionLayout from "../SectionLayout/SectionLayout";

const ProductsLayoutFilter = () => {
  return (
    <SectionLayout>
      <div className="product-filter">
        <div className="product-filter-options">
          <div className="filter-item">
            <select name="type">
              <option value={null}>ProductType</option>
            </select>
          </div>
          <div className="filter-item">
            <select name="price">
              <option value={null}>Price</option>
            </select>
          </div>
          <div className="filter-item">
            <select name="review">
              <option value={null}>Review</option>
            </select>
          </div>
          <div className="filter-item">
            <select name="color">
              <option value={null}>Color</option>
            </select>
          </div>
          <div className="filter-item">
            <select name="material">
              <option value={null}>Material</option>
            </select>
          </div>
          <div className="filter-item">
            <select name="offer">
              <option value={null}>Offer</option>
            </select>
          </div>
          <div className="all-filters filter-item">
            <BsFilter /> All Filters
          </div>
        </div>
        <div className="filter-item sort-by">
          <select name="sortBy">
            <option value={null}>Sort By</option>
          </select>
        </div>
      </div>
    </SectionLayout>
  );
};

export default ProductsLayoutFilter;
