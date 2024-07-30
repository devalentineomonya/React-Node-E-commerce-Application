import SectionLayout from "../../common/SectionLayout/SectionLayout";
import CategoryCard from "./CategoryCard";
import "./homecategories.css";
import Furniture from "../../../assets/images/63e8c4e570738029a725e686_Furniture-min.png";
import HandBag from "../../../assets/images/63e8c4e52d6553668075697e_hand bag-min.png";
import Books from "../../../assets/images/63e8c4e460afc22b7ea53520_books-min.png";
import Tech from "../../../assets/images/63e8c4e754ac2e32897cb53b_tech-min.png";
import Sneakers from "../../../assets/images/63e8c4e64b769118272f244f_sneakers-min.png";
import Travel from "../../../assets/images/63e8c4e71eb4ad6d07e7568f_travel-min.png";
const HomeCategories = () => {
  return (
    <SectionLayout title="Shop Our Top">
      <div className="home-category-content">
        <CategoryCard title="Furniture" image={Furniture} />
        <CategoryCard title="Hand Bag" image={HandBag} />
        <CategoryCard title="Books" image={Books} />
        <CategoryCard title="Tech" image={Tech} />
        <CategoryCard title="Sneakers" image={Sneakers} />
        <CategoryCard title="Travel" image={Travel} />
      </div>
    </SectionLayout>
  );
};

export default HomeCategories;
