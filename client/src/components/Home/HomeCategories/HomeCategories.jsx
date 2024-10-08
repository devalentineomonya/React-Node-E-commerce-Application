import SectionLayout from "../../layouts/SectionLayout/SectionLayout";
import CategoryCard from "./CategoryCard";
import "./homecategories.css";
import { useSelector } from "react-redux";
const HomeCategories = () => {
  const categories = useSelector((state) => state.category.categories);
  return (
    <SectionLayout title="Shop Our Top">
      <div className="home-category-content">
        {categories?.slice(0, 6)?.map((category) => (
          <CategoryCard
            title={category?.name}
            image={category?.imageUrl}
            key={category?._id}
          />
        ))}
      </div>
    </SectionLayout>
  );
};

export default HomeCategories;
