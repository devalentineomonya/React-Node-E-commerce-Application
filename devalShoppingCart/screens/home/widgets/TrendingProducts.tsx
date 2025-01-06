import React from "react";
import SectionLayout from "@/components/common/layouts/SectionLayout";
import TrendingProductCard from "../components/TrendingProductCard";
const TrendingProducts = () => {
  return (
    <SectionLayout title="Trending Products for you!">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <TrendingProductCard />
        <TrendingProductCard />
      </div>
    </SectionLayout>
  );
};

export default TrendingProducts;
