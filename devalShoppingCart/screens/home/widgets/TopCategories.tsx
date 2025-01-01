import React from "react";
import SectionLayout from "@/components/common/layouts/SectionLayout";
import CategoryCard from "../components/CategoryCard";
const TopCategories = () => {
  return (
    <SectionLayout title="Top Categories">
      <div className="flex justify-between w-full gap-x-3 ">
        <CategoryCard />
        <CategoryCard />
        <CategoryCard />
        <CategoryCard />
        <CategoryCard />
        <CategoryCard />
      </div>
    </SectionLayout>
  );
};

export default TopCategories;
