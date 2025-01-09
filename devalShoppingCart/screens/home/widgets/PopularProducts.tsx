import React from 'react'
import SectionLayout from '@/components/common/layouts/section/SectionLayout'
import ScrollCarousel from '@/components/global/ScrollCarousel'
import ProductCard from '@/components/shared/ProductCard/ProductCard'
const PopularProducts = () => {
  return (
    <SectionLayout title="Weekly Popular Products"  overflow>
        <ScrollCarousel>
            <ProductCard />
        </ScrollCarousel>
        </SectionLayout>
  )
}

export default PopularProducts
