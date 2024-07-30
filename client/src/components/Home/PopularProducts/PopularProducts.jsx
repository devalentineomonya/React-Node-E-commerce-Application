import React from 'react'
import SectionLayout from '../../common/SectionLayout/SectionLayout'
import ProductCard from '../../common/ProductCard/ProductCard'

const PopularProducts = () => {
  return (
    <SectionLayout title="Weekly Popular Products">
    <ProductCard thumbnail />
  </SectionLayout>
  )
}

export default PopularProducts
