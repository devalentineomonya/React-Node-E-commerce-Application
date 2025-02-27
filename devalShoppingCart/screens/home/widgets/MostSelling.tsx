import React from 'react'
import SectionLayout from '@/components/common/layouts/section/SectionLayout'
import ScrollCarousel from '@/components/global/ScrollCarousel'
import ProductCard from '@/components/shared/ProductCard/ProductCard'
const MostSelling = () => {
  return (
    <SectionLayout title="Most Selling Products"  overflow>
        <ScrollCarousel>
            <ProductCard product={{ id: 1, name: "Product 1", price: 29.99, image: "image1.jpg", shortDescription: "Description of Product 1" }} />
            <ProductCard product={{ id: 2, name: "Product 2", price: 39.99, image: "image2.jpg", shortDescription: "Description of Product 2" }} />
            <ProductCard product={{ id: 3, name: "Product 3", price: 49.99, image: "image3.jpg", shortDescription: "Description of Product 3" }} />
            <ProductCard product={{ id: 4, name: "Product 4", price: 59.99, image: "image4.jpg", shortDescription: "Description of Product 4" }} />
            <ProductCard product={{ id: 5, name: "Product 5", price: 69.99, image: "image5.jpg", shortDescription: "Description of Product 5" }} />
        </ScrollCarousel>
        </SectionLayout>
  )
}

export default MostSelling
