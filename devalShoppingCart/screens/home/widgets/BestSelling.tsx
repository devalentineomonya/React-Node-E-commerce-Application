import React from 'react'
import SectionLayout from '@/components/common/layouts/section/SectionLayout'
import ScrollCarousel from '@/components/global/ScrollCarousel'
import ProductCard from '@/components/shared/ProductCard/ProductCard'
const BestSelling = () => {
  return (
    <SectionLayout title="Best Selling Products for you!"  overflow>
        <ScrollCarousel>
            <ProductCard />
        </ScrollCarousel>
        </SectionLayout>
  )
}

export default BestSelling
