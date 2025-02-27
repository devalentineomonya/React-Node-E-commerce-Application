import React from "react";
import SectionLayout from "@/components/common/layouts/section/SectionLayout";
import ScrollCarousel from "@/components/global/ScrollCarousel";
import ProductCard from "@/components/shared/ProductCard/ProductCard";
const PopularProducts = () => {
  return (
    <SectionLayout title="Weekly Popular Products" overflow>
      <ScrollCarousel>
        <ProductCard product={{ id: 1, name: "Product 1", price: 29.99, image: "url_to_image_1", shortDescription: "Description for Product 1" }} />
        <ProductCard product={{ id: 2, name: "Product 2", price: 39.99, image: "url_to_image_2", shortDescription: "Description for Product 2" }} />
        <ProductCard product={{ id: 3, name: "Product 3", price: 49.99, image: "url_to_image_3", shortDescription: "Description for Product 3" }} />
      </ScrollCarousel>
    </SectionLayout>
  )}

export default PopularProducts;
