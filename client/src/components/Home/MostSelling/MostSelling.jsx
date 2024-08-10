import SectionLayout from '../../common/SectionLayout/SectionLayout'
import ProductCard from '../../common/ProductCard/ProductCard'
import Swiper from '../../common/Swiper/Swiper'

const MostSelling = () => {
  return (
<SectionLayout title="Most Selling Products" overflow>

<Swiper>
<ProductCard/>
<ProductCard/>
<ProductCard/>
<ProductCard/>
<ProductCard/>
<ProductCard/>
<ProductCard/>
<ProductCard/>
<ProductCard/>
<ProductCard/>
</Swiper>
</SectionLayout>
  )
}

export default MostSelling
